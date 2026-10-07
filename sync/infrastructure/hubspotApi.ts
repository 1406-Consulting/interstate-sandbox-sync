/**
 * One function per HubSpot endpoint the sync uses. Each one knows the URL,
 * the request body, paging and HubSpot's batch limits, and nothing about
 * which records should be copied or why.
 */
import type {
  CrmRecord,
  ObjectKind,
  PropertyDefinition,
} from "../../types/crm.types.ts";
import type {
  AccountDetailsResponse,
  BatchReadResponse,
  PropertiesResponse,
  RawPropertyDefinition,
  SearchResponse,
} from "../../types/hubspotApi.types.ts";
import type {
  HubSpotClient,
  PortalContext,
} from "../../types/hubspotClient.types.ts";
import type {
  BatchUpsertResponse,
  UpsertInput,
} from "../../types/upsert.types.ts";
import { chunk } from "./chunk.ts";

const SEARCH_PAGE_SIZE = 200; // HubSpot's search maximum
const BATCH_SIZE = 100; // HubSpot's batch read and batch upsert maximum

/**
 * Returns the object type segment for `/crm/v3/objects/{segment}` URLs.
 * Standard objects use their kind ("deals"); vehicles use the portal's own
 * custom object type ID, because that ID differs between portals.
 */
export function objectPath(kind: ObjectKind, portal: PortalContext): string {
  if (kind === "vehicles") {
    return portal.vehiclesTypeId;
  }
  return kind;
}

/** Looks up which portal a token belongs to. */
export async function getPortalId(client: HubSpotClient): Promise<number> {
  const details = await client.read<AccountDetailsResponse>(
    "GET",
    "/account-info/v3/details",
  );
  return details.portalId;
}

/** Finds the IDs of the `limit` most recently created records, newest first. */
export async function searchNewestIds(
  client: HubSpotClient,
  path: string,
  limit: number,
): Promise<string[]> {
  const ids: string[] = [];
  let after: string | undefined = undefined;

  while (ids.length < limit) {
    const body: { [name: string]: unknown } = {
      sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
      properties: ["hs_object_id"],
      limit: Math.min(SEARCH_PAGE_SIZE, limit - ids.length),
    };
    if (after !== undefined) {
      body.after = after;
    }

    const page = await client.read<SearchResponse>(
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

/** Reads records by ID with the given properties, 100 at a time. */
export async function batchReadRecords(
  client: HubSpotClient,
  path: string,
  ids: string[],
  properties: string[],
): Promise<CrmRecord[]> {
  const records: CrmRecord[] = [];
  const idBatches = chunk(ids, BATCH_SIZE);

  for (const idBatch of idBatches) {
    const inputs = idBatch.map((id) => {
      return { id };
    });
    const response = await client.read<BatchReadResponse>(
      "POST",
      `/crm/v3/objects/${path}/batch/read`,
      { inputs, properties, propertiesWithHistory: [] },
    );
    for (const record of response.results) {
      records.push({ id: record.id, properties: record.properties });
    }
  }
  return records;
}

/** Converts one raw HubSpot property definition into the tool's shape. */
function toPropertyDefinition(raw: RawPropertyDefinition): PropertyDefinition {
  const metadata = raw.modificationMetadata;
  const optionValues: string[] = [];
  if (raw.options !== undefined) {
    for (const option of raw.options) {
      optionValues.push(option.value);
    }
  }

  return {
    name: raw.name,
    type: raw.type,
    calculated: raw.calculated === true,
    readOnlyValue: metadata !== undefined && metadata.readOnlyValue === true,
    hasUniqueValue: raw.hasUniqueValue === true,
    referencesOwner: raw.referencedObjectType === "OWNER",
    optionValues,
  };
}

/** Reads every property definition for one object type. */
export async function getPropertyDefinitions(
  client: HubSpotClient,
  path: string,
): Promise<PropertyDefinition[]> {
  const response = await client.read<PropertiesResponse>(
    "GET",
    `/crm/v3/properties/${path}`,
  );
  return response.results.map(toPropertyDefinition);
}

/** Sends upsert inputs 100 at a time and returns HubSpot's response for each batch. */
export async function batchUpsert(
  client: HubSpotClient,
  path: string,
  inputs: UpsertInput[],
): Promise<BatchUpsertResponse[]> {
  const responses: BatchUpsertResponse[] = [];
  const batches = chunk(inputs, BATCH_SIZE);

  for (const batch of batches) {
    const response = await client.write<BatchUpsertResponse>(
      "POST",
      `/crm/v3/objects/${path}/batch/upsert`,
      { inputs: batch },
    );
    responses.push(response);
  }
  return responses;
}
