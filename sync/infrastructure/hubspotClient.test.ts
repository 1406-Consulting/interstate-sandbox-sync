/**
 * Baseline: the client sends the token and returns HubSpot's JSON, and a
 * read-only client (the production one) can never write.
 */
import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { createClient } from "./hubspotClient.ts";

afterEach(() => {
  mock.restoreAll();
});

test("sends the token and returns HubSpot's JSON body", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => {
    return new Response(JSON.stringify({ portalId: 52133352 }), {
      status: 200,
    });
  });
  const client = createClient({
    token: "test-token",
    role: "target",
    allowWrites: false,
  });

  const body = await client.read("GET", "/account-info/v3/details");

  assert.deepEqual(body, { portalId: 52133352 });
  const callArguments = fetchMock.mock.calls[0].arguments;
  const url = callArguments[0] as string;
  const init = callArguments[1] as RequestInit;
  const headers = init.headers as { [name: string]: string };
  assert.equal(url, "https://api.hubapi.com/account-info/v3/details");
  assert.equal(headers.Authorization, "Bearer test-token");
});

test("a read-only client refuses to write, without calling HubSpot", () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => {
    return new Response("{}", { status: 200 });
  });
  const production = createClient({
    token: "test-token",
    role: "source",
    allowWrites: false,
  });

  assert.throws(() => {
    production.write("POST", "/crm/v3/objects/deals/batch/upsert", {});
  }, /read-only/);
  assert.equal(fetchMock.mock.callCount(), 0);
});
