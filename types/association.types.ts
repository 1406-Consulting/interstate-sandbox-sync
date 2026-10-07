/**
 * Links between records (HubSpot "associations"): production links read
 * through the v4 API, and the inputs used to recreate them in the sandbox.
 * Type declarations only.
 */
import type { AssociationType } from "./crm.types.ts";

/** One production link: a record linked to another, with every link type it carries. */
export interface AssociationLink {
  fromId: string;
  toId: string;
  types: AssociationType[];
}

/** One result from POST /crm/v4/associations/{from}/{to}/batch/read */
export interface RawAssociationResult {
  from: { id: string };
  to: { toObjectId: number; associationTypes: AssociationType[] }[];
}

/** POST /crm/v4/associations/{from}/{to}/batch/read */
export interface BatchAssociationReadResponse {
  results: RawAssociationResult[];
}

/** GET /crm/v4/associations/{from}/{to}/labels */
export interface AssociationTypesResponse {
  results: AssociationType[];
}

/** One link type in a create request. */
export interface AssociationSpec {
  associationCategory: AssociationType["category"];
  associationTypeId: number;
}

/** One input in POST /crm/v4/associations/{from}/{to}/batch/create */
export interface AssociationCreateInput {
  from: { id: string };
  to: { id: string };
  types: AssociationSpec[];
}

/** POST /crm/v4/associations/{from}/{to}/batch/create (HTTP 200 or 207) */
export interface BatchAssociationCreateResponse {
  errors?: { message: string }[];
}

/** Production links turned into sandbox create inputs, plus what was left out. */
export interface TranslatedLinks {
  inputs: AssociationCreateInput[];
  skippedMissingEnd: number; // one side was not copied
  skippedUnmappedType: number; // the link type does not exist in the sandbox
}
