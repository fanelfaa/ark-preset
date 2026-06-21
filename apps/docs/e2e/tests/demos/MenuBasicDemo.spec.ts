import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens dropdown and selects menu item", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/menu");

  // Click the menu trigger
  const trigger = page.getByRole("button", { name: "Actions" }).first();
  await expect(trigger).toBeVisible();
  await trigger.click();
  await page.waitForTimeout(200);

  // Verify dropdown content visible
  const editItem = page.getByRole("menuitem", { name: "Edit" });
  await expect(editItem).toBeVisible();

  const duplicateItem = page.getByRole("menuitem", { name: "Duplicate" });
  await expect(duplicateItem).toBeVisible();

  const deleteItem = page.getByRole("menuitem", { name: "Delete" });
  await expect(deleteItem).toBeVisible();

  // Click one menu item
  await duplicateItem.click();
  await page.waitForTimeout(200);

  // Menu should close after selection
  await expect(editItem).not.toBeVisible();

  // No errors after interaction
  checkErrors();
});
