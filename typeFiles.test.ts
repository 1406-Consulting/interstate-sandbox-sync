/**
 * Keeps type declarations apart from code that runs. Everything in `types/`
 * must be a `*.types.ts` file holding only type declarations, and no
 * `*.types.ts` file may live outside `types/`.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { describe, test } from "node:test";

const TYPES_DIR = new URL("./types/", import.meta.url);

/** Lines that would put runtime code in a file: values, functions, classes, enums. */
const RUNTIME_EXPORT = /^\s*export\s+(const|let|var|function|async|class|enum|default)\b/m;
const VALUE_IMPORT = /^\s*import\s+(?!type\b)/m;

/** Lists every .ts file under the repo, skipping dependencies and git data. */
function listTsFiles(dir: URL): string[] {
  const found: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const skip = entry.name === "node_modules" || entry.name.startsWith(".");
    if (skip) {
      continue;
    }
    if (entry.isDirectory()) {
      const nested = listTsFiles(new URL(`${entry.name}/`, dir));
      found.push(...nested);
    } else if (entry.name.endsWith(".ts")) {
      found.push(new URL(entry.name, dir).pathname);
    }
  }
  return found;
}

describe("types/ folder", () => {
  const files = readdirSync(TYPES_DIR);

  test("only holds *.types.ts files", () => {
    for (const name of files) {
      assert.ok(name.endsWith(".types.ts"), `types/${name} must end in .types.ts`);
    }
  });

  for (const name of files) {
    test(`${name} has no runtime code`, () => {
      const text = readFileSync(new URL(name, TYPES_DIR), "utf8");
      assert.doesNotMatch(text, RUNTIME_EXPORT, `types/${name} exports a value`);
      assert.doesNotMatch(text, VALUE_IMPORT, `types/${name} must use "import type"`);
    });
  }
});

describe("outside types/", () => {
  test("no *.types.ts files live anywhere else", () => {
    const repoRoot = new URL("./", import.meta.url);
    const typesPath = TYPES_DIR.pathname;
    const allFiles = listTsFiles(repoRoot);
    for (const path of allFiles) {
      const isTypesFile = path.endsWith(".types.ts");
      const inTypesDir = path.startsWith(typesPath);
      if (isTypesFile) {
        assert.ok(inTypesDir, `${path} is a .types.ts file outside types/`);
      }
    }
  });
});
