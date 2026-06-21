import { test, expect } from "@playwright/test";

test.describe("ToggleGroupBasicDemo", () => {
  test("selects toggle items and verifies state changes", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/toggle-group");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the first toggle group (alignment: left/center/right)
    const leftToggle = page.locator("[data-scope='toggle-group'] [data-part='item']").filter({ hasText: "" }).first();
    // Better: find by data-value
    const leftItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='left']").first();
    const centerItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='center']").first();
    const rightItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='right']").first();

    // Left should be pressed by default (defaultValue={["left"]})
    await expect(leftItem).toHaveAttribute("data-pressed", "");

    // Click center item
    await centerItem.click();
    await page.waitForTimeout(100);

    // Center should now be pressed, left should not
    await expect(centerItem).toHaveAttribute("data-pressed", "");
    await expect(leftItem).not.toHaveAttribute("data-pressed", "");

    // Verify the multiple toggle group exists (bold/italic/underline)
    const boldItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='bold']").first();
    await expect(boldItem).toBeVisible();
    await expect(boldItem).toHaveAttribute("data-pressed", "");

    // Click italic item (should add to selection since multiple)
    const italicItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='italic']").first();
    await italicItem.click();
    await page.waitForTimeout(100);

    // Both bold and italic should be pressed (multiple selection)
    await expect(boldItem).toHaveAttribute("data-pressed", "");
    await expect(italicItem).toHaveAttribute("data-pressed", "");

    // Click underline item
    const underlineItem = page.locator("[data-scope='toggle-group'] [data-part='item'][value='underline']").first();
    await underlineItem.click();
    await page.waitForTimeout(100);

    // All three should be pressed
    await expect(boldItem).toHaveAttribute("data-pressed", "");
    await expect(italicItem).toHaveAttribute("data-pressed", "");
    await expect(underlineItem).toHaveAttribute("data-pressed", "");
  });
});
