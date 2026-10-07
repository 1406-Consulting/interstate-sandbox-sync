/**
 * Decides which unique Excede property each record is matched on, so a
 * re-run updates the same sandbox record instead of creating a duplicate.
 */
import type {
  PrimaryExcedeProperty,
  PropertyValues,
} from "../../types/crm.types.ts";
import type { PreparedRecord, UpsertInput } from "../../types/upsert.types.ts";

/**
 * Picks the key a record is upserted on: the first property in
 * `keyPriority` that has a value. Returns null when none does.
 */
export function chooseKey(
  properties: PropertyValues,
  keyPriority: PrimaryExcedeProperty[],
): PrimaryExcedeProperty | null {
  for (const key of keyPriority) {
    const value = properties[key];
    const hasValue = value !== undefined && value !== null && value !== "";
    if (hasValue) {
      return key;
    }
  }
  return null;
}

/**
 * Turns records into upsert inputs. Records with no key filled in cannot be
 * matched safely, so they are returned in `skippedNoKey` instead.
 */
export function buildInputs(
  records: PreparedRecord[],
  keyPriority: PrimaryExcedeProperty[],
): { inputs: UpsertInput[]; skippedNoKey: string[] } {
  const inputs: UpsertInput[] = [];
  const skippedNoKey: string[] = [];

  for (const record of records) {
    const idProperty = chooseKey(record.properties, keyPriority);
    if (idProperty === null) {
      skippedNoKey.push(record.sourceId);
      continue;
    }
    inputs.push({
      idProperty,
      id: String(record.properties[idProperty]),
      properties: record.properties,
      objectWriteTraceId: record.sourceId,
    });
  }
  return { inputs, skippedNoKey };
}
