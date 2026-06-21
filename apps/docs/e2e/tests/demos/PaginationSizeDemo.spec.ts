import { test, expect } from "@playwright/test";

test.describe("PaginationSizeDemo", () => {
  test("renders sm, md, lg pagination sizes", async ({ page }) => {
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

    // Find the size demo by looking for "Size sm", "Size md", "Size lg" labels
    const smLabel = page.getByText(/Size sm/);
    const mdLabel = page.getByText(/Size md/);
    const lgLabel = page.getByText(/Size lg/);

    await expect(smLabel.first()).toBeVisible();
    await expect(mdLabel.first()).toBeVisible();
    await expect(lgLabel.first()).toBeVisible();

    // Verify each size demo has pagination elements
    const demoArea = page.locator(".rounded-lg:has-text('Size lg')").first();

    // Verify first/last/prev/next triggers exist across all three variants
    const paginationInstances = demoArea.locator("[data-scope='pagination']");
    const instanceCount = await paginationInstances.count();
    expect(instanceCount).toBeGreaterThanOrEqual(3);

    // Verify page items exist
    const pageItems = demoArea.locator("[data-part='item']");
    const itemCount = await pageItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(3);
  });
});
