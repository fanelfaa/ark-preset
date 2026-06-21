import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
