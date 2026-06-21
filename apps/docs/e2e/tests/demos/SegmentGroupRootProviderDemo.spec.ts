import { test, expect } from "@playwright/test";

test.describe("SegmentGroupRootProviderDemo", () => {
  test("renders with external state and selects segments", async ({ page }) => {
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

    // External state shows default "React"
    await expect(page.getByText("Selected: React").first()).toBeVisible();

    // "React" radio should be checked
    const reactSegment = page.getByRole("radio", { name: "React" }).first();
    await expect(reactSegment).toBeChecked();

    // Click "Solid" to change
    const solidSegment = page.getByRole("radio", { name: "Solid" }).first();
    await solidSegment.click();
    await expect(solidSegment).toBeChecked();

    // External state should update
    await expect(page.getByText("Selected: Solid").first()).toBeVisible();

    // Click "Vue" to change again
    const vueSegment = page.getByRole("radio", { name: "Vue" }).first();
    await vueSegment.click();
    await expect(vueSegment).toBeChecked();
    await expect(page.getByText("Selected: Vue").first()).toBeVisible();
  });
});
