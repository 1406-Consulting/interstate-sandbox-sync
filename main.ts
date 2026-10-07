/**
 * Copies the newest production deals into the Interstate sandbox.
 *
 *   node main.ts --deals 3            dry run: reads both portals, writes nothing
 *   node main.ts --deals 3 --apply    writes to the sandbox
 *
 * The run:
 *   1. check both tokens point at the right portals
 *   2. read the N newest deals from production
 *   3. keep only the properties the sandbox can accept
 *   4. upsert them into the sandbox, matched on their Excede key
 */
import { DEAL_CONTRACT } from "./contracts/deal.ts";
import type { PortalContext } from "./types/hubspotClient.types.ts";
import type { UpsertResult } from "./types/run.types.ts";
import { parseRunOptions } from "./sync/cli.ts";
import { readToken } from "./sync/env.ts";
import { fetchRecentRecords } from "./sync/fetchRecords.ts";
import { createClient } from "./sync/hubspotClient.ts";
import { verifyPortals } from "./sync/portalGuard.ts";
import {
  fetchWritablePropertyNames,
  listMissing,
  prepareRecords,
} from "./sync/prepareRecords.ts";
import { upsertRecords } from "./sync/upsert.ts";

/** Prints the end-of-run summary. */
function printSummary(result: UpsertResult, apply: boolean): void {
  console.log("");
  console.log(
    `[summary] ${result.kind}: ${apply ? "sent" : "would send"} ${result.sent}`,
  );
  if (apply) {
    console.log(
      `[summary] created ${result.created}, updated ${result.updated}`,
    );
  }
  if (result.skippedNoKey.length > 0) {
    console.log(
      `[summary] skipped (no Excede key): ${result.skippedNoKey.join(", ")}`,
    );
  }
}

async function main(): Promise<void> {
  const options = parseRunOptions(process.argv.slice(2));
  console.log(
    `[run] ${options.apply ? "APPLY: writing to the sandbox" : "dry run: nothing will be written"}`,
  );

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

  // 3. Keep only what the sandbox can accept.
  const writable = await fetchWritablePropertyNames(target, DEAL_CONTRACT.kind);
  const missing = listMissing(DEAL_CONTRACT.properties, writable);
  if (missing.length > 0) {
    console.log(
      `[deals] ${missing.length} contract properties are not writable in the sandbox and will be left out: ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? ", ..." : ""}`,
    );
  }
  const prepared = prepareRecords(records, writable);

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
