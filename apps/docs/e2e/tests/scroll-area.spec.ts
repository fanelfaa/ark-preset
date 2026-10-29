import { test, expect } from "@playwright/test";

test.describe("ScrollArea Component in Docs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/solid/components/scroll-area");
    await page.waitForLoadState("networkidle");
  });

  test("vertical scroll area renders scrollbar and scrolls properly", async ({ page }) => {
    // Locate the first basic demo scroll area
    const basicDemoRoot = page.locator('[data-scope="scroll-area"][data-part="root"]').nth(1);
    await expect(basicDemoRoot).toBeVisible();

    const scrollbar = basicDemoRoot.locator('[data-part="scrollbar"][data-orientation="vertical"]');
    await expect(scrollbar).toBeVisible();

    const thumb = scrollbar.locator('[data-part="thumb"]');
    await expect(thumb).toBeVisible();

    const viewport = basicDemoRoot.locator('[data-part="viewport"]');
    const initialScrollTop = await viewport.evaluate((el) => el.scrollTop);
    expect(initialScrollTop).toBe(0);

    // Scroll the viewport down
    await viewport.evaluate((el) => {
      el.scrollTop = 300;
      el.dispatchEvent(new Event("scroll"));
    });

    const newScrollTop = await viewport.evaluate((el) => el.scrollTop);
    expect(newScrollTop).toBeGreaterThan(0);
  });

  test("horizontal scroll area renders scrollbar and scrolls properly", async ({ page }) => {
    // Locate the horizontal demo scroll area (ScrollArea #3)
    const horizontalDemoRoot = page.locator('[data-scope="scroll-area"][data-part="root"]').nth(3);
    await expect(horizontalDemoRoot).toBeVisible();

    const scrollbar = horizontalDemoRoot.locator(
      '[data-part="scrollbar"][data-orientation="horizontal"]',
    );
    await expect(scrollbar).toBeVisible();

    const thumb = scrollbar.locator('[data-part="thumb"]');
    await expect(thumb).toBeVisible();

    const viewport = horizontalDemoRoot.locator('[data-part="viewport"]');
    const initialScrollLeft = await viewport.evaluate((el) => el.scrollLeft);
    expect(initialScrollLeft).toBe(0);

    // Scroll horizontally
    await viewport.evaluate((el) => {
      el.scrollLeft = 200;
      el.dispatchEvent(new Event("scroll"));
    });

    const newScrollLeft = await viewport.evaluate((el) => el.scrollLeft);
    expect(newScrollLeft).toBeGreaterThan(0);
  });
});
