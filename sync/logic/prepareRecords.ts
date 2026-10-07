/**
 * Decides what the sandbox receives: only properties it can write, only
 * values that are filled in, and a stamp saying when the record was synced.
 */
import type {
  CrmRecord,
  PropertyDefinition,
  PropertyValues,
} from "../../types/crm.types.ts";
import type { PreparedRecord } from "../../types/upsert.types.ts";

/** Names of the properties HubSpot lets us write: not read-only, not calculated. */
export function writablePropertyNames(
  definitions: PropertyDefinition[],
): Set<string> {
  const names = new Set<string>();
  for (const definition of definitions) {
    const isWritable = !definition.readOnlyValue && !definition.calculated;
    if (isWritable) {
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

/**
 * Keeps only filled-in values for properties the sandbox can write, and
 * stamps each record with `prod_sync_date` (ISO 8601, which HubSpot datetime
 * properties accept).
 */
export function prepareRecords(
  records: CrmRecord[],
  writable: Set<string>,
  syncedAt: Date,
): PreparedRecord[] {
  const syncStamp = syncedAt.toISOString();
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
    properties.prod_sync_date = syncStamp;
    prepared.push({ sourceId: record.id, properties });
  }
  return prepared;
}
