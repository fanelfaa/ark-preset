import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("selects toggle items and verifies external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/toggle-group");

  // Find the root provider demo by "Selected:" label
  const selectedLabel = page.getByText(/Selected:/);
  await expect(selectedLabel.first()).toBeVisible();

  // Initially should show "Selected: left"
  await expect(selectedLabel.first()).toContainText("left");

  // Find the demo area
  const demoArea = page.locator(".rounded-lg:has-text('Selected:')").first();

  // Click "Center" item
  const centerItem = demoArea.locator("[data-scope='toggle-group'] [data-part='item']").filter({ hasText: "Center" });
  await centerItem.click();
  await page.waitForTimeout(100);

  // External state should now show "Center"
  await expect(selectedLabel.first()).toContainText("center");

  // Click "Right" item
  const rightItem = demoArea.locator("[data-scope='toggle-group'] [data-part='item']").filter({ hasText: "Right" });
  await rightItem.click();
  await page.waitForTimeout(100);

  // External state should now show "Right" (single select toggle group)
  await expect(selectedLabel.first()).toContainText("right");
});
