import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("toggles button states and verifies disabled toggle", async ({ page }) => {
  await setupPage(page, "/docs/components/toggle");

  // Find toggle buttons by data-scope
  const toggles = page.locator("[data-scope='toggle']");
  const toggleCount = await toggles.count();
  expect(toggleCount).toBeGreaterThanOrEqual(3);

  // The second toggle should be pressed by default (defaultPressed)
  const secondToggle = toggles.nth(1);
  await expect(secondToggle).toHaveAttribute("data-pressed", "");

  // The third toggle should be disabled
  const thirdToggle = toggles.nth(2);
  await expect(thirdToggle).toHaveAttribute("data-disabled", "");

  // Click the first toggle to press it
  const firstToggle = toggles.first();
  await firstToggle.click();
  await page.waitForTimeout(100);

  // First toggle should now be pressed
  await expect(firstToggle).toHaveAttribute("data-pressed", "");
});
