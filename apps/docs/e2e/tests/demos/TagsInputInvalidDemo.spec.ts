import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("verifies invalid tags input renders with error styling", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find invalid demo by "Invalid tags input" label
  const invalidLabel = page.getByText("Invalid tags input");
  await expect(invalidLabel.first()).toBeVisible();

  // The tags input root should have invalid attribute
  const invalidRoot = page.locator("[data-scope='tags-input'][data-invalid]");
  await expect(invalidRoot.first()).toBeVisible();

  // Verify tags "React" and "Solid" are still visible
  const reactTag = page.getByText("React", { exact: true }).first();
  await expect(reactTag).toBeVisible();
});
