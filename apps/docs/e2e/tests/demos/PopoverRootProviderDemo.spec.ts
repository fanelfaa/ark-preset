import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens popover and verifies external state and content", async ({ page }) => {
  const { checkErrors } = await setupPage(page, "/docs/components/popover");

  // RootProvider popover uses the same trigger text
  const trigger = page.getByRole("button", { name: "Open Popover" }).last();
  await expect(trigger).toBeVisible();

  // Click trigger to open popover
  await trigger.click();
  await page.waitForTimeout(200);

  // Verify popover content is visible
  await expect(page.getByRole("dialog").getByText(/This popover state is managed externally/)).toBeVisible();

  checkErrors();
});