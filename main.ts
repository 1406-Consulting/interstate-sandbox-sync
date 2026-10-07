/**
 * Copies production records into the Interstate sandbox, one stage per
 * object type.
 *
 *   node main.ts --deals 3                     dry run: reads both portals, writes nothing
 *   node main.ts --deals 3 --apply             writes deals to the sandbox
 *   node main.ts --deals 3 --companies 3       also copies the companies linked to those deals
 *   node main.ts --deals 3 --line-items 3      also copies the line items linked to those deals
 *   node main.ts --deals 3 --products 3        also copies the 3 newest products
 *
 * Every stage runs the same steps:
 *   fetch (recent or linked) -> prepareForSandbox -> upsertRecords -> copyLinks
 */
import { COMPANY_CONTRACT } from "./contracts/company.ts";
import { DEAL_CONTRACT } from "./contracts/deal.ts";
import { LINE_ITEM_CONTRACT } from "./contracts/lineItem.ts";
import { PRODUCT_CONTRACT } from "./contracts/product.ts";
import type { PortalContext } from "./types/hubspotClient.types.ts";
import type { ObjectContract } from "./types/objectContract.types.ts";
import type {
  AssociationResult,
  LinkedStageResult,
  NewestStageResult,
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

/**
 * Copies the N newest production records of one type on their own. Used by
 * deals (the anchor) and products.
 */
async function copyNewest(
  run: RunContext,
  contract: ObjectContract,
  limit: number,
): Promise<NewestStageResult> {
  const records = await fetchRecentRecords(run.source, contract, limit);
  const prepared = await prepareForSandbox(
    run.target,
    contract,
    records,
    run.syncedAt,
  );
  const result = await upsertRecords(
    run.target,
    contract,
    prepared,
    run.options.apply,
  );
  return { records, result };
}

/**
 * Copies the records of one type that are linked to the copied deals, then
 * recreates the deal -> record links. Used by companies and line items.
 */
async function copyLinkedToDeals(
  run: RunContext,
  deals: NewestStageResult,
  contract: ObjectContract,
  limit: number,
): Promise<LinkedStageResult> {
  const dealIds = deals.records.map((record) => record.id);
  const linked = await fetchLinkedRecords(
    run.source,
    DEAL_CONTRACT,
    dealIds,
    contract,
    limit,
  );
  const prepared = await prepareForSandbox(
    run.target,
    contract,
    linked.records,
    run.syncedAt,
  );
  const result = await upsertRecords(
    run.target,
    contract,
    prepared,
    run.options.apply,
  );
  const links = await copyLinks(
    run.target,
    linked.links,
    deals.result,
    result,
    run.options.apply,
  );
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

  const limits = options.limits;

  const deals = await copyNewest(run, DEAL_CONTRACT, limits.deals);
  upserts.push(deals.result);

  if (limits.companies > 0) {
    const companies = await copyLinkedToDeals(
      run,
      deals,
      COMPANY_CONTRACT,
      limits.companies,
    );
    upserts.push(companies.result);
    links.push(companies.links);
  }

  if (limits.line_items > 0) {
    // The contract also links line items to vehicles. That link is skipped
    // until vehicles are copied (stage 4).
    const lineItems = await copyLinkedToDeals(
      run,
      deals,
      LINE_ITEM_CONTRACT,
      limits.line_items,
    );
    upserts.push(lineItems.result);
    links.push(lineItems.links);
  }

  if (limits.products > 0) {
    const products = await copyNewest(run, PRODUCT_CONTRACT, limits.products);
    upserts.push(products.result);
  }

  printSummary(upserts, links, options.apply);
}

main().catch((error: Error) => {
  console.error(`[run] failed: ${error.message}`);
  process.exitCode = 1;
});
