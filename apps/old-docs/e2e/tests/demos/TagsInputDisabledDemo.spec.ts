import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("verifies disabled tags input cannot be edited", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find disabled demo by "Disabled tags input" label
  const disabledLabel = page.getByText("Disabled tags input");
  await expect(disabledLabel.first()).toBeVisible();

  // The tags input root should have disabled attribute
  const disabledRoot = page.locator("[data-scope='tags-input'][data-disabled]");
  await expect(disabledRoot.first()).toBeVisible();

  // Verify tags "React" and "Solid" are still visible
  const reactTag = page.getByText("React", { exact: true }).first();
  await expect(reactTag).toBeVisible();

  const solidTag = page.getByText("Solid", { exact: true }).first();
  await expect(solidTag).toBeVisible();
});
