import { test, expect } from "@playwright/test";

test.describe("PaginationControlledDemo", () => {
  test("verifies controlled page state and navigates", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/pagination");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find controlled pagination demo by its label
    const controlledLabel = page.getByText(/Controlled page:/);
    await expect(controlledLabel.first()).toBeVisible();

    // Verify initial page display shows "5"
    const initialPageDisplay = page.getByText(/Controlled page:/).first();
    await expect(initialPageDisplay).toContainText("5");

    // Find the pagination near the controlled label
    const controlledPagination = page.locator("[data-scope='pagination']").filter({ has: page.locator("[data-part='first-trigger']") }).nth(0);
    // Actually scope to the demo area containing "Controlled page"
    const demoArea = page.locator(".rounded-lg:has-text('Controlled page')").first();

    // Click next page (page 5 → page 6)
    const nextBtn = demoArea.locator("[data-part='next-trigger']").first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(200);
      const afterNext = demoArea.getByText(/Controlled page:/);
      await expect(afterNext).toContainText("6");
    }

    // Click prev page (page 6 → page 5)
    const prevBtn = demoArea.locator("[data-part='prev-trigger']").first();
    if (await prevBtn.isVisible()) {
      await prevBtn.click();
      await page.waitForTimeout(200);
      const afterPrev = demoArea.getByText(/Controlled page:/);
      await expect(afterPrev).toContainText("5");
    }
  });
});
