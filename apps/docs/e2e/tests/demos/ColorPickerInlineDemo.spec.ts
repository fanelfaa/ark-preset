import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders inline color picker without trigger button", async ({ page }) => {
  await setupPage(page, "/docs/components/color-picker");

  // Inline color picker — content should be visible without clicking a trigger
  await expect(page.getByText("Inline Color Picker").first()).toBeVisible();

  // Verify color picker exists
  const colorPickers = page.locator("[data-scope='color-picker']");
  const count = await colorPickers.count();
  expect(count).toBeGreaterThanOrEqual(1);
});
