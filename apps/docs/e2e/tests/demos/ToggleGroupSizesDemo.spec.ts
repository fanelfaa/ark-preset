import { test, expect } from "@playwright/test";

test.describe("ToggleGroupSizesDemo", () => {
  test("renders sm, md, lg toggle groups", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/toggle-group");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find toggle groups - there should be at least 3 (sm, md, lg)
    const toggleGroups = page.locator("[data-scope='toggle-group']");
    const groupCount = await toggleGroups.count();
    expect(groupCount).toBeGreaterThanOrEqual(5);

    // Verify individual toggle items exist across all groups
    const toggleItems = page.locator("[data-scope='toggle-group'] [data-part='item']");
    const itemCount = await toggleItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(9);

    // Verify sm size items have text "Sm"
    const smItems = page.getByText("Sm", { exact: true });
    const smCount = await smItems.count();
    expect(smCount).toBeGreaterThanOrEqual(2);

    // Verify md size items have text "Md"
    const mdItems = page.getByText("Md", { exact: true });
    const mdCount = await mdItems.count();
    expect(mdCount).toBeGreaterThanOrEqual(2);

    // Verify lg size items have text "Lg"
    const lgItems = page.getByText("Lg", { exact: true });
    const lgCount = await lgItems.count();
    expect(lgCount).toBeGreaterThanOrEqual(2);
  });
});
