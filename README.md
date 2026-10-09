# interstate-sandbox-sync

Copies a set number of Interstate HubSpot records from production (portal 51580259) into the sandbox (portal 52133352), along with the links between them. Each record is created or updated by matching on its Excede ID, so running the script again updates records instead of duplicating them.

It currently copies deals, companies, vehicles (a custom object), line items and products. Contacts are deferred. Records are chosen by starting from the N most recent deals and following their links, with each type capped at its own limit. Vehicles are also linked to the copied companies and line items when both are copied. Products have no links in production, so the script copies the N most recent ones on their own.

Data only flows from production to the sandbox. The production client cannot write, and the script refuses to run unless the target is the Interstate sandbox.

## Status

The script is built one object type per stage: deals, companies, contacts, vehicles, line items, then products. Deals, companies, vehicles, line items and products are implemented; contacts are deferred. [`STAGES.md`](STAGES.md) tracks each stage's checklist and the open items.

## Requirements

- Node 24 or newer. It runs the `.ts` files directly, so there is no build step. `npm install` is only needed for type checking.
- Two env files in the `interstate/` workspace folder, each with a `HUBSPOT_TOKEN=` line:
  - `.env.prod` holds a production token that can read records.
  - `.env.sandbox` holds a sandbox private app token. It needs read and write access to contacts, companies, deals, line items, custom objects and `e-commerce`, plus read access to schemas and owners.

## Usage

These commands become available as each stage lands:

```sh
node main.ts --deals 3                          # dry run: shows what would change, writes nothing
node main.ts --deals 3 --apply                  # writes to the sandbox
node main.ts --deals 3 --companies 3         # also copies the companies linked to those deals, and the links
node main.ts --deals 3 --vehicles 3          # also copies the vehicles linked to those deals, and the links
node main.ts --deals 3 --line-items 3        # also copies the line items linked to those deals, and the links
node main.ts --deals 3 --products 3          # also copies the 3 newest products (no links)
```

`--deals` is required. `--companies`, `--vehicles`, `--line-items` and `--products` default to 0, which skips that stage. `--source-env` and `--target-env` change where the env files are read from. The defaults are `interstate/.env.prod` and `interstate/.env.sandbox`.

## Files

Type declarations and code that runs are kept apart:

- **`types/`** holds type declarations only. Every file ends in `.types.ts` and exports no values.
  - `crm.types.ts`: object kinds, records, property definitions and association types.
  - `hubspotClient.types.ts`: the HubSpot client, its options, and per-portal context.
  - `hubspotApi.types.ts`: raw response bodies from the HubSpot endpoints the sync reads.
  - `run.types.ts`: command-line options, per-type results and the run summary.
  - `objectContract.types.ts`: the shape every object contract follows.
  - `upsert.types.ts`: a record ready to write, the upsert input built from it, HubSpot's batch upsert response, and the tally of results.
  - `association.types.ts`: production links, and the inputs used to recreate them in the sandbox.
  - `fakeHubSpot.types.ts`: shapes used by the test-only fake client.
  - `deal.types.ts`, `contact.types.ts`, `company.types.ts`, `vehicle.types.ts`, `lineItem.types.ts`, `product.types.ts`: one record interface per object type. Each lists every writable production property with its HubSpot label and type.
- **`contracts/`** holds the values built from those types, one file per object type. Each file has the property-name list used in API calls and the object's contract: selection, upsert keys, remapping and links. `allContracts.ts` lists all six in stage order.
- **`main.ts`** checks the portals, then runs one stage per object type. Each stage fetches records (the newest ones, or those linked to an earlier stage), prepares them for the sandbox, upserts them, and copies their links.
- **`sync/`** holds the code `main.ts` calls, split by what each part is responsible for. Each file has its tests beside it.
  - **`logic/`** holds the business rules. These are pure functions with no network calls and no file access, so they're easy to test and reason about.
    - `portalRules.ts`: only production may be the source and only the sandbox the target.
    - `prepareRecords.ts`: which properties are writable, what gets sent, and the `prod_sync_date` stamp.
    - `upsertKeys.ts`: which Excede ID each record is matched on.
    - `upsertTally.ts`: totals HubSpot's upsert responses and stops on any error.
    - `links.ts`: which linked records to copy, and how a production link becomes a sandbox link. A link is only recreated when both records were copied, using the sandbox's own link type IDs.
  - **`infrastructure/`** talks to the outside world.
    - `hubspotClient.ts`: the only code that calls HubSpot. It retries on rate limits, and the production client refuses every write.
    - `hubspotApi.ts`: one function per HubSpot endpoint, covering URLs, paging and the 100-per-batch limit.
    - `env.ts` and `cli.ts`: read tokens from the env files, and flags from the command line.
    - `chunk.ts`: splits lists into batches.
  - **`steps/`** holds the run itself. Each step calls infrastructure and applies the logic: `verifyPortals.ts`, `findVehiclesTypes.ts`, `fetchRecentRecords.ts`, `fetchLinkedRecords.ts`, `fetchLinks.ts`, `prepareForSandbox.ts`, `upsertRecords.ts` and `copyLinks.ts`. `findVehiclesTypes.ts` looks up the vehicles custom object's type ID by name in each portal, because the ID differs between them. `fetchLinks.ts` reads production links on their own, for linking records copied in two different stages.
  - `fakeHubSpotClient.ts`: a test-only HubSpot client that records calls and never touches the network.

The property lists were generated from production's property definitions on 2026-10-07. Read-only and calculated properties are left out, because HubSpot rejects writes to them.

## Tests

```sh
node --test        # behavior tests
npm install        # once, for type checking
npm run typecheck  # checks every property list matches its interface
```
