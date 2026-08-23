import { test, expect } from "@playwright/test";

test.describe("ComponentPreview", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/preview-test");
  });

  test("renders the live demo correctly and is hydrated", async ({ page }) => {
    const counterBtn = page.locator("button", { hasText: /Count: \d+/ });
    await expect(counterBtn).toBeVisible();

    // Check initial state
    await expect(counterBtn).toHaveText("Count: 0");

    // Click and check if hydrated
    await counterBtn.click();
    await expect(counterBtn).toHaveText("Count: 1");
  });

  test("renders the custom-code-block correctly", async ({ page }) => {
    // The custom-code-block should exist
    const codeBlock = page.locator("custom-code-block");
    await expect(codeBlock).toBeVisible();

    // Should contain the raw code
    const pre = codeBlock.locator("pre");
    await expect(pre).toBeVisible();
    await expect(codeBlock).toContainText("createSignal");

    // Should have copy button (progressive enhancement)
    const copyBtn = codeBlock.locator(".copy-btn");
    await expect(copyBtn).toBeVisible();
  });
});
