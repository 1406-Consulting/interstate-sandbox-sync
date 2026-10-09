/**
 * Baseline: each portal's vehicles type ID is looked up in that portal, since
 * the ID differs between production and the sandbox. Trust: a portal with no
 * vehicles object stops the run, so no URL is ever built with an empty ID.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { createFakeClient } from "../fakeHubSpotClient.ts";
import { findVehiclesTypes } from "./findVehiclesTypes.ts";

test("gives each portal its own vehicles type ID", async () => {
  const production = createFakeClient("source", () => {
    return { results: [{ name: "vehicles", objectTypeId: "2-70142906" }] };
  });
  const sandbox = createFakeClient("target", () => {
    return { results: [{ name: "vehicles", objectTypeId: "2-70546410" }] };
  });

  const types = await findVehiclesTypes(production.client, sandbox.client);

  assert.deepEqual(types, {
    sourceTypeId: "2-70142906",
    targetTypeId: "2-70546410",
  });
});

test("stops the run when a portal has no vehicles object", async () => {
  const production = createFakeClient("source", () => {
    return { results: [{ name: "vehicles", objectTypeId: "2-70142906" }] };
  });
  const sandboxWithoutVehicles = createFakeClient("target", () => {
    return { results: [{ name: "tires", objectTypeId: "2-11111111" }] };
  });

  await assert.rejects(
    findVehiclesTypes(production.client, sandboxWithoutVehicles.client),
    /no custom object named vehicles/,
  );
});
