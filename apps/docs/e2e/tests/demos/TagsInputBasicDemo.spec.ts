import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders tags and adds new tag", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find the basic tags input demo
  const basicLabel = page.getByText("Basic tags input");
  await expect(basicLabel.first()).toBeVisible();

  // Verify existing tags "React" and "Solid" are visible
  const reactTag = page.getByText("React", { exact: true }).first();
  await expect(reactTag).toBeVisible();

  const solidTag = page.getByText("Solid", { exact: true }).first();
  await expect(solidTag).toBeVisible();

  // Find the input and type a new tag
  const input = page.locator("[data-scope='tags-input'] input").first();
  if (await input.isVisible()) {
    await input.fill("Vue");
    await input.press("Enter");
    await page.waitForTimeout(200);

    // New tag should appear
    const vueTag = page.getByText("Vue", { exact: true }).first();
    await expect(vueTag).toBeVisible();
  }
});
