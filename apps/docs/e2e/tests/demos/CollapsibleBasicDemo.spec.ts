import { test, expect } from "@playwright/test";

test.describe("CollapsibleBasicDemo", () => {
  test("expands and collapses on trigger click", async ({ page }) => {
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

    // Find collapsible trigger
    const trigger = page.getByRole("button", { name: /Click to expand/i }).first();
    await expect(trigger).toBeVisible();

    // Click to expand
    await trigger.click();
    await page.waitForTimeout(300);

    // Content should be visible
    await expect(
      page.locator("[data-scope='collapsible']").getByText(/This is the collapsible content/i)
    ).toBeVisible();

    // Click to collapse
    await trigger.click();
    await page.waitForTimeout(300);

    // Content should be hidden
    await expect(
      page.locator("[data-scope='collapsible'] [data-state='open']")
    ).not.toBeVisible();
  });
});
