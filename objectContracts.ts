/**
 * One contract per object type: how its records are chosen, which unique
 * property they are upserted on, which values need remapping, and which
 * links to copy.
 *
 * Key lists are production's unique (`hasUniqueValue`) properties, ordered by
 * how many production records carry each one (checked 2026-10-07).
 */
import type { ObjectKind } from "./types.ts";

/** How a type's records are chosen. */
export type SelectionMode =
  | "anchor"        // the N most recently created records (deals only)
  | "linked"        // records linked to already-selected records, capped at N
  | "independent";  // the N most recently created records, no links (products)

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
  stage: number;                    // build and test order, 1 to 6
  selection: SelectionMode;
  /** Records reached through these types' links (only for "linked"). */
  linkedFrom: ObjectKind[];
  /** Unique properties to upsert on, tried in order. The first one filled in wins. */
  keyPriority: string[];
  remaps: Remap[];
  links: LinkContract[];
}

export const DEALS: ObjectContract = {
  kind: "deals",
  stage: 1,
  selection: "anchor",
  linkedFrom: [],
  keyPriority: [
    "excede_customer_sales_ts",
    "excede_vehicle_sale_multiple_id",
    "excede_lease_rental_bill_id",
    "excede_part_order_id",
    "excede_service_order_header_id",
    "excede_vehicle_sale_header_id",
    "excede_vehicle_sale_lease_id",
    "excede_lease_rental_contract_id",
  ],
  remaps: ["owners", "pipeline"],
  links: [],
};

export const CONTACTS: ObjectContract = {
  kind: "contacts",
  stage: 2,
  selection: "linked",
  linkedFrom: ["deals"],
  keyPriority: ["excede_customer_contact_id", "email"],
  remaps: ["owners"],
  links: [{ to: "deals" }],
};

export const COMPANIES: ObjectContract = {
  kind: "companies",
  stage: 3,
  selection: "linked",
  linkedFrom: ["deals", "contacts"],
  keyPriority: ["excede_customer_id"],
  remaps: ["owners"],
  links: [
    { to: "deals" },
    { to: "contacts" },
  ],
};

export const VEHICLES: ObjectContract = {
  kind: "vehicles",
  stage: 4,
  selection: "linked",
  linkedFrom: ["deals", "companies", "contacts"],
  keyPriority: ["excede_vehicle_id"],
  remaps: ["owners"],
  links: [
    { to: "deals" },
    { to: "companies" },
    { to: "contacts" },
  ],
};

export const LINE_ITEMS: ObjectContract = {
  kind: "line_items",
  stage: 5,
  selection: "linked",
  linkedFrom: ["deals"],
  keyPriority: [
    "excede_lease_rental_bill_contract_id",
    "excede_part_order_item_id",
    "excede_service_order_operation_item_id",
    "excede_vehicle_sale_multiple_vin_item_id",
    "excede_lease_rental_contract_vehicle_key",
    "excede_lease_rental_contract_vehicle_ts",
    "excede_lease_rental_bill_item_id",
    "excede_lease_rental_contract_item_id",
    "excede_service_order_operation_ts",
    "excede_vehicle_sale_multiple_vin_key",
  ],
  remaps: ["owners"],
  links: [
    { to: "deals" },
    { to: "vehicles" },
  ],
};

export const PRODUCTS: ObjectContract = {
  kind: "products",
  stage: 6,
  selection: "independent",
  linkedFrom: [],
  keyPriority: ["excede_part_id"],
  remaps: ["owners"],
  links: [],
};

/** Run order. A stage only runs when its limit is above 0. */
export const ALL_CONTRACTS: ObjectContract[] = [
  DEALS,
  CONTACTS,
  COMPANIES,
  VEHICLES,
  LINE_ITEMS,
  PRODUCTS,
];
