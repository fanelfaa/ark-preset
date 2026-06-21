import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens nested menu and verifies submenu items", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/menu");

  // Click the top-level menu trigger
  const trigger = page.getByRole("button", { name: "Actions" }).last();
  await expect(trigger).toBeVisible();
  await trigger.click();
  await page.waitForTimeout(200);

  // Verify the nested submenu trigger is visible
  const shareTrigger = page.getByRole("menuitem", { name: "Share" }).first();
  await expect(shareTrigger).toBeVisible();

  // Hover over Share to open the nested submenu
  await shareTrigger.hover();
  await page.waitForTimeout(300);

  // Verify nested submenu items appear
  await expect(page.getByRole("menuitem", { name: "Twitter" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Facebook" })).toBeVisible();
  await expect(page.getByRole("menuitem", { name: "Email" })).toBeVisible();

  checkErrors();
});