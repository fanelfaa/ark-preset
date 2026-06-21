import { test, expect } from "@playwright/test";

test.describe("HoverCardDelayDemo", () => {
  test("shows hover card after custom delay on hover", async ({ page }) => {
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
    await expect(page.getByText(/Custom delay/).first()).toBeVisible();

    // Find the delay demo trigger — the "Hover me" in the delay section
    const delayTrigger = page.locator("[data-scope='hover-card'] [data-part='trigger']")
      .filter({ hasText: "Hover me" });
    await expect(delayTrigger.first()).toBeVisible();

    // Hover over the trigger
    await delayTrigger.first().hover();
    // Wait for the custom delay (200ms open + buffer)
    await page.waitForTimeout(400);

    // The hover card should appear after delay
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").first();
    await expect(content).toContainText("Custom delay hover card", { timeout: 5000 });
  });
});
