/** Baseline: lists are split into batches of a maximum size, in order. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { chunk } from "./chunk.ts";

test("splits a list into batches of at most the given size, in order", () => {
  const batches = chunk([1, 2, 3, 4, 5], 2);

  assert.deepEqual(batches, [[1, 2], [3, 4], [5]]);
});
