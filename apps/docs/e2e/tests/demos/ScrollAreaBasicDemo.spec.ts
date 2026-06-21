import { test, expect } from "@playwright/test";

test.describe("ScrollAreaBasicDemo", () => {
  test("renders vertical and horizontal scroll areas with content", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/scroll-area");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify both scroll area labels are visible
    const verticalLabel = page.getByText("Vertical scroll");
    await expect(verticalLabel.first()).toBeVisible();

    const horizontalLabel = page.getByText("Horizontal scroll");
    await expect(horizontalLabel.first()).toBeVisible();

    // Find scroll area components
    const scrollAreas = page.locator("[data-scope='scroll-area']");
    const count = await scrollAreas.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // Verify content exists in vertical scroll (first scroll area)
    const firstScrollArea = scrollAreas.first();
    const item1 = firstScrollArea.getByText("Item 1:");
    await expect(item1).toBeVisible();

    // Verify horizontal scroll area has card items
    const secondScrollArea = scrollAreas.nth(1);
    const card1 = secondScrollArea.getByText("Card 1");
    await expect(card1).toBeVisible();
  });
});
