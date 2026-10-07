/**
 * Baseline: the records linked to the copied deals are read with every
 * property in their contract, and the links are returned for copying later.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { COMPANY_CONTRACT } from "../../contracts/company.ts";
import { DEAL_CONTRACT } from "../../contracts/deal.ts";
import { createFakeClient, fakePortal } from "../fakeHubSpotClient.ts";
import { fetchLinkedRecords } from "./fetchLinkedRecords.ts";

test("reads the companies linked to the given deals, with their links", async () => {
  const production = createFakeClient("source", (call) => {
    if (call.path === "/crm/v4/associations/deals/companies/batch/read") {
      return {
        results: [
          {
            from: { id: "101" },
            to: [{ toObjectId: 9001, associationTypes: [] }],
          },
        ],
      };
    }
    return {
      results: [{ id: "9001", properties: { name: "Acme Trucking" } }],
    };
  });

  const linked = await fetchLinkedRecords(
    fakePortal(production.client),
    DEAL_CONTRACT,
    ["101"],
    COMPANY_CONTRACT,
    5,
  );

  assert.deepEqual(linked.records, [
    { id: "9001", properties: { name: "Acme Trucking" } },
  ]);
  assert.deepEqual(linked.links, [{ fromId: "101", toId: "9001", types: [] }]);
  const read = production.calls[1];
  const body = read.body as { properties: string[] };
  assert.equal(read.path, "/crm/v3/objects/companies/batch/read");
  assert.deepEqual(body.properties, COMPANY_CONTRACT.properties);
});
