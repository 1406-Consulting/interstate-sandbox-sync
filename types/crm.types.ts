/**
 * HubSpot CRM data shapes: object kinds, records, property definitions and
 * association types. Type declarations only.
 */

/** The six object types this tool copies. */
export type ObjectKind =
  | "deals"
  | "contacts"
  | "companies"
  | "vehicles"
  | "line_items"
  | "products";

/** A property name mapped to its value, exactly as HubSpot returns it. */
export type PropertyValues = { [propertyName: string]: string | null };

/** One CRM record as read from HubSpot. */
export interface CrmRecord {
  id: string;
  properties: PropertyValues;
}

/** A production record ID mapped to the matching sandbox record ID. */
export type IdMap = { [sourceId: string]: string };

/** The parts of a HubSpot property definition the tool cares about. */
export interface PropertyDefinition {
  name: string;
  type: string; // "string", "enumeration", "number", ...
  calculated: boolean;
  readOnlyValue: boolean; // from modificationMetadata.readOnlyValue
  hasUniqueValue: boolean;
  referencesOwner: boolean; // referencedObjectType === "OWNER"
  optionValues: string[]; // empty unless type is "enumeration"
}

/** One HubSpot association type, as the v4 API describes it. */
export interface AssociationType {
  category: "HUBSPOT_DEFINED" | "USER_DEFINED" | "INTEGRATOR_DEFINED";
  typeId: number;
  label: string | null;
}

export type PrimaryExcedeProperty = string;
