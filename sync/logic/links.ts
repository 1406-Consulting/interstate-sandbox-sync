/**
 * Rules for links between records: which linked records to copy, and how a
 * production link becomes a sandbox link. A link is only recreated when both
 * of its records were copied, using the sandbox's own link type IDs.
 */
import type {
  AssociationCreateInput,
  AssociationLink,
  AssociationSpec,
  BatchAssociationCreateResponse,
  TranslatedLinks,
} from "../../types/association.types.ts";
import type { AssociationType, IdMap } from "../../types/crm.types.ts";

/** The linked record IDs, without repeats, in the order found, capped at `limit`. */
export function collectLinkedIds(
  links: AssociationLink[],
  limit: number,
): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const link of links) {
    if (ids.length >= limit) {
      break;
    }
    if (seen.has(link.toId)) {
      continue;
    }
    seen.add(link.toId);
    ids.push(link.toId);
  }
  return ids;
}

/**
 * Stands in for sandbox IDs during a dry run, when nothing has been written:
 * each production ID maps to itself, so links can still be counted.
 */
export function placeholderIdMap(ids: string[]): IdMap {
  const idMap: IdMap = {};
  for (const id of ids) {
    idMap[id] = id;
  }
  return idMap;
}

/**
 * Finds the sandbox link type matching a production one. HubSpot's built-in
 * types share IDs across portals; custom types are matched by label.
 */
export function matchLinkType(
  sourceType: AssociationType,
  targetTypes: AssociationType[],
): AssociationType | null {
  for (const candidate of targetTypes) {
    if (candidate.category !== sourceType.category) {
      continue;
    }
    if (sourceType.category === "HUBSPOT_DEFINED") {
      if (candidate.typeId === sourceType.typeId) {
        return candidate;
      }
    } else if (candidate.label === sourceType.label) {
      return candidate;
    }
  }
  return null;
}

/** Converts each link type to the sandbox's, skipping types it doesn't have. */
function toSandboxSpecs(
  types: AssociationType[],
  targetTypes: AssociationType[],
): { specs: AssociationSpec[]; unmapped: number } {
  const specs: AssociationSpec[] = [];
  let unmapped = 0;

  for (const type of types) {
    const matched = matchLinkType(type, targetTypes);
    if (matched === null) {
      unmapped = unmapped + 1;
      continue;
    }
    const alreadyAdded = specs.some((spec) => {
      return spec.associationTypeId === matched.typeId;
    });
    if (!alreadyAdded) {
      specs.push({
        associationCategory: matched.category,
        associationTypeId: matched.typeId,
      });
    }
  }
  return { specs, unmapped };
}

/**
 * Turns production links into sandbox create inputs. A link is left out when
 * either record wasn't copied, or when none of its types exist in the sandbox.
 */
export function translateLinks(
  links: AssociationLink[],
  fromIds: IdMap,
  toIds: IdMap,
  targetTypes: AssociationType[],
): TranslatedLinks {
  const translated: TranslatedLinks = {
    inputs: [],
    skippedMissingEnd: 0,
    skippedUnmappedType: 0,
  };

  for (const link of links) {
    const fromTargetId = fromIds[link.fromId];
    const toTargetId = toIds[link.toId];
    const bothCopied = fromTargetId !== undefined && toTargetId !== undefined;
    if (!bothCopied) {
      translated.skippedMissingEnd = translated.skippedMissingEnd + 1;
      continue;
    }

    const converted = toSandboxSpecs(link.types, targetTypes);
    translated.skippedUnmappedType =
      translated.skippedUnmappedType + converted.unmapped;
    if (converted.specs.length === 0) {
      continue;
    }

    const input: AssociationCreateInput = {
      from: { id: fromTargetId },
      to: { id: toTargetId },
      types: converted.specs,
    };
    translated.inputs.push(input);
  }
  return translated;
}

/** Stops the run if HubSpot reported any error while creating links. */
export function assertNoLinkErrors(
  responses: BatchAssociationCreateResponse[],
): void {
  for (const response of responses) {
    const errors = response.errors;
    if (errors !== undefined && errors.length > 0) {
      const messages = errors.map((error) => error.message);
      throw new Error(`HubSpot reported link errors: ${messages.join(" | ")}`);
    }
  }
}
