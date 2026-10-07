/**
 * Reads the production records linked to already-selected records, for
 * example the companies linked to the copied deals, or the contacts linked
 * to the copied deals and companies. Returns the links too, so they can be
 * recreated in the sandbox without reading them again.
 */
import type {
  AssociationLink,
  LinkSet,
  LinkSource,
} from "../../types/association.types.ts";
import type { CrmRecord } from "../../types/crm.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { ObjectContract } from "../../types/objectContract.types.ts";
import {
  batchReadAssociations,
  batchReadRecords,
  objectPath,
} from "../infrastructure/hubspotApi.ts";
import { collectLinkedIds } from "../logic/links.ts";

/** Reads the links from one earlier type's records to the type being fetched. */
async function readLinkSet(
  source: PortalContext,
  fromSource: LinkSource,
  toContract: ObjectContract,
): Promise<LinkSet> {
  const fromKind = fromSource.contract.kind;
  const fromPath = objectPath(fromKind, source);
  const toPath = objectPath(toContract.kind, source);
  const links = await batchReadAssociations(
    source.client,
    fromPath,
    toPath,
    fromSource.ids,
  );
  console.log(
    `[${toContract.kind}] read ${links.length} links from ${fromSource.ids.length} ${fromKind} in production`,
  );
  return { from: fromKind, links };
}

/**
 * Reads links from every source in order, then up to `limit` of the linked
 * records. The limit is shared across sources and a record linked from more
 * than one source is read once.
 */
export async function fetchLinkedRecords(
  source: PortalContext,
  fromSources: LinkSource[],
  toContract: ObjectContract,
  limit: number,
): Promise<{ records: CrmRecord[]; linkSets: LinkSet[] }> {
  const linkSets: LinkSet[] = [];
  const allLinks: AssociationLink[] = [];
  for (const fromSource of fromSources) {
    const linkSet = await readLinkSet(source, fromSource, toContract);
    linkSets.push(linkSet);
    allLinks.push(...linkSet.links);
  }

  const linkedIds = collectLinkedIds(allLinks, limit);
  console.log(`[${toContract.kind}] selected ${linkedIds.length} to copy`);

  const toPath = objectPath(toContract.kind, source);
  const records = await batchReadRecords(
    source.client,
    toPath,
    linkedIds,
    toContract.properties,
  );
  return { records, linkSets };
}
