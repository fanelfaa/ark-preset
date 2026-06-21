import { test, expect } from "@playwright/test";

test.describe("SegmentGroupOutlineDemo", () => {
  test("renders outline variant and selects segments", async ({ page }) => {
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

    // Default "React" should be active in outline variant
    const reactSegment = page.getByRole("radio", { name: "React" }).first();
    await expect(reactSegment).toBeVisible();
    await expect(reactSegment).toBeChecked();

    // Switch to "Solid"
    const solidSegment = page.getByRole("radio", { name: "Solid" }).first();
    await solidSegment.click();
    await expect(solidSegment).toBeChecked();
    await expect(reactSegment).not.toBeChecked();

    // Switch to "Vue"
    const vueSegment = page.getByRole("radio", { name: "Vue" }).first();
    await vueSegment.click();
    await expect(vueSegment).toBeChecked();
  });
});
