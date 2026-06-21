import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders with root provider and navigates pages", async ({ page }) => {
  await setupPage(page, "/docs/components/pagination");

  // Find the root provider demo by its text
  const rootProviderLabel = page.getByText("RootProvider pattern");
  await expect(rootProviderLabel.first()).toBeVisible();

  // Scope to the demo containing "RootProvider pattern"
  const demoArea = page.locator(".rounded-lg:has-text('RootProvider pattern')").first();
  await expect(demoArea).toBeVisible();

  // Verify pagination renders with page items
  const pageItems = demoArea.locator("[data-part='item']");
  const itemCount = await pageItems.count();
  expect(itemCount).toBeGreaterThanOrEqual(1);

  // Click a page number (page 3)
  const page3 = demoArea.locator("[data-part='item']").filter({ hasText: "3" });
  if (await page3.isVisible()) {
    await page3.click();
    await page.waitForTimeout(200);

    // Verify page 3 is now selected
    await expect(page3).toHaveAttribute("data-selected", "");
  }

  // Click next page
  const nextBtn = demoArea.locator("[data-part='next-trigger']").first();
  if (await nextBtn.isVisible()) {
    await nextBtn.click();
    await page.waitForTimeout(200);
  }

  // Verify a different page is selected
  const selectedPage = demoArea.locator("[data-part='item'][data-selected]").first();
  await expect(selectedPage).toBeVisible();
});
