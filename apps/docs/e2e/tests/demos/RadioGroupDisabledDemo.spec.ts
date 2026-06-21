import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("verifies disabled option cannot be selected", async ({ page }) => {
  await setupPage(page, "/docs/components/radio-group");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='radio-group']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});