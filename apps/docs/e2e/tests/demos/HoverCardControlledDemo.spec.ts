import { test, expect } from "@playwright/test";

test.describe("HoverCardControlledDemo", () => {
  test("shows controlled hover card and updates state display", async ({ page }) => {
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

    // Verify the controlled state display shows "false" initially
    const openStatus = page.getByText(/^Open: (true|false)$/).first();
    await expect(openStatus).toBeVisible();
    await expect(openStatus).toContainText("false");

    // Hover over the trigger
    const trigger = page.getByText("Hover me").last();
    await trigger.hover();
    await page.waitForTimeout(500);

    // The hover card should appear
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").last();
    await expect(content).toBeVisible({ timeout: 5000 });
    await expect(content).toContainText("Controlled hover card");

    // State display should now show "true"
    await expect(openStatus).toContainText("true");
  });
});
