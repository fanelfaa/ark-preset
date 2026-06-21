import { test, expect } from "@playwright/test";
import { getComponentSlugs, componentUrl } from "../fixtures";

const slugs = getComponentSlugs();

test.describe("Component pages", () => {
  test.describe.configure({ mode: "parallel" });

  for (const slug of slugs) {
    test(`${slug} page loads without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      const url = componentUrl(slug);
      const response = await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Should not 404
      expect(response?.status()).toBe(200);
      expect(page.url()).toContain(url);

      // The page should not show the "not found" text (distinct from form validation errors)
      await expect(page.getByText(/component not found/i)).not.toBeVisible();

      // At least one heading should exist
      await expect(page.locator("h1, h2").first()).toBeVisible();

      // No console errors
      const relevantErrors = errors.filter(
        (e) =>
          !e.includes("favicon") &&
          !e.includes("Failed to load resource")
      );
      expect(relevantErrors).toHaveLength(0);
    });
  }
});
