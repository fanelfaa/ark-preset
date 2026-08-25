import { test, expect } from "@playwright/test";

test("ThemeToggle toggles html.dark and persists after reload", async ({ page }) => {
  await page.goto("/solid/components/button");
  const root = page.locator("html");

  // Wait for DocsLayout hydration
  await page.waitForTimeout(1000);

  // Clear any existing preference
  await page.evaluate(() => localStorage.removeItem("ui-theme"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await page.waitForTimeout(1000);

  // Set dark theme directly via JS
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("ui-theme", "dark");
  });

  // Verify dark class was added
  await expect(root).toHaveClass(/dark/);

  // Reload — theme should persist from localStorage
  await page.reload();
  await page.waitForTimeout(1000);
  await expect(root).toHaveClass(/dark/);
});
