import { test, expect } from "@playwright/test";

test.describe("CollapsibleRootProviderDemo", () => {
  test("toggles collapsible and verifies external state display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/collapsible");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify external state output shows open: true (defaultOpen: true)
    const output = page.getByText(/Open:/).first();
    await expect(output).toBeVisible();
    await expect(output).toContainText("true");

    // Content should be visible initially
    await expect(
      page.locator("[data-scope='collapsible']").getByText(/collapsible state is managed externally/i)
    ).toBeVisible();

    // Find trigger and collapse
    const trigger = page.getByRole("button", { name: /Click to expand/i }).first();
    await trigger.click();
    await page.waitForTimeout(300);

    // Output should now show false
    await expect(output).toContainText("false");
  });
});
