import { test, expect } from "@playwright/test";

test.describe("SegmentGroupBasicDemo", () => {
  test("renders and works correctly", async ({ page }) => {
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

    // Horizontal segment group: default "React" should be active
    const reactSegment = page.getByRole("radio", { name: "React" }).first();
    await expect(reactSegment).toBeVisible();
    await expect(reactSegment).toBeChecked();

    // Click "Svelte" to change active segment
    const svelteSegment = page.getByRole("radio", { name: "Svelte" }).first();
    await svelteSegment.click();
    await expect(svelteSegment).toBeChecked();
    await expect(reactSegment).not.toBeChecked();

    // Vertical segment group: default "Solid" should be active
    const solidVertical = page.getByRole("radio", { name: "Solid" }).last();
    await expect(solidVertical).toBeVisible();
    await expect(solidVertical).toBeChecked();

    // Click "Vue" in vertical group
    const vueVertical = page.getByRole("radio", { name: "Vue" }).last();
    await vueVertical.click();
    await expect(vueVertical).toBeChecked();
  });
});
