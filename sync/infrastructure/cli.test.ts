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
