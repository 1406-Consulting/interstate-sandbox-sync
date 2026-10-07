/**
 * Step 1: refuse to run unless the tokens point at the expected portals.
 * This is what stops a swapped or wrong env file from writing to production.
 */
import type { HubSpotClient } from "../../types/hubspotClient.types.ts";
import type { RunOptions } from "../../types/run.types.ts";
import { getPortalId } from "../infrastructure/hubspotApi.ts";
import { findPortalProblem } from "../logic/portalRules.ts";

/** Checks both tokens against the expected portals. Throws on any problem. */
export async function verifyPortals(
  source: HubSpotClient,
  target: HubSpotClient,
  options: RunOptions,
): Promise<{ sourcePortalId: number; targetPortalId: number }> {
  const sourcePortalId = await getPortalId(source);
  const targetPortalId = await getPortalId(target);

  const problem = findPortalProblem(sourcePortalId, targetPortalId, options);
  if (problem !== null) {
    throw new Error(`portal check failed: ${problem}`);
  }
  console.log(
    `[guard] source portal ${sourcePortalId} -> target portal ${targetPortalId}`,
  );
  return { sourcePortalId, targetPortalId };
}
