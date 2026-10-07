/**
 * Turns an object kind into the name HubSpot's CRM URLs expect.
 */
import type { ObjectKind } from "../types/crm.types.ts";
import type { PortalContext } from "../types/hubspotClient.types.ts";

/**
 * Returns the object type segment for `/crm/v3/objects/{segment}` URLs.
 * Standard objects use their kind ("deals"); vehicles use the portal's own
 * custom object type ID, because that ID differs between portals.
 */
export function objectPath(kind: ObjectKind, portal: PortalContext): string {
  if (kind === "vehicles") {
    return portal.vehiclesTypeId;
  }
  return kind;
}
