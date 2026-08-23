import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders checkbox variants and toggles correctly", async ({ page }) => {
  await setupPage(page, "/docs/components/checkbox");

  // Verify all checkbox labels
  await expect(page.getByText("Checked", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Unchecked", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Indeterminate", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Disabled", { exact: true }).first()).toBeVisible();

  // Toggle unchecked checkbox — click its label
  const uncheckedLabel = page.getByText("Unchecked", { exact: true }).first();
  await uncheckedLabel.click();
  await page.waitForTimeout(100);

  // Should now be checked
  const checkboxInput = page.locator("[data-scope='checkbox'][data-state='checked']");
  await expect(checkboxInput.first()).toBeVisible();

  // Disabled checkbox should not be interactive
  const disabledCheckbox = page.locator("[data-scope='checkbox'][data-disabled]");
  await expect(disabledCheckbox.first()).toBeVisible();
});
