import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders carousel and navigates via next/prev triggers", async ({ page }) => {
  await setupPage(page, "/docs/components/carousel");

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
