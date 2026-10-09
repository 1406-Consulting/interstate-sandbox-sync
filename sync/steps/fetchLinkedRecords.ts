/**
 * Reads the production records linked to already-selected records, for
 * example the companies linked to the copied deals. Returns the links too,
 * so they can be recreated in the sandbox without reading them again.
 */
import type { AssociationLink } from "../../types/association.types.ts";
import type { CrmRecord } from "../../types/crm.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import { batchReadRecords, objectPath } from "../infrastructure/hubspotApi.ts";
import { collectLinkedIds } from "../logic/links.ts";
import { fetchLinks } from "./fetchLinks.ts";

/** Reads links from `fromIds`, then up to `limit` of the linked records. */
export async function fetchLinkedRecords(
  source: PortalContext,
  fromContract: ObjectContract,
  fromIds: string[],
  toContract: ObjectContract,
  limit: number,
): Promise<{ records: CrmRecord[]; links: AssociationLink[] }> {
  const toPath = objectPath(toContract.kind, source);

  const links = await fetchLinks(source, fromContract, fromIds, toContract);
  const linkedIds = collectLinkedIds(links, limit);
  console.log(
    `[${toContract.kind}] found ${linkedIds.length} linked to ${fromIds.length} ${fromContract.kind} in production`,
  );

  const records = await batchReadRecords(
    source.client,
    toPath,
    linkedIds,
    toContract.properties,
  );
  return { records, links };
}
