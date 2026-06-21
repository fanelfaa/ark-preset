import { test, expect } from "@playwright/test";

test.describe("HoverCardArrowDemo", () => {
  test("shows hover card with custom arrow on hover", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/hover-card");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify section label
    await expect(page.getByText("Custom arrow size").first()).toBeVisible();

    // Hover over the trigger
    const trigger = page.getByText("Hover me").first();
    await trigger.hover();
    await page.waitForTimeout(500);

    // The hover card with custom arrow should be visible
    const arrow = page.locator("[data-scope='hover-card'] [data-part='arrow']").first();
    await expect(arrow).toBeVisible({ timeout: 5000 });

    // Content should also be visible
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").first();
    await expect(content).toBeVisible();
    await expect(content).toContainText("Custom arrow size");
  });
});
