/**
 * `Company`: the company record shape. Type declarations only.
 *
 * Lists every writable company property in production (150 of 326),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
import type { PrimaryExcedeProperty } from "./crm.types.ts";

export interface Company {
  /** Id (string) · upsert key */
  //NOTE: cannot be null
  excede_customer_id: PrimaryExcedeProperty;
  // ---- HubSpot standard properties (69) ----
  /** About Us (string) */
  about_us: string | null;
  /** Street Address (string) */
  address: string | null;
  /** Street Address 2 (string) */
  address2: string | null;
  /** Annual Revenue (number) */
  annualrevenue: string | null;
  /** City (string) */
  city: string | null;
  /** Close Date (datetime) */
  closedate: string | null;
  /** Country/Region (string) */
  country: string | null;
  /** Description (string) */
  description: string | null;
  /** Company Domain Name (string) */
  domain: string | null;
  /** Facebook Company Page (string) */
  facebook_company_page: string | null;
  /** Facebook Fans (number) */
  facebookfans: string | null;
  /** Year Founded (string) */
  founded_year: string | null;
  /** Google Plus Page (string) */
  googleplus_page: string | null;
  /** Additional Domains (enumeration) */
  hs_additional_domains: string | null;
  /** Brands (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Original Traffic Source (enumeration) */
  hs_analytics_source: string | null;
  /** Country/Region Code (string) */
  hs_country_code: string | null;
  /** CSM Sentiment (enumeration) */
  hs_csm_sentiment: string | null;
  /** Current Customer (enumeration) */
  hs_current_customer: string | null;
  /** Domain status (enumeration) */
  hs_domain_status: string | null;
  /** Employee range (string) */
  hs_employee_range: string | null;
  /** Excluded from cross-account data mirroring (bool) */
  hs_excluded_from_cross_account_data_mirroring: string | null;
  /** Latitudes (string) */
  hs_gps_latitude: string | null;
  /** Longitudes (string) */
  hs_gps_longitude: string | null;
  /** Ideal Customer Profile Tier (enumeration) */
  hs_ideal_customer_profile: string | null;
  /** Industry group (string) */
  hs_industry_group: string | null;
  /** Target Account (bool) */
  hs_is_target_account: string | null;
  /** Company Keywords (enumeration) */
  hs_keywords: string | null;
  /** Last Metered Enrichment Timestamp (datetime) */
  hs_last_metered_enrichment_timestamp: string | null;
  /** Lead Status (enumeration) */
  hs_lead_status: string | null;
  /** Linkedin handle (string) */
  hs_linkedin_handle: string | null;
  /** Live enrichment deadline (datetime) */
  hs_live_enrichment_deadline: string | null;
  /** Logo URL (string) */
  hs_logo_url: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Pinned Engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Pipeline (enumeration) */
  hs_pipeline: string | null;
  /** Quick context (string) */
  hs_quick_context: string | null;
  /** Recent News (string) */
  hs_recent_news: string | null;
  /** Redirect domain (string) */
  hs_redirect_domain: string | null;
  /** Redirect URL (string) */
  hs_redirect_url: string | null;
  /** Revenue range (string) */
  hs_revenue_range: string | null;
  /** Shared teams (enumeration) */
  hs_shared_team_ids: string | null;
  /** Shared users (enumeration) */
  hs_shared_user_ids: string | null;
  /** State/Region Code (string) */
  hs_state_code: string | null;
  /** Target Account (enumeration) */
  hs_target_account: string | null;
  /** Target Account Recommendation Snooze Time (datetime) */
  hs_target_account_recommendation_snooze_time: string | null;
  /** Target Account Recommendation State (enumeration) */
  hs_target_account_recommendation_state: string | null;
  /** Tax Id (enumeration) */
  hs_tax_id: string | null;
  /** Company owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;
  /** Industry (enumeration) */
  industry: string | null;
  /** Is Public (bool) */
  is_public: string | null;
  /** Lifecycle Stage (enumeration) */
  lifecyclestage: string | null;
  /** LinkedIn Company Page (string) */
  linkedin_company_page: string | null;
  /** LinkedIn Bio (string) */
  linkedinbio: string | null;
  /** Company name (string) */
  name: string | null;
  /** Number of Employees (number) */
  numberofemployees: string | null;
  /** HubSpot Owner Email (string) */
  owneremail: string | null;
  /** HubSpot Owner Name (string) */
  ownername: string | null;
  /** Phone Number (string) */
  phone: string | null;
  /** State/Region (string) */
  state: string | null;
  /** Time Zone (string) */
  timezone: string | null;
  /** Total Money Raised (string) */
  total_money_raised: string | null;
  /** Twitter Bio (string) */
  twitterbio: string | null;
  /** Twitter Followers (number) */
  twitterfollowers: string | null;
  /** Twitter Handle (string) */
  twitterhandle: string | null;
  /** Type (enumeration) */
  type: string | null;
  /** Web Technologies (enumeration) */
  web_technologies: string | null;
  /** Website URL (string) */
  website: string | null;
  /** Postal Code (string) */
  zip: string | null;

  // ---- Excede and other custom properties (81) ----
  /** Assigned Sales Rep (enumeration) · owner ID, matched by email */
  assigned_sales_rep: string | null;
  /** County (string) */
  county: string | null;
  /** Allow Finance Chg (string) */
  excede_customer_allow_finance_chg: string | null;
  /** Allow Special Pri (string) */
  excede_customer_allow_special_pri: string | null;
  /** Amt Aged0 (number) */
  excede_customer_amt_aged0: string | null;
  /** Amt Aged1to30 (number) */
  excede_customer_amt_aged1to30: string | null;
  /** Amt Aged31to60 (number) */
  excede_customer_amt_aged31to60: string | null;
  /** Amt Aged61to90 (number) */
  excede_customer_amt_aged61to90: string | null;
  /** Amt Aged Over90 (number) */
  excede_customer_amt_aged_over90: string | null;
  /** Amt Bal Account (number) */
  excede_customer_amt_bal_account: string | null;
  /** Amt Bal Open (number) */
  excede_customer_amt_bal_open: string | null;
  /** Amt Cr Limit (number) */
  excede_customer_amt_cr_limit: string | null;
  /** Amt Cr Limit Invoice (number) */
  excede_customer_amt_cr_limit_invoice: string | null;
  /** Amt Invoice (number) */
  excede_customer_amt_invoice: string | null;
  /** Amt Payment (number) */
  excede_customer_amt_payment: string | null;
  /** Bill Addr1 (string) */
  excede_customer_bill_addr1: string | null;
  /** Bill Addr2 (string) */
  excede_customer_bill_addr2: string | null;
  /** Bill City (string) */
  excede_customer_bill_city: string | null;
  /** Bill Country (string) */
  excede_customer_bill_country: string | null;
  /** Bill County (string) */
  excede_customer_bill_county: string | null;
  /** Bill Cus Id (string) */
  excede_customer_bill_cus_id: string | null;
  /** Bill Post (string) */
  excede_customer_bill_post: string | null;
  /** Bill State (string) */
  excede_customer_bill_state: string | null;
  /** Company (string) */
  excede_customer_company_flag: string | null;
  /** Contact (string) */
  excede_customer_contact: string | null;
  /** Core Invoice Reqd (string) */
  excede_customer_core_invoice_reqd: string | null;
  /** Cus Misc1 (string) */
  excede_customer_cus_misc1: string | null;
  /** Cus Misc2 (string) */
  excede_customer_cus_misc2: string | null;
  /** Cus Misc3 (string) */
  excede_customer_cus_misc3: string | null;
  /** Cus Misc4 (string) */
  excede_customer_cus_misc4: string | null;
  /** Cus Misc5 (string) */
  excede_customer_cus_misc5: string | null;
  /** Cutoff Aged Period (string) */
  excede_customer_cutoff_aged_period: string | null;
  /** Cutoff By Aged (string) */
  excede_customer_cutoff_by_aged: string | null;
  /** Cutoff By Cr Limit (string) */
  excede_customer_cutoff_by_cr_limit: string | null;
  /** Date Birth (datetime) */
  excede_customer_date_birth: string | null;
  /** Date Birth Spouse (datetime) */
  excede_customer_date_birth_spouse: string | null;
  /** Date Create (datetime) */
  excede_customer_date_create: string | null;
  /** Date Do Not Call (datetime) */
  excede_customer_date_do_not_call: string | null;
  /** Date Invoice (datetime) */
  excede_customer_date_invoice: string | null;
  /** Date Payment (datetime) */
  excede_customer_date_payment: string | null;
  /** Date Statement (datetime) */
  excede_customer_date_statement: string | null;
  /** Date Update (datetime) */
  excede_customer_date_update: string | null;
  /** Days Payment Avg (string) */
  excede_customer_days_payment_avg: string | null;
  /** Do Not Call Phone Home (string) */
  excede_customer_do_not_call_phone_home: string | null;
  /** Do Not Call Phone Other (string) */
  excede_customer_do_not_call_phone_other: string | null;
  /** Do Not Call Phone Work (string) */
  excede_customer_do_not_call_phone_work: string | null;
  /** Dsb Typ Id (string) */
  excede_customer_dsb_typ_id: string | null;
  /** Email Home (string) */
  excede_customer_email_home: string | null;
  /** Email Other (string) */
  excede_customer_email_other: string | null;
  /** Email Work (string) */
  excede_customer_email_work: string | null;
  /** Emp Id (string) */
  excede_customer_emp_id: string | null;
  /** Emp Id Spn (string) */
  excede_customer_emp_id_spn: string | null;
  /** Fl Sls Typ Id (string) */
  excede_customer_fl_sls_typ_id: string | null;
  /** Inactive (string) */
  excede_customer_inactive: string | null;
  /** Mem Typ Id (string) */
  excede_customer_mem_typ_id: string | null;
  /** Name First (string) */
  excede_customer_name_first: string | null;
  /** Name Last (string) */
  excede_customer_name_last: string | null;
  /** Name Middle (string) */
  excede_customer_name_middle: string | null;
  /** Name Nick (string) */
  excede_customer_name_nick: string | null;
  /** Name Spouse (string) */
  excede_customer_name_spouse: string | null;
  /** Not Id (string) */
  excede_customer_not_id: string | null;
  /** Phone Fax (string) */
  excede_customer_phone_fax: string | null;
  /** Phone Other (string) */
  excede_customer_phone_other: string | null;
  /** Pri Id Base (string) */
  excede_customer_pri_id_base: string | null;
  /** Pri Id Oride (string) */
  excede_customer_pri_id_oride: string | null;
  /** Pt Sls Typ Id (string) */
  excede_customer_pt_sls_typ_id: string | null;
  /** Pt Tax Id (string) */
  excede_customer_pt_tax_id: string | null;
  /** Pur Nbr (string) */
  excede_customer_pur_nbr: string | null;
  /** Pur Reqd (string) */
  excede_customer_pur_reqd: string | null;
  /** Rec Typ Id (string) */
  excede_customer_rec_typ_id: string | null;
  /** Shp Id (string) */
  excede_customer_shp_id: string | null;
  /** Statement Reqd (string) */
  excede_customer_statement_reqd: string | null;
  /** Sv Sls Typ Id (string) */
  excede_customer_sv_sls_typ_id: string | null;
  /** Sv Tax Id (string) */
  excede_customer_sv_tax_id: string | null;
  /** Trm Id (string) */
  excede_customer_trm_id: string | null;
  /** TS (string) */
  excede_customer_ts: string | null;
  /** Typ (string) */
  excede_customer_type: string | null;
  /** Vh Sls Typ Id (string) */
  excede_customer_vh_sls_typ_id: string | null;
  /** Vh Tax Id (string) */
  excede_customer_vh_tax_id: string | null;
  /** Phone Home (string) */
  mobilephone: string | null;
}
