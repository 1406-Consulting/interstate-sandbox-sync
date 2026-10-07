/**
 * Reads the most recently created records of one object type from production.
 */
import type { CrmRecord } from "../types/crm.types.ts";
import type { PortalContext } from "../types/hubspotClient.types.ts";
import type { ObjectContract } from "../types/objectContract.types.ts";
import { chunk } from "./chunk.ts";
import { objectPath } from "./objectPath.ts";

const SEARCH_PAGE_SIZE = 200; // HubSpot's search maximum
const READ_BATCH_SIZE = 100; // HubSpot's batch read maximum

interface SearchResponse {
  results: { id: string }[];
  paging?: { next?: { after: string } };
}

interface BatchReadResponse {
  results: CrmRecord[];
}

/** Finds the IDs of the `limit` newest records, newest first. */
async function findNewestIds(
  source: PortalContext,
  path: string,
  limit: number,
): Promise<string[]> {
  const ids: string[] = [];
  let after: string | undefined = undefined;

  while (ids.length < limit) {
    const pageSize = Math.min(SEARCH_PAGE_SIZE, limit - ids.length);
    const body: { [name: string]: unknown } = {
      sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
      properties: ["hs_object_id"],
      limit: pageSize,
    };
    if (after !== undefined) {
      body.after = after;
    }

    const page = await source.client.read<SearchResponse>(
      "POST",
      `/crm/v3/objects/${path}/search`,
      body,
    );
    for (const result of page.results) {
      ids.push(result.id);
    }

    const next = page.paging === undefined ? undefined : page.paging.next;
    const isLastPage = next === undefined || page.results.length === 0;
    if (isLastPage) {
      break;
    }
    after = next.after;
  }
  return ids;
}

/** Reads the `limit` newest records with every property in the contract. */
export async function fetchRecentRecords(
  source: PortalContext,
  contract: ObjectContract,
  limit: number,
): Promise<CrmRecord[]> {
  const path = objectPath(contract.kind, source);
  const ids = await findNewestIds(source, path, limit);
  console.log(`[${contract.kind}] found ${ids.length} newest in production`);

  const records: CrmRecord[] = [];
  const idBatches = chunk(ids, READ_BATCH_SIZE);
  for (const idBatch of idBatches) {
    const inputs = idBatch.map((id) => {
      return { id };
    });
    const response = await source.client.read<BatchReadResponse>(
      "POST",
      `/crm/v3/objects/${path}/batch/read`,
      { inputs, properties: contract.properties, propertiesWithHistory: [] },
    );
    for (const record of response.results) {
      records.push({ id: record.id, properties: record.properties });
    }
  }
  return records;
}
