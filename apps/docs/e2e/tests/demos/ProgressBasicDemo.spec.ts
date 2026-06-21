import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders progress bar at 65% with label and value text", async ({ page }) => {
  await setupPage(page, "/docs/components/progress");

  // Verify progress component is rendered
  const progress = page.locator("[data-scope='progress']").first();
  await expect(progress).toBeVisible({ timeout: 5000 });

  // Verify label text
  await expect(progress.getByText("Loading")).toBeVisible();

  // Verify value text shows 65%
  const valueText = progress.locator("[data-part='value-text']");
  await expect(valueText).toContainText(/65/);

  // Verify track element exists
  const track = progress.locator("[data-part='track']");
  await expect(track).toBeVisible();

  // Verify the range/bar element shows correct fill
  const range = progress.locator("[data-part='range']");
  await expect(range).toBeVisible();
});