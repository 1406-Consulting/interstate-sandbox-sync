/**
 * `Contact`: the contact record shape. Type declarations only.
 *
 * Lists every writable contact property in production (141 of 418),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
export interface Contact {
  // ---- HubSpot standard properties (124) ----
  /** Street Address (string) */
  address: string | null;
  /** Annual Revenue (string) */
  annualrevenue: string | null;
  /** Primary Associated Company ID (number) */
  associatedcompanyid: string | null;
  /** City (string) */
  city: string | null;
  /** Close Date (datetime) */
  closedate: string | null;
  /** Company Name (string) */
  company: string | null;
  /** Company size (string) */
  company_size: string | null;
  /** Country/Region (string) */
  country: string | null;
  /** Date of birth (string) */
  date_of_birth: string | null;
  /** Degree (string) */
  degree: string | null;
  /** Email (string) · upsert key */
  email: string | null;
  /** Fax Number (string) */
  fax: string | null;
  /** Field of study (string) */
  field_of_study: string | null;
  /** First Name (string) */
  firstname: string | null;
  /** Follower Count (number) */
  followercount: string | null;
  /** Gender (string) */
  gender: string | null;
  /** Graduation date (string) */
  graduation_date: string | null;
  /** Additional email addresses (enumeration) */
  hs_additional_emails: string | null;
  /** Brands (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Original Traffic Source (enumeration) */
  hs_analytics_source: string | null;
  /** Bing ad clicked (bool) */
  hs_bing_ad_clicked: string | null;
  /** Bing click id (string) */
  hs_bing_click_id: string | null;
  /** Buying Role (enumeration) */
  hs_buying_role: string | null;
  /** Chat Assistant IQL Date (datetime) */
  hs_chat_assistant_iql_date: string | null;
  /** Chat Assistant Source (enumeration) */
  hs_chat_assistant_source: string | null;
  /** Chat Assistant:Summary (string) */
  hs_chat_assistant_summary: string | null;
  /** ChatGPT ad clicked (bool) */
  hs_chatgpt_ad_clicked: string | null;
  /** ChatGPT click id (string) */
  hs_chatgpt_click_id: string | null;
  /** Clicked on a LinkedIn Ad (enumeration) */
  hs_clicked_linkedin_ad: string | null;
  /** Member email (string) */
  hs_content_membership_email: string | null;
  /** Membership Notes (string) */
  hs_content_membership_notes: string | null;
  /** Status (enumeration) */
  hs_content_membership_status: string | null;
  /** Country/Region Code (string) */
  hs_country_region_code: string | null;
  /** Cross-Account Note (string) */
  hs_cross_account_note: string | null;
  /** Cross-sell Opportunity (bool) */
  hs_cross_sell_opportunity: string | null;
  /** Current Customer (enumeration) */
  hs_current_customer: string | null;
  /** Email address quarantine reason (enumeration) */
  hs_email_customer_quarantined_reason: string | null;
  /** Email type (enumeration) */
  hs_email_type: string | null;
  /** Employment change detected date (date) */
  hs_employment_change_detected_date: string | null;
  /** Enforce double opt in (bool) */
  hs_enforce_double_opt_in: string | null;
  /** Enriched Email Bounce Detected (Deprecated) (bool) */
  hs_enriched_email_bounce_detected: string | null;
  /** Excluded from cross-account data mirroring (bool) */
  hs_excluded_from_cross_account_data_mirroring: string | null;
  /** Clicked Facebook ad (bool) */
  hs_facebook_ad_clicked: string | null;
  /** Facebook Click ID (string) */
  hs_facebook_click_id: string | null;
  /** Facebook ID (string) */
  hs_facebookid: string | null;
  /** Should be shown an NPS web survey (bool) */
  hs_feedback_show_nps_web_survey: string | null;
  /** Google Click ID (string) */
  hs_google_click_id: string | null;
  /** googleplus ID (string) */
  hs_googleplusid: string | null;
  /** Latitudes (string) */
  hs_gps_latitude: string | null;
  /** Longitudes (string) */
  hs_gps_longitude: string | null;
  /** Inferred Language Codes (enumeration) */
  hs_inferred_language_codes: string | null;
  /** Job change detected date (date) */
  hs_job_change_detected_date: string | null;
  /** Journey Stage (enumeration) */
  hs_journey_stage: string | null;
  /** Preferred language (enumeration) */
  hs_language: string | null;
  /** Last Metered Enrichment Timestamp (datetime) */
  hs_last_metered_enrichment_timestamp: string | null;
  /** Latest Traffic Source (enumeration) */
  hs_latest_source: string | null;
  /** Latest Traffic Source Date (datetime) */
  hs_latest_source_timestamp: string | null;
  /** Lead Status (enumeration) */
  hs_lead_status: string | null;
  /** Legal basis for processing contact's data (enumeration) */
  hs_legal_basis: string | null;
  /** Clicked LinkedIn ad (enumeration) */
  hs_linkedin_ad_clicked: string | null;
  /** LinkedIn click id (string) */
  hs_linkedin_click_id: string | null;
  /** LinkedIn URL (string) */
  hs_linkedin_url: string | null;
  /** Linkedin ID (string) */
  hs_linkedinid: string | null;
  /** Live enrichment deadline (datetime) */
  hs_live_enrichment_deadline: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Persona (enumeration) */
  hs_persona: string | null;
  /** Pinned engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Pipeline (enumeration) */
  hs_pipeline: string | null;
  /** Prospecting Agent activation email ID (number) */
  hs_prospecting_agent_activation_email_id: string | null;
  /** Prospecting Agent activation status (enumeration) */
  hs_prospecting_agent_activation_status: string | null;
  /** Prospecting Agent Last Enrolled (datetime) */
  hs_prospecting_agent_last_enrolled: string | null;
  /** Prospecting Agent Total Enrolled Count (number) */
  hs_prospecting_agent_total_enrolled_count: string | null;
  /** Recent News (string) */
  hs_recent_news: string | null;
  /** Reddit ad clicked (bool) */
  hs_reddit_ad_clicked: string | null;
  /** Reddit click id (string) */
  hs_reddit_click_id: string | null;
  /** Returning to office detected date (date) */
  hs_returning_to_office_detected_date: string | null;
  /** Employment Role (enumeration) */
  hs_role: string | null;
  /** Employment Seniority (enumeration) */
  hs_seniority: string | null;
  /** Shared teams (enumeration) */
  hs_shared_team_ids: string | null;
  /** Shared users (enumeration) */
  hs_shared_user_ids: string | null;
  /** State/Region Code (string) */
  hs_state_code: string | null;
  /** Employment Sub Role (enumeration) */
  hs_sub_role: string | null;
  /** TikTok ad clicked (bool) */
  hs_tiktok_ad_clicked: string | null;
  /** TikTok click id (string) */
  hs_tiktok_click_id: string | null;
  /** Time between contact creation and deal close (number) */
  hs_time_between_contact_creation_and_deal_close: string | null;
  /** Time between contact creation and deal creation (number) */
  hs_time_between_contact_creation_and_deal_creation: string | null;
  /** Time to move from lead to customer (number) */
  hs_time_to_move_from_lead_to_customer: string | null;
  /** Time to move from marketing qualified lead to customer (number) */
  hs_time_to_move_from_marketingqualifiedlead_to_customer: string | null;
  /** Time to move from opportunity to customer (number) */
  hs_time_to_move_from_opportunity_to_customer: string | null;
  /** Time to move from sales qualified lead to customer (number) */
  hs_time_to_move_from_salesqualifiedlead_to_customer: string | null;
  /** Time to move from subscriber to customer (number) */
  hs_time_to_move_from_subscriber_to_customer: string | null;
  /** Time Zone (enumeration) */
  hs_timezone: string | null;
  /** Twitter ID (string) */
  hs_twitterid: string | null;
  /** WhatsApp BSUIDs (string) */
  hs_whatsapp_bsuids: string | null;
  /** WhatsApp Phone Number (string) */
  hs_whatsapp_phone_number: string | null;
  /** Contact owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;
  /** Industry (string) */
  industry: string | null;
  /** Job function (string) */
  job_function: string | null;
  /** Job Title (string) */
  jobtitle: string | null;
  /** Klout Score (number) */
  kloutscoregeneral: string | null;
  /** Last Name (string) */
  lastname: string | null;
  /** Lifecycle Stage (enumeration) */
  lifecyclestage: string | null;
  /** LinkedIn Bio (string) */
  linkedinbio: string | null;
  /** LinkedIn Connections (number) */
  linkedinconnections: string | null;
  /** Marital Status (string) */
  marital_status: string | null;
  /** Message (string) */
  message: string | null;
  /** Military status (string) */
  military_status: string | null;
  /** Mobile Phone Number (string) */
  mobilephone: string | null;
  /** Number of Employees (enumeration) */
  numemployees: string | null;
  /** HubSpot Owner Name (legacy) (string) */
  ownername: string | null;
  /** Phone Number (string) */
  phone: string | null;
  /** Photo (string) */
  photo: string | null;
  /** Relationship Status (string) */
  relationship_status: string | null;
  /** Salutation (string) */
  salutation: string | null;
  /** School (string) */
  school: string | null;
  /** Seniority (string) */
  seniority: string | null;
  /** Start date (string) */
  start_date: string | null;
  /** State/Region (string) */
  state: string | null;
  /** Twitter Bio (string) */
  twitterbio: string | null;
  /** Twitter Username (string) */
  twitterhandle: string | null;
  /** Twitter Profile Photo (string) */
  twitterprofilephoto: string | null;
  /** Website URL (string) */
  website: string | null;
  /** Work email (string) */
  work_email: string | null;
  /** Postal Code (string) */
  zip: string | null;

  // ---- Excede and other custom properties (17) ----
  /** Addr2 (string) */
  address2: string | null;
  /** County (string) */
  county: string | null;
  /** Cus Id (string) */
  excede_customer_contact_cus_id: string | null;
  /** Date Create (datetime) */
  excede_customer_contact_date_create: string | null;
  /** Date Update (datetime) */
  excede_customer_contact_date_update: string | null;
  /** Department (string) */
  excede_customer_contact_department: string | null;
  /** Email Other (string) */
  excede_customer_contact_email_other: string | null;
  /** Emp Id (string) */
  excede_customer_contact_emp_id: string | null;
  /** Id (string) · upsert key */
  excede_customer_contact_id: string | null;
  /** Name (string) */
  excede_customer_contact_name: string | null;
  /** Phone Fax (string) */
  excede_customer_contact_phone_fax: string | null;
  /** Phone Home Ext (string) */
  excede_customer_contact_phone_home_ext: string | null;
  /** Phone Other (string) */
  excede_customer_contact_phone_other: string | null;
  /** Phone Other Ext (string) */
  excede_customer_contact_phone_other_ext: string | null;
  /** Phone Work Ext (string) */
  excede_customer_contact_phone_work_ext: string | null;
  /** TS (string) */
  excede_customer_contact_ts: string | null;
  /** Typ (string) */
  excede_customer_contact_typ: string | null;
}
