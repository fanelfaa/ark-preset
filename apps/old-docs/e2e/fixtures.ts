import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type Page, expect } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

/** All component doc directories under apps/docs/src/content/docs/ */
const CONTENT_DOCS = resolve(__dirname, "../src/content/docs");

/** List of component slugs (kebab-case names) available as doc pages */
export function getComponentSlugs(): string[] {
  const entries = readdirSync(CONTENT_DOCS, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/** Full URL path for a component doc page */
export function componentUrl(slug: string): string {
  return `/docs/components/${slug}`;
}

/**
 * Navigate to a component doc page, collect console errors, and assert
 * no relevant errors occurred. Returns a checkErrors function for
 * post-interaction re-checks.
 */
export async function setupPage(page: Page, url: string) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(url);
  await page.waitForLoadState("networkidle");

  const checkErrors = () => {
    const relevant = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevant).toHaveLength(0);
  };

  checkErrors();
  return { checkErrors };
}
