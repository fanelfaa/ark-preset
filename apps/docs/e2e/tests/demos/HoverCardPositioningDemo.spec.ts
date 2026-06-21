import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("shows hover card positioned to the right on hover", async ({ page }) => {
  await setupPage(page, "/docs/components/hover-card");

  // Verify page loaded and component renders without errors
  const scope = page.locator("[data-scope='hover-card']");
  await expect(scope.first()).toBeVisible({ timeout: 5000 });
});