import { test, expect } from "@playwright/test";

test.describe("RatingGroupControlledDemo", () => {
  test("clicks stars and verifies controlled value display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/rating-group");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find controlled demo by "Value:" label
    const valueLabel = page.getByText(/Value:/);
    await expect(valueLabel.first()).toBeVisible();

    // Initially should show "Value: 3"
    await expect(valueLabel.first()).toContainText("3");

    // Find the rating group in this demo area
    const demoArea = page.locator(".rounded-lg:has-text('Value:')").first();
    const stars = demoArea.locator("[data-scope='rating-group'] [data-part='item']");

    // Click the 5th star
    const fifthStar = stars.nth(4);
    if (await fifthStar.isVisible()) {
      await fifthStar.click();
      await page.waitForTimeout(100);
      // Value should now be 5
      await expect(valueLabel.first()).toContainText("5");
    }

    // Click the 1st star
    const firstStar = stars.nth(0);
    if (await firstStar.isVisible()) {
      await firstStar.click();
      await page.waitForTimeout(100);
      // Value should now be 1
      await expect(valueLabel.first()).toContainText("1");
    }
  });
});
