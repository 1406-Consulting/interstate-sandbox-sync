/**
 * Baseline: upserts go to the batch upsert URL in batches no larger than
 * HubSpot's limit of 100, and association links are read into simple pairs.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { UpsertInput } from "../../types/upsert.types.ts";
import { createFakeClient } from "../fakeHubSpotClient.ts";
import { batchReadAssociations, batchUpsert } from "./hubspotApi.ts";

test("sends upserts to the batch upsert URL, 100 at a time", async () => {
  const fake = createFakeClient("target", () => {
    return { results: [] };
  });
  const inputs: UpsertInput[] = [];
  for (let index = 0; index < 150; index++) {
    inputs.push({
      idProperty: "excede_customer_sales_ts",
      id: `TS-${index}`,
      properties: {},
      objectWriteTraceId: String(index),
    });
  }

  await batchUpsert(fake.client, "deals", inputs);

  const batchSizes = fake.calls.map((call) => {
    const body = call.body as { inputs: UpsertInput[] };
    return body.inputs.length;
  });
  assert.deepEqual(batchSizes, [100, 50]);
  assert.equal(fake.calls[0].access, "write");
  assert.equal(fake.calls[0].path, "/crm/v3/objects/deals/batch/upsert");
});

test("reads association links as one entry per linked record", async () => {
  const fake = createFakeClient("source", () => {
    return {
      results: [
        {
          from: { id: "101" },
          to: [
            {
              toObjectId: 9001,
              associationTypes: [
                { category: "HUBSPOT_DEFINED", typeId: 341, label: null },
              ],
            },
          ],
        },
      ],
    };
  });

  const links = await batchReadAssociations(fake.client, "deals", "companies", [
    "101",
  ]);

  assert.equal(
    fake.calls[0].path,
    "/crm/v4/associations/deals/companies/batch/read",
  );
  assert.deepEqual(links, [
    {
      fromId: "101",
      toId: "9001",
      types: [{ category: "HUBSPOT_DEFINED", typeId: 341, label: null }],
    },
  ]);
});
