import { test, expect } from "@playwright/test";

test.describe("HoverCardPositioningDemo", () => {
  test("shows hover card positioned to the right on hover", async ({ page }) => {
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
    await expect(page.getByText("Positioned to the right").first()).toBeVisible();

    // Find the positioning demo trigger
    const positionTrigger = page.locator("[data-scope='hover-card'] [data-part='trigger']")
      .filter({ hasText: "Hover me" }).last();
    await expect(positionTrigger).toBeVisible();
    await positionTrigger.hover();
    await page.waitForTimeout(500);

    // The positioned hover card should be visible
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").last();
    await expect(content).toBeVisible({ timeout: 5000 });
    await expect(content).toContainText("Positioned to the right");
  });
});
