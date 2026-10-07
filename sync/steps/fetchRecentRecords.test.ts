/**
 * Baseline: the newest production records are found by search, then read
 * with every property in the object's contract.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { DEAL_CONTRACT } from "../../contracts/deal.ts";
import { createFakeClient, fakePortal } from "../fakeHubSpotClient.ts";
import { fetchRecentRecords } from "./fetchRecentRecords.ts";

test("finds the newest records, then reads them with the contract's properties", async () => {
  const production = createFakeClient("source", (call) => {
    if (call.path === "/crm/v3/objects/deals/search") {
      return { results: [{ id: "101" }, { id: "102" }] };
    }
    return {
      results: [
        { id: "101", properties: { dealname: "Newest" } },
        { id: "102", properties: { dealname: "Second newest" } },
      ],
    };
  });

  const records = await fetchRecentRecords(
    fakePortal(production.client),
    DEAL_CONTRACT,
    2,
  );

  assert.deepEqual(records, [
    { id: "101", properties: { dealname: "Newest" } },
    { id: "102", properties: { dealname: "Second newest" } },
  ]);
  const read = production.calls[1];
  const body = read.body as { properties: string[] };
  assert.equal(read.path, "/crm/v3/objects/deals/batch/read");
  assert.deepEqual(body.properties, DEAL_CONTRACT.properties);
});
