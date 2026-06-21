import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("toggles switch and verifies external state", async ({ page }) => {
  await setupPage(page, "/docs/components/switch");

  // Find the RootProvider switch by its unique label
  const switchLabel = page.getByText("Enable notifications", { exact: true }).first();
  await expect(switchLabel).toBeVisible();

  // Find the switch input associated with this label
  const switchRoot = page.locator("[data-scope='switch']").filter({ hasText: "Enable notifications" });
  const switchInput = switchRoot.locator("input");

  // RootProvider switch defaults to checked
  await expect(switchInput).toBeChecked();

  // Toggle off by clicking the label
  await switchLabel.click();
  await page.waitForTimeout(100);
  await expect(switchInput).not.toBeChecked();

  // Toggle back on
  await switchLabel.click();
  await page.waitForTimeout(100);
  await expect(switchInput).toBeChecked();
});