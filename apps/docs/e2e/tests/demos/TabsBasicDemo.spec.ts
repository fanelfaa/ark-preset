import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("switches tabs and verifies content changes", async ({ page }) => {
  await setupPage(page, "/docs/components/tabs");

  // Account tab should be active by default
  const accountTab = page.getByRole("tab", { name: "Account" }).first();
  const passwordTab = page.getByRole("tab", { name: "Password" }).first();

  await expect(accountTab).toBeVisible();
  await expect(passwordTab).toBeVisible();

  // Account panel content should be visible
  await expect(
    page.getByText(/make changes to your account/i).first(),
  ).toBeVisible();

  // Click Password tab
  await passwordTab.click();
  await page.waitForTimeout(100);

  // Password panel content should now be visible
  await expect(
    page.getByText(/change your password/i).first(),
  ).toBeVisible();

  // Account panel content should be hidden
  await expect(
    page.locator("[data-scope='tabs']").getByText(/make changes to your account/i).first(),
  ).not.toBeVisible();
});
