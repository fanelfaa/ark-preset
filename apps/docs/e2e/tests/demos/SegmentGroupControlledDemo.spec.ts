import { test, expect } from "@playwright/test";

test.describe("SegmentGroupControlledDemo", () => {
  test("renders and selects segments with controlled state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/segment-group");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify external state shows default "Solid"
    await expect(page.getByText("Selected: Solid").first()).toBeVisible();

    // Click "React" segment
    const reactSegment = page.getByRole("radio", { name: "React" }).first();
    await reactSegment.click();

    // Verify external state updated to "React"
    await expect(page.getByText("Selected: React").first()).toBeVisible();

    // Click "Vue" segment
    const vueSegment = page.getByRole("radio", { name: "Vue" }).first();
    await vueSegment.click();

    // Verify external state updated to "Vue"
    await expect(page.getByText("Selected: Vue").first()).toBeVisible();
  });
});
