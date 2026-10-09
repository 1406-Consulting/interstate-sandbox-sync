/** Baseline: flags become run options, and writing is off unless asked for. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { parseRunOptions } from "./cli.ts";

test("--deals sets the count; only --apply turns on writing", () => {
  const dryRun = parseRunOptions(["--deals", "3"]);
  const applied = parseRunOptions(["--deals", "3", "--apply"]);

  assert.equal(dryRun.limits.deals, 3);
  assert.equal(dryRun.apply, false);
  assert.equal(applied.apply, true);
});

/** --line-items and --products set their limits and default to 0 (skipped). */
test("--line-items and --products set their limits and default to 0", () => {
  const defaults = parseRunOptions(["--deals", "3"]);
  const withLimits = parseRunOptions([
    "--deals",
    "3",
    "--line-items",
    "5",
    "--products",
    "7",
  ]);

  assert.equal(defaults.limits.line_items, 0);
  assert.equal(defaults.limits.products, 0);
  assert.equal(withLimits.limits.line_items, 5);
  assert.equal(withLimits.limits.products, 7);
});

/** --vehicles sets its limit and defaults to 0 (skipped). */
test("--vehicles sets its limit and defaults to 0", () => {
  const defaults = parseRunOptions(["--deals", "3"]);
  const withLimit = parseRunOptions(["--deals", "3", "--vehicles", "3"]);

  assert.equal(defaults.limits.vehicles, 0);
  assert.equal(withLimit.limits.vehicles, 3);
});
