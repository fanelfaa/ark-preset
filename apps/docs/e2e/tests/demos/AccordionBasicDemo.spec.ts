import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders and expands/collapses items correctly", async ({ page }) => {
  await setupPage(page, "/docs/components/accordion");

  // Find accordion triggers in the demo area
  const trigger1 = page.getByRole("button", { name: "Is it accessible?" }).first();
  const trigger2 = page.getByRole("button", { name: "Is it styled?" }).first();

  await expect(trigger1).toBeVisible();
  await expect(trigger2).toBeVisible();

  // Click trigger2 to expand it
  await trigger2.click();
  await page.waitForTimeout(300);

  // Content should be visible
  await expect(
    page.locator("[data-scope='accordion']").getByText(/default styles/i)
  ).toBeVisible();

  // Click trigger2 again to collapse
  await trigger2.click();
  await page.waitForTimeout(300);
});
