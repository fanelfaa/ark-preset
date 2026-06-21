import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders without errors", async ({ page }) => {
  await setupPage(page, "/docs/components/separator");
  // Verify page heading renders (page loaded successfully)
  await expect(page.locator("h1").first()).toBeVisible();
});
