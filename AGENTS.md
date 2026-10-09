# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This is a one-way copy tool. It reads Interstate HubSpot records from production (portal 51580259) and upserts them into the Interstate standard sandbox (portal 52133352), matched on unique Excede ID properties so that re-runs update records instead of duplicating them. It is built in stages, one object type each: deals → companies → contacts → vehicles → line items → products. **Stages 1 (deals), 2 (companies, with deal→company links), 4 (vehicles, with deal→vehicle and company→vehicle links), 5 (line items, with deal→line item links, plus line item→vehicle links when `--vehicles` is set too) and 6 (products) are implemented; contacts are deferred.** `STAGES.md` is the running checklist. Keep it updated as stages progress.

Remote: `github.com/jkhl-1406/interstate-sandbox-sync`. The repo is **public**, so never commit tokens or production data. `.gitignore` covers `.env*`, `*.csv`, `*.xlsx` and `runs/`.

## Commands

```sh
node main.ts --deals 3                 # dry run: reads both portals, writes nothing
node main.ts --deals 3 --apply         # writes to the sandbox
node main.ts --deals 3 --companies 3   # stage 2: companies linked to those deals, plus the links
node main.ts --deals 3 --source-env .env.prod --target-env .env.sandbox   # use the repo-local env files

node main.ts --deals 3 --vehicles 3            # stage 4: vehicles linked to those deals, plus the links
node main.ts --deals 3 --line-items 3          # stage 5: line items linked to those deals, plus the links
node main.ts --deals 3 --vehicles 3 --line-items 3   # also links line items to vehicles
node main.ts --deals 3 --products 3            # stage 6: the 3 newest products, on their own

node --test                            # all tests
node --test sync/logic/upsertKeys.test.ts   # one test file
node --test "sync/**/*.test.ts"        # a folder: pass a quoted glob. `node --test sync/` treats the folder as a single file and fails.

npm install && npm run typecheck       # tsc --noEmit; also checks every contract property list against its interface
npx prettier@3 --write <files>         # formatting: Prettier defaults (80 columns). Prettier is not a dependency.
```

Node 24 runs the `.ts` files directly through type stripping. There is no build step, so the code must use **erasable TypeScript only**: no `enum`, no constructor parameter properties, `import type` for type-only imports, and explicit `.ts` extensions in imports. `tsconfig.json` enforces this with `erasableSyntaxOnly` and `verbatimModuleSyntax`.

## Architecture

`main.ts` checks the portals and looks up each portal's vehicles type, then `runStages` runs one stage per object type. A stage is a small generic function in `main.ts`: `copyNewest` (deals and products, the N newest records) or `copyLinkedToDeals` (companies, vehicles and line items, plus the deal links). `copyLinksBetween` links records copied in two different stages, such as companies to vehicles or line items to vehicles: it reads the production links with `fetchLinks`, then calls `copyLinks`. Each stage strings together the steps in `sync/steps/`:

1. **`verifyPortals`** runs once per run. It reads `/account-info/v3/details` for both tokens. The rule in `logic/portalRules.ts` refuses the run unless source = 51580259 and target = 52133352. This, together with the read-only production client, is what keeps production safe.
2. **`findVehiclesTypes`** runs once per run, right after `verifyPortals`, whether or not `--vehicles` is set. It lists `GET /crm/v3/schemas` in each portal and matches the schema named `vehicles`, then logs both IDs. A portal with no vehicles object stops the run, so no URL is ever built with an empty type ID. The IDs go into each `PortalContext.vehiclesTypeId`.
3. **Fetch.**
   - `fetchRecentRecords` searches for the N newest records (sorted by `createdate`) and batch-reads them with every property in the contract. Deals use this as the anchor.
   - `fetchLinkedRecords` reads v4 associations from the previous stage's records. It collects up to N linked IDs and batch-reads them. It also returns the links so they aren't read twice.
   - `fetchLinks` reads only the v4 associations from some records to one type, without reading the linked records. `fetchLinkedRecords` uses it, and so does `copyLinksBetween`.
4. **`prepareForSandbox`** reads the sandbox's property definitions and keeps only filled-in values for properties the sandbox can write. It stamps every record with `prod_sync_date`, one ISO timestamp per run, passed in from `main.ts`.
5. **`upsertRecords`** picks each record's key, which is the first filled-in property in the contract's `keyPriority`. Records with no key are skipped and reported. It then calls `POST /crm/v3/objects/{type}/batch/upsert`, 100 at a time, with the production ID in `objectWriteTraceId`, and maps HubSpot's results back to production IDs through that field. The result's `idMap` maps production IDs to sandbox IDs, and `sentIds` lists what was sent. A dry run sends nothing.
6. **`copyLinks`** reads the sandbox's link types (`/crm/v4/associations/{from}/{to}/labels`) and translates each production link using the two `idMap`s. HUBSPOT_DEFINED types keep their ID; custom types are matched by label. A link is created only if both of its records were copied. A dry run has no sandbox IDs, so it stands in `sentIds` (`placeholderIdMap`) to count the links it would create.

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

**Facts the design relies on** (checked against production on 2026-10-07; the vehicles and deal-key facts re-checked on 2026-10-09):

- **Vehicles custom object:** keyed on `excede_vehicle_id`. Its type ID differs per portal (`2-70142906` in production, `2-70546410` in the sandbox), so `findVehiclesTypes` looks it up by name on every run. It lists `GET /crm/v3/schemas` and matches `name`, because `GET /crm/v3/schemas/vehicles` returns HTTP 400 ("Unable to infer object type"). In the sandbox `excede_vehicle_id` is unique and all 147 vehicle contract properties are writable.
- **Deal keys:** deals come from several Excede sources, each with its own unique key. That is why `keyPriority` is a list. On 2026-10-09 the 100 newest deals were service orders (76, `excede_service_order_header_id`) and lease rental contracts (24, `excede_lease_rental_contract_id`). They all link to vehicles and none links to a company, so `--companies` finds nothing right now.
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
- **Logging:** use `console.log` lines tagged `[guard]`, `[deals]`, `[vehicles]`, `[line_items]`, `[products]`, `[links]`, `[run]` or `[summary]`. Never log tokens or full property payloads.

## Projects and Tasks

`STAGES.md` is the source of truth for stage progress and open items. Read it before starting work, and tick items off as they land. Two traps to know about:

- **Env files:** the CLI defaults read `interstate/.env.prod` and `interstate/.env.sandbox`, four levels up. The workspace `.env.sandbox` defines `SERVICE_KEY=`, not `HUBSPOT_TOKEN=`, so live runs pass the repo-local files instead: `--source-env .env.prod --target-env .env.sandbox`. Both are gitignored.
- **`prod_sync_date` in the sandbox:** each object type needs this text property before its stage can `--apply`, or the upsert fails. Deals and companies have it.
