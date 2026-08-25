import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders avatars with images and fallbacks", async ({ page }) => {
  await setupPage(page, "/docs/components/avatar");

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
