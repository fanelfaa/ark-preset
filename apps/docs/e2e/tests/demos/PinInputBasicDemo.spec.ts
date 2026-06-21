import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("types pin code into individual inputs", async ({ page }) => {
  await setupPage(page, "/docs/components/pin-input");

  // Find the first pin input group in the demo
  const pinInputs = page.locator("[data-scope='pin-input'] input").first();
  await expect(pinInputs).toBeVisible();

  // The demo has label "Label" and "Masked"
  const labelText = page.getByText("Label");
  await expect(labelText.first()).toBeVisible();

  const maskedText = page.getByText("Masked");
  await expect(maskedText.first()).toBeVisible();

  // Type into the first pin input (index 0)
  const inputs = page.locator("[data-scope='pin-input'] input");
  const inputCount = await inputs.count();
  expect(inputCount).toBeGreaterThanOrEqual(8);

  // Type digits sequentially into the "Label" group (first 4 inputs)
  const digits = ["1", "2", "3", "4"];
  for (let i = 0; i < Math.min(4, inputCount); i++) {
    const pinInput = inputs.nth(i);
    if (await pinInput.isVisible()) {
      await pinInput.fill(digits[i]);
      await page.waitForTimeout(50);
      await expect(pinInput).toHaveValue(digits[i]);
    }
  }
});
