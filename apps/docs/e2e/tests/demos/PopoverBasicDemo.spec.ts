import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens popover and verifies title and description", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/popover");

  // Find the basic popover trigger
  const trigger = page.getByRole("button", { name: "Open Popover", exact: true }).first();
  await expect(trigger).toBeVisible();

  // Click trigger to open popover
  await trigger.click();
  await page.waitForTimeout(200);

  // Verify popover content is visible
  await expect(page.getByRole("dialog").getByText("Popover Title")).toBeVisible();
  await expect(page.getByRole("dialog").getByText(/This is a popover description/)).toBeVisible();

  checkErrors();
});