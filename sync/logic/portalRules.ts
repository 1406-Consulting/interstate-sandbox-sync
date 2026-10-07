/**
 * The rule that keeps production safe: only run when production is the
 * source and the Interstate sandbox is the target.
 */
import type { RunOptions } from "../../types/run.types.ts";

/** Returns a reason to refuse the run, or null when both portals are correct. */
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
