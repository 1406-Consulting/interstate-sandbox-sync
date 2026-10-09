/**
 * Raw response bodies from the HubSpot endpoints the sync reads.
 * Type declarations only.
 */
import type { CrmRecord } from "./crm.types.ts";

/** GET /account-info/v3/details */
export interface AccountDetailsResponse {
  portalId: number;
}

/** POST /crm/v3/objects/{type}/search */
export interface SearchResponse {
  results: { id: string }[];
  paging?: { next?: { after: string } };
}

/** POST /crm/v3/objects/{type}/batch/read */
export interface BatchReadResponse {
  results: CrmRecord[];
}

/** GET /crm/v3/schemas: every custom object defined in the portal */
export interface SchemasResponse {
  results: { name: string; objectTypeId: string }[];
}

/** One property definition from GET /crm/v3/properties/{type} */
export interface RawPropertyDefinition {
  name: string;
  type: string;
  calculated?: boolean;
  hasUniqueValue?: boolean;
  referencedObjectType?: string;
  modificationMetadata?: { readOnlyValue?: boolean };
  options?: { value: string }[];
}

/** GET /crm/v3/properties/{type} */
export interface PropertiesResponse {
  results: RawPropertyDefinition[];
}
