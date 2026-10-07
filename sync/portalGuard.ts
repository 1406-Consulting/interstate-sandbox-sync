/**
 * Refuses to run unless the tokens point at the expected portals: production
 * as the source and the Interstate sandbox as the target. This is what stops
 * a swapped or wrong env file from writing to production.
 */
import type { HubSpotClient } from "../types/hubspotClient.types.ts";
import type { RunOptions } from "../types/run.types.ts";

/**
 * Returns a reason to refuse the run, or null when both portals are correct.
 * Kept separate from the network call so the rule can be tested directly.
 */
export function findPortalProblem(
  sourcePortalId: number,
  targetPortalId: number,
  options: RunOptions,
): string | null {
  if (sourcePortalId === targetPortalId) {
    return `source and target are the same portal (${sourcePortalId})`;
  }
  if (sourcePortalId !== options.expectedSourcePortalId) {
    return `source token is for portal ${sourcePortalId}, expected ${options.expectedSourcePortalId}`;
  }
  if (targetPortalId !== options.expectedTargetPortalId) {
    return `target token is for portal ${targetPortalId}, expected ${options.expectedTargetPortalId}`;
  }
  return null;
}

/** Looks up which portal a token belongs to. */
async function fetchPortalId(client: HubSpotClient): Promise<number> {
  const details = await client.read<{ portalId: number }>(
    "GET",
    "/account-info/v3/details",
  );
  return details.portalId;
}

/** Checks both tokens against the expected portals. Throws on any problem. */
export async function verifyPortals(
  source: HubSpotClient,
  target: HubSpotClient,
  options: RunOptions,
): Promise<{ sourcePortalId: number; targetPortalId: number }> {
  const sourcePortalId = await fetchPortalId(source);
  const targetPortalId = await fetchPortalId(target);

  const problem = findPortalProblem(sourcePortalId, targetPortalId, options);
  if (problem !== null) {
    throw new Error(`portal check failed: ${problem}`);
  }
  console.log(
    `[guard] source portal ${sourcePortalId} -> target portal ${targetPortalId}`,
  );
  return { sourcePortalId, targetPortalId };
}
