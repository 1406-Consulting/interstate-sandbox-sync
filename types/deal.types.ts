/**
 * `Deal`: the deal record shape. Type declarations only.
 *
 * Lists every writable deal property in production (613 of 775),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
import type { PrimaryExcedeProperty } from "./crm.types.ts";

export interface Deal {
  /** TS (string) · upsert key */
  //NOTE: cannot be null
  excede_customer_sales_ts: PrimaryExcedeProperty;
  // ---- HubSpot standard properties (41) ----
  /** Amount (number) */
  amount: string | null;
  /** Closed Lost Reason (string) */
  closed_lost_reason: string | null;
  /** Closed Won Reason (string) */
  closed_won_reason: string | null;
  /** Close Date (datetime) */
  closedate: string | null;
  /** Create Date (datetime) */
  createdate: string | null;
  /** Currency (enumeration) */
  deal_currency_code: string | null;
  /** Deal Name (string) */
  dealname: string | null;
  /** Deal Stage (enumeration) · matched by name */
  dealstage: string | null;
  /** Deal Type (enumeration) */
  dealtype: string | null;
  /** Deal Description (string) */
  description: string | null;
  /** Brands (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Deal Collaborator (enumeration) · owner ID, matched by email */
  hs_all_collaborator_owner_ids: string | null;
  /** Original Traffic Source (enumeration) */
  hs_analytics_source: string | null;
  /** Attributed reporting team (enumeration) */
  hs_attributed_team_ids: string | null;
  /** HubSpot Campaign (string) */
  hs_campaign: string | null;
  /** Cross-account note (string) */
  hs_cross_account_note: string | null;
  /** Cross-sell Opportunity (bool) */
  hs_cross_sell_opportunity: string | null;
  /** Deal amount calculation preference (enumeration) */
  hs_deal_amount_calculation_preference: string | null;
  /** Deal probability (number) */
  hs_deal_stage_probability: string | null;
  /** Exchange rate (number) */
  hs_exchange_rate: string | null;
  /** Forecast probability (number) */
  hs_forecast_probability: string | null;
  /** Is Active Shared Deal (bool) */
  hs_is_active_shared_deal: string | null;
  /** Global Term Line Item Discount Percentage (string) */
  hs_line_item_global_term_hs_discount_percentage: string | null;
  /** Global Term Line Item Discount Percentage Enabled (bool) */
  hs_line_item_global_term_hs_discount_percentage_enabled: string | null;
  /** Global Term Line Item Recurring Billing Period (string) */
  hs_line_item_global_term_hs_recurring_billing_period: string | null;
  /** Global Term Line Item Recurring Billing Period Enabled (bool) */
  hs_line_item_global_term_hs_recurring_billing_period_enabled: string | null;
  /** Global Term Line Item Recurring Billing Start Date (string) */
  hs_line_item_global_term_hs_recurring_billing_start_date: string | null;
  /** Global Term Line Item Recurring Billing Start Date Enabled (bool) */
  hs_line_item_global_term_hs_recurring_billing_start_date_enabled:
    string | null;
  /** Global Term Line Item Recurring Billing Frequency (string) */
  hs_line_item_global_term_recurringbillingfrequency: string | null;
  /** Global Term Line Item Recurring Billing Frequency Enabled (bool) */
  hs_line_item_global_term_recurringbillingfrequency_enabled: string | null;
  /** Forecast category (enumeration) */
  hs_manual_forecast_category: string | null;
  /** Net Pipeline Impact (number) */
  hs_net_pipeline_impact: string | null;
  /** Next step (string) */
  hs_next_step: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Partner Tech Win (enumeration) */
  hs_partner_tech_win: string | null;
  /** Pinned Engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Priority (enumeration) */
  hs_priority: string | null;
  /** Shared teams (enumeration) */
  hs_shared_team_ids: string | null;
  /** Shared users (enumeration) */
  hs_shared_user_ids: string | null;
  /** Deal owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;
  /** Pipeline (enumeration) · matched by name */
  pipeline: string | null;

  // ---- Excede and other custom properties (572) ----
  /** Amt Cos (number) */
  excede_customer_sales_amt_cos: string | null;
  /** Amt Gross (number) */
  excede_customer_sales_amt_gross: string | null;
  /** Cus Id (string) */
  excede_customer_sales_cus_id: string | null;
  /** Date Update (datetime) */
  excede_customer_sales_date_update: string | null;
  /** Origin (string) */
  excede_customer_sales_origin: string | null;
  /** Prepared Preferred Customer Contact Id (string) */
  excede_customer_sales_preferred_contact_id: string | null;
  /** Amt Cost (excede_lease_rental_bill_amt_cost) (number) */
  excede_lease_rental_bill_amt_cost: string | null;
  /** Amt Disc (number) */
  excede_lease_rental_bill_amt_disc: string | null;
  /** Amt Tax1 (excede_lease_rental_bill_amt_tax1) (number) */
  excede_lease_rental_bill_amt_tax1: string | null;
  /** Amt Tax2 (excede_lease_rental_bill_amt_tax2) (number) */
  excede_lease_rental_bill_amt_tax2: string | null;
  /** Brn Id (excede_lease_rental_bill_brn_id) (string) */
  excede_lease_rental_bill_brn_id: string | null;
  /** Count Items (excede_lease_rental_bill_count_items) (number) */
  excede_lease_rental_bill_count_items: string | null;
  /** Cus Addr1 (excede_lease_rental_bill_cus_addr1) (string) */
  excede_lease_rental_bill_cus_addr1: string | null;
  /** Cus Addr2 (excede_lease_rental_bill_cus_addr2) (string) */
  excede_lease_rental_bill_cus_addr2: string | null;
  /** Cus City (excede_lease_rental_bill_cus_city) (string) */
  excede_lease_rental_bill_cus_city: string | null;
  /** Cus County (excede_lease_rental_bill_cus_county) (string) */
  excede_lease_rental_bill_cus_county: string | null;
  /** Cus Id (excede_lease_rental_bill_cus_id) (string) */
  excede_lease_rental_bill_cus_id: string | null;
  /** Cus Name (excede_lease_rental_bill_cus_name) (string) */
  excede_lease_rental_bill_cus_name: string | null;
  /** Cus Phone (excede_lease_rental_bill_cus_phone) (string) */
  excede_lease_rental_bill_cus_phone: string | null;
  /** Cus Post (excede_lease_rental_bill_cus_post) (string) */
  excede_lease_rental_bill_cus_post: string | null;
  /** Cus State (excede_lease_rental_bill_cus_state) (string) */
  excede_lease_rental_bill_cus_state: string | null;
  /** Prepared Customer Term Key (excede_lease_rental_bill_customer_term_key) (string) */
  excede_lease_rental_bill_customer_term_key: string | null;
  /** Date Create (excede_lease_rental_bill_date_create) (datetime) */
  excede_lease_rental_bill_date_create: string | null;
  /** Date Disc (datetime) */
  excede_lease_rental_bill_date_disc: string | null;
  /** Date Due (excede_lease_rental_bill_date_due) (datetime) */
  excede_lease_rental_bill_date_due: string | null;
  /** Date Update (excede_lease_rental_bill_date_update) (datetime) */
  excede_lease_rental_bill_date_update: string | null;
  /** Drv Fuel Rec Received (string) */
  excede_lease_rental_bill_drv_fuel_rec_received: string | null;
  /** Drv Trip Rpt Complete (string) */
  excede_lease_rental_bill_drv_trip_rpt_complete: string | null;
  /** Email (excede_lease_rental_bill_email) (string) */
  excede_lease_rental_bill_email: string | null;
  /** Emp Id (excede_lease_rental_bill_emp_id) (string) */
  excede_lease_rental_bill_emp_id: string | null;
  /** Id (excede_lease_rental_bill_id) (string) · upsert key */
  excede_lease_rental_bill_id: string | null;
  /** Invoice Bil Id (string) */
  excede_lease_rental_bill_invoice_bil_id: string | null;
  /** Je Id (excede_lease_rental_bill_je_id) (string) */
  excede_lease_rental_bill_je_id: string | null;
  /** Posted (excede_lease_rental_bill_posted) (string) */
  excede_lease_rental_bill_posted: string | null;
  /** Ref (excede_lease_rental_bill_ref) (string) */
  excede_lease_rental_bill_ref: string | null;
  /** Status (excede_lease_rental_bill_status) (string) */
  excede_lease_rental_bill_status: string | null;
  /** Trm Id (excede_lease_rental_bill_trm_id) (string) */
  excede_lease_rental_bill_trm_id: string | null;
  /** TS (excede_lease_rental_bill_ts) (string) */
  excede_lease_rental_bill_ts: string | null;
  /** Prepared Lease Rental Bill Vehicle Id (string) */
  excede_lease_rental_bill_vehicle_id: string | null;
  /** Amt Cost (number) */
  excede_lease_rental_contract_amt_cost: string | null;
  /** Amt Tax1 (excede_lease_rental_contract_amt_tax1) (number) */
  excede_lease_rental_contract_amt_tax1: string | null;
  /** Amt Tax2 (excede_lease_rental_contract_amt_tax2) (number) */
  excede_lease_rental_contract_amt_tax2: string | null;
  /** Bill Cus Id (excede_lease_rental_contract_bill_cus_id) (string) */
  excede_lease_rental_contract_bill_cus_id: string | null;
  /** Bill Cus Name (excede_lease_rental_contract_bill_cus_name) (string) */
  excede_lease_rental_contract_bill_cus_name: string | null;
  /** Brn Id (excede_lease_rental_contract_brn_id) (string) */
  excede_lease_rental_contract_brn_id: string | null;
  /** Con Typ Id (string) */
  excede_lease_rental_contract_con_typ_id: string | null;
  /** Count Items (excede_lease_rental_contract_count_items) (number) */
  excede_lease_rental_contract_count_items: string | null;
  /** Cus Addr1 (excede_lease_rental_contract_cus_addr1) (string) */
  excede_lease_rental_contract_cus_addr1: string | null;
  /** Cus Addr2 (excede_lease_rental_contract_cus_addr2) (string) */
  excede_lease_rental_contract_cus_addr2: string | null;
  /** Cus City (excede_lease_rental_contract_cus_city) (string) */
  excede_lease_rental_contract_cus_city: string | null;
  /** Cus County (excede_lease_rental_contract_cus_county) (string) */
  excede_lease_rental_contract_cus_county: string | null;
  /** Cus Id (excede_lease_rental_contract_cus_id) (string) */
  excede_lease_rental_contract_cus_id: string | null;
  /** Cus Name (excede_lease_rental_contract_cus_name) (string) */
  excede_lease_rental_contract_cus_name: string | null;
  /** Cus Phone (string) */
  excede_lease_rental_contract_cus_phone: string | null;
  /** Cus Post (excede_lease_rental_contract_cus_post) (string) */
  excede_lease_rental_contract_cus_post: string | null;
  /** Cus Pur Nbr (excede_lease_rental_contract_cus_pur_nbr) (string) */
  excede_lease_rental_contract_cus_pur_nbr: string | null;
  /** Cus State (excede_lease_rental_contract_cus_state) (string) */
  excede_lease_rental_contract_cus_state: string | null;
  /** Prepared Customer Term Key (string) */
  excede_lease_rental_contract_customer_term_key: string | null;
  /** Date Next (datetime) */
  excede_lease_rental_contract_date_next: string | null;
  /** Date Pickup (datetime) */
  excede_lease_rental_contract_date_pickup: string | null;
  /** Date Prev (datetime) */
  excede_lease_rental_contract_date_prev: string | null;
  /** Date Return (datetime) */
  excede_lease_rental_contract_date_return: string | null;
  /** Dep Reqd (string) */
  excede_lease_rental_contract_dep_reqd: string | null;
  /** Drv Id (string) */
  excede_lease_rental_contract_drv_id: string | null;
  /** Email (excede_lease_rental_contract_email) (string) */
  excede_lease_rental_contract_email: string | null;
  /** Emp Id (excede_lease_rental_contract_emp_id) (string) */
  excede_lease_rental_contract_emp_id: string | null;
  /** Emp Id Rev (string) */
  excede_lease_rental_contract_emp_id_rev: string | null;
  /** Emp Id Spn (excede_lease_rental_contract_emp_id_spn) (string) */
  excede_lease_rental_contract_emp_id_spn: string | null;
  /** Freq Trm Id (string) */
  excede_lease_rental_contract_freq_trm_id: string | null;
  /** Id (excede_lease_rental_contract_id) (string) · upsert key */
  excede_lease_rental_contract_id: string | null;
  /** Ins Emp Id Coll (string) */
  excede_lease_rental_contract_ins_emp_id_coll: string | null;
  /** Ins Emp Id Comp (string) */
  excede_lease_rental_contract_ins_emp_id_comp: string | null;
  /** Ins Emp Id Liab (string) */
  excede_lease_rental_contract_ins_emp_id_liab: string | null;
  /** Ins Id Coll (string) */
  excede_lease_rental_contract_ins_id_coll: string | null;
  /** Ins Id Comp (string) */
  excede_lease_rental_contract_ins_id_comp: string | null;
  /** Ins Id Liab (string) */
  excede_lease_rental_contract_ins_id_liab: string | null;
  /** Max Prd (string) */
  excede_lease_rental_contract_max_prd: string | null;
  /** Next Prd (string) */
  excede_lease_rental_contract_next_prd: string | null;
  /** Refund Receiver (string) */
  excede_lease_rental_contract_refund_receiver: string | null;
  /** Status (excede_lease_rental_contract_status) (string) */
  excede_lease_rental_contract_status: string | null;
  /** Tax Id (excede_lease_rental_contract_tax_id) (string) */
  excede_lease_rental_contract_tax_id: string | null;
  /** Trm Id (excede_lease_rental_contract_trm_id) (string) */
  excede_lease_rental_contract_trm_id: string | null;
  /** TS (excede_lease_rental_contract_ts) (string) */
  excede_lease_rental_contract_ts: string | null;
  /** Unused Dep Refund (string) */
  excede_lease_rental_contract_unused_dep_refund: string | null;
  /** Prepared Lease Rental Contract Vehicle Id (string) */
  excede_lease_rental_contract_vehicle_id: string | null;
  /** Vh Typ Id (string) */
  excede_lease_rental_contract_vh_typ_id: string | null;
  /** Amt Cost (excede_part_order_amt_cost) (number) */
  excede_part_order_amt_cost: string | null;
  /** Amt Disc (excede_part_order_amt_disc) (number) */
  excede_part_order_amt_disc: string | null;
  /** Amt Tax1 (excede_part_order_amt_tax1) (number) */
  excede_part_order_amt_tax1: string | null;
  /** Amt Tax2 (excede_part_order_amt_tax2) (number) */
  excede_part_order_amt_tax2: string | null;
  /** Bill Cus Id (excede_part_order_bill_cus_id) (string) */
  excede_part_order_bill_cus_id: string | null;
  /** Bill Cus Name (excede_part_order_bill_cus_name) (string) */
  excede_part_order_bill_cus_name: string | null;
  /** Brn Id (excede_part_order_branch_id) (string) */
  excede_part_order_branch_id: string | null;
  /** Count Items (excede_part_order_count_items) (number) */
  excede_part_order_count_items: string | null;
  /** Cus Id (excede_part_order_cus_id) (string) */
  excede_part_order_cus_id: string | null;
  /** Cus Name (excede_part_order_cus_name) (string) */
  excede_part_order_cus_name: string | null;
  /** Cus Pur Nbr (excede_part_order_cus_pur_nbr) (string) */
  excede_part_order_cus_pur_nbr: string | null;
  /** Date Create (excede_part_order_date_create) (datetime) */
  excede_part_order_date_create: string | null;
  /** Date Disc (excede_part_order_date_disc) (datetime) */
  excede_part_order_date_disc: string | null;
  /** Date Due (excede_part_order_date_due) (datetime) */
  excede_part_order_date_due: string | null;
  /** Date Expire (excede_part_order_date_expire) (datetime) */
  excede_part_order_date_expire: string | null;
  /** Date Ship (datetime) */
  excede_part_order_date_ship: string | null;
  /** Date Update (excede_part_order_date_update) (datetime) */
  excede_part_order_date_update: string | null;
  /** Email (excede_part_order_email) (string) */
  excede_part_order_email: string | null;
  /** Emp Id (excede_part_order_emp_id) (string) */
  excede_part_order_emp_id: string | null;
  /** Emp Id Spn (excede_part_order_emp_id_spn) (string) */
  excede_part_order_emp_id_spn: string | null;
  /** Estimate (string) */
  excede_part_order_estimate: string | null;
  /** Estimate Sls Id (string) */
  excede_part_order_estimate_sls_id: string | null;
  /** FOB (string) */
  excede_part_order_fob: string | null;
  /** Id (excede_part_order_id) (string) · upsert key */
  excede_part_order_id: string | null;
  /** Invoice Sls Id (excede_part_order_invoice_sls_id) (string) */
  excede_part_order_invoice_sls_id: string | null;
  /** Je Id (excede_part_order_je_id) (string) */
  excede_part_order_je_id: string | null;
  /** Posted (excede_part_order_posted) (string) */
  excede_part_order_posted: string | null;
  /** Ship Addr1 (string) */
  excede_part_order_ship_addr1: string | null;
  /** Ship Addr2 (string) */
  excede_part_order_ship_addr2: string | null;
  /** Ship City (string) */
  excede_part_order_ship_city: string | null;
  /** Ship County (string) */
  excede_part_order_ship_county: string | null;
  /** Ship Phone1 (string) */
  excede_part_order_ship_phone1: string | null;
  /** Ship Post (string) */
  excede_part_order_ship_post: string | null;
  /** Ship State (string) */
  excede_part_order_ship_state: string | null;
  /** Shp Id (string) */
  excede_part_order_shp_id: string | null;
  /** Sls Typ Id (excede_part_order_sls_typ_id) (string) */
  excede_part_order_sls_typ_id: string | null;
  /** Status (excede_part_order_status) (string) */
  excede_part_order_status: string | null;
  /** Tax Id (excede_part_order_tax_id) (string) */
  excede_part_order_tax_id: string | null;
  /** Trm Id (excede_part_order_trm_id) (string) */
  excede_part_order_trm_id: string | null;
  /** TS (excede_part_order_ts) (string) */
  excede_part_order_ts: string | null;
  /** Unt Id (string) */
  excede_part_order_unt_id: string | null;
  /** Vin (string) */
  excede_part_order_vin: string | null;
  /** Waybill Num (string) */
  excede_part_order_waybill_num: string | null;
  /** Amt Cost Labor (number) */
  excede_service_order_header_amt_cost_labor: string | null;
  /** Amt Cost Labor Other (number) */
  excede_service_order_header_amt_cost_labor_other: string | null;
  /** Amt Cost Misc (number) */
  excede_service_order_header_amt_cost_misc: string | null;
  /** Amt Cost Misc Other (number) */
  excede_service_order_header_amt_cost_misc_other: string | null;
  /** Amt Cost Parts (number) */
  excede_service_order_header_amt_cost_parts: string | null;
  /** Amt Cost Parts Other (number) */
  excede_service_order_header_amt_cost_parts_other: string | null;
  /** Amt Cost Sublet (number) */
  excede_service_order_header_amt_cost_sublet: string | null;
  /** Amt Cost Sublet Other (number) */
  excede_service_order_header_amt_cost_sublet_other: string | null;
  /** Amt Cost Subtotal (number) */
  excede_service_order_header_amt_cost_subtotal: string | null;
  /** Amt Cost Subtotal Other (number) */
  excede_service_order_header_amt_cost_subtotal_other: string | null;
  /** Amt Diagnostic (number) */
  excede_service_order_header_amt_diagnostic: string | null;
  /** Amt Disc (excede_service_order_header_amt_disc) (number) */
  excede_service_order_header_amt_disc: string | null;
  /** Amt Estimate (number) */
  excede_service_order_header_amt_estimate: string | null;
  /** Amt Estimate Revised (number) */
  excede_service_order_header_amt_estimate_revised: string | null;
  /** Amt Labor (number) */
  excede_service_order_header_amt_labor: string | null;
  /** Amt Labor Other (number) */
  excede_service_order_header_amt_labor_other: string | null;
  /** Amt Misc (number) */
  excede_service_order_header_amt_misc: string | null;
  /** Amt Misc Other (number) */
  excede_service_order_header_amt_misc_other: string | null;
  /** Amt Parts (number) */
  excede_service_order_header_amt_parts: string | null;
  /** Amt Parts Other (number) */
  excede_service_order_header_amt_parts_other: string | null;
  /** Amt Sublet (number) */
  excede_service_order_header_amt_sublet: string | null;
  /** Amt Sublet Other (number) */
  excede_service_order_header_amt_sublet_other: string | null;
  /** Amt Subtotal Other (number) */
  excede_service_order_header_amt_subtotal_other: string | null;
  /** Amt Supplies (number) */
  excede_service_order_header_amt_supplies: string | null;
  /** Amt Tax1 (excede_service_order_header_amt_tax1) (number) */
  excede_service_order_header_amt_tax1: string | null;
  /** Amt Tax2 (excede_service_order_header_amt_tax2) (number) */
  excede_service_order_header_amt_tax2: string | null;
  /** Bill Addr1 (string) */
  excede_service_order_header_bill_addr1: string | null;
  /** Bill Addr2 (string) */
  excede_service_order_header_bill_addr2: string | null;
  /** Bill City (string) */
  excede_service_order_header_bill_city: string | null;
  /** Bill County (string) */
  excede_service_order_header_bill_county: string | null;
  /** Bill Cus Id (excede_service_order_header_bill_cus_id) (string) */
  excede_service_order_header_bill_cus_id: string | null;
  /** Bill Cus Name (excede_service_order_header_bill_cus_name) (string) */
  excede_service_order_header_bill_cus_name: string | null;
  /** Bill Post (string) */
  excede_service_order_header_bill_post: string | null;
  /** Bill State (string) */
  excede_service_order_header_bill_state: string | null;
  /** Brn Id (excede_service_order_header_branch_id) (string) */
  excede_service_order_header_branch_id: string | null;
  /** Comeback (string) */
  excede_service_order_header_comeback: string | null;
  /** Count Jobs (number) */
  excede_service_order_header_count_jobs: string | null;
  /** Count Jobs Incomplete (number) */
  excede_service_order_header_count_jobs_incomplete: string | null;
  /** Count Jobs Incomplete Other (number) */
  excede_service_order_header_count_jobs_incomplete_other: string | null;
  /** Count Jobs Other (number) */
  excede_service_order_header_count_jobs_other: string | null;
  /** Cus Id (excede_service_order_header_cus_id) (string) */
  excede_service_order_header_cus_id: string | null;
  /** Cus Name (excede_service_order_header_cus_name) (string) */
  excede_service_order_header_cus_name: string | null;
  /** Cus Phone1 (excede_service_order_header_cus_phone1) (string) */
  excede_service_order_header_cus_phone1: string | null;
  /** Date Authorize (datetime) */
  excede_service_order_header_date_authorize: string | null;
  /** Date Create (excede_service_order_header_date_create) (datetime) */
  excede_service_order_header_date_create: string | null;
  /** Date Disc (excede_service_order_header_date_disc) (datetime) */
  excede_service_order_header_date_disc: string | null;
  /** Date Due (excede_service_order_header_date_due) (datetime) */
  excede_service_order_header_date_due: string | null;
  /** Date Expire (excede_service_order_header_date_expire) (datetime) */
  excede_service_order_header_date_expire: string | null;
  /** Date Notify Complete (datetime) */
  excede_service_order_header_date_notify_complete: string | null;
  /** Date Notify Diag (datetime) */
  excede_service_order_header_date_notify_diag: string | null;
  /** Date Open (datetime) */
  excede_service_order_header_date_open: string | null;
  /** Date Promise (datetime) */
  excede_service_order_header_date_promise: string | null;
  /** Date Schedule (datetime) */
  excede_service_order_header_date_schedule: string | null;
  /** Date Update (excede_service_order_header_date_update) (datetime) */
  excede_service_order_header_date_update: string | null;
  /** Date Vin Arrive (datetime) */
  excede_service_order_header_date_vin_arrive: string | null;
  /** Diagnostic Auto (string) */
  excede_service_order_header_diagnostic_auto: string | null;
  /** Diagnostic Tax Id (string) */
  excede_service_order_header_diagnostic_tax_id: string | null;
  /** Email (excede_service_order_header_email) (string) */
  excede_service_order_header_email: string | null;
  /** Emp Id (excede_service_order_header_emp_id) (string) */
  excede_service_order_header_emp_id: string | null;
  /** Emp Id Rev (excede_service_order_header_emp_id_rev) (string) */
  excede_service_order_header_emp_id_rev: string | null;
  /** Emp Id Spn (excede_service_order_header_emp_id_spn) (string) */
  excede_service_order_header_emp_id_spn: string | null;
  /** Emp Id Writer (string) */
  excede_service_order_header_emp_id_writer: string | null;
  /** Estimate (excede_service_order_header_estimate) (string) */
  excede_service_order_header_estimate: string | null;
  /** Estimate Sls Id (excede_service_order_header_estimate_sls_id) (string) */
  excede_service_order_header_estimate_sls_id: string | null;
  /** Fleet Unt Id (string) */
  excede_service_order_header_fleet_unt_id: string | null;
  /** Hrs Actual (number) */
  excede_service_order_header_hrs_actual: string | null;
  /** Hrs Actual Other (number) */
  excede_service_order_header_hrs_actual_other: string | null;
  /** Hrs Bill (number) */
  excede_service_order_header_hrs_bill: string | null;
  /** Hrs Bill Other (number) */
  excede_service_order_header_hrs_bill_other: string | null;
  /** Hrs Cost (number) */
  excede_service_order_header_hrs_cost: string | null;
  /** Hrs Cost Other (number) */
  excede_service_order_header_hrs_cost_other: string | null;
  /** Hrs Engine (number) */
  excede_service_order_header_hrs_engine: string | null;
  /** Hrs Flat (number) */
  excede_service_order_header_hrs_flat: string | null;
  /** Hrs Flat Other (number) */
  excede_service_order_header_hrs_flat_other: string | null;
  /** Id (excede_service_order_header_id) (string) · upsert key */
  excede_service_order_header_id: string | null;
  /** Invoice Sls Id (excede_service_order_header_invoice_sls_id) (string) */
  excede_service_order_header_invoice_sls_id: string | null;
  /** Je Id (excede_service_order_header_je_id) (string) */
  excede_service_order_header_je_id: string | null;
  /** Odom In (number) */
  excede_service_order_header_odom_in: string | null;
  /** Odom Out (number) */
  excede_service_order_header_odom_out: string | null;
  /** Posted (excede_service_order_header_posted) (string) */
  excede_service_order_header_posted: string | null;
  /** Prepared Preferred Customer Contact Id (excede_service_order_header_preferred_contact_id) (string) */
  excede_service_order_header_preferred_contact_id: string | null;
  /** Priority (excede_service_order_header_priority) (string) */
  excede_service_order_header_priority: string | null;
  /** Ref (excede_service_order_header_ref) (string) */
  excede_service_order_header_ref: string | null;
  /** Sls Typ Id (excede_service_order_header_sls_typ_id) (string) */
  excede_service_order_header_sls_typ_id: string | null;
  /** Status (excede_service_order_header_status) (string) */
  excede_service_order_header_status: string | null;
  /** Supplies Auto (string) */
  excede_service_order_header_supplies_auto: string | null;
  /** Supplies Tax Id (string) */
  excede_service_order_header_supplies_tax_id: string | null;
  /** Tag (string) */
  excede_service_order_header_tag: string | null;
  /** Tax Id (excede_service_order_header_tax_id) (string) */
  excede_service_order_header_tax_id: string | null;
  /** Trm Id (excede_service_order_header_trm_id) (string) */
  excede_service_order_header_trm_id: string | null;
  /** TS (excede_service_order_header_ts) (string) */
  excede_service_order_header_ts: string | null;
  /** Unt Id (excede_service_order_header_unt_id) (string) */
  excede_service_order_header_unt_id: string | null;
  /** Vin (excede_service_order_header_vin) (string) */
  excede_service_order_header_vin: string | null;
  /** Wait (string) */
  excede_service_order_header_wait: string | null;
  /** Amt Back Gross Profit (number) */
  excede_vehicle_sale_header_amt_back_gross_profit: string | null;
  /** Amt Front Gross Profit (number) */
  excede_vehicle_sale_header_amt_front_gross_profit: string | null;
  /** Amt Gross Cost (number) */
  excede_vehicle_sale_header_amt_gross_cost: string | null;
  /** Amt Gross Profit (number) */
  excede_vehicle_sale_header_amt_gross_profit: string | null;
  /** Amt Our Cost (number) */
  excede_vehicle_sale_header_amt_our_cost: string | null;
  /** Amt Pickup1 (number) */
  excede_vehicle_sale_header_amt_pickup1: string | null;
  /** Amt Pickup2 (number) */
  excede_vehicle_sale_header_amt_pickup2: string | null;
  /** Amt Pickup3 (number) */
  excede_vehicle_sale_header_amt_pickup3: string | null;
  /** Brn Id (string) */
  excede_vehicle_sale_header_branch_id: string | null;
  /** Cus Addr1 (string) */
  excede_vehicle_sale_header_cus_addr1: string | null;
  /** Cus Addr2 (string) */
  excede_vehicle_sale_header_cus_addr2: string | null;
  /** Cus City (string) */
  excede_vehicle_sale_header_cus_city: string | null;
  /** Cus County (string) */
  excede_vehicle_sale_header_cus_county: string | null;
  /** Cus Driver License (string) */
  excede_vehicle_sale_header_cus_driver_license: string | null;
  /** Cus Driver License Cosign (string) */
  excede_vehicle_sale_header_cus_driver_license_cosign: string | null;
  /** Cus Id (excede_vehicle_sale_header_cus_id) (string) */
  excede_vehicle_sale_header_cus_id: string | null;
  /** Cus Name Cosign (string) */
  excede_vehicle_sale_header_cus_name_cosign: string | null;
  /** Cus Non Resident Military (string) */
  excede_vehicle_sale_header_cus_non_resident_military: string | null;
  /** Cus Post (string) */
  excede_vehicle_sale_header_cus_post: string | null;
  /** Cus State (string) */
  excede_vehicle_sale_header_cus_state: string | null;
  /** Cus Email (string) */
  excede_vehicle_sale_header_customer_email: string | null;
  /** Cus Name (string) */
  excede_vehicle_sale_header_customer_name: string | null;
  /** Date Create (datetime) */
  excede_vehicle_sale_header_date_create: string | null;
  /** Date Deliver (datetime) */
  excede_vehicle_sale_header_date_deliver: string | null;
  /** Date Expire (datetime) */
  excede_vehicle_sale_header_date_expire: string | null;
  /** Date Payment (datetime) */
  excede_vehicle_sale_header_date_payment: string | null;
  /** Date Pickup1 (datetime) */
  excede_vehicle_sale_header_date_pickup1: string | null;
  /** Date Pickup2 (datetime) */
  excede_vehicle_sale_header_date_pickup2: string | null;
  /** Date Pickup3 (datetime) */
  excede_vehicle_sale_header_date_pickup3: string | null;
  /** Date Update (excede_vehicle_sale_header_date_update) (datetime) */
  excede_vehicle_sale_header_date_update: string | null;
  /** Days To Payment (string) */
  excede_vehicle_sale_header_days_to_payment: string | null;
  /** Emp Id (string) */
  excede_vehicle_sale_header_emp_id: string | null;
  /** Emp Id Fin (string) */
  excede_vehicle_sale_header_emp_id_fin: string | null;
  /** Emp Id Mgr (string) */
  excede_vehicle_sale_header_emp_id_mgr: string | null;
  /** Emp Id Mgr Spn1 (string) */
  excede_vehicle_sale_header_emp_id_mgr_spn1: string | null;
  /** Emp Id Mgr Spn2 (string) */
  excede_vehicle_sale_header_emp_id_mgr_spn2: string | null;
  /** Emp Id Spn1 (string) */
  excede_vehicle_sale_header_emp_id_spn1: string | null;
  /** Emp Id Spn2 (string) */
  excede_vehicle_sale_header_emp_id_spn2: string | null;
  /** Id (string) · upsert key */
  excede_vehicle_sale_header_id: string | null;
  /** Je Id (string) */
  excede_vehicle_sale_header_je_id: string | null;
  /** Len Id (string) */
  excede_vehicle_sale_header_len_id: string | null;
  /** Len Name (string) */
  excede_vehicle_sale_header_len_name: string | null;
  /** Pct Tax Rate (number) */
  excede_vehicle_sale_header_pct_tax_rate: string | null;
  /** Posted (string) */
  excede_vehicle_sale_header_posted: string | null;
  /** Primary Use (string) */
  excede_vehicle_sale_header_primary_use: string | null;
  /** Ref (string) */
  excede_vehicle_sale_header_ref: string | null;
  /** Sls Misc1 (string) */
  excede_vehicle_sale_header_sls_misc1: string | null;
  /** Sls Misc10 (string) */
  excede_vehicle_sale_header_sls_misc10: string | null;
  /** Sls Misc11 (string) */
  excede_vehicle_sale_header_sls_misc11: string | null;
  /** Sls Misc12 (string) */
  excede_vehicle_sale_header_sls_misc12: string | null;
  /** Sls Misc13 (string) */
  excede_vehicle_sale_header_sls_misc13: string | null;
  /** Sls Misc14 (string) */
  excede_vehicle_sale_header_sls_misc14: string | null;
  /** Sls Misc15 (string) */
  excede_vehicle_sale_header_sls_misc15: string | null;
  /** Sls Misc16 (string) */
  excede_vehicle_sale_header_sls_misc16: string | null;
  /** Sls Misc17 (string) */
  excede_vehicle_sale_header_sls_misc17: string | null;
  /** Sls Misc18 (string) */
  excede_vehicle_sale_header_sls_misc18: string | null;
  /** Sls Misc19 (string) */
  excede_vehicle_sale_header_sls_misc19: string | null;
  /** Sls Misc2 (string) */
  excede_vehicle_sale_header_sls_misc2: string | null;
  /** Sls Misc20 (string) */
  excede_vehicle_sale_header_sls_misc20: string | null;
  /** Sls Misc21 (string) */
  excede_vehicle_sale_header_sls_misc21: string | null;
  /** Sls Misc22 (string) */
  excede_vehicle_sale_header_sls_misc22: string | null;
  /** Sls Misc23 (string) */
  excede_vehicle_sale_header_sls_misc23: string | null;
  /** Sls Misc24 (string) */
  excede_vehicle_sale_header_sls_misc24: string | null;
  /** Sls Misc25 (string) */
  excede_vehicle_sale_header_sls_misc25: string | null;
  /** Sls Misc26 (string) */
  excede_vehicle_sale_header_sls_misc26: string | null;
  /** Sls Misc27 (string) */
  excede_vehicle_sale_header_sls_misc27: string | null;
  /** Sls Misc28 (string) */
  excede_vehicle_sale_header_sls_misc28: string | null;
  /** Sls Misc29 (string) */
  excede_vehicle_sale_header_sls_misc29: string | null;
  /** Sls Misc3 (string) */
  excede_vehicle_sale_header_sls_misc3: string | null;
  /** Sls Misc30 (string) */
  excede_vehicle_sale_header_sls_misc30: string | null;
  /** Sls Misc31 (string) */
  excede_vehicle_sale_header_sls_misc31: string | null;
  /** Sls Misc32 (string) */
  excede_vehicle_sale_header_sls_misc32: string | null;
  /** Sls Misc33 (string) */
  excede_vehicle_sale_header_sls_misc33: string | null;
  /** Sls Misc34 (string) */
  excede_vehicle_sale_header_sls_misc34: string | null;
  /** Sls Misc35 (string) */
  excede_vehicle_sale_header_sls_misc35: string | null;
  /** Sls Misc36 (string) */
  excede_vehicle_sale_header_sls_misc36: string | null;
  /** Sls Misc37 (string) */
  excede_vehicle_sale_header_sls_misc37: string | null;
  /** Sls Misc38 (string) */
  excede_vehicle_sale_header_sls_misc38: string | null;
  /** Sls Misc39 (string) */
  excede_vehicle_sale_header_sls_misc39: string | null;
  /** Sls Misc4 (string) */
  excede_vehicle_sale_header_sls_misc4: string | null;
  /** Sls Misc40 (string) */
  excede_vehicle_sale_header_sls_misc40: string | null;
  /** Sls Misc5 (string) */
  excede_vehicle_sale_header_sls_misc5: string | null;
  /** Sls Misc6 (string) */
  excede_vehicle_sale_header_sls_misc6: string | null;
  /** Sls Misc7 (string) */
  excede_vehicle_sale_header_sls_misc7: string | null;
  /** Sls Misc8 (string) */
  excede_vehicle_sale_header_sls_misc8: string | null;
  /** Sls Misc9 (string) */
  excede_vehicle_sale_header_sls_misc9: string | null;
  /** Sls Typ Id (string) */
  excede_vehicle_sale_header_sls_typ_id: string | null;
  /** Status (string) */
  excede_vehicle_sale_header_status: string | null;
  /** Tax Id (string) */
  excede_vehicle_sale_header_tax_id: string | null;
  /** Trade1 Make (string) */
  excede_vehicle_sale_header_trade1_make: string | null;
  /** Trade1 Model (string) */
  excede_vehicle_sale_header_trade1_model: string | null;
  /** Trade1 Model Year (string) */
  excede_vehicle_sale_header_trade1_model_year: string | null;
  /** Trade1 Odom (string) */
  excede_vehicle_sale_header_trade1_odom: string | null;
  /** Trade1 Unt Id (string) */
  excede_vehicle_sale_header_trade1_unt_id: string | null;
  /** Trade1 Vin (string) */
  excede_vehicle_sale_header_trade1_vin: string | null;
  /** Trade2 Make (string) */
  excede_vehicle_sale_header_trade2_make: string | null;
  /** Trade2 Model (string) */
  excede_vehicle_sale_header_trade2_model: string | null;
  /** Trade2 Model Year (string) */
  excede_vehicle_sale_header_trade2_model_year: string | null;
  /** Trade2 Odom (string) */
  excede_vehicle_sale_header_trade2_odom: string | null;
  /** Trade2 Unt Id (string) */
  excede_vehicle_sale_header_trade2_unt_id: string | null;
  /** Trade2 Vin (string) */
  excede_vehicle_sale_header_trade2_vin: string | null;
  /** TS (excede_vehicle_sale_header_ts) (string) */
  excede_vehicle_sale_header_ts: string | null;
  /** Typ (string) */
  excede_vehicle_sale_header_typ: string | null;
  /** Unwind (string) */
  excede_vehicle_sale_header_unwind: string | null;
  /** Vehicle Condition (string) */
  excede_vehicle_sale_header_vehicle_condition: string | null;
  /** Vehicle Cylinders (string) */
  excede_vehicle_sale_header_vehicle_cylinders: string | null;
  /** Vehicle GVWR (string) */
  excede_vehicle_sale_header_vehicle_gvwr: string | null;
  /** Vehicle Make (string) */
  excede_vehicle_sale_header_vehicle_make: string | null;
  /** Vehicle Marketability (string) */
  excede_vehicle_sale_header_vehicle_marketability: string | null;
  /** Vehicle Model (string) */
  excede_vehicle_sale_header_vehicle_model: string | null;
  /** Vehicle Model Year (string) */
  excede_vehicle_sale_header_vehicle_model_year: string | null;
  /** Vehicle Odom (string) */
  excede_vehicle_sale_header_vehicle_odom: string | null;
  /** Vehicle Typ Id (string) */
  excede_vehicle_sale_header_vehicle_typ_id: string | null;
  /** Vehicle Unt Id (string) */
  excede_vehicle_sale_header_vehicle_unt_id: string | null;
  /** Vehicle Vin (string) */
  excede_vehicle_sale_header_vehicle_vin: string | null;
  /** Amt Back Gross Profit (excede_vehicle_sale_lease_amt_back_gross_profit) (number) */
  excede_vehicle_sale_lease_amt_back_gross_profit: string | null;
  /** Amt Bank (number) */
  excede_vehicle_sale_lease_amt_bank: string | null;
  /** Amt Buy Money Ftr (number) */
  excede_vehicle_sale_lease_amt_buy_money_ftr: string | null;
  /** Amt Cap Adds (number) */
  excede_vehicle_sale_lease_amt_cap_adds: string | null;
  /** Amt Cap Agreed Upon Value (number) */
  excede_vehicle_sale_lease_amt_cap_agreed_upon_value: string | null;
  /** Amt Cap Cost Adj (number) */
  excede_vehicle_sale_lease_amt_cap_cost_adj: string | null;
  /** Amt Cap Cost Gross (number) */
  excede_vehicle_sale_lease_amt_cap_cost_gross: string | null;
  /** Amt Cap Credit Life Insurance (number) */
  excede_vehicle_sale_lease_amt_cap_credit_life_insurance: string | null;
  /** Amt Cap Disability Insurance (number) */
  excede_vehicle_sale_lease_amt_cap_disability_insurance: string | null;
  /** Amt Cap Fee Acquisition (number) */
  excede_vehicle_sale_lease_amt_cap_fee_acquisition: string | null;
  /** Amt Cap Fee DMV (number) */
  excede_vehicle_sale_lease_amt_cap_fee_dmv: string | null;
  /** Amt Cap Fee Doc (number) */
  excede_vehicle_sale_lease_amt_cap_fee_doc: string | null;
  /** Amt Cap Fee Doc Tax (number) */
  excede_vehicle_sale_lease_amt_cap_fee_doc_tax: string | null;
  /** Amt Cap Guaranteed Auto Protection (number) */
  excede_vehicle_sale_lease_amt_cap_guaranteed_auto_protection: string | null;
  /** Amt Cap Ipos (number) */
  excede_vehicle_sale_lease_amt_cap_ipos: string | null;
  /** Amt Cap Luxury Tax (number) */
  excede_vehicle_sale_lease_amt_cap_luxury_tax: string | null;
  /** Amt Cap Other1 (number) */
  excede_vehicle_sale_lease_amt_cap_other1: string | null;
  /** Amt Cap Other2 (number) */
  excede_vehicle_sale_lease_amt_cap_other2: string | null;
  /** Amt Cap Other3 (number) */
  excede_vehicle_sale_lease_amt_cap_other3: string | null;
  /** Amt Cap Other4 (number) */
  excede_vehicle_sale_lease_amt_cap_other4: string | null;
  /** Amt Cap Other5 (number) */
  excede_vehicle_sale_lease_amt_cap_other5: string | null;
  /** Amt Cap Prior Credit (number) */
  excede_vehicle_sale_lease_amt_cap_prior_credit: string | null;
  /** Amt Cap Selling Price (number) */
  excede_vehicle_sale_lease_amt_cap_selling_price: string | null;
  /** Amt Cap Service Contracts (number) */
  excede_vehicle_sale_lease_amt_cap_service_contracts: string | null;
  /** Amt Commission Fin (number) */
  excede_vehicle_sale_lease_amt_commission_fin: string | null;
  /** Amt Commission Mgr (number) */
  excede_vehicle_sale_lease_amt_commission_mgr: string | null;
  /** Amt Commission Mgr Spn1 (number) */
  excede_vehicle_sale_lease_amt_commission_mgr_spn1: string | null;
  /** Amt Commission Mgr Spn2 (number) */
  excede_vehicle_sale_lease_amt_commission_mgr_spn2: string | null;
  /** Amt Commission Spn1 (number) */
  excede_vehicle_sale_lease_amt_commission_spn1: string | null;
  /** Amt Commission Spn2 (number) */
  excede_vehicle_sale_lease_amt_commission_spn2: string | null;
  /** Amt Cost Adds (number) */
  excede_vehicle_sale_lease_amt_cost_adds: string | null;
  /** Amt Cost Credit Life Insurance (number) */
  excede_vehicle_sale_lease_amt_cost_credit_life_insurance: string | null;
  /** Amt Cost Disability Insurance (number) */
  excede_vehicle_sale_lease_amt_cost_disability_insurance: string | null;
  /** Amt Cost Guaranteed Auto Protection (number) */
  excede_vehicle_sale_lease_amt_cost_guaranteed_auto_protection: string | null;
  /** Amt Cost Ipos (number) */
  excede_vehicle_sale_lease_amt_cost_ipos: string | null;
  /** Amt Cost Service Contracts (number) */
  excede_vehicle_sale_lease_amt_cost_service_contracts: string | null;
  /** Amt Due (number) */
  excede_vehicle_sale_lease_amt_due: string | null;
  /** Amt Due Cap Cost Red (number) */
  excede_vehicle_sale_lease_amt_due_cap_cost_red: string | null;
  /** Amt Due Cap Cost Red Tax (number) */
  excede_vehicle_sale_lease_amt_due_cap_cost_red_tax: string | null;
  /** Amt Due Fee Acquisition (number) */
  excede_vehicle_sale_lease_amt_due_fee_acquisition: string | null;
  /** Amt Due Fee DMV (number) */
  excede_vehicle_sale_lease_amt_due_fee_dmv: string | null;
  /** Amt Due Fee Doc (number) */
  excede_vehicle_sale_lease_amt_due_fee_doc: string | null;
  /** Amt Due Fee Doc Tax (number) */
  excede_vehicle_sale_lease_amt_due_fee_doc_tax: string | null;
  /** Amt Due How (number) */
  excede_vehicle_sale_lease_amt_due_how: string | null;
  /** Amt Due Other1 (number) */
  excede_vehicle_sale_lease_amt_due_other1: string | null;
  /** Amt Due Other2 (number) */
  excede_vehicle_sale_lease_amt_due_other2: string | null;
  /** Amt Due Other3 (number) */
  excede_vehicle_sale_lease_amt_due_other3: string | null;
  /** Amt Due Other4 (number) */
  excede_vehicle_sale_lease_amt_due_other4: string | null;
  /** Amt Due Other5 (number) */
  excede_vehicle_sale_lease_amt_due_other5: string | null;
  /** Amt Due Security Deposit (number) */
  excede_vehicle_sale_lease_amt_due_security_deposit: string | null;
  /** Amt Fee Termination (number) */
  excede_vehicle_sale_lease_amt_fee_termination: string | null;
  /** Amt Front Gross Profit (excede_vehicle_sale_lease_amt_front_gross_profit) (number) */
  excede_vehicle_sale_lease_amt_front_gross_profit: string | null;
  /** Amt Gross Cost (excede_vehicle_sale_lease_amt_gross_cost) (number) */
  excede_vehicle_sale_lease_amt_gross_cost: string | null;
  /** Amt Gross Profit (excede_vehicle_sale_lease_amt_gross_profit) (number) */
  excede_vehicle_sale_lease_amt_gross_profit: string | null;
  /** Amt Hold Back (number) */
  excede_vehicle_sale_lease_amt_hold_back: string | null;
  /** Amt How Cash Down (number) */
  excede_vehicle_sale_lease_amt_how_cash_down: string | null;
  /** Amt How Other1 (number) */
  excede_vehicle_sale_lease_amt_how_other1: string | null;
  /** Amt How Participation (number) */
  excede_vehicle_sale_lease_amt_how_participation: string | null;
  /** Amt How Rebates (number) */
  excede_vehicle_sale_lease_amt_how_rebates: string | null;
  /** Amt Incentive (number) */
  excede_vehicle_sale_lease_amt_incentive: string | null;
  /** Amt Our Cost (excede_vehicle_sale_lease_amt_our_cost) (number) */
  excede_vehicle_sale_lease_amt_our_cost: string | null;
  /** Amt Pmt (number) */
  excede_vehicle_sale_lease_amt_pmt: string | null;
  /** Amt Pmt Base (number) */
  excede_vehicle_sale_lease_amt_pmt_base: string | null;
  /** Amt Pmt Depreciation (number) */
  excede_vehicle_sale_lease_amt_pmt_depreciation: string | null;
  /** Amt Pmt Money Ftr (number) */
  excede_vehicle_sale_lease_amt_pmt_money_ftr: string | null;
  /** Amt Pmt Rent (number) */
  excede_vehicle_sale_lease_amt_pmt_rent: string | null;
  /** Amt Pmt Tax (number) */
  excede_vehicle_sale_lease_amt_pmt_tax: string | null;
  /** Amt Pmt Term (number) */
  excede_vehicle_sale_lease_amt_pmt_term: string | null;
  /** Amt Res Actual (number) */
  excede_vehicle_sale_lease_amt_res_actual: string | null;
  /** Amt Res Adds (number) */
  excede_vehicle_sale_lease_amt_res_adds: string | null;
  /** Amt Res Base Mileage (number) */
  excede_vehicle_sale_lease_amt_res_base_mileage: string | null;
  /** Amt Res Excess Charge (number) */
  excede_vehicle_sale_lease_amt_res_excess_charge: string | null;
  /** Amt Res Excess Mileage (number) */
  excede_vehicle_sale_lease_amt_res_excess_mileage: string | null;
  /** Amt Res Excess Rate (number) */
  excede_vehicle_sale_lease_amt_res_excess_rate: string | null;
  /** Amt Res Gross (number) */
  excede_vehicle_sale_lease_amt_res_gross: string | null;
  /** Amt Res Inception Charge (number) */
  excede_vehicle_sale_lease_amt_res_inception_charge: string | null;
  /** Amt Res Inception Mileage (number) */
  excede_vehicle_sale_lease_amt_res_inception_mileage: string | null;
  /** Amt Res Inception Rate (number) */
  excede_vehicle_sale_lease_amt_res_inception_rate: string | null;
  /** Amt Res Ipos (number) */
  excede_vehicle_sale_lease_amt_res_ipos: string | null;
  /** Amt Res MSRP (number) */
  excede_vehicle_sale_lease_amt_res_msrp: string | null;
  /** Amt Res MSRPAdj (number) */
  excede_vehicle_sale_lease_amt_res_msrpadj: string | null;
  /** Amt Res Pkg Disc (number) */
  excede_vehicle_sale_lease_amt_res_pkg_disc: string | null;
  /** Amt Res Rate (number) */
  excede_vehicle_sale_lease_amt_res_rate: string | null;
  /** Amt Reserve (number) */
  excede_vehicle_sale_lease_amt_reserve: string | null;
  /** Amt Trade1 Actual (number) */
  excede_vehicle_sale_lease_amt_trade1_actual: string | null;
  /** Amt Trade1 Allowance (number) */
  excede_vehicle_sale_lease_amt_trade1_allowance: string | null;
  /** Amt Trade1 Lien (number) */
  excede_vehicle_sale_lease_amt_trade1_lien: string | null;
  /** Amt Trade2 Actual (number) */
  excede_vehicle_sale_lease_amt_trade2_actual: string | null;
  /** Amt Trade2 Allowance (number) */
  excede_vehicle_sale_lease_amt_trade2_allowance: string | null;
  /** Amt Trade2 Lien (number) */
  excede_vehicle_sale_lease_amt_trade2_lien: string | null;
  /** Amt Trade Equity (number) */
  excede_vehicle_sale_lease_amt_trade_equity: string | null;
  /** Cap Other1 (string) */
  excede_vehicle_sale_lease_cap_other1: string | null;
  /** Cap Other2 (string) */
  excede_vehicle_sale_lease_cap_other2: string | null;
  /** Cap Other3 (string) */
  excede_vehicle_sale_lease_cap_other3: string | null;
  /** Cap Other4 (string) */
  excede_vehicle_sale_lease_cap_other4: string | null;
  /** Cap Other5 (string) */
  excede_vehicle_sale_lease_cap_other5: string | null;
  /** Date Update (excede_vehicle_sale_lease_date_update) (datetime) */
  excede_vehicle_sale_lease_date_update: string | null;
  /** Due Other1 (string) */
  excede_vehicle_sale_lease_due_other1: string | null;
  /** Due Other2 (string) */
  excede_vehicle_sale_lease_due_other2: string | null;
  /** Due Other3 (string) */
  excede_vehicle_sale_lease_due_other3: string | null;
  /** Due Other4 (string) */
  excede_vehicle_sale_lease_due_other4: string | null;
  /** Due Other5 (string) */
  excede_vehicle_sale_lease_due_other5: string | null;
  /** Function Flags (string) */
  excede_vehicle_sale_lease_function_flags: string | null;
  /** Prepared Vehicle Sale Header Customer Id (string) */
  excede_vehicle_sale_lease_header_customer_id: string | null;
  /** Prepared Vehicle Sale Header Id (string) */
  excede_vehicle_sale_lease_header_id: string | null;
  /** Prepared Vehicle Sale Header Vehicle Id (string) */
  excede_vehicle_sale_lease_header_vehicle_id: string | null;
  /** How Other1 (string) */
  excede_vehicle_sale_lease_how_other1: string | null;
  /** Id (excede_vehicle_sale_lease_id) (string) · upsert key */
  excede_vehicle_sale_lease_id: string | null;
  /** Sls Id (string) */
  excede_vehicle_sale_lease_sls_id: string | null;
  /** Status (excede_vehicle_sale_lease_status) (string) */
  excede_vehicle_sale_lease_status: string | null;
  /** TS (excede_vehicle_sale_lease_ts) (string) */
  excede_vehicle_sale_lease_ts: string | null;
  /** Amt Adds (number) */
  excede_vehicle_sale_multiple_amt_adds: string | null;
  /** Amt Cash Down (number) */
  excede_vehicle_sale_multiple_amt_cash_down: string | null;
  /** Amt Commission Spn1 (excede_vehicle_sale_multiple_amt_commission_spn1) (number) */
  excede_vehicle_sale_multiple_amt_commission_spn1: string | null;
  /** Amt Excise Tax (number) */
  excede_vehicle_sale_multiple_amt_excise_tax: string | null;
  /** Amt Fee Battery (number) */
  excede_vehicle_sale_multiple_amt_fee_battery: string | null;
  /** Amt Fee Doc (number) */
  excede_vehicle_sale_multiple_amt_fee_doc: string | null;
  /** Amt Fee Freight (number) */
  excede_vehicle_sale_multiple_amt_fee_freight: string | null;
  /** Amt Fee Inspection (number) */
  excede_vehicle_sale_multiple_amt_fee_inspection: string | null;
  /** Amt Fee License (number) */
  excede_vehicle_sale_multiple_amt_fee_license: string | null;
  /** Amt Fee Registration (number) */
  excede_vehicle_sale_multiple_amt_fee_registration: string | null;
  /** Amt Fee Smog (number) */
  excede_vehicle_sale_multiple_amt_fee_smog: string | null;
  /** Amt Fee Title (number) */
  excede_vehicle_sale_multiple_amt_fee_title: string | null;
  /** Amt Financed (number) */
  excede_vehicle_sale_multiple_amt_financed: string | null;
  /** Amt Gross Profit (excede_vehicle_sale_multiple_amt_gross_profit) (number) */
  excede_vehicle_sale_multiple_amt_gross_profit: string | null;
  /** Amt Gross Profit Estimate (number) */
  excede_vehicle_sale_multiple_amt_gross_profit_estimate: string | null;
  /** Amt Hold Back (excede_vehicle_sale_multiple_amt_hold_back) (number) */
  excede_vehicle_sale_multiple_amt_hold_back: string | null;
  /** Amt Incentive (excede_vehicle_sale_multiple_amt_incentive) (number) */
  excede_vehicle_sale_multiple_amt_incentive: string | null;
  /** Amt Ins Pol Coll Ded (number) */
  excede_vehicle_sale_multiple_amt_ins_pol_coll_ded: string | null;
  /** Amt Ins Pol Comp Ded (number) */
  excede_vehicle_sale_multiple_amt_ins_pol_comp_ded: string | null;
  /** Amt Insurance (number) */
  excede_vehicle_sale_multiple_amt_insurance: string | null;
  /** Amt Ipos (number) */
  excede_vehicle_sale_multiple_amt_ipos: string | null;
  /** Amt Lien (number) */
  excede_vehicle_sale_multiple_amt_lien: string | null;
  /** Amt Our Cost (excede_vehicle_sale_multiple_amt_our_cost) (number) */
  excede_vehicle_sale_multiple_amt_our_cost: string | null;
  /** Amt Our Cost Estimate (number) */
  excede_vehicle_sale_multiple_amt_our_cost_estimate: string | null;
  /** Amt Over Under Allowance (number) */
  excede_vehicle_sale_multiple_amt_over_under_allowance: string | null;
  /** Amt Rebates (number) */
  excede_vehicle_sale_multiple_amt_rebates: string | null;
  /** Amt Reserve (excede_vehicle_sale_multiple_amt_reserve) (number) */
  excede_vehicle_sale_multiple_amt_reserve: string | null;
  /** Amt Service Contracts (number) */
  excede_vehicle_sale_multiple_amt_service_contracts: string | null;
  /** Amt Tax1 (number) */
  excede_vehicle_sale_multiple_amt_tax1: string | null;
  /** Amt Tax2 (number) */
  excede_vehicle_sale_multiple_amt_tax2: string | null;
  /** Amt Tire Credit (number) */
  excede_vehicle_sale_multiple_amt_tire_credit: string | null;
  /** Amt Tire Discount (number) */
  excede_vehicle_sale_multiple_amt_tire_discount: string | null;
  /** Amt Total Down (number) */
  excede_vehicle_sale_multiple_amt_total_down: string | null;
  /** Amt Trade Actual (number) */
  excede_vehicle_sale_multiple_amt_trade_actual: string | null;
  /** Amt Trade Allowance (number) */
  excede_vehicle_sale_multiple_amt_trade_allowance: string | null;
  /** Amt Trade Equity (excede_vehicle_sale_multiple_amt_trade_equity) (number) */
  excede_vehicle_sale_multiple_amt_trade_equity: string | null;
  /** Amt Unit Property Tax (number) */
  excede_vehicle_sale_multiple_amt_unit_property_tax: string | null;
  /** Bill Cus Id (string) */
  excede_vehicle_sale_multiple_bill_cus_id: string | null;
  /** Bill Cus Name (string) */
  excede_vehicle_sale_multiple_bill_cus_name: string | null;
  /** Brn Id (excede_vehicle_sale_multiple_branch_id) (string) */
  excede_vehicle_sale_multiple_branch_id: string | null;
  /** Count Items (number) */
  excede_vehicle_sale_multiple_count_items: string | null;
  /** Cus Addr1 (excede_vehicle_sale_multiple_cus_addr1) (string) */
  excede_vehicle_sale_multiple_cus_addr1: string | null;
  /** Cus Addr1 Cosign (string) */
  excede_vehicle_sale_multiple_cus_addr1_cosign: string | null;
  /** Cus Addr2 (excede_vehicle_sale_multiple_cus_addr2) (string) */
  excede_vehicle_sale_multiple_cus_addr2: string | null;
  /** Cus Addr2 Cosign (string) */
  excede_vehicle_sale_multiple_cus_addr2_cosign: string | null;
  /** Cus City (excede_vehicle_sale_multiple_cus_city) (string) */
  excede_vehicle_sale_multiple_cus_city: string | null;
  /** Cus City Cosign (string) */
  excede_vehicle_sale_multiple_cus_city_cosign: string | null;
  /** Cus County (excede_vehicle_sale_multiple_cus_county) (string) */
  excede_vehicle_sale_multiple_cus_county: string | null;
  /** Cus County Cosign (string) */
  excede_vehicle_sale_multiple_cus_county_cosign: string | null;
  /** Cus Date Birth (string) */
  excede_vehicle_sale_multiple_cus_date_birth: string | null;
  /** Cus Date Birth Cosign (string) */
  excede_vehicle_sale_multiple_cus_date_birth_cosign: string | null;
  /** Cus Id (excede_vehicle_sale_multiple_cus_id) (string) */
  excede_vehicle_sale_multiple_cus_id: string | null;
  /** Cus Name (excede_vehicle_sale_multiple_cus_name) (string) */
  excede_vehicle_sale_multiple_cus_name: string | null;
  /** Cus Name Cosign (excede_vehicle_sale_multiple_cus_name_cosign) (string) */
  excede_vehicle_sale_multiple_cus_name_cosign: string | null;
  /** Cus Phone1 (string) */
  excede_vehicle_sale_multiple_cus_phone1: string | null;
  /** Cus Phone1 Cosign (string) */
  excede_vehicle_sale_multiple_cus_phone1_cosign: string | null;
  /** Cus Post (excede_vehicle_sale_multiple_cus_post) (string) */
  excede_vehicle_sale_multiple_cus_post: string | null;
  /** Cus Post Cosign (string) */
  excede_vehicle_sale_multiple_cus_post_cosign: string | null;
  /** Cus Pur Nbr (string) */
  excede_vehicle_sale_multiple_cus_pur_nbr: string | null;
  /** Cus State (excede_vehicle_sale_multiple_cus_state) (string) */
  excede_vehicle_sale_multiple_cus_state: string | null;
  /** Cus State Cosign (string) */
  excede_vehicle_sale_multiple_cus_state_cosign: string | null;
  /** Date Create (excede_vehicle_sale_multiple_date_create) (datetime) */
  excede_vehicle_sale_multiple_date_create: string | null;
  /** Date Deliver (excede_vehicle_sale_multiple_date_deliver) (datetime) */
  excede_vehicle_sale_multiple_date_deliver: string | null;
  /** Date Due (datetime) */
  excede_vehicle_sale_multiple_date_due: string | null;
  /** Date Update (excede_vehicle_sale_multiple_date_update) (datetime) */
  excede_vehicle_sale_multiple_date_update: string | null;
  /** Email (string) */
  excede_vehicle_sale_multiple_email: string | null;
  /** Emp Id (excede_vehicle_sale_multiple_emp_id) (string) */
  excede_vehicle_sale_multiple_emp_id: string | null;
  /** Emp Id Spn (string) */
  excede_vehicle_sale_multiple_emp_id_spn: string | null;
  /** Id (excede_vehicle_sale_multiple_id) (string) · upsert key */
  excede_vehicle_sale_multiple_id: string | null;
  /** Ins Agent Name (string) */
  excede_vehicle_sale_multiple_ins_agent_name: string | null;
  /** Ins Company (string) */
  excede_vehicle_sale_multiple_ins_company: string | null;
  /** Ins Company Addr1 (string) */
  excede_vehicle_sale_multiple_ins_company_addr1: string | null;
  /** Ins Company Addr2 (string) */
  excede_vehicle_sale_multiple_ins_company_addr2: string | null;
  /** Ins Company City (string) */
  excede_vehicle_sale_multiple_ins_company_city: string | null;
  /** Ins Company Phone1 (string) */
  excede_vehicle_sale_multiple_ins_company_phone1: string | null;
  /** Ins Company Post (string) */
  excede_vehicle_sale_multiple_ins_company_post: string | null;
  /** Ins Company State (string) */
  excede_vehicle_sale_multiple_ins_company_state: string | null;
  /** Ins Pol Date Effect (string) */
  excede_vehicle_sale_multiple_ins_pol_date_effect: string | null;
  /** Ins Pol Date Expire (string) */
  excede_vehicle_sale_multiple_ins_pol_date_expire: string | null;
  /** Ins Pol Nbr (string) */
  excede_vehicle_sale_multiple_ins_pol_nbr: string | null;
  /** Invoice Sls Id (string) */
  excede_vehicle_sale_multiple_invoice_sls_id: string | null;
  /** Je Id (excede_vehicle_sale_multiple_je_id) (string) */
  excede_vehicle_sale_multiple_je_id: string | null;
  /** Mls Misc1 (string) */
  excede_vehicle_sale_multiple_mls_misc1: string | null;
  /** Mls Misc10 (string) */
  excede_vehicle_sale_multiple_mls_misc10: string | null;
  /** Mls Misc11 (string) */
  excede_vehicle_sale_multiple_mls_misc11: string | null;
  /** Mls Misc12 (string) */
  excede_vehicle_sale_multiple_mls_misc12: string | null;
  /** Mls Misc13 (string) */
  excede_vehicle_sale_multiple_mls_misc13: string | null;
  /** Mls Misc14 (string) */
  excede_vehicle_sale_multiple_mls_misc14: string | null;
  /** Mls Misc15 (string) */
  excede_vehicle_sale_multiple_mls_misc15: string | null;
  /** Mls Misc16 (string) */
  excede_vehicle_sale_multiple_mls_misc16: string | null;
  /** Mls Misc17 (string) */
  excede_vehicle_sale_multiple_mls_misc17: string | null;
  /** Mls Misc18 (string) */
  excede_vehicle_sale_multiple_mls_misc18: string | null;
  /** Mls Misc19 (string) */
  excede_vehicle_sale_multiple_mls_misc19: string | null;
  /** Mls Misc2 (string) */
  excede_vehicle_sale_multiple_mls_misc2: string | null;
  /** Mls Misc20 (string) */
  excede_vehicle_sale_multiple_mls_misc20: string | null;
  /** Mls Misc3 (string) */
  excede_vehicle_sale_multiple_mls_misc3: string | null;
  /** Mls Misc4 (string) */
  excede_vehicle_sale_multiple_mls_misc4: string | null;
  /** Mls Misc5 (string) */
  excede_vehicle_sale_multiple_mls_misc5: string | null;
  /** Mls Misc6 (string) */
  excede_vehicle_sale_multiple_mls_misc6: string | null;
  /** Mls Misc7 (string) */
  excede_vehicle_sale_multiple_mls_misc7: string | null;
  /** Mls Misc8 (string) */
  excede_vehicle_sale_multiple_mls_misc8: string | null;
  /** Mls Misc9 (string) */
  excede_vehicle_sale_multiple_mls_misc9: string | null;
  /** Posted (excede_vehicle_sale_multiple_posted) (string) */
  excede_vehicle_sale_multiple_posted: string | null;
  /** Reg Addr1 (string) */
  excede_vehicle_sale_multiple_reg_addr1: string | null;
  /** Reg Addr2 (string) */
  excede_vehicle_sale_multiple_reg_addr2: string | null;
  /** Reg City (string) */
  excede_vehicle_sale_multiple_reg_city: string | null;
  /** Reg County (string) */
  excede_vehicle_sale_multiple_reg_county: string | null;
  /** Reg Name (string) */
  excede_vehicle_sale_multiple_reg_name: string | null;
  /** Reg Post (string) */
  excede_vehicle_sale_multiple_reg_post: string | null;
  /** Reg State (string) */
  excede_vehicle_sale_multiple_reg_state: string | null;
  /** Sls Typ Id (excede_vehicle_sale_multiple_sls_typ_id) (string) */
  excede_vehicle_sale_multiple_sls_typ_id: string | null;
  /** Status (excede_vehicle_sale_multiple_status) (string) */
  excede_vehicle_sale_multiple_status: string | null;
  /** Tax Id (excede_vehicle_sale_multiple_tax_id) (string) */
  excede_vehicle_sale_multiple_tax_id: string | null;
  /** Trm Id (string) */
  excede_vehicle_sale_multiple_trm_id: string | null;
  /** TS (excede_vehicle_sale_multiple_ts) (string) */
  excede_vehicle_sale_multiple_ts: string | null;
  /** Prepared Vehicle Sale Multiple Vehicle Id (string) */
  excede_vehicle_sale_multiple_vehicle_id: string | null;
  /** Rep Branch (enumeration) */
  rep_branch: string | null;
  /** Rep Company Number (enumeration) */
  rep_company_number: string | null;
  /** Rep Department (enumeration) */
  rep_department: string | null;
  /** Rep Division (enumeration) */
  rep_division: string | null;
  /** Rep Region (enumeration) */
  rep_region: string | null;
  /** Rep Stamped At (datetime) */
  rep_stamped_at: string | null;
}
