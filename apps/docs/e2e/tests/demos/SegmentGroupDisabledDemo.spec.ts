import { test, expect } from "@playwright/test";

test.describe("SegmentGroupDisabledDemo", () => {
  test("renders with disabled segment not selectable", async ({ page }) => {
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

    // Default "React" should be active
    const reactSegment = page.getByRole("radio", { name: "React" }).first();
    await expect(reactSegment).toBeChecked();

    // "Vue" segment should be disabled
    const vueSegment = page.getByRole("radio", { name: "Vue" }).first();
    await expect(vueSegment).toBeDisabled();

    // Clicking disabled "Vue" should not change active state
    await vueSegment.click({ force: true });
    // "React" should still be checked since "Vue" is disabled
    await expect(reactSegment).toBeChecked();

    // "Solid" should be selectable
    const solidSegment = page.getByRole("radio", { name: "Solid" }).first();
    await expect(solidSegment).toBeEnabled();
    await solidSegment.click();
    await expect(solidSegment).toBeChecked();
  });
});
