import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders and updates external state display on toggle", async ({ page }) => {
  await setupPage(page, "/docs/components/accordion");

  // Use unique trigger texts only present in the RootProvider demo
  const trigger1 = page.getByRole("button", { name: "What is this demo showing?", exact: true }).first();
  const trigger2 = page.getByRole("button", { name: "Why use RootProvider?", exact: true }).first();
  await expect(trigger1).toBeVisible();
  await expect(trigger2).toBeVisible();

  // item-1 open by default — verify its content
  await expect(
    page.locator("[data-scope='accordion']").getByText(/The accordion state is managed externally/).first()
  ).toBeVisible();

  // item-2 should be closed
  await expect(
    page.locator("[data-scope='accordion']").getByText(/It gives you access to the accordion context/).first()
  ).not.toBeVisible();

  // Click trigger2 to open item-2
  await trigger2.click();
  await page.waitForTimeout(300);

  // Both items should now be open
  await expect(
    page.locator("[data-scope='accordion']").getByText(/It gives you access to the accordion context/).first()
  ).toBeVisible();

  // Close item-1
  await trigger1.click();
  await page.waitForTimeout(300);
  await expect(
    page.locator("[data-scope='accordion']").getByText(/The accordion state is managed externally/).first()
  ).not.toBeVisible();
});