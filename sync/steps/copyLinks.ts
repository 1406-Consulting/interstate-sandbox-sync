/**
 * Recreates production links in the sandbox between records that were both
 * copied, using the sandbox's own link type IDs.
 */
import type { AssociationLink } from "../../types/association.types.ts";
import type { IdMap, ObjectKind } from "../../types/crm.types.ts";
import type { PortalContext } from "../../types/hubspotClient.types.ts";
import type { AssociationResult, UpsertResult } from "../../types/run.types.ts";
import {
  batchCreateAssociations,
  getAssociationTypes,
  objectPath,
} from "../infrastructure/hubspotApi.ts";
import {
  assertNoLinkErrors,
  placeholderIdMap,
  translateLinks,
} from "../logic/links.ts";

/**
 * The production -> sandbox ID map for one side of the links. A dry run has
 * no sandbox IDs yet, so it uses the IDs of the records it would have sent.
 */
function idsFor(result: UpsertResult, apply: boolean): IdMap {
  if (apply) {
    return result.idMap;
  }
  return placeholderIdMap(result.sentIds);
}

/**
 * Creates the links from `fromResult`'s records to `toResult`'s records.
 * A dry run reads the sandbox's link types but creates nothing.
 */
export async function copyLinks(
  target: PortalContext,
  links: AssociationLink[],
  fromResult: UpsertResult,
  toResult: UpsertResult,
  apply: boolean,
): Promise<AssociationResult> {
  const from: ObjectKind = fromResult.kind;
  const to: ObjectKind = toResult.kind;
  const fromPath = objectPath(from, target);
  const toPath = objectPath(to, target);

  const targetTypes = await getAssociationTypes(
    target.client,
    fromPath,
    toPath,
  );
  const translated = translateLinks(
    links,
    idsFor(fromResult, apply),
    idsFor(toResult, apply),
    targetTypes,
  );
  const result: AssociationResult = {
    from,
    to,
    created: translated.inputs.length,
    skippedMissingEnd: translated.skippedMissingEnd,
    skippedUnmappedType: translated.skippedUnmappedType,
  };

  if (!apply) {
    console.log(
      `[links] dry run: would link ${result.created} ${from} -> ${to}`,
    );
    return result;
  }

  const responses = await batchCreateAssociations(
    target.client,
    fromPath,
    toPath,
    translated.inputs,
  );
  assertNoLinkErrors(responses);
  console.log(`[links] linked ${result.created} ${from} -> ${to}`);
  return result;
}
