/**
 * Shapes for the fake HubSpot client used in tests. Type declarations only.
 */

/** One call the fake client received. */
export interface RecordedCall {
  access: "read" | "write";
  method: string;
  path: string;
  body: unknown;
}

/** Decides what the fake client answers for a given call. */
export type FakeResponder = (call: RecordedCall) => unknown;
