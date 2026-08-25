import { test, expect } from "@playwright/test";

test.describe("Layout", () => {
  test("should render the docs layout", async ({ page }) => {
    await page.goto("/");

    // Check for DocsLayout header
    const header = page.locator("header").first();
    await expect(header).toBeVisible();
  });

  test("should show UI Component Library as the page title on home", async ({ page }) => {
    await page.goto("/");

    const h1 = page.locator("h1").first();
    await expect(h1).toHaveText("UI Component Library");
  });

  test("should show sidebar on component pages", async ({ page }) => {
    await page.goto("/solid/components/button");

    const sidebar = page.locator('[data-testid="docs-sidebar"]');
    await expect(sidebar).toBeVisible();
  });

  test("should not show sidebar on the home page", async ({ page }) => {
    await page.goto("/");

    const sidebar = page.locator('[data-testid="docs-sidebar"]');
    await expect(sidebar).toHaveCount(0);
  });
});
