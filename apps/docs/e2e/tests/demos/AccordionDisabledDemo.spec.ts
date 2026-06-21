import { test, expect } from "@playwright/test";

test.describe("AccordionDisabledDemo", () => {
  test("renders with disabled items non-interactive and active items working", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/accordion");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    const activeTrigger = page.getByRole("button", { name: "Active Item" }).first();
    const disabledTrigger = page.getByRole("button", { name: "Disabled Item" }).first();

    await expect(activeTrigger).toBeVisible();
    await expect(disabledTrigger).toBeVisible();

    // Disabled item should have disabled attribute
    await expect(disabledTrigger).toBeDisabled();

    // Active item should be clickable
    await activeTrigger.click();
    await page.waitForTimeout(300);

    await expect(
      page.locator("[data-scope='accordion']").getByText(/This item is interactive/i)
    ).toBeVisible();
  });
});
