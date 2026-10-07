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
  write<T>(method: "POST" | "PATCH" | "PUT", path: string, body?: unknown): Promise<T>;
}

/** One portal's connection plus the IDs that differ per portal. */
export interface PortalContext {
  role: PortalRole;
  portalId: number;
  client: HubSpotClient;
  vehiclesTypeId: string;           // e.g. "2-70142906" in production
}
