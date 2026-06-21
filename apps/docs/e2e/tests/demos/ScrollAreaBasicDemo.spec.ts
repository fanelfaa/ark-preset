import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders vertical and horizontal scroll areas with content", async ({ page }) => {
  await setupPage(page, "/docs/components/scroll-area");

  // Find vertical scroll area
  const verticalScroll = page.getByText("Vertical scroll", { exact: true }).first();
  await expect(verticalScroll).toBeVisible();

  // Find horizontal scroll area
  const horizontalScroll = page.getByText("Horizontal scroll", { exact: true }).first();
  await expect(horizontalScroll).toBeVisible();

  // Verify scroll area viewports exist
  const scrollAreas = page.locator("[data-scope='scroll-area']");
  const count = await scrollAreas.count();
  expect(count).toBeGreaterThanOrEqual(2);

  // Verify content items are rendered (20 vertical items, 12 horizontal cards)
  await expect(page.getByText("Item 1:").first()).toBeVisible();
  await expect(page.getByText("Card 1").first()).toBeVisible();
});