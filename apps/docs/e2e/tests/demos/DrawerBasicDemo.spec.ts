import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens drawer, verifies content, and closes via Escape", async ({ page }) => {
  await setupPage(page, "/docs/components/drawer");

  // Find the drawer trigger button
  const openButton = page.getByRole("button", { name: "Edit Profile" }).first();
  await expect(openButton).toBeVisible();
  await openButton.click();
  await page.waitForTimeout(300);

  // Drawer content should be visible as a dialog
  const drawer = page.getByRole("dialog").first();
  await expect(drawer).toBeVisible({ timeout: 5000 });
  await expect(drawer.getByText("Edit Profile")).toBeVisible();
  await expect(drawer.getByText(/Make changes to your profile/)).toBeVisible();

  // Verify form fields inside drawer
  await expect(drawer.getByLabel("Name")).toBeVisible();
  await expect(drawer.getByLabel("Email")).toBeVisible();

  // Close drawer by pressing Escape
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  // Drawer should be closed
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
