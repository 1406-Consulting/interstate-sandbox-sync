# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This is a one-way copy tool. It reads Interstate HubSpot records from production (portal 51580259) and upserts them into the Interstate standard sandbox (portal 52133352), matched on unique Excede ID properties so that re-runs update records instead of duplicating them. It is built in stages, one object type each: deals → contacts → companies → vehicles → line items → products. **Only Stage 1 (deals) is implemented.** See the README status table.

Remote: `github.com/jkhl-1406/interstate-sandbox-sync`. The repo is **public**, so never commit tokens or production data. `.gitignore` covers `.env*`, `*.csv`, `*.xlsx` and `runs/`.

## Commands

```sh
node main.ts --deals 3                 # dry run: reads both portals, writes nothing
node main.ts --deals 3 --apply         # writes to the sandbox
node main.ts --deals 3 --source-env .env.prod --target-env .env.sandbox   # use the repo-local env files

node --test                            # all tests
node --test sync/logic/upsertKeys.test.ts   # one test file
node --test "sync/**/*.test.ts"        # a folder: pass a quoted glob. `node --test sync/` treats the folder as a single file and fails.

npm install && npm run typecheck       # tsc --noEmit; also checks every contract property list against its interface
npx prettier@3 --write <files>         # formatting: Prettier defaults (80 columns). Prettier is not a dependency.
```

Node 24 runs the `.ts` files directly through type stripping. There is no build step, so the code must use **erasable TypeScript only**: no `enum`, no constructor parameter properties, `import type` for type-only imports, and explicit `.ts` extensions in imports. `tsconfig.json` enforces this with `erasableSyntaxOnly` and `verbatimModuleSyntax`.

## Architecture

The run in `main.ts` is four steps. Each step lives in `sync/steps/`, calls infrastructure, and applies logic:

1. **`verifyPortals`** reads `/account-info/v3/details` for both tokens. The rule in `logic/portalRules.ts` refuses the run unless source = 51580259 and target = 52133352. This, together with the read-only production client, is what keeps production safe.
2. **`fetchRecentRecords`** searches production for the N newest records (sorted by `createdate`), then batch-reads them with every property in the object's contract.
3. **`prepareForSandbox`** reads the sandbox's property definitions and keeps only filled-in values for properties the sandbox can write. It stamps every record with `prod_sync_date`, one ISO timestamp per run, passed in from `main.ts`.
4. **`upsertRecords`** picks each record's key, which is the first filled-in property in the contract's `keyPriority`. Records with no key are skipped and reported. It then calls `POST /crm/v3/objects/{type}/batch/upsert`, 100 at a time, with the production ID in `objectWriteTraceId`, and maps HubSpot's results back to production IDs through that field. A dry run sends nothing.

The code is split by responsibility, and the split is deliberate:

- **`sync/logic/`**: business rules as pure functions, with no network calls, no file access and no clock (time is passed in). Keep new rules here, so they stay testable without fakes.
- **`sync/infrastructure/`**: everything that touches the outside world. `hubspotClient.ts` is the only code that calls `fetch`. It retries 429 and 5xx responses, honoring `Retry-After`, and has separate `read()` and `write()` methods. `write()` throws unless the client was built with `allowWrites`, which is only the sandbox client under `--apply`. Searches and batch reads are POSTs, so they go through `read()`. `hubspotApi.ts` holds one function per endpoint and owns paging and the 100-per-batch limit.
- **`sync/steps/`**: wiring only.
- **`sync/fakeHubSpotClient.ts`**: the test double used by step and API tests. `steps/upsertRecords.test.ts` has its own in-memory fake that mimics upsert-by-key, so it can show that a second run creates nothing.

**Types and values are kept apart.** `types/*.types.ts` holds type declarations only, and every shared interface goes there, including ones used by just one module. `contracts/` holds values.

**Object contracts.** Each object type has a pair of files:

- `types/<object>.types.ts` is a record interface listing every writable production property (read-only and calculated properties excluded).
- `contracts/<object>.ts` holds the same names as a `(keyof X)[]` list, plus an `ObjectContract`.

The property lists were generated from production's `GET /crm/v3/properties/{type}` on 2026-10-07 by a script that is **not in this repo**. `ObjectContract` also declares `selection` (anchor, linked or independent), `linkedFrom`, `remaps` (owners, pipeline) and `links`. **The code does not use these yet.** They describe Stages 2–6 and the planned owner, pipeline and association remapping. `contracts/allContracts.test.ts` enforces stage-order consistency.

**Facts the design relies on** (checked against production on 2026-10-07):

- **Vehicles custom object:** in production it is `2-70142906`, keyed on `excede_vehicle_id`. Its type ID differs in the sandbox, so it must be resolved by name (`GET /crm/v3/schemas/vehicles`). `PortalContext.vehiclesTypeId` is `""` until Stage 4.
- **Deal keys:** deals come from several Excede sources, each with its own unique key. That is why `keyPriority` is a list. The N newest deals are currently all lease rental bills (`excede_lease_rental_bill_id`).
- **Contacts:** production has only 1 contact.
- **Products:** no production line item has `hs_product_id` set, so products are copied on their own.
- **Pipeline quirk:** HubSpot's idProperty upsert can drop `pipeline` on new deals unless `dealstage` is sent with it, per `1406-consulting-hubspot-app/shared/backend/src/clients/DatabaseClient.ts`. The sync always sends both.

## Conventions

- **Branches:** commit straight to `main`. This repo does not use feature branches.
- **Code style:**
  - Write explicit, plain TypeScript.
  - Use if/else and loops, not optional chaining, `reduce`, `flatMap` or method chains.
  - Wrap every guard in braces.
  - Name intermediate conditions.
- **Tests:** keep them few and readable. Each module gets one baseline happy-path test. Each step also gets a trust test that shows the operator what they can rely on: no duplicates on re-run, a dry run never writes, production can't be the target. Don't add edge-case suites unless asked.
- **Logging:** use `console.log` lines tagged `[guard]`, `[deals]`, `[run]` or `[summary]`. Never log tokens or full property payloads.

## Projects and Tasks

- **Live test of Stage 1 not done yet.** Run a dry run, then `--apply --deals 3`, then `--apply` again. The second run should create 0 records.
  - The CLI defaults read `interstate/.env.prod` and `interstate/.env.sandbox`, four levels up. The workspace `.env.sandbox` currently defines `SERVICE_KEY=` rather than `HUBSPOT_TOKEN=`.
  - Repo-local `.env.prod` and `.env.sandbox` with `HUBSPOT_TOKEN` now exist and are gitignored. Pass them with `--source-env` and `--target-env`, or change the defaults in `sync/infrastructure/cli.ts`.
- **Behavior to confirm on the first live run:**
  - HubSpot echoes `objectWriteTraceId` on upsert results. The run stops loudly if it doesn't.
  - A batch may mix different `idProperty` values.
  - The sandbox has the `excede_*` unique key properties and pipeline and stage IDs that match production.
- **`prod_sync_date` must exist in the sandbox as a datetime property** on each object type, or every upsert fails.
- **Stages 2–6 (contacts, companies, vehicles, line items, products)** plus association copying and owner and pipeline remapping are not started. The plan is in `~/.claude/plans/i-need-to-build-sequential-lantern.md`.
- **Open decision:** whether `--deals N` should copy N of each deal type, instead of the N newest overall.
