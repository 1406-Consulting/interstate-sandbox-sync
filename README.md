# interstate-sandbox-sync

Copies a set number of Interstate HubSpot records from production (portal 51580259) into the sandbox (portal 52133352), along with the links between them. Each record is created or updated by matching on its Excede ID, so running the script again updates records instead of duplicating them.

It copies deals, contacts, companies, vehicles (a custom object), line items and products. Records are chosen by starting from the N most recent deals and following their links, with each type capped at its own limit. Products have no links in production, so the script copies the N most recent ones on their own.

Data only flows from production to the sandbox. The production client cannot write, and the script refuses to run unless the target is the Interstate sandbox.

## Status

The script is built one object type per stage. Each stage must be tested and approved before the next begins.

| Stage | Object type | Status |
|---|---|---|
| 0 | Type contracts (`types.ts`, `objectContracts.ts`) | Done |
| 1 | Deals | Not started |
| 2 | Contacts | Not started |
| 3 | Companies | Not started |
| 4 | Vehicles | Not started |
| 5 | Line items | Not started |
| 6 | Products | Not started |

## Requirements

- Node 24 or newer. It runs the `.ts` files directly, so there is no build step and nothing to install.
- Two env files in the `interstate/` workspace folder, each with a `HUBSPOT_TOKEN=` line:
  - `.env.prod` holds a production token that can read records.
  - `.env.sandbox` holds a sandbox private app token. It needs read and write access to contacts, companies, deals, line items, custom objects and `e-commerce`, plus read access to schemas and owners.

## Usage

These commands become available as each stage lands:

```sh
node main.ts --deals 3                          # dry run: shows what would change, writes nothing
node main.ts --deals 3 --apply                  # writes to the sandbox
node main.ts --deals 5 --contacts 5 --companies 5 --vehicles 5 --line-items 10 --products 5 --apply
```

Each type flag defaults to 0, which skips that type. `--source-env` and `--target-env` change where the env files are read from.

## Files

- `types.ts`: the data shapes shared by every module.
- `objectContracts.ts`: one contract per object type, covering how records are chosen, the upsert keys, value remapping and links.

## Tests

```sh
node --test
```
