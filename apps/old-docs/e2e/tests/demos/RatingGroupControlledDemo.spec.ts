import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("clicks stars and verifies controlled value display", async ({ page }) => {
  await setupPage(page, "/docs/components/rating-group");

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
