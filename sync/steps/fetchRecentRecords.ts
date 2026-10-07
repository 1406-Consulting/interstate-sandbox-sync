/**
 * Step 2: read the most recently created records of one object type from
 * production, with every property in its contract.
 */
import type { CrmRecord } from "../../types/crm.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import {
  batchReadRecords,
  objectPath,
  searchNewestIds,
} from "../infrastructure/hubspotApi.ts";

/** Reads the `limit` newest records with every property in the contract. */
export async function fetchRecentRecords(
  source: PortalContext,
  contract: ObjectContract,
  limit: number,
): Promise<CrmRecord[]> {
  const path = objectPath(contract.kind, source);
  const ids = await searchNewestIds(source.client, path, limit);
  console.log(`[${contract.kind}] found ${ids.length} newest in production`);

  return batchReadRecords(source.client, path, ids, contract.properties);
}
