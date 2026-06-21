import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders and works correctly", async ({ page }) => {
  await setupPage(page, "/docs/components/segment-group");

  // Find the basic horizontal segment group
  const horizontalLabel = page.getByText("Basic horizontal", { exact: true }).first();
  await expect(horizontalLabel).toBeVisible();

  // Find segment group elements
  const segmentGroups = page.locator("[data-scope='segment-group']");
  const groupCount = await segmentGroups.count();
  expect(groupCount).toBeGreaterThanOrEqual(2);

  // First group (horizontal) should have "React" selected by default
  const firstGroup = segmentGroups.first();
  const selectedItems = firstGroup.locator("[data-state='checked']");
  await expect(selectedItems.first()).toContainText("React");

  // Click a different segment
  const secondGroup = segmentGroups.nth(1);
  if (await secondGroup.isVisible()) {
    const segments = secondGroup.locator("button");
    if ((await segments.count()) > 1) {
      await segments.nth(1).click();
      await page.waitForTimeout(200);
    }
  }
});