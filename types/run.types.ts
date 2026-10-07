/**
 * Run inputs and results: command-line options, per-type outcomes and the
 * end-of-run summary. Type declarations only.
 */
import type { IdMap, ObjectKind } from "./crm.types.ts";

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
