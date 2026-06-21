import { test, expect } from "@playwright/test";

test.describe("ColorPickerBasicDemo", () => {
  test("renders color picker with trigger and opens on click", async ({ page }) => {
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

    // Verify color picker trigger exists
    const trigger = page.locator("[data-scope='color-picker'] [data-part='trigger']").first();
    await expect(trigger).toBeVisible();

    // Open color picker
    await trigger.click();
    await page.waitForTimeout(300);

    // Content area should be visible
    const content = page.locator("[data-scope='color-picker'] [data-part='content']").first();
    await expect(content).toBeVisible();

    // Verify presets are present
    const swatches = page.locator("[data-scope='color-picker'] [data-part='swatch']");
    const swatchCount = await swatches.count();
    expect(swatchCount).toBeGreaterThanOrEqual(1);
  });
});
