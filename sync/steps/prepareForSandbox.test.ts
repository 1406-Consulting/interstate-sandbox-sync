/**
 * Baseline: records are prepared against the sandbox's own property list,
 * so a property the sandbox can't write is never sent.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { DEAL_CONTRACT } from "../../contracts/deal.ts";
import { createFakeClient, fakePortal } from "../fakeHubSpotClient.ts";
import { prepareForSandbox } from "./prepareForSandbox.ts";

test("prepares records using the sandbox's writable properties", async () => {
  const sandbox = createFakeClient("target", () => {
    return {
      results: [
        { name: "dealname", type: "string" },
        {
          name: "hs_object_id",
          type: "number",
          modificationMetadata: { readOnlyValue: true },
        },
      ],
    };
  });
  const production = [
    { id: "101", properties: { dealname: "Fleet order", hs_object_id: "101" } },
  ];
  const syncedAt = new Date("2026-10-07T19:00:00.000Z");

  const prepared = await prepareForSandbox(
    fakePortal(sandbox.client),
    DEAL_CONTRACT,
    production,
    syncedAt,
  );

  assert.equal(sandbox.calls[0].path, "/crm/v3/properties/deals");
  assert.deepEqual(prepared, [
    {
      sourceId: "101",
      properties: {
        dealname: "Fleet order",
        prod_sync_date: "2026-10-07T19:00:00.000Z",
      },
    },
  ]);
});
