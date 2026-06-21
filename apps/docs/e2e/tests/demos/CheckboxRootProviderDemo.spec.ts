import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("toggles checkbox and verifies external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/checkbox");

  // Verify external state output
  const output = page.getByText(/Checked:/).first();
  await expect(output).toBeVisible();
  await expect(output).toContainText("true"); // defaultChecked: true

  // Toggle checkbox
  const checkboxLabel = page.getByText("Subscribe to newsletter", { exact: true }).first();
  await checkboxLabel.click();
  await page.waitForTimeout(100);

  // Output should now show false
  await expect(output).toContainText("false");
});
