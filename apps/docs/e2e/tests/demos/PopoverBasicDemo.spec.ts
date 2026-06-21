import { test, expect } from "@playwright/test";

test.describe("PopoverBasicDemo", () => {
  test("opens popover and verifies title and description", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/popover");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Click the popover trigger
    const trigger = page.getByRole("button", { name: "Open Popover" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(300);

    // Verify popover content is visible
    const popoverTitle = page.getByText("Popover Title");
    await expect(popoverTitle.first()).toBeVisible();

    const popoverDesc = page.getByText(/This is a popover description/);
    await expect(popoverDesc.first()).toBeVisible();

    // Close by pressing Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // Popover should be closed
    await expect(popoverTitle.first()).not.toBeVisible();
  });
});
