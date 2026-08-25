import { test, expect } from "@playwright/test";

test.describe("Custom Code Block", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solid/components/button");
  });

  test("should render custom-code-block elements on component pages", async ({ page }) => {
    const count = await page.locator("custom-code-block").count();
    expect(count).toBeGreaterThan(0);
  });

  test("long codeblock should have expand button and toggle height", async ({ page }) => {
    // Wait for custom elements to register
    await page.waitForFunction(() => customElements.get("custom-code-block") !== undefined);

    // Find the first code block that has an expand button (only long ones have it)
    const expandBtn = page.locator("custom-code-block .expand-btn").first();
    await expect(expandBtn).toBeVisible();
    await expect(expandBtn).toHaveText("Show more");

    // Click expand
    await expandBtn.click();
    await expect(expandBtn).toHaveText("Show less");

    // Click again to collapse
    await expandBtn.click();
    await expect(expandBtn).toHaveText("Show more");
  });

  test("copy button should copy code to clipboard", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Wait for copy button to appear (it gets added by connectedCallback after hydration)
    const codeBlock = page.locator("custom-code-block").first();
    // Copy button has aria-label="Copy code" (class is "absolute", not "copy-btn")
    const copyBtn = codeBlock.locator('[aria-label="Copy code"]');
    await copyBtn.waitFor({ state: "attached", timeout: 10000 });

    // Click the copy button
    await copyBtn.click({ force: true });

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    const codeText = await codeBlock.locator("pre").textContent();
    expect(clipboardText.trim()).toBe(codeText?.trim());
  });
});
