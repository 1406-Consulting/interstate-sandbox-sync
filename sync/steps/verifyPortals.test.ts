/**
 * Baseline: the run continues only when the tokens belong to production
 * (source) and the Interstate sandbox (target).
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { RunOptions } from "../../types/run.types.ts";
import { createFakeClient } from "../fakeHubSpotClient.ts";
import { verifyPortals } from "./verifyPortals.ts";

const options: RunOptions = {
  limits: {
    deals: 1,
    contacts: 0,
    companies: 0,
    vehicles: 0,
    line_items: 0,
    products: 0,
  },
  apply: false,
  sourceEnvPath: "unused",
  targetEnvPath: "unused",
  expectedSourcePortalId: 51580259,
  expectedTargetPortalId: 52133352,
};

test("passes for production -> sandbox, refuses a production target", async () => {
  const production = createFakeClient("source", () => {
    return { portalId: 51580259 };
  });
  const sandbox = createFakeClient("target", () => {
    return { portalId: 52133352 };
  });

  const portals = await verifyPortals(
    production.client,
    sandbox.client,
    options,
  );

  assert.deepEqual(portals, {
    sourcePortalId: 51580259,
    targetPortalId: 52133352,
  });
  await assert.rejects(
    verifyPortals(production.client, production.client, options),
    /portal check failed/,
  );
});
