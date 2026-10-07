/**
 * Rules every object contract must follow. These guard the stage order:
 * a stage may only select from, or link to, types copied before or with it.
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { ALL_CONTRACTS } from "./objectContracts.ts";
import type { ObjectContract } from "./objectContracts.ts";
import type { ObjectKind } from "./types.ts";

/** Finds the stage number a type is copied in. */
function stageOf(kind: ObjectKind): number {
  const contract = ALL_CONTRACTS.find((candidate) => candidate.kind === kind);
  if (contract === undefined) {
    throw new Error(`no contract for ${kind}`);
  }
  return contract.stage;
}

describe("contract list", () => {
  test("covers all six object types exactly once", () => {
    const kinds = ALL_CONTRACTS.map((contract) => contract.kind);
    const expected: ObjectKind[] = ["deals", "contacts", "companies", "vehicles", "line_items", "products"];
    assert.deepEqual([...kinds].sort(), [...expected].sort());
  });

  test("runs stages 1 to 6 in order", () => {
    const stages = ALL_CONTRACTS.map((contract) => contract.stage);
    assert.deepEqual(stages, [1, 2, 3, 4, 5, 6]);
  });
});

describe("each contract", () => {
  for (const contract of ALL_CONTRACTS) {
    describe(contract.kind, () => {
      test("has at least one upsert key and no duplicate keys", () => {
        assert.ok(contract.keyPriority.length > 0);
        const unique = new Set(contract.keyPriority);
        assert.equal(unique.size, contract.keyPriority.length);
      });

      test("only links to types copied in the same or an earlier stage", () => {
        for (const link of contract.links) {
          assert.ok(stageOf(link.to) <= contract.stage, `${contract.kind} links to ${link.to}`);
        }
      });

      test("is only selected through types copied in an earlier stage", () => {
        for (const kind of contract.linkedFrom) {
          assert.ok(stageOf(kind) < contract.stage, `${contract.kind} selected from ${kind}`);
        }
      });

      test("lists linkedFrom types only when selection is 'linked'", () => {
        const isLinked = contract.selection === "linked";
        const hasSources = contract.linkedFrom.length > 0;
        assert.equal(hasSources, isLinked);
      });
    });
  }
});

describe("deals", () => {
  test("is the only anchor and the only type with pipeline remapping", () => {
    const anchors: ObjectContract[] = ALL_CONTRACTS.filter((contract) => contract.selection === "anchor");
    const pipelineTypes = ALL_CONTRACTS.filter((contract) => contract.remaps.includes("pipeline"));
    assert.deepEqual(anchors.map((contract) => contract.kind), ["deals"]);
    assert.deepEqual(pipelineTypes.map((contract) => contract.kind), ["deals"]);
  });
});
