/**
 * Step 1b: look up the vehicles custom object's type ID in each portal. The
 * ID differs between production and the sandbox, and it goes into every
 * vehicles URL, so a portal without the object stops the run here.
 */
import type { HubSpotClient } from "../../types/hubspotClient.types.ts";
import { getObjectTypeId } from "../infrastructure/hubspotApi.ts";

/** Finds the vehicles type ID in both portals. Throws if either has none. */
export async function findVehiclesTypes(
  source: HubSpotClient,
  target: HubSpotClient,
): Promise<{ sourceTypeId: string; targetTypeId: string }> {
  const sourceTypeId = await getObjectTypeId(source, "vehicles");
  const targetTypeId = await getObjectTypeId(target, "vehicles");

  console.log(`[guard] vehicles type ${sourceTypeId} -> ${targetTypeId}`);
  return { sourceTypeId, targetTypeId };
}
