import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens dialog from external button and verifies external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/dialog");

  // Verify the external state output is visible and initially shows closed
  const output = page.locator("output").filter({ hasText: /Open:/ }).first();
  await expect(output).toBeVisible();
  await expect(output).toContainText("false");

  // Click the external "Open Dialog From Outside" button
  const externalButton = page.getByRole("button", { name: "Open Dialog From Outside" });
  await expect(externalButton).toBeVisible();
  await externalButton.click();
  await page.waitForTimeout(300);

  // Dialog should now be open
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible({ timeout: 5000 });
  await expect(dialog.getByText("Externally Controlled Dialog")).toBeVisible();

  // External state output should reflect open state
  await expect(output).toContainText("true");

  // Close via the Cancel button inside the dialog
  const cancelButton = dialog.getByRole("button", { name: "Cancel" });
  await cancelButton.click();
  await page.waitForTimeout(300);

  // Dialog should be closed
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(output).toContainText("false");
});
