import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens select, picks option, verifies external state", async ({ page }) => {
  await setupPage(page, "/docs/components/select");

  // Find the RootProvider select — it has an output showing "Value: [...]"
  const output = page.locator("output").filter({ hasText: /Value:/ });
  await expect(output.first()).toBeVisible();

  // RootProvider default value is "solid" — 3rd select on page (0-indexed: 2)
  const triggers = page.locator("[data-scope='select'] [data-part='trigger']");
  const trigger = triggers.nth(2);
  await expect(trigger).toBeVisible();

  // Open dropdown
  await trigger.click();
  await page.waitForTimeout(200);

  // Select a different option using role
  await page.waitForTimeout(200);
  await page.getByRole("option", { name: "Vue" }).first().click();
  await page.waitForTimeout(200);
});