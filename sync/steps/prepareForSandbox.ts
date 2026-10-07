/**
 * Step 3: keep only what the sandbox can accept, and stamp each record with
 * the time of this run.
 */
import type { CrmRecord } from "../../types/crm.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import type { PreparedRecord } from "../../types/upsert.types.ts";
import {
  getPropertyDefinitions,
  objectPath,
} from "../infrastructure/hubspotApi.ts";
import {
  listMissing,
  prepareRecords,
  writablePropertyNames,
} from "../logic/prepareRecords.ts";

const MISSING_SHOWN = 10;

/** Logs the contract properties the sandbox can't write, if there are any. */
function reportMissing(contract: ObjectContract, missing: string[]): void {
  if (missing.length === 0) {
    return;
  }
  const shown = missing.slice(0, MISSING_SHOWN).join(", ");
  let suffix = "";
  if (missing.length > MISSING_SHOWN) {
    suffix = ", ...";
  }
  console.log(
    `[${contract.kind}] ${missing.length} contract properties are not writable in the sandbox and will be left out: ${shown}${suffix}`,
  );
}

/** Reads the sandbox's property list, then filters and stamps the records. */
export async function prepareForSandbox(
  target: PortalContext,
  contract: ObjectContract,
  records: CrmRecord[],
  syncedAt: Date,
): Promise<PreparedRecord[]> {
  const path = objectPath(contract.kind, target);
  const definitions = await getPropertyDefinitions(target.client, path);
  const writable = writablePropertyNames(definitions);

  const missing = listMissing(contract.properties, writable);
  reportMissing(contract, missing);

  return prepareRecords(records, writable, syncedAt);
}
