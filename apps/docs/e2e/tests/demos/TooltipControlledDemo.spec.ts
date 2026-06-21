import { test, expect } from "@playwright/test";

test.describe("TooltipControlledDemo", () => {
  test("controls tooltip open/close via external button", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/tooltip");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the external control button ("Open tooltip" initially)
    const controlBtn = page.getByRole("button", { name: /Open tooltip|Close tooltip/ }).first();
    await expect(controlBtn).toBeVisible();

    // Initially tooltip should be closed - button shows "Open tooltip"
    await expect(controlBtn).toHaveText("Open tooltip");

    // Click to open tooltip
    await controlBtn.click();
    await page.waitForTimeout(300);

    // Button should now show "Close tooltip"
    await expect(controlBtn).toHaveText("Close tooltip");

    // Tooltip content should be visible
    const tooltipContent = page.getByText("Controlled tooltip");
    await expect(tooltipContent.first()).toBeVisible();

    // Click to close tooltip
    await controlBtn.click();
    await page.waitForTimeout(300);

    // Button should show "Open tooltip" again
    await expect(controlBtn).toHaveText("Open tooltip");
  });
});
