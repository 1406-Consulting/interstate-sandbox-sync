/**
 * Baseline: the records linked to the copied deals are read with every
 * property in their contract, and the links are returned for copying later.
 * Trust: with several sources, a record linked from more than one is read
 * once, and the cap is shared across all sources.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { COMPANY_CONTRACT } from "../../contracts/company.ts";
import { CONTACT_CONTRACT } from "../../contracts/contact.ts";
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
    [{ contract: DEAL_CONTRACT, ids: ["101"] }],
    COMPANY_CONTRACT,
    5,
  );

  assert.deepEqual(linked.records, [
    { id: "9001", properties: { name: "Acme Trucking" } },
  ]);
  assert.deepEqual(linked.linkSets, [
    {
      from: "deals",
      links: [{ fromId: "101", toId: "9001", types: [] }],
    },
  ]);
  const read = production.calls[1];
  const body = read.body as { properties: string[] };
  assert.equal(read.path, "/crm/v3/objects/companies/batch/read");
  assert.deepEqual(body.properties, COMPANY_CONTRACT.properties);
});

test("contacts linked from deals and companies share one cap and are read once", async () => {
  const production = createFakeClient("source", (call) => {
    if (call.path === "/crm/v4/associations/deals/contacts/batch/read") {
      return {
        results: [
          {
            from: { id: "101" },
            to: [
              { toObjectId: 7001, associationTypes: [] },
              { toObjectId: 7002, associationTypes: [] },
            ],
          },
        ],
      };
    }
    if (call.path === "/crm/v4/associations/companies/contacts/batch/read") {
      return {
        results: [
          {
            from: { id: "201" },
            to: [
              { toObjectId: 7002, associationTypes: [] },
              { toObjectId: 7003, associationTypes: [] },
              { toObjectId: 7004, associationTypes: [] },
            ],
          },
        ],
      };
    }
    return { results: [] };
  });

  const linked = await fetchLinkedRecords(
    fakePortal(production.client),
    [
      { contract: DEAL_CONTRACT, ids: ["101"] },
      { contract: COMPANY_CONTRACT, ids: ["201"] },
    ],
    CONTACT_CONTRACT,
    3,
  );

  // Deals' contacts come first, the shared contact 7002 appears once, and
  // the cap of 3 leaves 7004 out.
  const recordReads = production.calls.filter((call) => {
    return call.path === "/crm/v3/objects/contacts/batch/read";
  });
  assert.equal(recordReads.length, 1);
  const body = recordReads[0].body as { inputs: { id: string }[] };
  assert.deepEqual(body.inputs, [
    { id: "7001" },
    { id: "7002" },
    { id: "7003" },
  ]);

  // Every source keeps all of its own links, so each can be recreated.
  assert.equal(linked.linkSets.length, 2);
  assert.equal(linked.linkSets[0].from, "deals");
  assert.equal(linked.linkSets[0].links.length, 2);
  assert.equal(linked.linkSets[1].from, "companies");
  assert.equal(linked.linkSets[1].links.length, 3);
});
