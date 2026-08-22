import { test, expect } from "@playwright/test";

test("Layout renders correctly", async ({ page }) => {
  await page.goto("/");
  
  // Verify the main heading inside DocsLayout
  await expect(page.getByRole("heading", { name: "Welcome to Docs" })).toBeVisible();
  
  // Verify sidebar navigation exists (e.g. looking for "Getting Started" category)
  await expect(page.getByText("Getting Started")).toBeVisible();
  
  // Verify GitHub footer exists
  await expect(page.locator("footer").getByText("GitHub")).toBeVisible();
});
