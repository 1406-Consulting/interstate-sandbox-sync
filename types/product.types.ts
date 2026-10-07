/**
 * `Product`: the product record shape. Type declarations only.
 *
 * Lists every writable product property in production (73 of 110),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
import type { PrimaryExcedeProperty } from "./crm.types.ts";

export interface Product {
  /** Id (string) · upsert key */
  //NOTE: cannot be null
  excede_part_id: PrimaryExcedeProperty;
  // ---- HubSpot standard properties (28) ----
  /** Create Date (datetime) */
  createdate: string | null;
  /** Product description (string) */
  description: string | null;
  /** Unit discount (number) */
  discount: string | null;
  /** Business units (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Pricing (enumeration) */
  hs_bundle_pricing_type: string | null;
  /** Unit cost (number) */
  hs_cost_of_goods_sold: string | null;
  /** Discount Percentage (number) */
  hs_discount_percentage: string | null;
  /** Folder (enumeration) */
  hs_folder: string | null;
  /** Folder Id (number) */
  hs_folder_id: string | null;
  /** Image Url (string) */
  hs_images: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Pinned engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Pricing model (enumeration) */
  hs_pricing_model: string | null;
  /** Product type (enumeration) */
  hs_product_type: string | null;
  /** Term (string) */
  hs_recurring_billing_period: string | null;
  /** Start Date (date) */
  hs_recurring_billing_start_date: string | null;
  /** Description (string) */
  hs_rich_text_description: string | null;
  /** SKU (string) */
  hs_sku: string | null;
  /** Status (enumeration) */
  hs_status: string | null;
  /** Tax Category (enumeration) */
  hs_tax_category: string | null;
  /** Tier Prices (string) */
  hs_tier_prices: string | null;
  /** Tier Ranges (string) */
  hs_tier_ranges: string | null;
  /** URL (string) */
  hs_url: string | null;
  /** Owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;
  /** Name (string) */
  name: string | null;
  /** Unit price (number) */
  price: string | null;
  /** Billing frequency (enumeration) */
  recurringbillingfrequency: string | null;
  /** Tax (number) */
  tax: string | null;

  // ---- Excede and other custom properties (45) ----
  /** Amt Cost Avg (number) */
  excede_part_amt_cost_avg: string | null;
  /** Amt Cost Src (number) */
  excede_part_amt_cost_src: string | null;
  /** Amt Cost Src2 (number) */
  excede_part_amt_cost_src2: string | null;
  /** Amt Price2 (number) */
  excede_part_amt_price2: string | null;
  /** Amt Price3 (number) */
  excede_part_amt_price3: string | null;
  /** Amt Price4 (number) */
  excede_part_amt_price4: string | null;
  /** Amt Price5 (number) */
  excede_part_amt_price5: string | null;
  /** Auto Min Max (string) */
  excede_part_auto_min_max: string | null;
  /** Avg Sales Day (string) */
  excede_part_avg_sales_day: string | null;
  /** Bin Id1 (string) */
  excede_part_bin_id1: string | null;
  /** Bin Id2 (string) */
  excede_part_bin_id2: string | null;
  /** Brn Id (string) */
  excede_part_brn_id: string | null;
  /** Cla Id (string) */
  excede_part_cla_id: string | null;
  /** Count Freq Days (number) */
  excede_part_count_freq_days: string | null;
  /** Date Count (datetime) */
  excede_part_date_count: string | null;
  /** Date Create (datetime) */
  excede_part_date_create: string | null;
  /** Date Level (datetime) */
  excede_part_date_level: string | null;
  /** Date Order (datetime) */
  excede_part_date_order: string | null;
  /** Date Sale (datetime) */
  excede_part_date_sale: string | null;
  /** Date Tape (datetime) */
  excede_part_date_tape: string | null;
  /** Date Update (datetime) */
  excede_part_date_update: string | null;
  /** Not Id (string) */
  excede_part_not_id: string | null;
  /** Order Pkg Min (string) */
  excede_part_order_pkg_min: string | null;
  /** Order Pkg Mul (string) */
  excede_part_order_pkg_mul: string | null;
  /** Prt Misc1 (string) */
  excede_part_prt_misc1: string | null;
  /** Prt Misc2 (string) */
  excede_part_prt_misc2: string | null;
  /** Prt Misc3 (string) */
  excede_part_prt_misc3: string | null;
  /** Prt Misc4 (string) */
  excede_part_prt_misc4: string | null;
  /** Prt Misc5 (string) */
  excede_part_prt_misc5: string | null;
  /** Qty Max (number) */
  excede_part_qty_max: string | null;
  /** Qty Min (number) */
  excede_part_qty_min: string | null;
  /** Qty OH (number) */
  excede_part_qty_oh: string | null;
  /** Qty OO (number) */
  excede_part_qty_oo: string | null;
  /** Qty OT (number) */
  excede_part_qty_ot: string | null;
  /** Qty Reserve (number) */
  excede_part_qty_reserve: string | null;
  /** Qty Supply (number) */
  excede_part_qty_supply: string | null;
  /** Sale Pkg Mul (string) */
  excede_part_sale_pkg_mul: string | null;
  /** Src Id (string) */
  excede_part_src_id: string | null;
  /** Stock Ctl (string) */
  excede_part_stock_ctl: string | null;
  /** Stock Order Ratio (string) */
  excede_part_stock_order_ratio: string | null;
  /** TS (string) */
  excede_part_ts: string | null;
  /** Typ (string) */
  excede_part_typ: string | null;
  /** Ven Id (string) */
  excede_part_ven_id: string | null;
  /** Ven Prt Id (string) */
  excede_part_ven_prt_id: string | null;
}
