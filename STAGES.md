# Stages

Each stage adds one object type, plus its links to types copied earlier. A stage is done when its tests pass, a dry run and an `--apply` run succeed, and a second `--apply` run creates nothing new.

## 1. Deals: built
- [x] Read the N newest production deals with every contract property
- [x] Keep only properties the sandbox can write; stamp `prod_sync_date`
- [x] Upsert on the first filled-in Excede key; dry run writes nothing
- [x] Live dry run (2026-10-07): 3 deals would be sent, and every deal contract property is writable in the sandbox
- [ ] Live `--apply --deals 3`, then `--apply` again creates 0

## 2. Companies: built
Moved ahead of contacts on 2026-10-07. Production has 1 contact and no deal↔contact links, while 99 of the 100 newest deals link to a company.
- [x] Reorder contracts: companies is stage 2, contacts stage 3
- [x] Read the companies linked to the copied deals, capped at `--companies N`
- [x] Upsert companies on `excede_customer_id`
- [x] Copy deal→company links, both the unlabeled one and "Primary", using the sandbox's own link type IDs; dry run creates none
- [x] Live dry run (2026-10-07): 3 companies and 3 links would be created. `hs_recent_news` isn't writable in the sandbox, so it's left out.
- [x] Created `prod_sync_date` (text, Company information group) on sandbox companies (2026-10-07)
- [ ] Live `--apply`, then `--apply` again creates 0

## 3. Contacts: future work
Removed from the code on 2026-10-07. Production has 1 contact and no links to deals, so this stage would copy nothing until Excede contacts are synced. Its contract (`contracts/contact.ts`) stays as the spec.
- [ ] Contacts linked to copied deals or companies, upserted on `excede_customer_contact_id`, then `email`
- [ ] Links to deals and companies

## 4. Vehicles: not started
- [ ] Look up the vehicles type ID in each portal by name. Production uses `2-70142906`.
- [ ] Vehicles linked to copied deals, companies or contacts, upserted on `excede_vehicle_id`
- [ ] Links: deal→vehicle uses USER_DEFINED types, one unlabeled and one labeled `deal_to_vehicle`. Those are matched to the sandbox by label.

## 5. Line items: built
- [x] Read the line items linked to the copied deals, capped at `--line-items N`
- [x] Upsert line items on the first filled-in key in `keyPriority`
- [x] Copy deal→line item links; dry run creates none
- [ ] Line item→vehicle links wait for stage 4 (vehicles aren't copied yet)
- [ ] Live dry run
- [ ] Create `prod_sync_date` (text) on sandbox line items
- [ ] Live `--apply`, then `--apply` again creates 0

## 6. Products: built
- [x] Read the N newest products on their own, capped at `--products N`. No production line item has `hs_product_id`, so there are no links.
- [x] Upsert products on `excede_part_id`
- [ ] Live dry run
- [ ] Create `prod_sync_date` (text) on sandbox products
- [ ] Live `--apply`, then `--apply` again creates 0

## Open items
- [ ] Sandbox needs a `prod_sync_date` text property on each object type before its stage can `--apply`. Deals and companies have it; contacts, vehicles, line items and products don't yet.
- [ ] Owner and pipeline/stage remapping (contract `remaps`) is not implemented. The values are sent as they are.
- [ ] Decide whether `--deals N` copies N of each deal type, or the N newest overall. Today the newest are all lease rental bills.
