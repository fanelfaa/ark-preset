import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("interacts with combobox and verifies external state", async ({ page }) => {
  await setupPage(page, "/docs/components/combobox");

  // Verify external state output shows default value
  const output = page.getByText(/Value:/).first();
  await expect(output).toBeVisible();
  await expect(output).toContainText("solid");

  // Click combobox input to open
  const inputTrigger = page.locator("[data-scope='combobox'] [data-part='input']").first();
  await inputTrigger.click();
  await page.waitForTimeout(200);

  // Select a different item
  const reactOption = page.getByRole("option", { name: "React" });
  if (await reactOption.isVisible()) {
    await reactOption.click();
    await page.waitForTimeout(200);

    // Output should update
    await expect(output).toContainText("react");
  }
});
