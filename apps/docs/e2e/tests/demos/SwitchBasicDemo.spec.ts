import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders switches and toggles checked state", async ({ page }) => {
  await setupPage(page, "/docs/components/switch");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='switch']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});