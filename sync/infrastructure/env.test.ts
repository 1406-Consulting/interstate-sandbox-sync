/** Baseline: env files are read as KEY=value lines. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { parseEnvText } from "./env.ts";

test("reads KEY=value lines, skipping blank lines and comments", () => {
  const text = [
    "# HubSpot sandbox",
    "",
    "HUBSPOT_TOKEN=example-token",
    'QUOTED="with quotes"',
  ].join("\n");

  const values = parseEnvText(text);

  assert.deepEqual(values, {
    HUBSPOT_TOKEN: "example-token",
    QUOTED: "with quotes",
  });
});
