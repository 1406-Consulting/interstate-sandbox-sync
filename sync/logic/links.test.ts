/**
 * What an operator needs to trust link copying: a link is only recreated when
 * both of its records were copied, and it uses the sandbox's own link types.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import type { AssociationLink } from "../../types/association.types.ts";
import type { AssociationType } from "../../types/crm.types.ts";
import { collectLinkedIds, translateLinks } from "./links.ts";

test("collects each linked record once, in order, up to the limit", () => {
  const links: AssociationLink[] = [
    { fromId: "deal-1", toId: "company-A", types: [] },
    { fromId: "deal-2", toId: "company-A", types: [] },
    { fromId: "deal-3", toId: "company-B", types: [] },
    { fromId: "deal-4", toId: "company-C", types: [] },
  ];

  const ids = collectLinkedIds(links, 2);

  assert.deepEqual(ids, ["company-A", "company-B"]);
});

test("only links records that were both copied, using the sandbox's link types", () => {
  const primary: AssociationType = {
    category: "HUBSPOT_DEFINED",
    typeId: 5,
    label: "Primary",
  };
  const productionCustom: AssociationType = {
    category: "USER_DEFINED",
    typeId: 29,
    label: "deal_to_vehicle",
  };
  const sandboxCustom: AssociationType = {
    category: "USER_DEFINED",
    typeId: 41, // same label, different ID in the sandbox
    label: "deal_to_vehicle",
  };
  const links: AssociationLink[] = [
    { fromId: "deal-1", toId: "co-1", types: [primary, productionCustom] },
    { fromId: "deal-2", toId: "co-2", types: [primary] }, // co-2 not copied
  ];
  const deals = { "deal-1": "sandbox-deal-1", "deal-2": "sandbox-deal-2" };
  const companies = { "co-1": "sandbox-co-1" };

  const translated = translateLinks(links, deals, companies, [
    primary,
    sandboxCustom,
  ]);

  assert.deepEqual(translated.inputs, [
    {
      from: { id: "sandbox-deal-1" },
      to: { id: "sandbox-co-1" },
      types: [
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 5 },
        { associationCategory: "USER_DEFINED", associationTypeId: 41 },
      ],
    },
  ]);
  assert.equal(translated.skippedMissingEnd, 1);
});
