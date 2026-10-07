/**
 * What an operator needs to trust the prepare step: the sandbox only receives
 * values it can accept, an empty production value never blanks out data
 * already in the sandbox, and every record is stamped with when it was synced.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { CrmRecord, PropertyDefinition } from "../../types/crm.types.ts";
import { prepareRecords, writablePropertyNames } from "./prepareRecords.ts";

/** Builds a property definition with only the fields that matter here. */
function definition(
  name: string,
  readOnlyValue: boolean,
  calculated: boolean,
): PropertyDefinition {
  return {
    name,
    type: "string",
    calculated,
    readOnlyValue,
    hasUniqueValue: false,
    referencesOwner: false,
    optionValues: [],
  };
}

test("treats a property as writable unless it is read-only or calculated", () => {
  const definitions = [
    definition("dealname", false, false),
    definition("hs_object_id", true, false),
    definition("hs_deal_score", false, true),
  ];

  const writable = writablePropertyNames(definitions);

  assert.deepEqual([...writable], ["dealname"]);
});

test("sends only filled-in, writable values, stamped with the sync time", () => {
  const production: CrmRecord[] = [
    {
      id: "101",
      properties: {
        excede_lease_rental_bill_id: "LB-1", // filled, writable -> sent
        dealname: "March lease bill", // filled, writable -> sent
        amount: "", // empty -> left out
        closedate: null, // empty -> left out
        legacy_field: "old value", // sandbox can't write it -> left out
      },
    },
  ];
  const sandboxWritable = new Set([
    "excede_lease_rental_bill_id",
    "dealname",
    "amount",
    "closedate",
  ]);
  const syncedAt = new Date("2026-10-07T19:00:00.000Z");

  const prepared = prepareRecords(production, sandboxWritable, syncedAt);

  assert.deepEqual(prepared, [
    {
      sourceId: "101",
      properties: {
        excede_lease_rental_bill_id: "LB-1",
        dealname: "March lease bill",
        prod_sync_date: "2026-10-07T19:00:00.000Z",
      },
    },
  ]);
});
