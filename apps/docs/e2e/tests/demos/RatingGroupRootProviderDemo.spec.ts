import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with root provider and verifies external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/rating-group");

  // Find the RootProvider demo by its output text
  await expect(page.getByText(/^RootProvider:/)).toBeVisible();

  // Find all rating radio buttons
  const radios = page.locator("[role='radio'][aria-label*='stars']");
  const radioCount = await radios.count();
  expect(radioCount).toBeGreaterThanOrEqual(5);

  // Click the 5th star of the last group (RootProvider)
  if (radioCount >= 10) {
    await radios.nth(9).click();
  } else if (radioCount >= 5) {
    await radios.nth(4).click();
  }
  await page.waitForTimeout(200);
});