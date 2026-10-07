/**
 * Test support: a HubSpot client that never touches the network. It records
 * every call and answers with whatever the test's responder returns.
 */
import type {
  FakeResponder,
  RecordedCall,
} from "../types/fakeHubSpot.types.ts";
import type {
  HubSpotClient,
  PortalContext,
  PortalRole,
} from "../types/hubspotClient.types.ts";

/** Builds a fake client and the list its calls are recorded in. */
export function createFakeClient(
  role: PortalRole,
  respond: FakeResponder,
): { client: HubSpotClient; calls: RecordedCall[] } {
  const calls: RecordedCall[] = [];

  // `any` lets one handler satisfy the client's generic read<T> / write<T>.
  async function handle(call: RecordedCall): Promise<any> {
    calls.push(call);
    return respond(call);
  }

  const client: HubSpotClient = {
    role,
    read: (method, path, body) => {
      return handle({ access: "read", method, path, body });
    },
    write: (method, path, body) => {
      return handle({ access: "write", method, path, body });
    },
  };
  return { client, calls };
}

/** Wraps a client as a portal, using the real portal IDs for each role. */
export function fakePortal(client: HubSpotClient): PortalContext {
  let portalId = 51580259;
  if (client.role === "target") {
    portalId = 52133352;
  }
  return {
    role: client.role,
    portalId,
    client,
    vehiclesTypeId: "2-99999999",
  };
}
