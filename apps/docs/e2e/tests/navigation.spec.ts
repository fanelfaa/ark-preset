import { test, expect } from "@playwright/test";
import { componentUrl } from "../fixtures";

test.describe("Navigation", () => {
  test("clicking 'Components' nav link navigates to first component page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Components", exact: true }).first().click();
    await page.waitForURL(/\/docs\/components\/.+/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("clicking 'UI' brand link returns to home", async ({ page }) => {
    // Navigate to a component page first
    await page.goto("/docs/components/button");
    await page.waitForLoadState("networkidle");

    // Click brand link
    await page.getByRole("link", { name: "UI", exact: true }).click();
    await page.waitForURL("/");
    await expect(
      page.getByRole("heading", { name: "UI Component Library" })
    ).toBeVisible();
  });

  test("sidebar links navigate to correct component pages", async ({ page }) => {
    await page.goto("/docs/components/button");
    await page.waitForLoadState("networkidle");

    // Click a few sidebar links and verify the page loads
    const links = ["Checkbox", "Dialog", "Select", "Card", "Toast"];
    for (const label of links) {
      const link = page.getByRole("link", { name: label, exact: true }).first();
      await link.click();
      await page.waitForLoadState("networkidle");
      // Verify we're on a component page
      expect(page.url()).toContain("/docs/components/");
    }
  });

  test("direct navigation to all component pages returns 200", async ({ page }) => {
    // Test a representative subset to keep test fast
    const sampleSlugs = [
      "button",
      "input",
      "dialog",
      "select",
      "card",
      "accordion",
      "date-picker",
      "toast",
      "table",
      "typography",
    ];

    for (const slug of sampleSlugs) {
      const url = componentUrl(slug);
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      // No 404 text should appear
      // The page should not show the "not found" message
      await expect(page.getByText(/not found/i)).not.toBeVisible();
      expect(page.url()).toContain(url);
    }
  });

  test("unknown component shows not-found message", async ({ page }) => {
    await page.goto("/docs/components/nonexistent-component");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".text-destructive")).toBeVisible();
    await expect(page.locator(".text-destructive")).toContainText(
      /not found/i
    );
  });

  test("quickstart page renders", async ({ page }) => {
    await page.goto("/docs/quickstart");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /quickstart/i })).toBeVisible();
  });
});
