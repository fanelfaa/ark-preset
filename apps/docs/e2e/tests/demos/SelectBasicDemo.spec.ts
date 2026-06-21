import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens dropdown and picks an option", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/select");

  // Find the basic select (no multiple prop, no searchable input)
  const selectTrigger = page.locator("[data-scope='select'] [data-part='trigger']").first();
  await expect(selectTrigger).toBeVisible();

  // Open the select dropdown
  await selectTrigger.click();
  await page.waitForTimeout(200);

  // Select an option by role
  await expect(page.getByRole("option", { name: "Vue" })).toBeVisible({ timeout: 5000 });
  await page.getByRole("option", { name: "Vue" }).click();
  await page.waitForTimeout(200);

  // Dropdown should close after single-select pick
  await expect(page.getByRole("option", { name: "Vue" })).not.toBeVisible();

  checkErrors();
});