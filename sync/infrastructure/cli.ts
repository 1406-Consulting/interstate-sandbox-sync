/**
 * Turns command-line flags into run options.
 *
 *   node main.ts --deals 3            dry run: shows what would be sent
 *   node main.ts --deals 3 --apply    writes to the sandbox
 */
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import type { RunOptions } from "../../types/run.types.ts";

const PRODUCTION_PORTAL_ID = 51580259;
const SANDBOX_PORTAL_ID = 52133352;

/** The env files live in the interstate/ workspace folder, four levels up. */
const DEFAULT_SOURCE_ENV = fileURLToPath(
  new URL("../../../../.env.prod", import.meta.url),
);
const DEFAULT_TARGET_ENV = fileURLToPath(
  new URL("../../../../.env.sandbox", import.meta.url),
);

/** Reads a whole-number flag of at least 1. */
function readCount(flag: string, raw: string): number {
  const count = Number(raw);
  const isValid = Number.isInteger(count) && count >= 1;
  if (!isValid) {
    throw new Error(`--${flag} must be a whole number of at least 1`);
  }
  return count;
}

export function parseRunOptions(argv: string[]): RunOptions {
  const parsed = parseArgs({
    args: argv,
    options: {
      deals: { type: "string" },
      apply: { type: "boolean", default: false },
      "source-env": { type: "string", default: DEFAULT_SOURCE_ENV },
      "target-env": { type: "string", default: DEFAULT_TARGET_ENV },
    },
  });

  const rawDeals = parsed.values.deals;
  if (rawDeals === undefined) {
    throw new Error("--deals is required, e.g. --deals 3");
  }
  const deals = readCount("deals", rawDeals);

  return {
    limits: {
      deals,
      contacts: 0,
      companies: 0,
      vehicles: 0,
      line_items: 0,
      products: 0,
    },
    apply: parsed.values.apply,
    sourceEnvPath: parsed.values["source-env"],
    targetEnvPath: parsed.values["target-env"],
    expectedSourcePortalId: PRODUCTION_PORTAL_ID,
    expectedTargetPortalId: SANDBOX_PORTAL_ID,
  };
}
