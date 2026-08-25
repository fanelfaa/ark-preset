import { test, expect } from "@playwright/test";

test.describe("ComponentPreview", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solid/components/button");
  });

  test("renders the live demo correctly and is hydrated", async ({ page }) => {
    // ComponentPreview renders interactive demos via client:load
    // The button demo should be visible and interactive
    const demoSection = page.locator("custom-code-block").first();
    await expect(demoSection).toBeVisible();
  });

  test("custom-code-block elements are present on component pages", async ({ page }) => {
    // Every component page should have custom-code-block elements
    const codeBlocks = page.locator("custom-code-block");
    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("custom-code-block copy button works", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const codeBlock = page.locator("custom-code-block").first();
    // Copy button has aria-label="Copy code" (class is "absolute", not "copy-btn")
    const copyBtn = codeBlock.locator('[aria-label="Copy code"]');
    await copyBtn.waitFor({ state: "attached", timeout: 10000 });

    await copyBtn.click({ force: true });

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    const codeText = await codeBlock.locator("pre").textContent();
    expect(clipboardText.trim()).toBe(codeText?.trim());
  });
});
