import { test, expect } from "@playwright/test";

test.describe("BreadcrumbBasicDemo", () => {
  test("renders breadcrumb with links, separators, and current page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/breadcrumb");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify basic breadcrumb
    const basicSection = page.getByText("Basic Breadcrumb").first();
    await expect(basicSection).toBeVisible();

    // Home link, Components link, and Breadcrumb page
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Components" }).first()).toBeVisible();
    await expect(page.getByText("Breadcrumb", { exact: true }).first()).toBeVisible();

    // Verify breadcrumb nav element exists
    const breadcrumbs = page.locator("[data-scope='breadcrumb']");
    const count = await breadcrumbs.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify long path with ellipsis section
    await expect(page.getByText("Long Path with Ellipsis").first()).toBeVisible();
  });
});
