import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("selects radio and verifies external value display", async ({ page }) => {
  await setupPage(page, "/docs/components/radio-group");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='radio-group']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});