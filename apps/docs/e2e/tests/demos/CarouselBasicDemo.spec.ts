import { test, expect } from "@playwright/test";

test.describe("CarouselBasicDemo", () => {
  test("renders carousel and navigates via next/prev triggers", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/carousel");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify carousel exists
    const carousel = page.locator("[data-scope='carousel']");
    await expect(carousel.first()).toBeVisible();

    // Verify images are present
    const images = carousel.locator("img");
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThanOrEqual(1);

    // Click next trigger
    const nextButton = carousel.locator("[data-part='next-trigger']").first();
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await page.waitForTimeout(300);

    // Click prev trigger
    const prevButton = carousel.locator("[data-part='prev-trigger']").first();
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await page.waitForTimeout(300);

    // Verify indicators exist
    const indicators = carousel.locator("[data-part='indicator']");
    const indicatorCount = await indicators.count();
    expect(indicatorCount).toBeGreaterThanOrEqual(5);

    // Click an indicator
    await indicators.nth(2).click();
    await page.waitForTimeout(300);
  });
});
