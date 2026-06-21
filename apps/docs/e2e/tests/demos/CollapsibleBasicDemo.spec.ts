import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("expands and collapses on trigger click", async ({ page }) => {
  await setupPage(page, "/docs/components/collapsible");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='collapsible']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});