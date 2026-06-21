import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens select and picks multiple options", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/select");

  // The multiple select trigger has aria-multiselectable on its content
  const triggers = page.locator("[data-scope='select'] [data-part='trigger']");
  const multipleTrigger = triggers.nth(1);
  await expect(multipleTrigger).toBeVisible();

  // Open the multiple select dropdown
  await multipleTrigger.click();
  await page.waitForTimeout(300);

  // Find matching options by role (the multiple select's content opens)
  await expect(page.getByRole("option", { name: "React" }).first()).toBeVisible({ timeout: 5000 });

  // Multiple select stays open after selection — pick two items
  await page.getByRole("option", { name: "React" }).first().click();
  await page.waitForTimeout(100);

  await page.getByRole("option", { name: "Vue" }).first().click();
  await page.waitForTimeout(100);

  // Close by pressing Escape
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  checkErrors();
});