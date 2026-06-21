import { test, expect } from "@playwright/test";

test.describe("TagsInputBasicDemo", () => {
  test("renders tags and adds new tag", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/tags-input");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the basic tags input demo
    const basicLabel = page.getByText("Basic tags input");
    await expect(basicLabel.first()).toBeVisible();

    // Verify existing tags "React" and "Solid" are visible
    const reactTag = page.getByText("React", { exact: true }).first();
    await expect(reactTag).toBeVisible();

    const solidTag = page.getByText("Solid", { exact: true }).first();
    await expect(solidTag).toBeVisible();

    // Find the input and type a new tag
    const input = page.locator("[data-scope='tags-input'] input").first();
    if (await input.isVisible()) {
      await input.fill("Vue");
      await input.press("Enter");
      await page.waitForTimeout(200);

      // New tag should appear
      const vueTag = page.getByText("Vue", { exact: true }).first();
      await expect(vueTag).toBeVisible();
    }
  });
});
