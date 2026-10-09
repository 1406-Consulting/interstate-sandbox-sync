/**
 * Reads the production links from some records to one other object type,
 * without reading the linked records themselves.
 */
import type { AssociationLink } from "../../types/association.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import {
  batchReadAssociations,
  objectPath,
} from "../infrastructure/hubspotApi.ts";

/** Reads every link from `fromIds` to records of `toContract`'s type. */
export async function fetchLinks(
  source: PortalContext,
  fromContract: ObjectContract,
  fromIds: string[],
  toContract: ObjectContract,
): Promise<AssociationLink[]> {
  const fromPath = objectPath(fromContract.kind, source);
  const toPath = objectPath(toContract.kind, source);

  const links = await batchReadAssociations(
    source.client,
    fromPath,
    toPath,
    fromIds,
  );
  console.log(
    `[links] read ${links.length} ${fromContract.kind} -> ${toContract.kind} in production`,
  );
  return links;
}
