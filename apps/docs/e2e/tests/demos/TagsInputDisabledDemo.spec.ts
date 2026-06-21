import { test, expect } from "@playwright/test";

test.describe("TagsInputDisabledDemo", () => {
  test("verifies disabled tags input cannot be edited", async ({ page }) => {
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

    // Find disabled demo by "Disabled tags input" label
    const disabledLabel = page.getByText("Disabled tags input");
    await expect(disabledLabel.first()).toBeVisible();

    // The tags input root should have disabled attribute
    const disabledRoot = page.locator("[data-scope='tags-input'][data-disabled]");
    await expect(disabledRoot.first()).toBeVisible();

    // Verify tags "React" and "Solid" are still visible
    const reactTag = page.getByText("React", { exact: true }).first();
    await expect(reactTag).toBeVisible();

    const solidTag = page.getByText("Solid", { exact: true }).first();
    await expect(solidTag).toBeVisible();
  });
});
