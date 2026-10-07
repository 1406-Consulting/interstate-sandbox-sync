/**
 * Baseline: each record is keyed on its first filled-in Excede ID, and a
 * record with no Excede ID is set aside instead of being sent.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { PreparedRecord } from "../../types/upsert.types.ts";
import { buildInputs } from "./upsertKeys.ts";

test("keys each record on its first filled-in Excede ID", () => {
  const keyPriority = [
    "excede_customer_sales_ts",
    "excede_lease_rental_bill_id",
  ];
  const records: PreparedRecord[] = [
    {
      sourceId: "101",
      properties: { excede_lease_rental_bill_id: "LB-1", dealname: "Lease" },
    },
    { sourceId: "102", properties: { dealname: "No Excede ID" } },
  ];

  const built = buildInputs(records, keyPriority);

  assert.deepEqual(built.inputs, [
    {
      idProperty: "excede_lease_rental_bill_id",
      id: "LB-1",
      properties: { excede_lease_rental_bill_id: "LB-1", dealname: "Lease" },
      objectWriteTraceId: "101",
    },
  ]);
  assert.deepEqual(built.skippedNoKey, ["102"]);
});
