/**
 * Upsert shapes: a record ready to write, the request input built from it,
 * and HubSpot's batch upsert response. Type declarations only.
 *
 * Shapes follow HubSpot's batch upsert reference
 * (POST /crm/v3/objects/{objectType}/batch/upsert).
 */
import type {
  IdMap,
  PrimaryExcedeProperty,
  PropertyValues,
} from "./crm.types.ts";

/** A record ready to write: its production ID plus sandbox-ready properties. */
export interface PreparedRecord {
  sourceId: string;
  properties: PropertyValues;
}

/** One input in a batch upsert request body. */
export interface UpsertInput {
  /** The unique Excede property HubSpot matches on. */
  idProperty: PrimaryExcedeProperty;
  /** That property's value for this record. */
  id: string;
  properties: PropertyValues;
  /** The production record ID. HubSpot echoes it back on the result. */
  objectWriteTraceId: string;
}

/** One record in a batch upsert response. */
export interface UpsertResponseRecord {
  id: string; // sandbox record ID
  new: boolean; // true = created, false = updated
  objectWriteTraceId: string;
}

/** The body HubSpot returns from a batch upsert. */
export interface BatchUpsertResponse {
  results: UpsertResponseRecord[];
  errors?: { message: string }[];
}

/** What a set of batch upsert responses adds up to. */
export interface UpsertTally {
  created: number;
  updated: number;
  idMap: IdMap; // production ID -> sandbox ID
}
