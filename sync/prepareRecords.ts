/**
 * Turns production records into records the sandbox will accept: only
 * properties the sandbox has and can write, and only values that are filled in.
 */
import type {
  CrmRecord,
  ObjectKind,
  PropertyValues,
} from "../types/crm.types.ts";
import type { PortalContext } from "../types/hubspotClient.types.ts";
import type { PreparedRecord } from "../types/upsert.types.ts";
import { objectPath } from "./objectPath.ts";

interface PropertiesResponse {
  results: {
    name: string;
    calculated?: boolean;
    modificationMetadata?: { readOnlyValue?: boolean };
  }[];
}

/** Lists the properties of one object type that the sandbox lets us write. */
export async function fetchWritablePropertyNames(
  target: PortalContext,
  kind: ObjectKind,
): Promise<Set<string>> {
  const path = objectPath(kind, target);
  const response = await target.client.read<PropertiesResponse>(
    "GET",
    `/crm/v3/properties/${path}`,
  );

  const names = new Set<string>();
  for (const definition of response.results) {
    const metadata = definition.modificationMetadata;
    const isReadOnly =
      metadata !== undefined && metadata.readOnlyValue === true;
    const isCalculated = definition.calculated === true;
    if (!isReadOnly && !isCalculated) {
      names.add(definition.name);
    }
  }
  return names;
}

/** Returns the contract properties the sandbox does not have (or cannot write). */
export function listMissing(
  contractProperties: string[],
  writable: Set<string>,
): string[] {
  const missing: string[] = [];
  for (const name of contractProperties) {
    if (!writable.has(name)) {
      missing.push(name);
    }
  }
  return missing;
}

/** Keeps only filled-in values for properties the sandbox can write. */
export function prepareRecords(
  records: CrmRecord[],
  writable: Set<string>,
): PreparedRecord[] {
  const prepared: PreparedRecord[] = [];
  for (const record of records) {
    const properties: PropertyValues = {};
    for (const name of Object.keys(record.properties)) {
      const value = record.properties[name];
      const isFilled = value !== null && value !== "";
      if (isFilled && writable.has(name)) {
        properties[name] = value;
      }
    }
    // HubSpot datetime properties accept ISO 8601 strings.
    const syncDate: Date = new Date();
    prepared.push({
      sourceId: record.id,
      properties: { ...properties, prod_sync_date: syncDate.toISOString() },
    });
  }
  return prepared;
}
