import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("verifies controlled tags and external state", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find controlled demo by "Tags:" label
  const tagsLabel = page.getByText(/Tags:/);
  await expect(tagsLabel.first()).toBeVisible();

  // Initial state should show "Solid"
  await expect(tagsLabel.first()).toContainText("Solid");

  // Add a new tag via input
  const demoArea = page.locator(".rounded-lg:has-text('Tags:')").first();
  const input = demoArea.locator("[data-scope='tags-input'] input").first();
  if (await input.isVisible()) {
    await input.fill("Vue");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // External state should now include "Vue"
    await expect(tagsLabel.first()).toContainText("Solid");
    await expect(tagsLabel.first()).toContainText("Vue");
  }
});
