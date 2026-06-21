import { test, expect } from "@playwright/test";
import { getComponentSlugs, componentUrl } from "../fixtures";

const slugs = getComponentSlugs();

test.describe("Component pages", () => {
  test.describe.configure({ mode: "parallel" });

  for (const slug of slugs) {
    test(`${slug}: page loads and renders all doc sections`, async ({ page }) => {
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

      // Should not show "not found" state
      await expect(page.getByText(/component not found/i)).not.toBeVisible();

      // Should have at least one heading (prose content rendered)
      const headingCount = await page.locator("h1, h2, h3").count();
      expect(headingCount).toBeGreaterThanOrEqual(1);

      // No console errors (ignore favicon/asset noise)
      const relevantErrors = errors.filter(
        (e) =>
          !e.includes("favicon") &&
          !e.includes("Failed to load resource") &&
          !e.includes("ERR_BLOCKED_BY_CLIENT")
      );
      expect(relevantErrors).toHaveLength(0);
    });
  }
});
