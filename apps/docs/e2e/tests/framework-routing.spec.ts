import { test, expect } from "@playwright/test";

test.describe("Framework Routing", () => {
  test("framework selector exists and defaults to solid", async ({ page }) => {
    await page.goto("/solid/components/button");

    const selector = page.locator('[data-testid="framework-selector"]');
    await expect(selector).toHaveValue("solid");

    // Verify all framework options are present
    await expect(selector.locator("option")).toHaveCount(3);
  });

  test("sidebar links point to docs components path", async ({ page }) => {
    await page.goto("/solid/components/button");

    // Wait for hydration
    await page.waitForTimeout(500);

    // The sidebar should have links pointing to /docs/components/... framework
    const sidebarLinks = page.locator("aside nav a");
    const firstLink = sidebarLinks.first();
    const href = await firstLink.getAttribute("href");
    expect(href).toMatch(/^\/docs\//);
  });

  test("homepage renders with solid framework", async ({ page }) => {
    await page.goto("/");

    // Should show Browse Components CTA pointing to solid
    const browseBtn = page.getByRole("link", { name: "Browse Components" });
    await expect(browseBtn).toHaveAttribute("href", "/solid/components/button");

    // Category links should point to solid
    const accordionLink = page.locator("a", { hasText: "Accordion" }).first();
    await expect(accordionLink).toHaveAttribute("href", "/solid/components/accordion");
  });

  test("quickstart page renders correctly", async ({ page }) => {
    await page.goto("/docs/quickstart");

    await expect(page.locator("h1")).toContainText("Quickstart");
    await expect(page.getByText("Prerequisites")).toBeVisible();
  });
});
