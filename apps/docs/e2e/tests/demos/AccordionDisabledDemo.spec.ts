import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with disabled items non-interactive and active items working", async ({ page }) => {
  await setupPage(page, "/docs/components/accordion");

  const activeTrigger = page.getByRole("button", { name: "Active Item" }).first();
  const disabledTrigger = page.getByRole("button", { name: "Disabled Item" }).first();

  await expect(activeTrigger).toBeVisible();
  await expect(disabledTrigger).toBeVisible();

  // Disabled item should have disabled attribute
  await expect(disabledTrigger).toBeDisabled();

  // Active item should be clickable
  await activeTrigger.click();
  await page.waitForTimeout(300);

  await expect(
    page.locator("[data-scope='accordion']").getByText(/This item is interactive/i)
  ).toBeVisible();
});
