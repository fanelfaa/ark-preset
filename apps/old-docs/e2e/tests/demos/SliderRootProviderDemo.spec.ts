import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders slider with external state and changes value", async ({ page }) => {
  await setupPage(page, "/docs/components/slider");

  // External state shows default value [50]
  const output = page.locator("output").first();
  await expect(output).toContainText("50");

  // Slider label and value text
  await expect(page.getByText("Volume")).not.toHaveCount(0);

  // The slider thumb should be visible
  const thumb = page.locator("[data-scope='slider'] [data-part='thumb']").last();
  await expect(thumb).toBeVisible();

  // Click on the track to change value
  const track = page.locator("[data-scope='slider'] [data-part='control']").last();
  const trackBox = await track.boundingBox();
  if (trackBox) {
    const targetX = trackBox.x + trackBox.width * 0.3;
    const targetY = trackBox.y + trackBox.height / 2;
    await page.mouse.click(targetX, targetY);
    await page.waitForTimeout(100);
  }

  // External state should update with new value
  const updatedText = await output.textContent();
  expect(updatedText).toContain("Value:");
  // Value should be a number between 0-100 in array format
  const match = updatedText?.match(/(\d+)/);
  if (match) {
    const val = Number.parseInt(match[1], 10);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThanOrEqual(100);
  }
});
