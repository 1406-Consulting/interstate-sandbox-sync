/**
 * Copies production records into the Interstate sandbox, one stage per
 * object type.
 *
 *   node main.ts --deals 3                     dry run: reads both portals, writes nothing
 *   node main.ts --deals 3 --apply             writes deals to the sandbox
 *   node main.ts --deals 3 --companies 3       also copies the companies linked to those deals
 *   node main.ts --deals 3 --contacts 3        also copies contacts linked to those deals or companies
 *
 * Every stage runs the same steps:
 *   fetch (recent or linked) -> prepareForSandbox -> upsertRecords -> copyLinks
 */
import { COMPANY_CONTRACT } from "./contracts/company.ts";
import { CONTACT_CONTRACT } from "./contracts/contact.ts";
import { DEAL_CONTRACT } from "./contracts/deal.ts";
import type { LinkSource } from "./types/association.types.ts";
import type { CrmRecord } from "./types/crm.types.ts";
import type { PortalContext } from "./types/hubspotClient.types.ts";
import type {
  AssociationResult,
  RunContext,
  UpsertResult,
} from "./types/run.types.ts";
import { parseRunOptions } from "./sync/infrastructure/cli.ts";
import { readToken } from "./sync/infrastructure/env.ts";
import { createClient } from "./sync/infrastructure/hubspotClient.ts";
import { copyLinks } from "./sync/steps/copyLinks.ts";
import { fetchLinkedRecords } from "./sync/steps/fetchLinkedRecords.ts";
import { fetchRecentRecords } from "./sync/steps/fetchRecentRecords.ts";
import { prepareForSandbox } from "./sync/steps/prepareForSandbox.ts";
import { upsertRecords } from "./sync/steps/upsertRecords.ts";
import { verifyPortals } from "./sync/steps/verifyPortals.ts";

/** Stage 1: the N newest production deals. */
async function copyDeals(
  run: RunContext,
): Promise<{ records: CrmRecord[]; result: UpsertResult }> {
  const records = await fetchRecentRecords(
    run.source,
    DEAL_CONTRACT,
    run.options.limits.deals,
  );
  const prepared = await prepareForSandbox(
    run.target,
    DEAL_CONTRACT,
    records,
    run.syncedAt,
  );
  const result = await upsertRecords(
    run.target,
    DEAL_CONTRACT,
    prepared,
    run.options.apply,
  );
  return { records, result };
}

/**
 * Stage 2: the companies linked to the copied deals, and those links.
 * Also returns the fetched company records, which stage 3 follows to contacts.
 */
async function copyCompanies(
  run: RunContext,
  dealRecords: CrmRecord[],
  deals: UpsertResult,
): Promise<{
  records: CrmRecord[];
  result: UpsertResult;
  links: AssociationResult;
}> {
  const dealIds = dealRecords.map((record) => record.id);
  const fromSources: LinkSource[] = [{ contract: DEAL_CONTRACT, ids: dealIds }];
  const linked = await fetchLinkedRecords(
    run.source,
    fromSources,
    COMPANY_CONTRACT,
    run.options.limits.companies,
  );
  const prepared = await prepareForSandbox(
    run.target,
    COMPANY_CONTRACT,
    linked.records,
    run.syncedAt,
  );
  const result = await upsertRecords(
    run.target,
    COMPANY_CONTRACT,
    prepared,
    run.options.apply,
  );
  const links = await copyLinks(
    run.target,
    linked.linkSets[0].links,
    deals,
    result,
    run.options.apply,
  );
  return { records: linked.records, result, links };
}

/**
 * Stage 3: the contacts linked to the copied deals or companies (deals'
 * links first), and the links back to each. `companies` is null when the
 * companies stage was skipped.
 */
async function copyContacts(
  run: RunContext,
  deals: { records: CrmRecord[]; result: UpsertResult },
  companies: { records: CrmRecord[]; result: UpsertResult } | null,
): Promise<{ result: UpsertResult; links: AssociationResult[] }> {
  const dealIds = deals.records.map((record) => record.id);
  const fromSources: LinkSource[] = [{ contract: DEAL_CONTRACT, ids: dealIds }];
  const upserted: UpsertResult[] = [deals.result];
  if (companies !== null) {
    const companyIds = companies.records.map((record) => record.id);
    fromSources.push({ contract: COMPANY_CONTRACT, ids: companyIds });
    upserted.push(companies.result);
  }

  const linked = await fetchLinkedRecords(
    run.source,
    fromSources,
    CONTACT_CONTRACT,
    run.options.limits.contacts,
  );
  const prepared = await prepareForSandbox(
    run.target,
    CONTACT_CONTRACT,
    linked.records,
    run.syncedAt,
  );
  const result = await upsertRecords(
    run.target,
    CONTACT_CONTRACT,
    prepared,
    run.options.apply,
  );

  // Each link set pairs with the upsert result of the type it came from.
  const links: AssociationResult[] = [];
  for (const linkSet of linked.linkSets) {
    for (const fromResult of upserted) {
      if (fromResult.kind !== linkSet.from) {
        continue;
      }
      const copied = await copyLinks(
        run.target,
        linkSet.links,
        fromResult,
        result,
        run.options.apply,
      );
      links.push(copied);
    }
  }
  return { result, links };
}

/** Prints one line per object type and one per set of links. */
function printSummary(
  upserts: UpsertResult[],
  links: AssociationResult[],
  apply: boolean,
): void {
  console.log("");
  for (const result of upserts) {
    if (apply) {
      console.log(
        `[summary] ${result.kind}: sent ${result.sent} (created ${result.created}, updated ${result.updated})`,
      );
    } else {
      console.log(`[summary] ${result.kind}: would send ${result.sent}`);
    }
    if (result.skippedNoKey.length > 0) {
      console.log(
        `[summary] ${result.kind} skipped (no Excede key): ${result.skippedNoKey.join(", ")}`,
      );
    }
  }
  for (const link of links) {
    let verb = "linked";
    if (!apply) {
      verb = "would link";
    }
    console.log(
      `[summary] ${link.from} -> ${link.to}: ${verb} ${link.created} (skipped: ${link.skippedMissingEnd} missing a side, ${link.skippedUnmappedType} unknown link types)`,
    );
  }
}

async function main(): Promise<void> {
  const options = parseRunOptions(process.argv.slice(2));
  if (options.apply) {
    console.log("[run] APPLY: writing to the sandbox");
  } else {
    console.log("[run] dry run: nothing will be written");
  }

  const sourceClient = createClient({
    token: readToken(options.sourceEnvPath),
    role: "source",
    allowWrites: false,
  });
  const targetClient = createClient({
    token: readToken(options.targetEnvPath),
    role: "target",
    allowWrites: options.apply,
  });

  // Refuse to run against the wrong portals.
  const portals = await verifyPortals(sourceClient, targetClient, options);
  // vehiclesTypeId is looked up when vehicles are added (stage 4).
  const source: PortalContext = {
    role: "source",
    portalId: portals.sourcePortalId,
    client: sourceClient,
    vehiclesTypeId: "",
  };
  const target: PortalContext = {
    role: "target",
    portalId: portals.targetPortalId,
    client: targetClient,
    vehiclesTypeId: "",
  };
  // One sync time for the whole run, stamped on every record as prod_sync_date.
  const run: RunContext = { source, target, options, syncedAt: new Date() };

  const upserts: UpsertResult[] = [];
  const links: AssociationResult[] = [];

  const deals = await copyDeals(run);
  upserts.push(deals.result);

  let companies: { records: CrmRecord[]; result: UpsertResult } | null = null;
  if (options.limits.companies > 0) {
    const copied = await copyCompanies(run, deals.records, deals.result);
    companies = { records: copied.records, result: copied.result };
    upserts.push(copied.result);
    links.push(copied.links);
  }

  if (options.limits.contacts > 0) {
    const contacts = await copyContacts(run, deals, companies);
    upserts.push(contacts.result);
    links.push(...contacts.links);
  }

  printSummary(upserts, links, options.apply);
}

main().catch((error: Error) => {
  console.error(`[run] failed: ${error.message}`);
  process.exitCode = 1;
});
