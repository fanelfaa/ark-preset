import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("types pin and verifies external state display", async ({ page }) => {
  await setupPage(page, "/docs/components/pin-input");

  // Find the root provider demo by the Code label and output element
  const codeLabel = page.getByText("Code");
  await expect(codeLabel.first()).toBeVisible();

  // Find the external state output
  const outputElement = page.locator("output").filter({ hasText: /Value:/ });
  await expect(outputElement.first()).toBeVisible();

  // Initially value should be empty array
  const initialOutput = await outputElement.first().textContent();
  expect(initialOutput).toContain("[]");

  // Find pin inputs near the "Value:" output
  const demoArea = page.locator(".rounded-2xl").filter({ hasText: "Value:" }).first();
  const pinInputs = demoArea.locator("[data-scope='pin-input'] input");

  // Type digits sequentially by focusing the first input
  await pinInputs.first().focus();
  const digits = ["5", "6", "7", "8"];
  for (const digit of digits) {
    await page.keyboard.type(digit);
    await page.waitForTimeout(50);
  }

  // Verify external state now shows the typed values
  await expect(outputElement.first()).toContainText("5");
  await expect(outputElement.first()).toContainText("6");
  await expect(outputElement.first()).toContainText("7");
  await expect(outputElement.first()).toContainText("8");
});
