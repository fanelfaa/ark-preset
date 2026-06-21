import { test, expect } from "@playwright/test";

test.describe("TooltipBasicDemo", () => {
  test("shows tooltip content on hover", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/tooltip");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the "Hover me" trigger for basic tooltip
    const trigger = page.getByText("Hover me").first();
    await expect(trigger).toBeVisible();

    // Hover to show tooltip
    await trigger.hover();
    await page.waitForTimeout(500);

    // Tooltip content should appear
    const tooltipContent = page.getByText("This is a basic tooltip");
    await expect(tooltipContent.first()).toBeVisible();

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  });
});
