import { test, expect } from "@playwright/test";

test.describe("PaginationBasicDemo", () => {
  test("navigates pages via next/prev/first/last buttons", async ({ page }) => {
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

    // Scope to the first pagination demo (basic)
    const demoArea = page.locator("[data-scope='pagination']").first();
    await expect(demoArea).toBeVisible();

    // Page 1 should be selected initially
    const page1 = demoArea.locator("[data-part='item'][data-selected]").first();
    await expect(page1).toHaveText("1");

    // Click next page (page 1 → page 2) using button with SVG
    const nextBtn = demoArea.locator("[data-part='next-trigger']").first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(200);

      // Page 2 should now be selected
      const page2 = demoArea.locator("[data-part='item'][data-selected]").first();
      await expect(page2).toHaveText("2");
    }

    // Click previous to go back to page 1
    const prevBtn = demoArea.locator("[data-part='prev-trigger']").first();
    if (await prevBtn.isVisible()) {
      await prevBtn.click();
      await page.waitForTimeout(200);

      const page1Again = demoArea.locator("[data-part='item'][data-selected]").first();
      await expect(page1Again).toHaveText("1");
    }

    // Click last page
    const lastBtn = demoArea.locator("[data-part='last-trigger']").first();
    if (await lastBtn.isVisible()) {
      await lastBtn.click();
      await page.waitForTimeout(200);

      const lastPage = demoArea.locator("[data-part='item'][data-selected]").first();
      await expect(lastPage).toHaveText("10");
    }

    // Click first page
    const firstBtn = demoArea.locator("[data-part='first-trigger']").first();
    if (await firstBtn.isVisible()) {
      await firstBtn.click();
      await page.waitForTimeout(200);

      const firstPage = demoArea.locator("[data-part='item'][data-selected]").first();
      await expect(firstPage).toHaveText("1");
    }
  });
});
