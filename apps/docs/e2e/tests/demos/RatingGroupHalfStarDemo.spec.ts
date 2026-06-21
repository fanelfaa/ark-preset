import { test, expect } from "@playwright/test";

test.describe("RatingGroupHalfStarDemo", () => {
  test("verifies half-star rating renders with correct initial value", async ({ page }) => {
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

    // Find half-star demo by "Half stars allowed" label
    const halfStarLabel = page.getByText("Half stars allowed");
    await expect(halfStarLabel.first()).toBeVisible();

    // Find the rating group in this demo area
    const demoArea = page.locator(".rounded-lg:has-text('Half stars allowed')").first();
    const ratingGroup = demoArea.locator("[data-scope='rating-group']").first();
    await expect(ratingGroup).toBeVisible();

    // Verify 5 star items exist with initial value 2.5 (half star)
    const stars = ratingGroup.locator("[data-part='item']");
    const starCount = await stars.count();
    expect(starCount).toBe(5);

    // Verify some star has data-half attribute (for half-star at 2.5)
    // The 3rd star (index 2) should have data-half
    const thirdStar = stars.nth(2);
    await expect(thirdStar).toHaveAttribute("data-half", "");

    // Verify label "Rate this" is visible
    const rateLabel = demoArea.getByText("Rate this");
    await expect(rateLabel).toBeVisible();
  });
});
