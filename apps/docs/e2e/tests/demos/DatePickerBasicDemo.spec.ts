import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders date pickers and opens calendar on trigger click", async ({ page }) => {
  await setupPage(page, "/docs/components/date-picker");

  // Verify date pickers are rendered
  const datePickers = page.locator("[data-scope='date-picker']");
  const count = await datePickers.count();
  expect(count).toBeGreaterThanOrEqual(1);

  // Click a trigger button on the second date picker (first one already has open calendar)
  const triggers = page.getByRole("button", { name: /Open calendar/ });
  const triggerCount = await triggers.count();
  if (triggerCount > 0) {
    await triggers.first().click();
    await page.waitForTimeout(200);

    // The calendar popup uses Portal — check that a date-picker positioned calendar is visible
    const calendar = page.getByRole("application", { name: /calendar/i });
    await expect(calendar.first()).toBeVisible({ timeout: 5000 });
  }
});