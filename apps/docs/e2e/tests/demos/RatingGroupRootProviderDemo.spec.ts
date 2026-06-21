import { test, expect } from "@playwright/test";

test.describe("RatingGroupRootProviderDemo", () => {
  test("renders with root provider and verifies external state display", async ({ page }) => {
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

    // Find root provider demo by "RootProvider:" label
    const rootProviderLabel = page.getByText(/RootProvider:/);
    await expect(rootProviderLabel.first()).toBeVisible();

    // Initially should show "RootProvider: 3"
    await expect(rootProviderLabel.first()).toContainText("3");

    // Find the rating group in this demo area
    const demoArea = page.locator(".rounded-lg:has-text('RootProvider:')").first();
    const stars = demoArea.locator("[data-scope='rating-group'] [data-part='item']");

    // Click the 5th star
    const fifthStar = stars.nth(4);
    if (await fifthStar.isVisible()) {
      await fifthStar.click();
      await page.waitForTimeout(100);
      // External state should now show 5
      await expect(rootProviderLabel.first()).toContainText("5");
    }

    // Verify label "Rate this" is visible
    const rateLabel = demoArea.getByText("Rate this");
    await expect(rateLabel).toBeVisible();
  });
});
