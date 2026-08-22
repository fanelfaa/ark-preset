# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> ThemeToggle toggles html.dark and changes shiki codeblock styles
- Location: e2e/tests/theme.spec.ts:3:1

# Error details

```
Error: expect(locator).toHaveClass(expected) failed

Locator: locator('html')
Expected pattern: /dark/
Received string:  ""
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for locator('html')
    23 × locator resolved to <html lang="en">…</html>
       - unexpected value ""

```

```yaml
- document:
  - banner
  - complementary
  - main
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("ThemeToggle toggles html.dark and changes shiki codeblock styles", async ({ page }) => {
  4  |   await page.goto("/test");
  5  |   
  6  |   const root = page.locator("html");
  7  |   const toggleBtn = page.getByRole("button", { name: /switch to/i });
  8  |   const codeBlock = page.locator(".astro-code").first();
  9  | 
  10 |   // Wait for SolidJS hydration (client:load takes a moment)
  11 |   await page.waitForTimeout(3000);
  12 | 
  13 |   // Initial state should not be dark (unless OS prefers dark, but Playwright defaults to light usually)
  14 |   // Let's force light mode first if it is dark
  15 |   const isDark = await root.evaluate((node) => node.classList.contains("dark"));
  16 |   if (isDark) {
  17 |     await toggleBtn.click();
  18 |   }
  19 |   
  20 |   await expect(root).not.toHaveClass(/dark/);
  21 |   
  22 |   // get background color of codeBlock in light mode
  23 |   const lightBg = await codeBlock.evaluate((node) => window.getComputedStyle(node).backgroundColor);
  24 |   
  25 |   // Click toggle
  26 |   await toggleBtn.click();
> 27 |   await expect(root).toHaveClass(/dark/);
     |                      ^ Error: expect(locator).toHaveClass(expected) failed
  28 |   
  29 |   // get background color in dark mode
  30 |   const darkBg = await codeBlock.evaluate((node) => window.getComputedStyle(node).backgroundColor);
  31 |   
  32 |   expect(lightBg).not.toBe(darkBg);
  33 | });
  34 | 
```