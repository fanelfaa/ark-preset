import { test, expect } from "@playwright/test";

test.describe("TagsInputInvalidDemo", () => {
  test("verifies invalid tags input renders with error styling", async ({ page }) => {
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

    // Find invalid demo by "Invalid tags input" label
    const invalidLabel = page.getByText("Invalid tags input");
    await expect(invalidLabel.first()).toBeVisible();

    // The tags input root should have invalid attribute
    const invalidRoot = page.locator("[data-scope='tags-input'][data-invalid]");
    await expect(invalidRoot.first()).toBeVisible();

    // Verify tags "React" and "Solid" are still visible
    const reactTag = page.getByText("React", { exact: true }).first();
    await expect(reactTag).toBeVisible();
  });
});
