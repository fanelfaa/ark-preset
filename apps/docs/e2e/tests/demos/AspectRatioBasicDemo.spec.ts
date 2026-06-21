import { test, expect } from "@playwright/test";

test.describe("AspectRatioBasicDemo", () => {
  test("renders aspect ratio containers with correct labels", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/aspect-ratio");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify all four aspect ratio labels are visible
    await expect(page.getByText("16:9")).first().toBeVisible();
    await expect(page.getByText("4:3")).first().toBeVisible();
    await expect(page.getByText("1:1")).first().toBeVisible();
    await expect(page.getByText("9:16")).first().toBeVisible();

    // Verify aspect ratio containers exist
    const containers = page.locator("[data-scope='aspect-ratio']");
    const count = await containers.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
