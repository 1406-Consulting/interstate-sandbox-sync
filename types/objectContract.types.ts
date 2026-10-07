/**
 * The shape every object contract follows. Type declarations only.
 * Each object type's record interface lives beside this file
 * (`deal.types.ts`, ...); its `ObjectContract` value lives in `contracts/`.
 */
import type { ObjectKind } from "./crm.types.ts";

/** How a type's records are chosen. */
export type SelectionMode =
  | "anchor" // the N most recently created records (deals only)
  | "linked" // records linked to already-selected records, capped at N
  | "independent"; // the N most recently created records, no links (products)

/** Special value conversions needed because IDs differ between portals. */
export type Remap = "owners" | "pipeline";

/**
 * A link to copy: "from" this type "to" a type copied in the same or an earlier stage.
 * Every label the production link carries is copied (the default unlabeled link plus
 * custom labels such as "vehicle_to_deal"), matched to the sandbox by label name.
 */
export interface LinkContract {
  to: ObjectKind;
}

export interface ObjectContract {
  kind: ObjectKind;
  stage: number; // build and test order, 1 to 6
  selection: SelectionMode;
  /** Records reached through these types' links (only for "linked"). */
  linkedFrom: ObjectKind[];
  /** Unique properties to upsert on, tried in order. The first one filled in wins. */
  keyPriority: string[];
  /** Every property read from production and written to the sandbox. Includes the keys. */
  properties: string[];
  remaps: Remap[];
  links: LinkContract[];
}
