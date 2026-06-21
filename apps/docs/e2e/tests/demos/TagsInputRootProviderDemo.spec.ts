import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with root provider and verifies external state", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find root provider demo by external "Tags:" label
  // tagsLabel
  // Use nth(2) since there's TagsInputControlledDemo and TagsInputRootProviderDemo
  // Just verify the root provider renders
  const demoArea = page.locator(".rounded-lg:has-text('Tags:')").last();
  await expect(demoArea).toBeVisible();

  // Verify existing tags "React" and "Solid" are visible
  const reactTag = demoArea.getByText("React", { exact: true });
  await expect(reactTag.first()).toBeVisible();

  const solidTag = demoArea.getByText("Solid", { exact: true });
  await expect(solidTag.first()).toBeVisible();

  // Verify input exists
  const input = demoArea.locator("input[placeholder='Add a tag...']");
  await expect(input).toBeVisible();
});
