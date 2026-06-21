import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders controlled color picker with external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/color-picker");

  // Find the color picker in the controlled demo area
  const colorPicker = page.locator("[data-scope='color-picker']").first();
  await expect(colorPicker).toBeVisible({ timeout: 5000 });

  // Verify initial color is shown in the external state
  await expect(page.locator("p").filter({ hasText: /Current color:/ })).toBeVisible();

  // Click the color picker trigger to open the swatches
  const trigger = colorPicker.locator("[data-part='trigger']").first();
  if (await trigger.isVisible()) {
    await trigger.click();
    await page.waitForTimeout(200);

    // Click a preset swatch (e.g. the red one #ff0000)
    const swatches = page.locator("[data-part='swatch']");
    const swatchCount = await swatches.count();
    if (swatchCount > 0) {
      await swatches.first().click();
      await page.waitForTimeout(200);
    }
  }
});