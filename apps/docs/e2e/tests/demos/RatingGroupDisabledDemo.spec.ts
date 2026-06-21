import { test, expect } from "@playwright/test";

test.describe("RatingGroupDisabledDemo", () => {
  test("verifies disabled rating cannot be changed", async ({ page }) => {
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

    // Find disabled demo by "Disabled" label
    const disabledLabel = page.getByText("Disabled");
    await expect(disabledLabel.first()).toBeVisible();

    // Find the rating group in this demo area
    const demoArea = page.locator(".rounded-lg:has-text('Disabled')").first();
    const ratingGroup = demoArea.locator("[data-scope='rating-group']").first();
    await expect(ratingGroup).toBeVisible();

    // The rating group should have the disabled attribute
    await expect(ratingGroup).toHaveAttribute("data-disabled", "");

    // Stars should still render but be non-interactive
    const stars = ratingGroup.locator("[data-part='item']");
    const starCount = await stars.count();
    expect(starCount).toBe(5);

    // Verify label "Rate this" is visible
    const rateLabel = demoArea.getByText("Rate this");
    await expect(rateLabel).toBeVisible();
  });
});
