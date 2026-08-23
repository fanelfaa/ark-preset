import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens dialog, verifies content, and closes via Cancel button", async ({ page }) => {
  await setupPage(page, "/docs/components/dialog");

  // Find and click the dialog trigger button
  const openButton = page.getByRole("button", { name: "Edit Profile" }).first();
  await expect(openButton).toBeVisible();
  await openButton.click();
  await page.waitForTimeout(300);

  // Dialog should be visible with title and description
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Edit Profile")).toBeVisible();
  await expect(dialog.getByText(/Make changes to your profile/)).toBeVisible();

  // Verify form inputs are inside the dialog
  await expect(dialog.getByLabel("Name")).toBeVisible();
  await expect(dialog.getByLabel("Email")).toBeVisible();

  // Verify radio group items are present
  await expect(dialog.getByText("All notifications")).toBeVisible();
  await expect(dialog.getByText("Mentions only")).toBeVisible();
  await expect(dialog.getByText("No notifications")).toBeVisible();

  // Close dialog via Cancel button
  const cancelButton = dialog.getByRole("button", { name: "Cancel" });
  await cancelButton.click();
  await page.waitForTimeout(300);

  // Dialog should be closed
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
