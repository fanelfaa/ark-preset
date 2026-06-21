/**
 * generate-component-tests.ts
 *
 * Generates one Playwright spec file per component doc page.
 * Run after adding/removing component content directories.
 *
 * Usage: tsx e2e/generate-component-tests.ts
 */

import { existsSync, readdirSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = resolve(__dirname, "../src/content/docs");
const TESTS_DIR = resolve(__dirname, "tests");

interface SectionInfo {
  heading: string;
  hasHeading: boolean;
}

function getSectionHeadings(slug: string): SectionInfo[] {
  const dir = resolve(CONTENT_DIR, slug);
  const sections: SectionInfo[] = [];

  // intro.mdx: extract H1 heading (component name)
  const introPath = resolve(dir, "intro.mdx");
  if (existsSync(introPath)) {
    const raw = readFileSync(introPath, "utf-8");
    const h1Match = raw.match(/^#\s+(.+)/m);
    if (h1Match) {
      sections.push({ heading: h1Match[1].trim(), hasHeading: true });
    }
  }

  // usage.mdx, api.mdx, installation.gen.mdx: extract ## headings
  for (const file of ["usage.mdx", "api.mdx", "installation.gen.mdx"]) {
    const filePath = resolve(dir, file);
    if (!existsSync(filePath)) continue;

    const raw = readFileSync(filePath, "utf-8");
    const h2Match = raw.match(/^##\s+(.+)/m);
    if (h2Match) {
      sections.push({ heading: h2Match[1].trim(), hasHeading: true });
    }
  }

  return sections;
}

function displayName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function generateSpec(slug: string): string {
  const sections = getSectionHeadings(slug);
  const name = displayName(slug);

  // For intro, the H1 heading renders as h1 on the page
  // For usage/api/installation, the ## renders as h2 on the page
  const headingTests = sections
    .map((s) => {
      const role = s.heading.startsWith("##") ? "heading" : "heading";
      return `  test("${slug}: '${s.heading}' section renders", async ({ page }) => {
    await page.goto(componentUrl("${slug}"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("${role}", { name: "${escapeText(s.heading)}", exact: true })).toBeVisible();
  });`;
    })
    .join("\n\n");

  return `import { test, expect } from "@playwright/test";
import { componentUrl } from "../fixtures";

test.describe("${name}", () => {
  test.describe.configure({ mode: "parallel" });

  test("${slug}: page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(componentUrl("${slug}"));
    await page.waitForLoadState("networkidle");

    expect(response?.status()).toBe(200);
    await expect(page.getByText(/component not found/i)).not.toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();

    const relevantErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Failed to load resource")
    );
    expect(relevantErrors).toHaveLength(0);
  });

${headingTests}
});
`;
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}

// --- Main ---

const entries = readdirSync(CONTENT_DIR, { withFileTypes: true });
const slugs = entries
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

if (!existsSync(TESTS_DIR)) mkdirSync(TESTS_DIR, { recursive: true });

let generated = 0;
for (const slug of slugs) {
  const code = generateSpec(slug);
  const outPath = resolve(TESTS_DIR, `${slug}.spec.ts`);
  writeFileSync(outPath, code, "utf-8");
  generated++;
}

console.log(`✅ Generated ${generated} component test files in ${TESTS_DIR}`);
