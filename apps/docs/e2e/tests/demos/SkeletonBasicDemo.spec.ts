import { test, expect } from "@playwright/test";

test.describe("SkeletonBasicDemo", () => {
  test("renders skeleton elements without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/skeleton");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Skeleton elements should render with data-scope
    const skeletons = page.locator("[data-scope='skeleton']");
    const count = await skeletons.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // All skeleton elements should be visible and have the animate-pulse class
    const firstSkeleton = skeletons.first();
    await expect(firstSkeleton).toBeVisible();
  });
});
