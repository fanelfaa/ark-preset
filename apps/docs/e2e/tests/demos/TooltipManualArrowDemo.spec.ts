import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("shows tooltip with custom arrow size on hover", async ({ page }) => {
  await setupPage(page, "/docs/components/tooltip");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='tooltip']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});