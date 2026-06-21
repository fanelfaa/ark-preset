import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders card with header, content, footer and actionable buttons", async ({ page }) => {
  await setupPage(page, "/docs/components/card");

  // Verify card content
  await expect(page.getByText("Create Project").first()).toBeVisible();
  await expect(page.getByText(/Deploy your new project/).first()).toBeVisible();
  await expect(page.getByText(/Your project will be deployed/).first()).toBeVisible();

  // Verify action buttons
  const deployButton = page.getByRole("button", { name: "Deploy" }).first();
  const cancelButton = page.getByRole("button", { name: "Cancel" }).first();
  await expect(deployButton).toBeVisible();
  await expect(cancelButton).toBeVisible();

  // Click deploy button — should not throw errors
  await deployButton.click();
  await page.waitForTimeout(200);
});
