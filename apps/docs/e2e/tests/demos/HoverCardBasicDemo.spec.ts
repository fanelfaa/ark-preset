import { test, expect } from "@playwright/test";

test.describe("HoverCardBasicDemo", () => {
  test("shows hover card content on hover", async ({ page }) => {
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

    // Find the hover card trigger
    const trigger = page.locator("[data-scope='hover-card'] [data-part='trigger']").first();
    await expect(trigger).toBeVisible();

    // Hover over the trigger
    await trigger.hover();
    await page.waitForTimeout(500);

    // The hover card content should appear
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").first();
    await expect(content).toBeVisible({ timeout: 5000 });
    await expect(content).toContainText(/content of this hover card is displayed when you hover/);
  });
});
