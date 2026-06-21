import { test, expect } from "@playwright/test";

test.describe("AvatarBasicDemo", () => {
  test("renders avatars with images and fallbacks", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/avatar");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify avatars render — fallback initials visible
    // Image-based avatars will show fallback initially until images load
    const fallbacks = page.locator("[data-scope='avatar'] [data-part='fallback']");
    const count = await fallbacks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Verify avatar images exist (may or may not be loaded)
    const images = page.locator("[data-scope='avatar'] [data-part='image']");
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThanOrEqual(1);
  });
});
