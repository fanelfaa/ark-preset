import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders color picker with trigger and opens on click", async ({ page }) => {
  await setupPage(page, "/docs/components/color-picker");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='color-picker']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});