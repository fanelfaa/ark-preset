import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("types password and toggles visibility", async ({ page }) => {
  await setupPage(page, "/docs/components/password-input");

  // Find the first password input in the demo area
  const firstInput = page.locator("[data-scope='password-input'] input").first();
  await expect(firstInput).toBeVisible();

  // Initially the input should be type=password (masked)
  await expect(firstInput).toHaveAttribute("type", "password");

  // Type a password
  await firstInput.fill("secret123");
  await page.waitForTimeout(100);

  // Toggle visibility using the toggle button
  const toggleBtn = page.locator("[data-scope='password-input'] [data-part='toggle-trigger']").first();
  if (await toggleBtn.isVisible()) {
    await toggleBtn.click();
    await page.waitForTimeout(200);

    // After toggle, input should be type=text (visible)
    await expect(firstInput).toHaveAttribute("type", "text");
    await expect(firstInput).toHaveValue("secret123");
  }

  // Toggle back to hidden
  if (await toggleBtn.isVisible()) {
    await toggleBtn.click();
    await page.waitForTimeout(200);
    await expect(firstInput).toHaveAttribute("type", "password");
  }
});
