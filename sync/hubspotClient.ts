/**
 * The only module that calls HubSpot. Wraps fetch with a retry for rate
 * limits and a write guard: a client built without write access refuses
 * every write before it reaches the network.
 */
import type {
  HubSpotClient,
  PortalRole,
} from "../types/hubspotClient.types.ts";

const BASE_URL = "https://api.hubapi.com";
const MAX_ATTEMPTS = 5;

export interface ClientOptions {
  token: string;
  role: PortalRole;
  allowWrites: boolean;
}

/** Waits the given number of milliseconds. */
function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/** How long to wait before retrying: HubSpot's Retry-After, or a growing default. */
function retryDelay(response: Response, attempt: number): number {
  const retryAfter = Number(response.headers.get("retry-after"));
  if (retryAfter > 0) {
    return retryAfter * 1000;
  }
  return 1000 * attempt;
}

/** Sends one request, retrying on rate limits (429) and server errors (5xx). */
async function send(
  token: string,
  role: PortalRole,
  method: string,
  path: string,
  body: unknown,
): Promise<any> {
  const init: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const response = await fetch(`${BASE_URL}${path}`, init);
    const shouldRetry = response.status === 429 || response.status >= 500;
    if (shouldRetry && attempt < MAX_ATTEMPTS) {
      const delay = retryDelay(response, attempt);
      console.warn(
        `[${role}] ${method} ${path} -> ${response.status}, retrying in ${delay}ms`,
      );
      await sleep(delay);
      continue;
    }

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `[${role}] ${method} ${path} -> ${response.status}: ${text.slice(0, 500)}`,
      );
    }
    if (text === "") {
      return {};
    }
    return JSON.parse(text);
  }
  throw new Error(
    `[${role}] ${method} ${path} gave up after ${MAX_ATTEMPTS} attempts`,
  );
}

/** Builds a client for one portal. */
export function createClient(options: ClientOptions): HubSpotClient {
  const token = options.token;
  const role = options.role;
  const allowWrites = options.allowWrites;

  return {
    role,
    read: (method, path, body) => {
      return send(token, role, method, path, body);
    },
    write: (method, path, body) => {
      if (!allowWrites) {
        throw new Error(
          `[${role}] refused write ${method} ${path}: this client is read-only`,
        );
      }
      return send(token, role, method, path, body);
    },
  };
}
