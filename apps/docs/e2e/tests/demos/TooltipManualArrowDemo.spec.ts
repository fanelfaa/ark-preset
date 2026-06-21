import { test, expect } from "@playwright/test";

test.describe("TooltipManualArrowDemo", () => {
  test("shows tooltip with custom arrow size on hover", async ({ page }) => {
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

    // Find the "Manual Arrow" trigger
    const trigger = page.getByText("Manual Arrow").first();
    await expect(trigger).toBeVisible();

    // Hover to show tooltip
    await trigger.hover();
    await page.waitForTimeout(500);

    // Tooltip content should appear
    const tooltipContent = page.getByText("Custom arrow size");
    await expect(tooltipContent.first()).toBeVisible();

    // Verify arrow exists (custom size 14px via CSS variable)
    const arrow = page.locator("[data-scope='tooltip'] [data-part='arrow']");
    await expect(arrow.first()).toBeVisible();
    // The arrow should have the custom size CSS variable
    await expect(arrow.first()).toHaveCSS("--arrow-size", "14px");

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  });
});
