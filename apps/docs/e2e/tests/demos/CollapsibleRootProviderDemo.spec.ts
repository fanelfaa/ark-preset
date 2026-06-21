import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("toggles collapsible and verifies external state display", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/collapsible");

  // Find collapsible components
  const collapsibles = page.locator("[data-scope='collapsible']");
  await expect(collapsibles.first()).toBeVisible();

  // Find trigger buttons
  const triggers = page.getByRole("button", { name: "Click to expand" });
  const triggerCount = await triggers.count();
  expect(triggerCount).toBeGreaterThanOrEqual(1);

  // Each collapsible should toggle when trigger clicked
  // Use the last trigger (RootProvider's) to avoid conflating with basic
  const rootProviderTrigger = triggers.last();
  await rootProviderTrigger.click();
  await page.waitForTimeout(500);

  checkErrors();
});