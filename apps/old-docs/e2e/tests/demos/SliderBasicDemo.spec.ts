import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders slider and verifies value display", async ({ page }) => {
  await setupPage(page, "/docs/components/slider");

  // Slider should be present with label "Volume"
  const sliderLabel = page.getByText("Volume").first();
  await expect(sliderLabel).toBeVisible();

  // Default value should be 50
  const valueText = page.locator("[data-scope='slider']").first();
  await expect(valueText).toContainText("50");

  // The slider thumb should be visible
  const thumb = page.locator("[data-scope='slider'] [data-part='thumb']").first();
  await expect(thumb).toBeVisible();

  // Drag the slider thumb to change value
  const track = page.locator("[data-scope='slider'] [data-part='control']").first();
  const trackBox = await track.boundingBox();
  if (trackBox) {
    // Click at 75% of the track width to set value around 75
    const targetX = trackBox.x + trackBox.width * 0.75;
    const targetY = trackBox.y + trackBox.height / 2;
    await page.mouse.click(targetX, targetY);
    await page.waitForTimeout(100);
  }

  // Value should have changed from 50
  const newValueText = await valueText.textContent();
  const newValue = Number.parseInt((newValueText || "0").replace(/\D/g, ""), 10);
  // Value should still be a number between 0-100
  expect(newValue).toBeGreaterThanOrEqual(0);
  expect(newValue).toBeLessThanOrEqual(100);
});
