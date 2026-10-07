/**
 * What an operator needs to trust the upsert step:
 *   1. Running the sync twice never duplicates records in the sandbox.
 *   2. A dry run never writes to the sandbox.
 *
 * The sandbox is replaced by an in-memory fake that behaves like HubSpot's
 * batch upsert: it matches each record on its Excede key, creating it when
 * the key is new and updating it when the key already exists.
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEAL_CONTRACT } from "../../contracts/deal.ts";
import type { PropertyValues } from "../../types/crm.types.ts";
import type {
  HubSpotClient,
  PortalContext,
} from "../../types/hubspotClient.types.ts";
import type {
  BatchUpsertResponse,
  PreparedRecord,
  UpsertInput,
} from "../../types/upsert.types.ts";
import { upsertRecords } from "./upsertRecords.ts";

/** An in-memory sandbox that answers batch upserts like HubSpot does. */
function createFakeSandbox() {
  const sandboxIdByKey: { [key: string]: string } = {};
  let writeCount = 0;
  let nextId = 1;

  /** Handles one batch upsert request. */
  async function write(
    method: string,
    path: string,
    body: unknown,
  ): Promise<any> {
    if (method !== "POST" || path !== "/crm/v3/objects/deals/batch/upsert") {
      throw new Error(`unexpected request: ${method} ${path}`);
    }
    writeCount = writeCount + 1;

    const inputs = (body as { inputs: UpsertInput[] }).inputs;
    const response: BatchUpsertResponse = { results: [] };
    for (const input of inputs) {
      const key = `${input.idProperty}=${input.id}`;
      let sandboxId = sandboxIdByKey[key];
      const isNew = sandboxId === undefined;
      if (isNew) {
        sandboxId = `sandbox-${nextId}`;
        nextId = nextId + 1;
        sandboxIdByKey[key] = sandboxId;
      }
      response.results.push({
        id: sandboxId,
        new: isNew,
        objectWriteTraceId: input.objectWriteTraceId,
      });
    }
    return response;
  }

  /** The upsert step should never need to read. */
  async function read(): Promise<any> {
    throw new Error("unexpected read");
  }

  const client: HubSpotClient = { role: "target", read, write };
  const portal: PortalContext = {
    role: "target",
    portalId: 52133352,
    client,
    vehiclesTypeId: "2-99999999",
  };

  return {
    portal,
    recordCount: () => Object.keys(sandboxIdByKey).length,
    writeCount: () => writeCount,
  };
}

/** Builds a deal ready to write. */
function deal(sourceId: string, properties: PropertyValues): PreparedRecord {
  return { sourceId, properties };
}

/** Two deals keyed on different Excede IDs, as production deals are. */
const DEALS = [
  deal("101", { excede_customer_sales_ts: "TS-1", dealname: "Fleet order" }),
  deal("102", { excede_lease_rental_bill_id: "LB-2", dealname: "Lease bill" }),
];

describe("upsertRecords", () => {
  test("running twice creates each record once, then only updates it", async () => {
    const sandbox = createFakeSandbox();

    const firstRun = await upsertRecords(
      sandbox.portal,
      DEAL_CONTRACT,
      DEALS,
      true,
    );
    const secondRun = await upsertRecords(
      sandbox.portal,
      DEAL_CONTRACT,
      DEALS,
      true,
    );

    assert.equal(firstRun.created, 2);
    assert.equal(secondRun.created, 0);
    assert.equal(secondRun.updated, 2);
    assert.equal(sandbox.recordCount(), 2);
    assert.deepEqual(secondRun.idMap, firstRun.idMap);
  });

  test("a dry run sends nothing to the sandbox", async () => {
    const sandbox = createFakeSandbox();

    const result = await upsertRecords(
      sandbox.portal,
      DEAL_CONTRACT,
      DEALS,
      false,
    );

    assert.equal(sandbox.writeCount(), 0);
    assert.equal(sandbox.recordCount(), 0);
    assert.equal(result.sent, 2);
  });
});
