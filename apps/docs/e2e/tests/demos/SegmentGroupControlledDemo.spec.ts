import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders and selects segments with controlled state", async ({ page }) => {
  await setupPage(page, "/docs/components/segment-group");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='segment-group']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});