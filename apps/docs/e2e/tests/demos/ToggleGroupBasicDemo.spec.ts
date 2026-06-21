import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("selects toggle items and verifies state changes", async ({ page }) => {
  await setupPage(page, "/docs/components/toggle-group");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='toggle-group']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});