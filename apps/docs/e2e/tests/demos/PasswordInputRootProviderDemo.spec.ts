import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("toggles visibility via external button", async ({ page }) => {
  await setupPage(page, "/docs/components/password-input");

  // Find the RootProvider demo by its external "Toggle" button
  const toggleBtn = page.getByRole("button", { name: "Toggle" }).first();
  await expect(toggleBtn).toBeVisible();

  // Find the RootProvider's password input (last on page)
  const input = page.locator("[data-scope='password-input'] input").last();
  await expect(input).toBeVisible();

  // Type a password
  await input.fill("secret123");
  await page.waitForTimeout(100);

  // Initially masked
  await expect(input).toHaveAttribute("type", "password");

  // Click the external Toggle button
  await toggleBtn.click();
  await page.waitForTimeout(200);

  // Should now be visible
  await expect(input).toHaveAttribute("type", "text");
  await expect(input).toHaveValue("secret123");

  // Toggle back to hidden
  await toggleBtn.click();
  await page.waitForTimeout(200);
  await expect(input).toHaveAttribute("type", "password");
});