import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders and allows multiple items open simultaneously", async ({ page }) => {
  await setupPage(page, "/docs/components/accordion");

  // Use unique trigger texts only present in the multiple demo
  const trigger1 = page.getByRole("button", { name: "Can I open multiple items?", exact: true }).first();
  const trigger2 = page.getByRole("button", { name: "How does it work?", exact: true }).first();
  await expect(trigger1).toBeVisible();
  await expect(trigger2).toBeVisible();

  // Both item-1 and item-2 open by default (defaultValue: ["item-1", "item-2"])
  await expect(
    page.locator("[data-scope='accordion']").getByText(/Yes. Just pass/).first()
  ).toBeVisible();
  await expect(
    page.locator("[data-scope='accordion']").getByText(/Each item tracks/).first()
  ).toBeVisible();

  // Close item-1 by clicking its trigger
  await trigger1.click();
  await page.waitForTimeout(300);
  await expect(
    page.locator("[data-scope='accordion']").getByText(/Yes. Just pass/).first()
  ).not.toBeVisible();

  // Item-2 should remain open
  await expect(
    page.locator("[data-scope='accordion']").getByText(/Each item tracks/).first()
  ).toBeVisible();
});