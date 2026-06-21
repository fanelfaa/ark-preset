import { test, expect } from "@playwright/test";

test.describe("BadgeBasicDemo", () => {
  test("renders all badge variants with correct text", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/badge");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify each badge variant renders
    await expect(page.getByText("Default", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Secondary", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Destructive", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Outline", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Ghost", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Link", { exact: true }).first()).toBeVisible();

    // Verify badge elements exist
    const badges = page.locator("[data-scope='badge']");
    const count = await badges.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});
