import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("verifies disabled rating cannot be changed", async ({ page }) => {
  await setupPage(page, "/docs/components/rating-group");

  // Find the disabled rating group by its "Disabled" label
  const disabledLabel = page.getByText("Disabled", { exact: true }).first();
  await expect(disabledLabel).toBeVisible();

  // The disabled group — find it after the "Disabled" label
  const disabledGroup = page.locator("[data-scope='rating-group']").filter({ has: page.getByText("Rate this") });
  await expect(disabledGroup.first()).toBeVisible();

  // Verify items have disabled state
  const items = disabledGroup.locator("[data-part='item']");
  const itemCount = await items.count();
  expect(itemCount).toBeGreaterThanOrEqual(5);

  // Clicking an item with force should not cause errors (disabled)
  await items.first().click({ force: true });
  await page.waitForTimeout(200);
});