import { test, expect } from "@playwright/test";

test.describe("TabsRootProviderDemo", () => {
  test("switches tabs and verifies external state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/tabs");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // External state shows default "overview"
    const output = page.locator("output").first();
    await expect(output).toContainText('"overview"');

    // "Overview" tab should be active
    const overviewTab = page.getByRole("tab", { name: "Overview" }).first();
    await expect(overviewTab).toBeVisible();

    // Click "Usage" tab
    const usageTab = page.getByRole("tab", { name: "Usage" }).first();
    await usageTab.click();
    await page.waitForTimeout(100);

    // External state should update to "usage"
    await expect(output).toContainText('"usage"');

    // Usage panel content should be visible
    await expect(
      page.getByText(/switch between different sections/i).first(),
    ).toBeVisible();

    // Click back to "Overview"
    await overviewTab.click();
    await page.waitForTimeout(100);

    // External state should update back to "overview"
    await expect(output).toContainText('"overview"');
  });
});
