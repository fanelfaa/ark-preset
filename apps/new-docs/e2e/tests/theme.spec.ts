import { test, expect } from "@playwright/test";

test("ThemeToggle toggles html.dark and changes shiki codeblock styles", async ({ page }) => {
  await page.goto("/test");
  
  const root = page.locator("html");
  const toggleBtn = page.getByRole("button", { name: /switch to/i });
  const codeBlock = page.locator(".astro-code");

  // Wait for SolidJS hydration (client:load takes a moment)
  await page.waitForTimeout(3000);

  // Initial state should not be dark (unless OS prefers dark, but Playwright defaults to light usually)
  // Let's force light mode first if it is dark
  const isDark = await root.evaluate((node) => node.classList.contains("dark"));
  if (isDark) {
    await toggleBtn.click();
  }
  
  await expect(root).not.toHaveClass(/dark/);
  
  // get background color of codeBlock in light mode
  const lightBg = await codeBlock.evaluate((node) => window.getComputedStyle(node).backgroundColor);
  
  // Click toggle
  await toggleBtn.click();
  await expect(root).toHaveClass(/dark/);
  
  // get background color in dark mode
  const darkBg = await codeBlock.evaluate((node) => window.getComputedStyle(node).backgroundColor);
  
  expect(lightBg).not.toBe(darkBg);
});
