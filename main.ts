/**
 * Copies the newest production deals into the Interstate sandbox.
 *
 *   node main.ts --deals 3            dry run: reads both portals, writes nothing
 *   node main.ts --deals 3 --apply    writes to the sandbox
 *
 * The run:
 *   1. verifyPortals      check both tokens point at the right portals
 *   2. fetchRecentRecords read the N newest deals from production
 *   3. prepareForSandbox  keep only what the sandbox accepts, stamp the sync time
 *   4. upsertRecords      write them, matched on their Excede key
 */
import { DEAL_CONTRACT } from "./contracts/deal.ts";
import type { PortalContext } from "./types/hubspotClient.types.ts";
import type { UpsertResult } from "./types/run.types.ts";
import { parseRunOptions } from "./sync/infrastructure/cli.ts";
import { readToken } from "./sync/infrastructure/env.ts";
import { createClient } from "./sync/infrastructure/hubspotClient.ts";
import { fetchRecentRecords } from "./sync/steps/fetchRecentRecords.ts";
import { prepareForSandbox } from "./sync/steps/prepareForSandbox.ts";
import { upsertRecords } from "./sync/steps/upsertRecords.ts";
import { verifyPortals } from "./sync/steps/verifyPortals.ts";

/** Prints the end-of-run summary. */
function printSummary(result: UpsertResult, apply: boolean): void {
  console.log("");
  if (apply) {
    console.log(`[summary] ${result.kind}: sent ${result.sent}`);
    console.log(
      `[summary] created ${result.created}, updated ${result.updated}`,
    );
  } else {
    console.log(`[summary] ${result.kind}: would send ${result.sent}`);
  }
  if (result.skippedNoKey.length > 0) {
    console.log(
      `[summary] skipped (no Excede key): ${result.skippedNoKey.join(", ")}`,
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

  // 1. Refuse to run against the wrong portals.
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

  // 2. Read the newest deals from production.
  const records = await fetchRecentRecords(
    source,
    DEAL_CONTRACT,
    options.limits.deals,
  );

  // 3. Keep only what the sandbox can accept; one sync time for the whole run.
  const syncedAt = new Date();
  const prepared = await prepareForSandbox(
    target,
    DEAL_CONTRACT,
    records,
    syncedAt,
  );

  // 4. Upsert into the sandbox.
  const result = await upsertRecords(
    target,
    DEAL_CONTRACT,
    prepared,
    options.apply,
  );
  printSummary(result, options.apply);
}

main().catch((error: Error) => {
  console.error(`[run] failed: ${error.message}`);
  process.exitCode = 1;
});
