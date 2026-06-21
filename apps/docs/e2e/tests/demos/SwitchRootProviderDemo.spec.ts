import { test, expect } from "@playwright/test";

test.describe("SwitchRootProviderDemo", () => {
  test("toggles switch and verifies external state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/switch");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // External state shows "Checked: true" by default
    const output = page.locator("output").first();
    await expect(output).toContainText("Checked: true");

    // Find the switch and toggle it off
    const switchLabel = page.getByText("Enable notifications").first();
    await switchLabel.click();
    await page.waitForTimeout(100);

    // External state should update to "Checked: false"
    await expect(output).toContainText("Checked: false");

    // Toggle back on
    await switchLabel.click();
    await page.waitForTimeout(100);

    // Should be "Checked: true" again
    await expect(output).toContainText("Checked: true");
  });
});
