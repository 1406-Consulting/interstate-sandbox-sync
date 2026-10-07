/**
 * What an operator needs to trust the portal check: the run refuses to start
 * unless production is the source and the Interstate sandbox is the target.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { RunOptions } from "../../types/run.types.ts";
import { findPortalProblem } from "./portalRules.ts";

const PRODUCTION = 51580259;
const SANDBOX = 52133352;

const options: RunOptions = {
  limits: {
    deals: 1,
    contacts: 0,
    companies: 0,
    vehicles: 0,
    line_items: 0,
    products: 0,
  },
  apply: true,
  sourceEnvPath: "unused",
  targetEnvPath: "unused",
  expectedSourcePortalId: PRODUCTION,
  expectedTargetPortalId: SANDBOX,
};

test("only runs when production is the source and the sandbox is the target", () => {
  const correct = findPortalProblem(PRODUCTION, SANDBOX, options);
  const targetIsProduction = findPortalProblem(PRODUCTION, PRODUCTION, options);
  const swapped = findPortalProblem(SANDBOX, PRODUCTION, options);

  assert.equal(correct, null);
  assert.notEqual(targetIsProduction, null);
  assert.notEqual(swapped, null);
});
