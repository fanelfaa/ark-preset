import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with root provider and verifies external state", async ({ page }) => {
  await setupPage(page, "/docs/components/tags-input");

  // Find root provider demo by external "Tags:" label with React and Solid
  const demoArea = page.locator(".rounded-2xl").filter({ hasText: "Tags: React, Solid" }).first();
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
