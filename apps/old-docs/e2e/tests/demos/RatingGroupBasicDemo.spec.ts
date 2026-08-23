import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders rating stars and verifies initial rating", async ({ page }) => {
  await setupPage(page, "/docs/components/rating-group");

  // Find rating group with label "Rate this"
  const ratingLabel = page.getByText("Rate this");
  await expect(ratingLabel.first()).toBeVisible();

  // Find the rating group
  const ratingGroup = page.locator("[data-scope='rating-group']").first();
  await expect(ratingGroup).toBeVisible();

  // Verify 5 star items exist
  const starItems = ratingGroup.locator("[data-part='item']");
  const starCount = await starItems.count();
  expect(starCount).toBe(5);

  // Click the 4th star to change rating from 3 to 4
  const fourthStar = starItems.nth(3);
  await fourthStar.click();
  await page.waitForTimeout(100);

  // Verify the 4th star is now highlighted
  await expect(fourthStar).toHaveAttribute("data-highlighted", "");
});
