import { test, expect } from "@playwright/test";

test.describe("ToggleBasicDemo", () => {
  test("toggles button states and verifies disabled toggle", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/toggle");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find toggle buttons by data-scope
    const toggles = page.locator("[data-scope='toggle']");
    const toggleCount = await toggles.count();
    expect(toggleCount).toBeGreaterThanOrEqual(3);

    // The second toggle should be pressed by default (defaultPressed)
    const secondToggle = toggles.nth(1);
    await expect(secondToggle).toHaveAttribute("data-pressed", "");

    // The third toggle should be disabled
    const thirdToggle = toggles.nth(2);
    await expect(thirdToggle).toHaveAttribute("data-disabled", "");

    // Click the first toggle to press it
    const firstToggle = toggles.first();
    await firstToggle.click();
    await page.waitForTimeout(100);

    // First toggle should now be pressed
    await expect(firstToggle).toHaveAttribute("data-pressed", "");
  });
});
