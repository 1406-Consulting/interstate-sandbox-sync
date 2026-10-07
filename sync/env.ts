/**
 * Reads HubSpot tokens from the workspace's .env files without any library.
 */
import { readFileSync } from "node:fs";

/** Parses KEY=value lines. Blank lines and # comments are ignored. */
export function readEnvFile(path: string): { [name: string]: string } {
  const values: { [name: string]: string } = {};
  const text = readFileSync(path, "utf8");
  const lines = text.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    const isSkippable = trimmed === "" || trimmed.startsWith("#");
    if (isSkippable) {
      continue;
    }
    const equalsAt = trimmed.indexOf("=");
    if (equalsAt === -1) {
      continue;
    }
    const name = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();
    const isQuoted =
      value.length >= 2 &&
      (value.startsWith('"') || value.startsWith("'")) &&
      value.endsWith(value[0]);
    if (isQuoted) {
      value = value.slice(1, -1);
    }
    values[name] = value;
  }
  return values;
}

/** Returns HUBSPOT_TOKEN from an env file, or throws if it is missing. */
export function readToken(path: string): string {
  const values = readEnvFile(path);
  const token = values.HUBSPOT_TOKEN;
  if (token === undefined || token === "") {
    throw new Error(`no HUBSPOT_TOKEN in ${path}`);
  }
  return token;
}
