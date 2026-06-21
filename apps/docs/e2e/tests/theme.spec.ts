import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    // Clear stored theme so each test starts fresh
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("ui-theme"));
    await page.reload();
    await page.waitForLoadState("networkidle");
  });

  test("toggle button is visible on landing page", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to/i });
    await expect(toggle).toBeVisible();
  });

  test("toggle button is visible on component pages", async ({ page }) => {
    await page.goto("/docs/components/button");
    await page.waitForLoadState("networkidle");
    const toggle = page.getByRole("button", { name: /switch to/i });
    await expect(toggle).toBeVisible();
  });

  test("clicking toggle switches the theme class on <html>", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /switch to/i });
    const html = page.locator("html");

    // Get initial theme state
    const initialDark = await html.evaluate((el) => el.classList.contains("dark"));

    // Click to toggle
    await toggle.click();
    expect(await html.evaluate((el) => el.classList.contains("dark"))).toBe(!initialDark);

    // Click again to revert
    await toggle.click();
    expect(await html.evaluate((el) => el.classList.contains("dark"))).toBe(initialDark);
  });

  test("theme persists after page reload", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /switch to/i });
    const html = page.locator("html");

    // Toggle away from initial
    await toggle.click();
    await page.waitForTimeout(100);
    const afterToggle = await html.evaluate((el) => el.classList.contains("dark"));

    // Reload
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Theme should still match
    const afterReload = await html.evaluate((el) => el.classList.contains("dark"));
    expect(afterReload).toBe(afterToggle);
  });
});
