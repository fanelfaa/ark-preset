import { test, expect } from "@playwright/test";

test.describe("ColorPickerInlineDemo", () => {
  test("renders inline color picker without trigger button", async ({ page }) => {
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

    // Inline color picker — content should be visible without clicking a trigger
    await expect(page.getByText("Inline Color Picker").first()).toBeVisible();

    // Verify color picker exists
    const colorPickers = page.locator("[data-scope='color-picker']");
    const count = await colorPickers.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
