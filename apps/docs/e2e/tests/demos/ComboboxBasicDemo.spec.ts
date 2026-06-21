import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders combobox and filters results on input", async ({ page }) => {
  await setupPage(page, "/docs/components/combobox");

  // Click the combobox input trigger
  const inputTrigger = page.locator("[data-scope='combobox'] [data-part='input']").first();
  await expect(inputTrigger).toBeVisible();
  await inputTrigger.click();
  await page.waitForTimeout(200);

  // Type to filter
  await inputTrigger.fill("Reac");
  await page.waitForTimeout(200);

  // Verify filtered result appears
  await expect(page.locator("[data-scope='combobox']").getByText("React", { exact: true }).first()).toBeVisible();

  // Verify non-matching items are not visible
  const content = page.locator("[data-scope='combobox'] [data-part='content']").first();
  await expect(content).toBeVisible();
});
