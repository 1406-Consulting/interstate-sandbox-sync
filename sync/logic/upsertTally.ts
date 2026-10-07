/**
 * Reads HubSpot's batch upsert responses: how many records were created or
 * updated, and which sandbox record each production record became.
 */
import type {
  BatchUpsertResponse,
  UpsertTally,
} from "../../types/upsert.types.ts";

/**
 * Totals the responses. Throws if HubSpot reported any error, so a failed
 * record stops the run instead of being skipped quietly.
 */
export function tallyUpsertResponses(
  responses: BatchUpsertResponse[],
): UpsertTally {
  const tally: UpsertTally = { created: 0, updated: 0, idMap: {} };

  for (const response of responses) {
    const errors = response.errors;
    if (errors !== undefined && errors.length > 0) {
      const messages = errors.map((error) => error.message);
      throw new Error(
        `HubSpot reported upsert errors: ${messages.join(" | ")}`,
      );
    }

    for (const record of response.results) {
      if (record.objectWriteTraceId === undefined) {
        throw new Error(
          "HubSpot did not return objectWriteTraceId; cannot match results to production records",
        );
      }
      tally.idMap[record.objectWriteTraceId] = record.id;
      if (record.new) {
        tally.created = tally.created + 1;
      } else {
        tally.updated = tally.updated + 1;
      }
    }
  }
  return tally;
}
