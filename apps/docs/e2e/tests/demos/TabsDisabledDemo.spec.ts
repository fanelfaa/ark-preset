import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with disabled tab not selectable", async ({ page }) => {
  await setupPage(page, "/docs/components/tabs");

  // Update: tabs use .first() to scope to this demo's instance
  // Each demo has its own Tabs structure

  // Active tab should be "Active" (default)
  const activeTab = page.getByRole("tab", { name: "Active" }).first();
  const disabledTab = page.getByRole("tab", { name: "Disabled" }).first();

  await expect(activeTab).toBeVisible();
  await expect(disabledTab).toBeVisible();

  // Disabled tab should have disabled attribute
  await expect(disabledTab).toBeDisabled();

  // Active panel content should be visible
  await expect(
    page.getByText(/this tab is enabled and functional/i).first(),
  ).toBeVisible();

  // Click "Settings" tab
  const settingsTab = page.getByRole("tab", { name: "Settings" }).first();
  await settingsTab.click();
  await page.waitForTimeout(100);

  // Settings content should be visible
  await expect(
    page.getByText(/configure your preferences/i).first(),
  ).toBeVisible();

  // Clicking disabled tab should not change anything — content stays
  await disabledTab.click({ force: true });
  await page.waitForTimeout(100);

  // Settings content should still be visible (disabled tab ignored)
  await expect(
    page.getByText(/configure your preferences/i).first(),
  ).toBeVisible();
});
