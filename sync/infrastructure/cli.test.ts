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

test("--contacts sets the contact limit and defaults to 0", () => {
  const withContacts = parseRunOptions(["--deals", "3", "--contacts", "5"]);
  const without = parseRunOptions(["--deals", "3"]);

  assert.equal(withContacts.limits.contacts, 5);
  assert.equal(without.limits.contacts, 0);
});
