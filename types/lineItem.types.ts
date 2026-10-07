/**
 * `LineItem`: the line item record shape. Type declarations only.
 *
 * Lists every writable line item property in production (317 of 409),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
export interface LineItem {
  // ---- HubSpot standard properties (46) ----
  /** Create date (datetime) */
  createdate: string | null;
  /** Description (string) */
  description: string | null;
  /** Unit discount (number) */
  discount: string | null;
  /** Business units (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Billing cycle anchor date (date) */
  hs_billing_cycle_anchor_date: string | null;
  /** Billing pause mode (enumeration) */
  hs_billing_pause_mode: string | null;
  /** Delayed billing start by days (number) */
  hs_billing_start_delay_days: string | null;
  /** Delayed billing start by months (number) */
  hs_billing_start_delay_months: string | null;
  /** Bundle (number) */
  hs_bundle_id: string | null;
  /** Unit cost (number) */
  hs_cost_of_goods_sold: string | null;
  /** Discount percentage (number) */
  hs_discount_percentage: string | null;
  /** Group key (string) */
  hs_group_key: string | null;
  /** Hierarchy Type (enumeration) */
  hs_hierarchy_type: string | null;
  /** Image URL (string) */
  hs_images: string | null;
  /** Currency (enumeration) */
  hs_line_item_currency_code: string | null;
  /** Milestone Billing Enabled (bool) */
  hs_milestone_billing_enabled: string | null;
  /** Origin key (string) */
  hs_origin_key: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Pinned engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Position on quote (number) */
  hs_position_on_quote: string | null;
  /** Pricing model (enumeration) */
  hs_pricing_model: string | null;
  /** Product (number) */
  hs_product_id: string | null;
  /** Product type (enumeration) */
  hs_product_type: string | null;
  /** prorating leading end date (date) */
  hs_prorating_leading_end_date: string | null;
  /** prorating leading start date (date) */
  hs_prorating_leading_start_date: string | null;
  /** prorating trailing end date (date) */
  hs_prorating_trailing_end_date: string | null;
  /** prorating trailing start date (date) */
  hs_prorating_trailing_start_date: string | null;
  /** Ramp Group Name (string) */
  hs_ramp_group_name: string | null;
  /** Ramp key (string) */
  hs_ramp_key: string | null;
  /** Ramp Phase Name (string) */
  hs_ramp_phase_name: string | null;
  /** Term (string) */
  hs_recurring_billing_period: string | null;
  /** Billing start date (date) */
  hs_recurring_billing_start_date: string | null;
  /** Line Item Description (string) */
  hs_rich_text_description: string | null;
  /** SKU (string) */
  hs_sku: string | null;
  /** Tax category (enumeration) */
  hs_tax_category: string | null;
  /** Tax rate (enumeration) */
  hs_tax_rate_group_id: string | null;
  /** Tier prices (string) */
  hs_tier_prices: string | null;
  /** Tier ranges (string) */
  hs_tier_ranges: string | null;
  /** URL (string) */
  hs_url: string | null;
  /** Use prorating (bool) */
  hs_use_prorating: string | null;
  /** Owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;
  /** Name (string) */
  name: string | null;
  /** Unit price (number) */
  price: string | null;
  /** Quantity (number) */
  quantity: string | null;
  /** Billing frequency (enumeration) */
  recurringbillingfrequency: string | null;
  /** Tax (number) */
  tax: string | null;

  // ---- Excede and other custom properties (271) ----
  /** Amt Cost (excede_lease_rental_bill_contract_amt_cost) (number) */
  excede_lease_rental_bill_contract_amt_cost: string | null;
  /** Amt Tax1 (excede_lease_rental_bill_contract_amt_tax1) (number) */
  excede_lease_rental_bill_contract_amt_tax1: string | null;
  /** Amt Tax2 (excede_lease_rental_bill_contract_amt_tax2) (number) */
  excede_lease_rental_bill_contract_amt_tax2: string | null;
  /** Bil Id (string) */
  excede_lease_rental_bill_contract_bil_id: string | null;
  /** Con Id (string) */
  excede_lease_rental_bill_contract_con_id: string | null;
  /** Count Items (excede_lease_rental_bill_contract_count_items) (number) */
  excede_lease_rental_bill_contract_count_items: string | null;
  /** Id (excede_lease_rental_bill_contract_id) (string) · upsert key */
  excede_lease_rental_bill_contract_id: string | null;
  /** Prd (string) */
  excede_lease_rental_bill_contract_prd: string | null;
  /** TS (excede_lease_rental_bill_contract_ts) (string) */
  excede_lease_rental_bill_contract_ts: string | null;
  /** Unt Id (excede_lease_rental_bill_contract_unt_id) (string) */
  excede_lease_rental_bill_contract_unt_id: string | null;
  /** Amt Cost (excede_lease_rental_bill_item_amt_cost) (number) */
  excede_lease_rental_bill_item_amt_cost: string | null;
  /** Prepared Lease Rental Bill Id (string) */
  excede_lease_rental_bill_item_bill_id: string | null;
  /** Cod Id (string) */
  excede_lease_rental_bill_item_cod_id: string | null;
  /** Prepared Lease Rental Contract Id (string) */
  excede_lease_rental_bill_item_contract_id: string | null;
  /** Date Beg (datetime) */
  excede_lease_rental_bill_item_date_beg: string | null;
  /** Date Create (excede_lease_rental_bill_item_date_create) (datetime) */
  excede_lease_rental_bill_item_date_create: string | null;
  /** Date End (datetime) */
  excede_lease_rental_bill_item_date_end: string | null;
  /** Date Update (excede_lease_rental_bill_item_date_update) (datetime) */
  excede_lease_rental_bill_item_date_update: string | null;
  /** Emp Id (excede_lease_rental_bill_item_emp_id) (string) */
  excede_lease_rental_bill_item_emp_id: string | null;
  /** Id (excede_lease_rental_bill_item_id) (string) · upsert key */
  excede_lease_rental_bill_item_id: string | null;
  /** Itm Typ (excede_lease_rental_bill_item_itm_typ) (string) */
  excede_lease_rental_bill_item_itm_typ: string | null;
  /** Odom Beg (number) */
  excede_lease_rental_bill_item_odom_beg: string | null;
  /** Odom End (number) */
  excede_lease_rental_bill_item_odom_end: string | null;
  /** Parent Itm Id (string) */
  excede_lease_rental_bill_item_parent_itm_id: string | null;
  /** Tax Id (excede_lease_rental_bill_item_tax_id) (string) */
  excede_lease_rental_bill_item_tax_id: string | null;
  /** TS (excede_lease_rental_bill_item_ts) (string) */
  excede_lease_rental_bill_item_ts: string | null;
  /** Uom (string) */
  excede_lease_rental_bill_item_uom: string | null;
  /** Amt Cost (excede_lease_rental_contract_item_amt_cost) (number) */
  excede_lease_rental_contract_item_amt_cost: string | null;
  /** Cod Id (excede_lease_rental_contract_item_cod_id) (string) */
  excede_lease_rental_contract_item_cod_id: string | null;
  /** Con Id (excede_lease_rental_contract_item_con_id) (string) */
  excede_lease_rental_contract_item_con_id: string | null;
  /** Date Create (excede_lease_rental_contract_item_date_create) (datetime) */
  excede_lease_rental_contract_item_date_create: string | null;
  /** Date Update (excede_lease_rental_contract_item_date_update) (datetime) */
  excede_lease_rental_contract_item_date_update: string | null;
  /** Emp Id (excede_lease_rental_contract_item_emp_id) (string) */
  excede_lease_rental_contract_item_emp_id: string | null;
  /** Id (excede_lease_rental_contract_item_id) (string) · upsert key */
  excede_lease_rental_contract_item_id: string | null;
  /** Itm Typ (excede_lease_rental_contract_item_itm_typ) (string) */
  excede_lease_rental_contract_item_itm_typ: string | null;
  /** Skip (excede_lease_rental_contract_item_skip) (string) */
  excede_lease_rental_contract_item_skip: string | null;
  /** Tax Id (excede_lease_rental_contract_item_tax_id) (string) */
  excede_lease_rental_contract_item_tax_id: string | null;
  /** TS (excede_lease_rental_contract_item_ts) (string) */
  excede_lease_rental_contract_item_ts: string | null;
  /** Unt Id (excede_lease_rental_contract_item_unt_id) (string) */
  excede_lease_rental_contract_item_unt_id: string | null;
  /** Uom (excede_lease_rental_contract_item_uom) (string) */
  excede_lease_rental_contract_item_uom: string | null;
  /** Amt Price DEF (number) */
  excede_lease_rental_contract_vehicle_amt_price_def: string | null;
  /** Aquire Mthd (string) */
  excede_lease_rental_contract_vehicle_aquire_mthd: string | null;
  /** Area (string) */
  excede_lease_rental_contract_vehicle_area: string | null;
  /** Brn Id (string) */
  excede_lease_rental_contract_vehicle_brn_id: string | null;
  /** Commodity (string) */
  excede_lease_rental_contract_vehicle_commodity: string | null;
  /** Con Id (excede_lease_rental_contract_vehicle_con_id) (string) */
  excede_lease_rental_contract_vehicle_con_id: string | null;
  /** Count Items (excede_lease_rental_contract_vehicle_count_items) (number) */
  excede_lease_rental_contract_vehicle_count_items: string | null;
  /** Date Create (excede_lease_rental_contract_vehicle_date_create) (datetime) */
  excede_lease_rental_contract_vehicle_date_create: string | null;
  /** Date Update (excede_lease_rental_contract_vehicle_date_update) (datetime) */
  excede_lease_rental_contract_vehicle_date_update: string | null;
  /** Emp Id (excede_lease_rental_contract_vehicle_emp_id) (string) */
  excede_lease_rental_contract_vehicle_emp_id: string | null;
  /** Haz Mat (string) */
  excede_lease_rental_contract_vehicle_haz_mat: string | null;
  /** Hrs APUOut (number) */
  excede_lease_rental_contract_vehicle_hrs_apuout: string | null;
  /** Hrs Engine Out (number) */
  excede_lease_rental_contract_vehicle_hrs_engine_out: string | null;
  /** Hrs Other Out (number) */
  excede_lease_rental_contract_vehicle_hrs_other_out: string | null;
  /** Hrs PTOOut (number) */
  excede_lease_rental_contract_vehicle_hrs_ptoout: string | null;
  /** Hrs Reefer Out (number) */
  excede_lease_rental_contract_vehicle_hrs_reefer_out: string | null;
  /** Hrs Standby Out (number) */
  excede_lease_rental_contract_vehicle_hrs_standby_out: string | null;
  /** Itm Typ (excede_lease_rental_contract_vehicle_itm_typ) (string) */
  excede_lease_rental_contract_vehicle_itm_typ: string | null;
  /** Excede Lease Rental Contract Vehicle Key (string) · upsert key */
  excede_lease_rental_contract_vehicle_key: string | null;
  /** Lvl DEFIn (string) */
  excede_lease_rental_contract_vehicle_lvl_defin: string | null;
  /** Lvl DEFOut (string) */
  excede_lease_rental_contract_vehicle_lvl_defout: string | null;
  /** Lvl Fuel In (string) */
  excede_lease_rental_contract_vehicle_lvl_fuel_in: string | null;
  /** Lvl Fuel Out (string) */
  excede_lease_rental_contract_vehicle_lvl_fuel_out: string | null;
  /** Odom Out (number) */
  excede_lease_rental_contract_vehicle_odom_out: string | null;
  /** Special Equipment (string) */
  excede_lease_rental_contract_vehicle_special_equipment: string | null;
  /** TS (excede_lease_rental_contract_vehicle_ts) (string) · upsert key */
  excede_lease_rental_contract_vehicle_ts: string | null;
  /** Unt Id (excede_lease_rental_contract_vehicle_unt_id) (string) */
  excede_lease_rental_contract_vehicle_unt_id: string | null;
  /** Unt Id Lse (string) */
  excede_lease_rental_contract_vehicle_unt_id_lse: string | null;
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
  /** Id (string) */
  excede_part_id: string | null;
  /** Not Id (string) */
  excede_part_not_id: string | null;
  /** Amt Cost (excede_part_order_item_amt_cost) (number) */
  excede_part_order_item_amt_cost: string | null;
  /** Amt Price Suggest (number) */
  excede_part_order_item_amt_price_suggest: string | null;
  /** Date Create (excede_part_order_item_date_create) (datetime) */
  excede_part_order_item_date_create: string | null;
  /** Date Update (excede_part_order_item_date_update) (datetime) */
  excede_part_order_item_date_update: string | null;
  /** Emp Id (excede_part_order_item_emp_id) (string) */
  excede_part_order_item_emp_id: string | null;
  /** Emp Id Spn (string) */
  excede_part_order_item_emp_id_spn: string | null;
  /** Id (excede_part_order_item_id) (string) · upsert key */
  excede_part_order_item_id: string | null;
  /** Itm Typ (excede_part_order_item_itm_typ) (string) */
  excede_part_order_item_itm_typ: string | null;
  /** Pt Itm (string) */
  excede_part_order_item_pt_itm: string | null;
  /** Qty Backorder (number) */
  excede_part_order_item_qty_backorder: string | null;
  /** Reason (string) */
  excede_part_order_item_reason: string | null;
  /** Sls Id (excede_part_order_item_sls_id) (string) */
  excede_part_order_item_sls_id: string | null;
  /** Tax Id (excede_part_order_item_tax_id) (string) */
  excede_part_order_item_tax_id: string | null;
  /** TS (excede_part_order_item_ts) (string) */
  excede_part_order_item_ts: string | null;
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
  /** Amt Clm (number) */
  excede_service_order_operation_amt_clm: string | null;
  /** Amt Cost Labor (number) */
  excede_service_order_operation_amt_cost_labor: string | null;
  /** Amt Cost Misc (number) */
  excede_service_order_operation_amt_cost_misc: string | null;
  /** Amt Cost Parts (number) */
  excede_service_order_operation_amt_cost_parts: string | null;
  /** Amt Cost Sublet (number) */
  excede_service_order_operation_amt_cost_sublet: string | null;
  /** Amt Labor (number) */
  excede_service_order_operation_amt_labor: string | null;
  /** Amt Misc (number) */
  excede_service_order_operation_amt_misc: string | null;
  /** Amt Parts (number) */
  excede_service_order_operation_amt_parts: string | null;
  /** Amt Sublet (number) */
  excede_service_order_operation_amt_sublet: string | null;
  /** Amt Tax (number) */
  excede_service_order_operation_amt_tax: string | null;
  /** Cause (string) */
  excede_service_order_operation_cause: string | null;
  /** Clm Nbr (string) */
  excede_service_order_operation_clm_nbr: string | null;
  /** Complete (string) */
  excede_service_order_operation_complete: string | null;
  /** Correction (string) */
  excede_service_order_operation_correction: string | null;
  /** Date Create (excede_service_order_operation_date_create) (datetime) */
  excede_service_order_operation_date_create: string | null;
  /** Date Expire (datetime) */
  excede_service_order_operation_date_expire: string | null;
  /** Date Update (excede_service_order_operation_date_update) (datetime) */
  excede_service_order_operation_date_update: string | null;
  /** Emp Id (excede_service_order_operation_emp_id) (string) */
  excede_service_order_operation_emp_id: string | null;
  /** Emp Id Spn (excede_service_order_operation_emp_id_spn) (string) */
  excede_service_order_operation_emp_id_spn: string | null;
  /** Failed Prt Id (string) */
  excede_service_order_operation_failed_prt_id: string | null;
  /** Amt Cost (excede_service_order_operation_item_amt_cost) (number) */
  excede_service_order_operation_item_amt_cost: string | null;
  /** Amt Price Suggest (excede_service_order_operation_item_amt_price_suggest) (number) */
  excede_service_order_operation_item_amt_price_suggest: string | null;
  /** Complete (excede_service_order_operation_item_complete) (string) */
  excede_service_order_operation_item_complete: string | null;
  /** Date Create (excede_service_order_operation_item_date_create) (datetime) */
  excede_service_order_operation_item_date_create: string | null;
  /** Date Pay Period (datetime) */
  excede_service_order_operation_item_date_pay_period: string | null;
  /** Date Update (excede_service_order_operation_item_date_update) (datetime) */
  excede_service_order_operation_item_date_update: string | null;
  /** Emp Id (excede_service_order_operation_item_emp_id) (string) */
  excede_service_order_operation_item_emp_id: string | null;
  /** Emp Id Lbr (string) */
  excede_service_order_operation_item_emp_id_lbr: string | null;
  /** Emp Id Spn (excede_service_order_operation_item_emp_id_spn) (string) */
  excede_service_order_operation_item_emp_id_spn: string | null;
  /** Hrs Actual (number) */
  excede_service_order_operation_item_hrs_actual: string | null;
  /** Hrs Bill (number) */
  excede_service_order_operation_item_hrs_bill: string | null;
  /** Hrs Cost (number) */
  excede_service_order_operation_item_hrs_cost: string | null;
  /** Hrs Flat (number) */
  excede_service_order_operation_item_hrs_flat: string | null;
  /** Id (excede_service_order_operation_item_id) (string) · upsert key */
  excede_service_order_operation_item_id: string | null;
  /** Itm Typ (excede_service_order_operation_item_itm_typ) (string) */
  excede_service_order_operation_item_itm_typ: string | null;
  /** Mins Per Segment (string) */
  excede_service_order_operation_item_mins_per_segment: string | null;
  /** Ops Id (excede_service_order_operation_item_ops_id) (string) */
  excede_service_order_operation_item_ops_id: string | null;
  /** Qty Backorder (excede_service_order_operation_item_qty_backorder) (number) */
  excede_service_order_operation_item_qty_backorder: string | null;
  /** Reason (excede_service_order_operation_item_reason) (string) */
  excede_service_order_operation_item_reason: string | null;
  /** Sls Id (excede_service_order_operation_item_sls_id) (string) */
  excede_service_order_operation_item_sls_id: string | null;
  /** Sv Itm (string) */
  excede_service_order_operation_item_sv_itm: string | null;
  /** Tax Id (excede_service_order_operation_item_tax_id) (string) */
  excede_service_order_operation_item_tax_id: string | null;
  /** TS (excede_service_order_operation_item_ts) (string) */
  excede_service_order_operation_item_ts: string | null;
  /** Use Hrs Flat (string) */
  excede_service_order_operation_item_use_hrs_flat: string | null;
  /** Job Id (string) */
  excede_service_order_operation_job_id: string | null;
  /** Not Id (string) */
  excede_service_order_operation_not_id: string | null;
  /** Ops Id (string) */
  excede_service_order_operation_ops_id: string | null;
  /** Request (string) */
  excede_service_order_operation_request: string | null;
  /** Sls Id (excede_service_order_operation_sls_id) (string) */
  excede_service_order_operation_sls_id: string | null;
  /** Sls Typ Id (string) */
  excede_service_order_operation_sls_typ_id: string | null;
  /** Status (string) */
  excede_service_order_operation_status: string | null;
  /** TS (excede_service_order_operation_ts) (string) · upsert key */
  excede_service_order_operation_ts: string | null;
  /** Use Job Prices (string) */
  excede_service_order_operation_use_job_prices: string | null;
  /** Amt Adds (number) */
  excede_vehicle_sale_multiple_vin_amt_adds: string | null;
  /** Amt Cash Down (number) */
  excede_vehicle_sale_multiple_vin_amt_cash_down: string | null;
  /** Amt Commission Spn1 (number) */
  excede_vehicle_sale_multiple_vin_amt_commission_spn1: string | null;
  /** Amt Excise Tax (number) */
  excede_vehicle_sale_multiple_vin_amt_excise_tax: string | null;
  /** Amt Fee Battery (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_battery: string | null;
  /** Amt Fee Doc (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_doc: string | null;
  /** Amt Fee Freight (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_freight: string | null;
  /** Amt Fee Inspection (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_inspection: string | null;
  /** Amt Fee License (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_license: string | null;
  /** Amt Fee Registration (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_registration: string | null;
  /** Amt Fee Smog (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_smog: string | null;
  /** Amt Fee Title (number) */
  excede_vehicle_sale_multiple_vin_amt_fee_title: string | null;
  /** Amt Hold Back (number) */
  excede_vehicle_sale_multiple_vin_amt_hold_back: string | null;
  /** Amt Incentive (number) */
  excede_vehicle_sale_multiple_vin_amt_incentive: string | null;
  /** Amt Insurance (number) */
  excede_vehicle_sale_multiple_vin_amt_insurance: string | null;
  /** Amt Ipos (number) */
  excede_vehicle_sale_multiple_vin_amt_ipos: string | null;
  /** Amt Lien (number) */
  excede_vehicle_sale_multiple_vin_amt_lien: string | null;
  /** Amt Our Cost (number) */
  excede_vehicle_sale_multiple_vin_amt_our_cost: string | null;
  /** Amt Our Cost Estimate (number) */
  excede_vehicle_sale_multiple_vin_amt_our_cost_estimate: string | null;
  /** Amt Over Under Allowance (number) */
  excede_vehicle_sale_multiple_vin_amt_over_under_allowance: string | null;
  /** Amt Rebates (number) */
  excede_vehicle_sale_multiple_vin_amt_rebates: string | null;
  /** Amt Reserve (number) */
  excede_vehicle_sale_multiple_vin_amt_reserve: string | null;
  /** Amt Service Contracts (number) */
  excede_vehicle_sale_multiple_vin_amt_service_contracts: string | null;
  /** Amt Tax1 (number) */
  excede_vehicle_sale_multiple_vin_amt_tax1: string | null;
  /** Amt Tax2 (number) */
  excede_vehicle_sale_multiple_vin_amt_tax2: string | null;
  /** Amt Tire Credit (number) */
  excede_vehicle_sale_multiple_vin_amt_tire_credit: string | null;
  /** Amt Tire Discount (number) */
  excede_vehicle_sale_multiple_vin_amt_tire_discount: string | null;
  /** Amt Total Down (number) */
  excede_vehicle_sale_multiple_vin_amt_total_down: string | null;
  /** Amt Unit Property Tax (number) */
  excede_vehicle_sale_multiple_vin_amt_unit_property_tax: string | null;
  /** Condition (string) */
  excede_vehicle_sale_multiple_vin_condition: string | null;
  /** Count Items (number) */
  excede_vehicle_sale_multiple_vin_count_items: string | null;
  /** Cus Id (string) */
  excede_vehicle_sale_multiple_vin_cus_id: string | null;
  /** Date Create (datetime) */
  excede_vehicle_sale_multiple_vin_date_create: string | null;
  /** Date Update (datetime) */
  excede_vehicle_sale_multiple_vin_date_update: string | null;
  /** Emp Id (string) */
  excede_vehicle_sale_multiple_vin_emp_id: string | null;
  /** Excise Tax Auto (string) */
  excede_vehicle_sale_multiple_vin_excise_tax_auto: string | null;
  /** Amt Cost (number) */
  excede_vehicle_sale_multiple_vin_item_amt_cost: string | null;
  /** Date Create (excede_vehicle_sale_multiple_vin_item_date_create) (datetime) */
  excede_vehicle_sale_multiple_vin_item_date_create: string | null;
  /** Date Update (excede_vehicle_sale_multiple_vin_item_date_update) (datetime) */
  excede_vehicle_sale_multiple_vin_item_date_update: string | null;
  /** Emp Id (excede_vehicle_sale_multiple_vin_item_emp_id) (string) */
  excede_vehicle_sale_multiple_vin_item_emp_id: string | null;
  /** Id (string) · upsert key */
  excede_vehicle_sale_multiple_vin_item_id: string | null;
  /** Itm Typ (excede_vehicle_sale_multiple_vin_item_itm_typ) (string) */
  excede_vehicle_sale_multiple_vin_item_itm_typ: string | null;
  /** Sls Id (excede_vehicle_sale_multiple_vin_item_sls_id) (string) */
  excede_vehicle_sale_multiple_vin_item_sls_id: string | null;
  /** Tax Id (excede_vehicle_sale_multiple_vin_item_tax_id) (string) */
  excede_vehicle_sale_multiple_vin_item_tax_id: string | null;
  /** TS (string) */
  excede_vehicle_sale_multiple_vin_item_ts: string | null;
  /** Unt Id (excede_vehicle_sale_multiple_vin_item_unt_id) (string) */
  excede_vehicle_sale_multiple_vin_item_unt_id: string | null;
  /** Vh Itm (string) */
  excede_vehicle_sale_multiple_vin_item_vh_itm: string | null;
  /** Itm Typ (string) */
  excede_vehicle_sale_multiple_vin_itm_typ: string | null;
  /** Excede Vehicle Sale Multiple VIN Key (string) · upsert key */
  excede_vehicle_sale_multiple_vin_key: string | null;
  /** Lien Payoff Acct Nbr (string) */
  excede_vehicle_sale_multiple_vin_lien_payoff_acct_nbr: string | null;
  /** Lien Payoff Date Expire (string) */
  excede_vehicle_sale_multiple_vin_lien_payoff_date_expire: string | null;
  /** Lien Payoff Name (string) */
  excede_vehicle_sale_multiple_vin_lien_payoff_name: string | null;
  /** Lien Payoff Verifier (string) */
  excede_vehicle_sale_multiple_vin_lien_payoff_verifier: string | null;
  /** Lien Ven Id (string) */
  excede_vehicle_sale_multiple_vin_lien_ven_id: string | null;
  /** Lien Ven Name (string) */
  excede_vehicle_sale_multiple_vin_lien_ven_name: string | null;
  /** Mls Vin Misc1 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc1: string | null;
  /** Mls Vin Misc10 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc10: string | null;
  /** Mls Vin Misc11 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc11: string | null;
  /** Mls Vin Misc12 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc12: string | null;
  /** Mls Vin Misc13 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc13: string | null;
  /** Mls Vin Misc14 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc14: string | null;
  /** Mls Vin Misc15 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc15: string | null;
  /** Mls Vin Misc16 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc16: string | null;
  /** Mls Vin Misc17 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc17: string | null;
  /** Mls Vin Misc18 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc18: string | null;
  /** Mls Vin Misc19 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc19: string | null;
  /** Mls Vin Misc2 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc2: string | null;
  /** Mls Vin Misc20 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc20: string | null;
  /** Mls Vin Misc3 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc3: string | null;
  /** Mls Vin Misc4 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc4: string | null;
  /** Mls Vin Misc5 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc5: string | null;
  /** Mls Vin Misc6 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc6: string | null;
  /** Mls Vin Misc7 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc7: string | null;
  /** Mls Vin Misc8 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc8: string | null;
  /** Mls Vin Misc9 (string) */
  excede_vehicle_sale_multiple_vin_mls_vin_misc9: string | null;
  /** Ship Addr1 (string) */
  excede_vehicle_sale_multiple_vin_ship_addr1: string | null;
  /** Ship Addr2 (string) */
  excede_vehicle_sale_multiple_vin_ship_addr2: string | null;
  /** Ship City (string) */
  excede_vehicle_sale_multiple_vin_ship_city: string | null;
  /** Ship County (string) */
  excede_vehicle_sale_multiple_vin_ship_county: string | null;
  /** Ship Phone1 (string) */
  excede_vehicle_sale_multiple_vin_ship_phone1: string | null;
  /** Ship Post (string) */
  excede_vehicle_sale_multiple_vin_ship_post: string | null;
  /** Ship State (string) */
  excede_vehicle_sale_multiple_vin_ship_state: string | null;
  /** Skip (string) */
  excede_vehicle_sale_multiple_vin_skip: string | null;
  /** Sls Id (string) */
  excede_vehicle_sale_multiple_vin_sls_id: string | null;
  /** Excede Vehicle Sale Multiple VIN Source TS (string) */
  excede_vehicle_sale_multiple_vin_source_ts: string | null;
  /** Tax Id (string) */
  excede_vehicle_sale_multiple_vin_tax_id: string | null;
  /** Typ Id (string) */
  excede_vehicle_sale_multiple_vin_typ_id: string | null;
  /** Unit Property Tax Auto (string) */
  excede_vehicle_sale_multiple_vin_unit_property_tax_auto: string | null;
  /** Unt Id (string) */
  excede_vehicle_sale_multiple_vin_unt_id: string | null;
  /** Unt Id Over Under (string) */
  excede_vehicle_sale_multiple_vin_unt_id_over_under: string | null;
  /** Vin (string) */
  excede_vehicle_sale_multiple_vin_vin: string | null;
}
