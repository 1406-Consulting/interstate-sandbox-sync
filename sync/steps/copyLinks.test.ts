/**
 * What an operator needs to trust link copying in a run: links are created
 * between the sandbox copies of the records, and a dry run creates none.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { AssociationLink } from "../../types/association.types.ts";
import type { UpsertResult } from "../../types/run.types.ts";
import { createFakeClient, fakePortal } from "../fakeHubSpotClient.ts";
import { copyLinks } from "./copyLinks.ts";

const LINKS: AssociationLink[] = [
  {
    fromId: "101",
    toId: "9001",
    types: [{ category: "HUBSPOT_DEFINED", typeId: 341, label: null }],
  },
];

const DEALS: UpsertResult = {
  kind: "deals",
  sent: 1,
  sentIds: ["101"],
  created: 1,
  updated: 0,
  skippedNoKey: [],
  idMap: { "101": "sandbox-deal-1" },
};

const COMPANIES: UpsertResult = {
  kind: "companies",
  sent: 1,
  sentIds: ["9001"],
  created: 1,
  updated: 0,
  skippedNoKey: [],
  idMap: { "9001": "sandbox-co-1" },
};

/** A sandbox that knows the unlabeled deal -> company link type. */
function createSandbox() {
  return createFakeClient("target", (call) => {
    if (call.access === "read") {
      return {
        results: [{ category: "HUBSPOT_DEFINED", typeId: 341, label: null }],
      };
    }
    return {};
  });
}

test("links the sandbox copies of the deal and company", async () => {
  const sandbox = createSandbox();

  const result = await copyLinks(
    fakePortal(sandbox.client),
    LINKS,
    DEALS,
    COMPANIES,
    true,
  );

  const write = sandbox.calls[1];
  assert.equal(write.access, "write");
  assert.equal(write.path, "/crm/v4/associations/deals/companies/batch/create");
  assert.deepEqual(write.body, {
    inputs: [
      {
        from: { id: "sandbox-deal-1" },
        to: { id: "sandbox-co-1" },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 341 },
        ],
      },
    ],
  });
  assert.equal(result.created, 1);
});

test("a dry run creates no links but reports how many it would", async () => {
  const sandbox = createSandbox();

  const result = await copyLinks(
    fakePortal(sandbox.client),
    LINKS,
    { ...DEALS, idMap: {} }, // a dry run has no sandbox IDs
    { ...COMPANIES, idMap: {} },
    false,
  );

  const writes = sandbox.calls.filter((call) => call.access === "write");
  assert.equal(writes.length, 0);
  assert.equal(result.created, 1);
});
