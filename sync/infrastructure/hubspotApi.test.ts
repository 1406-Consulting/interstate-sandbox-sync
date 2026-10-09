/**
 * Baseline: upserts go to the batch upsert URL in batches no larger than
 * HubSpot's limit of 100, association links are read into simple pairs, and a
 * custom object's type ID is found by its name.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { UpsertInput } from "../../types/upsert.types.ts";
import { createFakeClient } from "../fakeHubSpotClient.ts";
import {
  batchReadAssociations,
  batchUpsert,
  getObjectTypeId,
} from "./hubspotApi.ts";

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

test("finds a custom object's type ID by its name among all schemas", async () => {
  const fake = createFakeClient("source", () => {
    return {
      results: [
        { name: "tires", objectTypeId: "2-11111111" },
        { name: "vehicles", objectTypeId: "2-70142906" },
      ],
    };
  });

  const typeId = await getObjectTypeId(fake.client, "vehicles");

  assert.equal(typeId, "2-70142906");
  assert.equal(fake.calls[0].path, "/crm/v3/schemas");
});
