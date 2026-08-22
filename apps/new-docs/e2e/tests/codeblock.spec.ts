import { test, expect } from "@playwright/test";

test.describe("Custom Code Block", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test");
  });

  test("should render custom-code-block elements", async ({ page }) => {
    await expect(page.locator("custom-code-block")).toHaveCount(2);
  });

  test("short codeblock should not have expand button", async ({ page }) => {
    const shortBlock = page.locator("custom-code-block").first();
    await expect(shortBlock.locator(".expand-btn")).toHaveCount(0);
  });

  test("long codeblock should have expand button and toggle height", async ({ page }) => {
    const longBlock = page.locator("custom-code-block").nth(1);
    const expandBtn = longBlock.locator(".expand-btn");

    // Should have expand button
    await expect(expandBtn).toBeVisible();
    await expect(expandBtn).toHaveText("Show more");

    // Should be clamped (not have expanded class)
    await expect(longBlock).not.toHaveClass(/expanded/);

    // Click expand
    await expandBtn.click();
    await expect(longBlock).toHaveClass(/expanded/);
    await expect(expandBtn).toHaveText("Show less");

    // Click again to collapse
    await expandBtn.click();
    await expect(longBlock).not.toHaveClass(/expanded/);
    await expect(expandBtn).toHaveText("Show more");
  });

  test("copy button should copy code to clipboard", async ({ page, context }) => {
    // Grant clipboard permissions for the test
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const shortBlock = page.locator("custom-code-block").first();
    const copyBtn = shortBlock.locator(".copy-btn");

    // Copy button is visible on hover (or we can force click it)
    await copyBtn.click({ force: true });

    // Read clipboard
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

    // Compare clipboard with codeblock text
    const codeText = await shortBlock.locator("pre").textContent();
    expect(clipboardText).toBe(codeText);
  });
});
