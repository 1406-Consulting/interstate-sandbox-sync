/**
 * `Vehicle`: the vehicle (custom object) record shape. Type declarations only.
 *
 * Lists every writable vehicle (custom object) property in production (147 of 173),
 * generated from the production property definitions on 2026-10-07.
 * Read-only and calculated properties are left out because HubSpot rejects writes to them.
 * HubSpot returns every value as a string, or null when empty; the HubSpot type is noted per field.
 */
export interface Vehicle {
  // ---- HubSpot standard properties (6) ----
  /** Business units (enumeration) */
  hs_all_assigned_business_unit_ids: string | null;
  /** Owning Teams (enumeration) */
  hs_owning_teams: string | null;
  /** Pinned Engagement ID (number) */
  hs_pinned_engagement_id: string | null;
  /** Shared teams (enumeration) */
  hs_shared_team_ids: string | null;
  /** Shared users (enumeration) */
  hs_shared_user_ids: string | null;
  /** Owner (enumeration) · owner ID, matched by email */
  hubspot_owner_id: string | null;

  // ---- Excede and other custom properties (141) ----
  /** ACComp Serial Nbr (string) */
  excede_vehicle_accomp_serial_nbr: string | null;
  /** Amt Adj Cost (number) */
  excede_vehicle_amt_adj_cost: string | null;
  /** Amt Adj Price (number) */
  excede_vehicle_amt_adj_price: string | null;
  /** Amt DMVFees (number) */
  excede_vehicle_amt_dmvfees: string | null;
  /** Amt DMVFees Next (number) */
  excede_vehicle_amt_dmvfees_next: string | null;
  /** Amt Fuel Tax Rep (number) */
  excede_vehicle_amt_fuel_tax_rep: string | null;
  /** Amt Hold Back (number) */
  excede_vehicle_amt_hold_back: string | null;
  /** Amt Mfr Cost (number) */
  excede_vehicle_amt_mfr_cost: string | null;
  /** Amt Mfr Price (number) */
  excede_vehicle_amt_mfr_price: string | null;
  /** Amt Our Cost (number) */
  excede_vehicle_amt_our_cost: string | null;
  /** Amt Our Price (number) */
  excede_vehicle_amt_our_price: string | null;
  /** Amt Prop Tax Fee (number) */
  excede_vehicle_amt_prop_tax_fee: string | null;
  /** Amt Rebate (number) */
  excede_vehicle_amt_rebate: string | null;
  /** Amt Salvage (number) */
  excede_vehicle_amt_salvage: string | null;
  /** APU (string) */
  excede_vehicle_apu: string | null;
  /** Body Style (string) */
  excede_vehicle_body_style: string | null;
  /** Brn Id (string) */
  excede_vehicle_branch_id: string | null;
  /** Cab Config (string) */
  excede_vehicle_cab_config: string | null;
  /** Condition (string) */
  excede_vehicle_condition: string | null;
  /** Count Emp Id (number) */
  excede_vehicle_count_emp_id: string | null;
  /** Cus Id (string) */
  excede_vehicle_cus_id: string | null;
  /** Cus Name (string) */
  excede_vehicle_cus_name: string | null;
  /** Cylinders (number) */
  excede_vehicle_cylinders: string | null;
  /** Date Count (datetime) */
  excede_vehicle_date_count: string | null;
  /** Date Create (datetime) */
  excede_vehicle_date_create: string | null;
  /** Date Dep End (datetime) */
  excede_vehicle_date_dep_end: string | null;
  /** Date Dep Start (datetime) */
  excede_vehicle_date_dep_start: string | null;
  /** Date DMVFees Expire (datetime) */
  excede_vehicle_date_dmvfees_expire: string | null;
  /** Date DMVLicense Expire (datetime) */
  excede_vehicle_date_dmvlicense_expire: string | null;
  /** Date In Service (datetime) */
  excede_vehicle_date_in_service: string | null;
  /** Date Note End (datetime) */
  excede_vehicle_date_note_end: string | null;
  /** Date Note Start (datetime) */
  excede_vehicle_date_note_start: string | null;
  /** Date Receive (datetime) */
  excede_vehicle_date_receive: string | null;
  /** Date Update (datetime) */
  excede_vehicle_date_update: string | null;
  /** DMVLicense (string) */
  excede_vehicle_dmvlicense: string | null;
  /** DMVNotes (string) */
  excede_vehicle_dmvnotes: string | null;
  /** DMVState (string) */
  excede_vehicle_dmvstate: string | null;
  /** Emp Id (string) */
  excede_vehicle_emp_id: string | null;
  /** Engine Brake (string) */
  excede_vehicle_engine_brake: string | null;
  /** Engine Mfr (string) */
  excede_vehicle_engine_mfr: string | null;
  /** Engine Model (string) */
  excede_vehicle_engine_model: string | null;
  /** Engine Serial Nbr (string) */
  excede_vehicle_engine_serial_nbr: string | null;
  /** Ext Color (string) */
  excede_vehicle_ext_color: string | null;
  /** Ext Color Code (string) */
  excede_vehicle_ext_color_code: string | null;
  /** Fifth Wheel (string) */
  excede_vehicle_fifth_wheel: string | null;
  /** Fleet ID (string) */
  excede_vehicle_fleet_unt_id: string | null;
  /** Front Axle Mfr (string) */
  excede_vehicle_front_axle_mfr: string | null;
  /** Front Axle Model (string) */
  excede_vehicle_front_axle_model: string | null;
  /** Front Axle Serial Nbr (string) */
  excede_vehicle_front_axle_serial_nbr: string | null;
  /** Fuel Tank (string) */
  excede_vehicle_fuel_tank: string | null;
  /** GVWR (number) */
  excede_vehicle_gvwr: string | null;
  /** Horsepower (string) */
  excede_vehicle_horsepower: string | null;
  /** Hrs APU (number) */
  excede_vehicle_hrs_apu: string | null;
  /** Hrs Engine (number) */
  excede_vehicle_hrs_engine: string | null;
  /** Hrs Other (number) */
  excede_vehicle_hrs_other: string | null;
  /** Hrs PTO (number) */
  excede_vehicle_hrs_pto: string | null;
  /** Hrs Reefer (number) */
  excede_vehicle_hrs_reefer: string | null;
  /** Hrs Standby (number) */
  excede_vehicle_hrs_standby: string | null;
  /** Excede Vehicle Id (string) · upsert key */
  excede_vehicle_id: string | null;
  /** Int Color (string) */
  excede_vehicle_int_color: string | null;
  /** Int Color Code (string) */
  excede_vehicle_int_color_code: string | null;
  /** Key Code1 (string) */
  excede_vehicle_key_code1: string | null;
  /** Key Code2 (string) */
  excede_vehicle_key_code2: string | null;
  /** Loc Id (string) */
  excede_vehicle_location_id: string | null;
  /** Make (string) */
  excede_vehicle_make: string | null;
  /** Marketability (string) */
  excede_vehicle_marketability: string | null;
  /** Model (string) */
  excede_vehicle_model: string | null;
  /** Model Nbr (string) */
  excede_vehicle_model_nbr: string | null;
  /** Model Year (string) */
  excede_vehicle_model_year: string | null;
  /** Not Id (string) */
  excede_vehicle_not_id: string | null;
  /** Odom (number) */
  excede_vehicle_odom: string | null;
  /** Odom Typ (number) */
  excede_vehicle_odom_typ: string | null;
  /** Other (string) */
  excede_vehicle_other: string | null;
  /** Other Des (string) */
  excede_vehicle_other_des: string | null;
  /** Pct Ins Markup (number) */
  excede_vehicle_pct_ins_markup: string | null;
  /** Pct Note (number) */
  excede_vehicle_pct_note: string | null;
  /** Prepared Preferred Customer Contact Id (string) */
  excede_vehicle_preferred_contact_id: string | null;
  /** PTO (string) */
  excede_vehicle_pto: string | null;
  /** Pur Emp Id (string) */
  excede_vehicle_pur_emp_id: string | null;
  /** Pur Ven Id (string) */
  excede_vehicle_pur_ven_id: string | null;
  /** Rear Axle Mfr (string) */
  excede_vehicle_rear_axle_mfr: string | null;
  /** Rear Axle Model (string) */
  excede_vehicle_rear_axle_model: string | null;
  /** Rear Axle Ratio (string) */
  excede_vehicle_rear_axle_ratio: string | null;
  /** Rear Axle Serial Nbr (string) */
  excede_vehicle_rear_axle_serial_nbr: string | null;
  /** Rear Front Axle Mfr (string) */
  excede_vehicle_rear_front_axle_mfr: string | null;
  /** Rear Front Axle Model (string) */
  excede_vehicle_rear_front_axle_model: string | null;
  /** Rear Front Axle Serial Nbr (string) */
  excede_vehicle_rear_front_axle_serial_nbr: string | null;
  /** Reefer (string) */
  excede_vehicle_reefer: string | null;
  /** Series (string) */
  excede_vehicle_series: string | null;
  /** Sleeper (string) */
  excede_vehicle_sleeper: string | null;
  /** Status (string) */
  excede_vehicle_status: string | null;
  /** Status Notes (string) */
  excede_vehicle_status_notes: string | null;
  /** Suspension Typ (string) */
  excede_vehicle_suspension_typ: string | null;
  /** Trans Mfr (string) */
  excede_vehicle_trans_mfr: string | null;
  /** Trans Model (string) */
  excede_vehicle_trans_model: string | null;
  /** Trans Serial Nbr (string) */
  excede_vehicle_trans_serial_nbr: string | null;
  /** Transmission (string) */
  excede_vehicle_transmission: string | null;
  /** TS (string) */
  excede_vehicle_ts: string | null;
  /** Typ Id (string) */
  excede_vehicle_typ_id: string | null;
  /** Unt Misc1 (string) */
  excede_vehicle_unt_misc1: string | null;
  /** Unt Misc10 (string) */
  excede_vehicle_unt_misc10: string | null;
  /** Unt Misc11 (string) */
  excede_vehicle_unt_misc11: string | null;
  /** Unt Misc12 (string) */
  excede_vehicle_unt_misc12: string | null;
  /** Unt Misc13 (string) */
  excede_vehicle_unt_misc13: string | null;
  /** Unt Misc14 (string) */
  excede_vehicle_unt_misc14: string | null;
  /** Unt Misc15 (string) */
  excede_vehicle_unt_misc15: string | null;
  /** Unt Misc16 (string) */
  excede_vehicle_unt_misc16: string | null;
  /** Unt Misc17 (string) */
  excede_vehicle_unt_misc17: string | null;
  /** Unt Misc18 (string) */
  excede_vehicle_unt_misc18: string | null;
  /** Unt Misc19 (string) */
  excede_vehicle_unt_misc19: string | null;
  /** Unt Misc2 (string) */
  excede_vehicle_unt_misc2: string | null;
  /** Unt Misc20 (string) */
  excede_vehicle_unt_misc20: string | null;
  /** Unt Misc21 (string) */
  excede_vehicle_unt_misc21: string | null;
  /** Unt Misc22 (string) */
  excede_vehicle_unt_misc22: string | null;
  /** Unt Misc23 (string) */
  excede_vehicle_unt_misc23: string | null;
  /** Unt Misc24 (string) */
  excede_vehicle_unt_misc24: string | null;
  /** Unt Misc25 (string) */
  excede_vehicle_unt_misc25: string | null;
  /** Unt Misc26 (string) */
  excede_vehicle_unt_misc26: string | null;
  /** Unt Misc27 (string) */
  excede_vehicle_unt_misc27: string | null;
  /** Unt Misc28 (string) */
  excede_vehicle_unt_misc28: string | null;
  /** Unt Misc29 (string) */
  excede_vehicle_unt_misc29: string | null;
  /** Unt Misc3 (string) */
  excede_vehicle_unt_misc3: string | null;
  /** Unt Misc30 (string) */
  excede_vehicle_unt_misc30: string | null;
  /** Unt Misc31 (string) */
  excede_vehicle_unt_misc31: string | null;
  /** Unt Misc32 (string) */
  excede_vehicle_unt_misc32: string | null;
  /** Unt Misc33 (string) */
  excede_vehicle_unt_misc33: string | null;
  /** Unt Misc34 (string) */
  excede_vehicle_unt_misc34: string | null;
  /** Unt Misc35 (string) */
  excede_vehicle_unt_misc35: string | null;
  /** Unt Misc36 (string) */
  excede_vehicle_unt_misc36: string | null;
  /** Unt Misc37 (string) */
  excede_vehicle_unt_misc37: string | null;
  /** Unt Misc38 (string) */
  excede_vehicle_unt_misc38: string | null;
  /** Unt Misc39 (string) */
  excede_vehicle_unt_misc39: string | null;
  /** Unt Misc4 (string) */
  excede_vehicle_unt_misc4: string | null;
  /** Unt Misc40 (string) */
  excede_vehicle_unt_misc40: string | null;
  /** Unt Misc5 (string) */
  excede_vehicle_unt_misc5: string | null;
  /** Unt Misc6 (string) */
  excede_vehicle_unt_misc6: string | null;
  /** Unt Misc7 (string) */
  excede_vehicle_unt_misc7: string | null;
  /** Unt Misc8 (string) */
  excede_vehicle_unt_misc8: string | null;
  /** Unt Misc9 (string) */
  excede_vehicle_unt_misc9: string | null;
  /** Vin (string) */
  excede_vehicle_vin: string | null;
  /** Wheelbase (number) */
  excede_vehicle_wheelbase: string | null;
}
