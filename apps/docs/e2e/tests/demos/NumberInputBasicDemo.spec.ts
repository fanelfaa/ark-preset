import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("increments and decrements value via buttons", async ({ page }) => {
  await setupPage(page, "/docs/components/number-input");

  // Find the number input within the demo area
  const input = page.locator("[data-scope='number-input'] input").first();
  await expect(input).toBeVisible();

  // Get initial value
  const initialValue = await input.inputValue();
  expect(initialValue).toBe("50");

  // Find increment button and click it
  const incrementBtn = page.locator("[data-scope='number-input'] [data-part='increment-trigger']").first();
  if (await incrementBtn.isVisible()) {
    await incrementBtn.click();
    await page.waitForTimeout(100);
    const afterIncrement = await input.inputValue();
    expect(afterIncrement).toBe("51");
  }

  // Find decrement button and click it
  const decrementBtn = page.locator("[data-scope='number-input'] [data-part='decrement-trigger']").first();
  if (await decrementBtn.isVisible()) {
    await decrementBtn.click();
    await page.waitForTimeout(100);
    const afterDecrement = await input.inputValue();
    expect(afterDecrement).toBe("50");
  }

  // Type directly into the input
  await input.fill("75");
  await page.waitForTimeout(100);
  const afterType = await input.inputValue();
  expect(afterType).toBe("75");
});
