/**
 * Step 4: write prepared records to the sandbox, matching each one on its
 * unique Excede key so a re-run updates records instead of duplicating them.
 */
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import type { UpsertResult } from "../../types/run.types.ts";
import type { PreparedRecord } from "../../types/upsert.types.ts";
import { batchUpsert, objectPath } from "../infrastructure/hubspotApi.ts";
import { buildInputs } from "../logic/upsertKeys.ts";
import { tallyUpsertResponses } from "../logic/upsertTally.ts";

/**
 * Upserts one object type's records into the sandbox.
 *
 * - apply = true: sends the records and records each sandbox ID. Stops with
 *   an error if HubSpot reports any error.
 * - apply = false (dry run): sends nothing; reports how many would be sent.
 */
export async function upsertRecords(
  target: PortalContext,
  contract: ObjectContract,
  records: PreparedRecord[],
  apply: boolean,
): Promise<UpsertResult> {
  const built = buildInputs(records, contract.keyPriority);
  const result: UpsertResult = {
    kind: contract.kind,
    sent: built.inputs.length,
    created: 0,
    updated: 0,
    skippedNoKey: built.skippedNoKey,
    idMap: {},
  };

  if (!apply) {
    console.log(`[${contract.kind}] dry run: would send ${result.sent}`);
    return result;
  }

  const path = objectPath(contract.kind, target);
  const responses = await batchUpsert(target.client, path, built.inputs);
  const tally = tallyUpsertResponses(responses);

  result.created = tally.created;
  result.updated = tally.updated;
  result.idMap = tally.idMap;
  console.log(
    `[${contract.kind}] upserted ${result.sent} (created ${result.created}, updated ${result.updated})`,
  );
  return result;
}
