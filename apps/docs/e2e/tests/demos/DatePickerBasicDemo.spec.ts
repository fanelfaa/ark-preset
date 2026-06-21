import { test, expect } from "@playwright/test";

test.describe("DatePickerBasicDemo", () => {
  test("renders date pickers and opens calendar on trigger click", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/date-picker");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify all date picker labels are visible
    await expect(page.getByText("Birth date").first()).toBeVisible();
    await expect(page.getByText("Select date").first()).toBeVisible();
    await expect(page.getByText("Date range").first()).toBeVisible();
    await expect(page.getByText("Multiple dates").first()).toBeVisible();

    // Click the first date picker trigger to open the calendar
    const firstTrigger = page.locator("[data-scope='date-picker'] [data-part='trigger']").first();
    await expect(firstTrigger).toBeVisible();
    await firstTrigger.click();
    await page.waitForTimeout(300);

    // Calendar should be visible
    const calendar = page.locator("[data-scope='date-picker'] [data-part='content']").first();
    await expect(calendar).toBeVisible({ timeout: 5000 });

    // Click a date cell in the calendar
    const dateCell = page.locator("[data-scope='date-picker'] [data-part='day-cell']:not([data-outside-range])").first();
    if (await dateCell.isVisible()) {
      await dateCell.click();
      await page.waitForTimeout(200);
    }

    // Close the calendar by pressing Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    // Click the range date picker trigger
    const rangeTrigger = page.locator("[data-scope='date-picker'] [data-part='trigger']").nth(4);
    if (await rangeTrigger.isVisible()) {
      await rangeTrigger.click();
      await page.waitForTimeout(300);
      // Range calendar should open
      const rangeCalendar = page.locator("[data-scope='date-picker'] [data-part='content']").last();
      await expect(rangeCalendar).toBeVisible({ timeout: 5000 });
    }
  });
});
