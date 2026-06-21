import { test, expect } from "@playwright/test";

test.describe("ColorPickerControlledDemo", () => {
  test("renders controlled color picker with external state display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/color-picker");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify external state display shows current color
    const currentColor = page.getByText(/Current color:/).first();
    await expect(currentColor).toBeVisible();

    // Open color picker
    const trigger = page.locator("[data-scope='color-picker'] [data-part='trigger']").first();
    await trigger.click();
    await page.waitForTimeout(300);

    // Verify picker content opens
    const content = page.locator("[data-scope='color-picker'] [data-part='content']").first();
    await expect(content).toBeVisible();
  });
});
