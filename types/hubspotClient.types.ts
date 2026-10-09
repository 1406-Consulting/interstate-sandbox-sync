/**
 * How the tool talks to each HubSpot portal. Type declarations only.
 */

/** Which portal a client talks to. Only "target" can ever write. */
export type PortalRole = "source" | "target";

/** The only way the tool talks to HubSpot. */
export interface HubSpotClient {
  role: PortalRole;
  /** Any call that does not change data, including POST search and batch read. */
  read<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T>;
  /** Any call that changes data. Throws unless the client was built with allowWrites. */
  write<T>(
    method: "POST" | "PATCH" | "PUT",
    path: string,
    body?: unknown,
  ): Promise<T>;
}

/** What `createClient` needs to build a client for one portal. */
export interface ClientOptions {
  token: string;
  role: PortalRole;
  allowWrites: boolean; // true only for the sandbox when --apply is passed
}

/** One portal's connection plus the IDs that differ per portal. */
export interface PortalContext {
  role: PortalRole;
  portalId: number;
  client: HubSpotClient;
  vehiclesTypeId: string; // looked up by name at the start of every run: "2-70142906" in production, "2-70546410" in the sandbox
}
