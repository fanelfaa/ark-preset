import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("controls tooltip open/close via external button", async ({ page }) => {
  await setupPage(page, "/docs/components/tooltip");

  // The controlled tooltip demo has a native button that toggles tooltip visibility
  // Button text: "Open tooltip" initially
  const openBtn = page.locator("button").filter({ hasText: "Open tooltip" }).first();
  await expect(openBtn).toBeVisible();

  // Click to trigger tooltip
  await openBtn.click();
  await page.waitForTimeout(500);

  // Toggle back
  const toggleBtn = page.locator("button").filter({ hasText: /tooltip/ }).first();
  await toggleBtn.click();
  await page.waitForTimeout(500);
});