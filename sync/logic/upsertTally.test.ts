/**
 * Baseline: HubSpot's responses are totalled into created and updated
 * counts, with each production record matched to its sandbox record.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { tallyUpsertResponses } from "./upsertTally.ts";

test("counts created and updated records and maps each to its sandbox ID", () => {
  const responses = [
    {
      results: [
        { id: "sandbox-1", new: true, objectWriteTraceId: "101" },
        { id: "sandbox-2", new: false, objectWriteTraceId: "102" },
      ],
    },
  ];

  const tally = tallyUpsertResponses(responses);

  assert.deepEqual(tally, {
    created: 1,
    updated: 1,
    idMap: { "101": "sandbox-1", "102": "sandbox-2" },
  });
});
