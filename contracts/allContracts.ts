/**
 * All object contracts, in the order their stages run.
 * A stage only runs when its limit on the command line is above 0.
 */
import type { ObjectContract } from "../types/objectContract.types.ts";
import { DEAL_CONTRACT } from "./deal.ts";
import { CONTACT_CONTRACT } from "./contact.ts";
import { COMPANY_CONTRACT } from "./company.ts";
import { VEHICLE_CONTRACT } from "./vehicle.ts";
import { LINE_ITEM_CONTRACT } from "./lineItem.ts";
import { PRODUCT_CONTRACT } from "./product.ts";

export const ALL_CONTRACTS: ObjectContract[] = [
  DEAL_CONTRACT,
  COMPANY_CONTRACT,
  CONTACT_CONTRACT,
  VEHICLE_CONTRACT,
  LINE_ITEM_CONTRACT,
  PRODUCT_CONTRACT,
];
