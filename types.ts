/**
 * Shared data shapes for the production → sandbox copy.
 *
 * Every module imports its types from here so the shapes stay in one place.
 * These are type-only declarations; Node strips them at runtime.
 */

/** The six object types this tool copies. */
export type ObjectKind =
  | "deals"
  | "contacts"
  | "companies"
  | "vehicles"
  | "line_items"
  | "products";

/** Which portal a client talks to. Only "target" can ever write. */
export type PortalRole = "source" | "target";

/** A property name mapped to its value, exactly as HubSpot returns it. */
export type PropertyValues = { [propertyName: string]: string | null };

/** One CRM record as read from HubSpot. */
export interface CrmRecord {
  id: string;
  properties: PropertyValues;
}

/** A production record ID mapped to the matching sandbox record ID. */
export type IdMap = { [sourceId: string]: string };

/** How many records of each type to copy. 0 means skip that type. */
export interface TypeLimits {
  deals: number;
  contacts: number;
  companies: number;
  vehicles: number;
  line_items: number;
  products: number;
}

/** Everything the command line controls. */
export interface RunOptions {
  limits: TypeLimits;
  apply: boolean;                   // false = dry run (default)
  sourceEnvPath: string;            // default ../../.env.prod
  targetEnvPath: string;            // default ../../.env.sandbox
  expectedSourcePortalId: number;   // default 51580259
  expectedTargetPortalId: number;   // default 52133352
}

/** The only way the tool talks to HubSpot. */
export interface HubSpotClient {
  role: PortalRole;
  /** Any call that does not change data, including POST search and batch read. */
  read<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T>;
  /** Any call that changes data. Throws unless the client was built with allowWrites. */
  write<T>(method: "POST" | "PATCH" | "PUT", path: string, body?: unknown): Promise<T>;
}

/** One portal's connection plus the IDs that differ per portal. */
export interface PortalContext {
  role: PortalRole;
  portalId: number;
  client: HubSpotClient;
  vehiclesTypeId: string;           // e.g. "2-70142906" in production
}

/** The parts of a HubSpot property definition the tool cares about. */
export interface PropertyDefinition {
  name: string;
  type: string;                     // "string", "enumeration", "number", ...
  calculated: boolean;
  readOnlyValue: boolean;           // from modificationMetadata.readOnlyValue
  hasUniqueValue: boolean;
  referencesOwner: boolean;         // referencedObjectType === "OWNER"
  optionValues: string[];           // empty unless type is "enumeration"
}

/** Why a value was left out of a write. Counted in the run summary. */
export type DropReason =
  | "unknown_option"
  | "unmatched_owner"
  | "unmatched_pipeline"
  | "unmatched_stage";

/** A tally of values left out of writes, per property and reason. */
export interface ValueDrop {
  kind: ObjectKind;
  property: string;
  reason: DropReason;
  count: number;
}

/** One record that HubSpot rejected during an upsert. */
export interface FailedRecord {
  sourceId: string;
  message: string;
}

/** The result of copying one object type. Dry runs fill in the same fields as "would". */
export interface UpsertResult {
  kind: ObjectKind;
  idMap: IdMap;                     // filled for records that exist or were written
  created: number;                  // dry run: would create
  updated: number;                  // dry run: would update
  skippedNoKey: string[];           // production IDs with no key filled in
  failed: FailedRecord[];
  drops: ValueDrop[];
}

/** One HubSpot association type, as the v4 API describes it. */
export interface AssociationType {
  category: "HUBSPOT_DEFINED" | "USER_DEFINED" | "INTEGRATOR_DEFINED";
  typeId: number;
  label: string | null;
}

/** The result of copying the links for one pair of object types. */
export interface AssociationResult {
  from: ObjectKind;
  to: ObjectKind;
  created: number;                  // dry run: would create
  skippedMissingEnd: number;        // one side was not copied
  skippedUnmappedType: number;      // the label does not exist in the sandbox
}

/** Everything one run did (or would do, in a dry run). */
export interface RunSummary {
  mode: "dry-run" | "apply";
  upserts: UpsertResult[];
  associations: AssociationResult[];
}
