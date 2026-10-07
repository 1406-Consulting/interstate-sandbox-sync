/**
 * Writes prepared records to the sandbox, matching each one on its unique
 * Excede key so a re-run updates records instead of duplicating them.
 *
 * The essential path:
 *   1. buildInputs   — turn each record into an upsert input keyed on its Excede ID
 *   2. upsertRecords — send the inputs in batches of 100, collect sandbox IDs
 */
import type {
  PrimaryExcedeProperty,
  PropertyValues,
} from "../types/crm.types.ts";
import type { PortalContext } from "../types/hubspotClient.types.ts";
import type { ObjectContract } from "../types/objectContract.types.ts";
import type { UpsertResult } from "../types/run.types.ts";
import type {
  BatchUpsertResponse,
  PreparedRecord,
  UpsertInput,
} from "../types/upsert.types.ts";
import { chunk } from "./chunk.ts";
import { objectPath } from "./objectPath.ts";

/** HubSpot's maximum number of inputs per batch request. */
export const UPSERT_BATCH_SIZE = 100;

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

/** Stops the run if HubSpot reported any error for a batch. */
function throwOnErrors(response: BatchUpsertResponse, path: string): void {
  const errors = response.errors;
  if (errors === undefined || errors.length === 0) {
    return;
  }
  const messages = errors.map((error) => error.message);
  throw new Error(`upsert to ${path} reported errors: ${messages.join(" | ")}`);
}

/**
 * Upserts one object type's records into the sandbox.
 *
 * - apply = true: sends the inputs in batches and records each sandbox ID.
 *   Stops with an error if HubSpot reports any error for a batch.
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

  const path = `/crm/v3/objects/${objectPath(contract.kind, target)}/batch/upsert`;
  const batches = chunk(built.inputs, UPSERT_BATCH_SIZE);
  for (const batch of batches) {
    const response = await target.client.write<BatchUpsertResponse>(
      "POST",
      path,
      { inputs: batch },
    );
    throwOnErrors(response, path);

    for (const record of response.results) {
      if (record.objectWriteTraceId === undefined) {
        throw new Error(
          "HubSpot did not return objectWriteTraceId; cannot match results to production records",
        );
      }
      result.idMap[record.objectWriteTraceId] = record.id;
      if (record.new) {
        result.created = result.created + 1;
      } else {
        result.updated = result.updated + 1;
      }
    }
  }

  console.log(
    `[${contract.kind}] upserted ${result.sent} (created ${result.created}, updated ${result.updated})`,
  );
  return result;
}
