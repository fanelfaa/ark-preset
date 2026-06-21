import { test, expect } from "@playwright/test";

test.describe("TagsInputRootProviderDemo", () => {
  test("renders with root provider and verifies external state", async ({ page }) => {
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

    // Find root provider demo by external "Tags:" label
    const tagsLabel = page.getByText(/Tags:/);
    // Use nth(2) since there's TagsInputControlledDemo and TagsInputRootProviderDemo
    // Just verify the root provider renders
    const demoArea = page.locator(".rounded-lg:has-text('Tags:')").last();
    await expect(demoArea).toBeVisible();

    // Verify existing tags "React" and "Solid" are visible
    const reactTag = demoArea.getByText("React", { exact: true });
    await expect(reactTag.first()).toBeVisible();

    const solidTag = demoArea.getByText("Solid", { exact: true });
    await expect(solidTag.first()).toBeVisible();

    // Verify input exists
    const input = demoArea.locator("input[placeholder='Add a tag...']");
    await expect(input).toBeVisible();
  });
});
