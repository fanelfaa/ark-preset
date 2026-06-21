import { test, expect } from "@playwright/test";

test.describe("PopoverRootProviderDemo", () => {
  test("opens popover and verifies external state and content", async ({ page }) => {
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

    // Find the root provider demo by external output showing "Open:"
    const outputElement = page.locator("output").filter({ hasText: /Open:/ });
    await expect(outputElement.first()).toBeVisible();

    // Initially popover should be closed
    const initialOutput = await outputElement.first().textContent();
    expect(initialOutput).toContain("false");

    // Click the trigger
    const trigger = page.getByRole("button", { name: "Open Popover" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(300);

    // External state should now show open: true
    const afterOpenOutput = await outputElement.first().textContent();
    expect(afterOpenOutput).toContain("true");

    // Popover content should be visible
    const popoverTitle = page.getByText("Popover Title");
    await expect(popoverTitle.first()).toBeVisible();

    const codeContent = page.getByText("usePopover");
    await expect(codeContent.first()).toBeVisible();

    // Close with Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // State should be closed again
    const afterCloseOutput = await outputElement.first().textContent();
    expect(afterCloseOutput).toContain("false");
  });
});
