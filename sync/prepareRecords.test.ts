/**
 * What an operator needs to trust the prepare step: the sandbox only receives
 * values it can accept, an empty production value never blanks out data
 * already in the sandbox, and every record is stamped with when it was synced.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { CrmRecord } from "../types/crm.types.ts";
import { prepareRecords } from "./prepareRecords.ts";

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

  const before = Date.now();
  const prepared = prepareRecords(production, sandboxWritable);
  const after = Date.now();

  const copied = { ...prepared[0].properties };
  const stamp = copied.prod_sync_date;
  delete copied.prod_sync_date;

  assert.equal(prepared[0].sourceId, "101");
  assert.deepEqual(copied, {
    excede_lease_rental_bill_id: "LB-1",
    dealname: "March lease bill",
  });

  const syncedAt = Date.parse(String(stamp));
  assert.ok(
    syncedAt >= before && syncedAt <= after,
    "stamped with the run time",
  );
});
