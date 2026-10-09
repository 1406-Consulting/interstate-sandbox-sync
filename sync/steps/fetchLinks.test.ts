/**
 * Baseline: the production links from line items to vehicles are read from
 * the line items' own URL, using the portal's vehicles type ID.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { LINE_ITEM_CONTRACT } from "../../contracts/lineItem.ts";
import { VEHICLE_CONTRACT } from "../../contracts/vehicle.ts";
import { createFakeClient, fakePortal } from "../fakeHubSpotClient.ts";
import { fetchLinks } from "./fetchLinks.ts";

test("reads the links from line items to vehicles", async () => {
  const production = createFakeClient("source", () => {
    return {
      results: [
        {
          from: { id: "501" },
          to: [{ toObjectId: 7001, associationTypes: [] }],
        },
      ],
    };
  });

  const links = await fetchLinks(
    fakePortal(production.client),
    LINE_ITEM_CONTRACT,
    ["501"],
    VEHICLE_CONTRACT,
  );

  assert.equal(
    production.calls[0].path,
    "/crm/v4/associations/line_items/2-99999999/batch/read",
  );
  assert.deepEqual(links, [{ fromId: "501", toId: "7001", types: [] }]);
});
