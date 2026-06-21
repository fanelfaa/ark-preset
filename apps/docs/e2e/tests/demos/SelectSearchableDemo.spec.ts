import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("opens select, types search, verifies filtered results", async ({ page }) => {
  await setupPage(page, "/docs/components/select");

  // Find the searchable select — 4th trigger on page (0-indexed: 3)
  const triggers = page.locator("[data-scope='select'] [data-part='trigger']");
  const searchTrigger = triggers.nth(3);
  await expect(searchTrigger).toBeVisible();

  // Open the searchable select
  await searchTrigger.click();
  await page.waitForTimeout(200);

  // Find the search input inside the content by placeholder
  const searchInput = page.getByPlaceholder("Search...");
  await expect(searchInput).toBeVisible({ timeout: 5000 });

  // Type a search query to filter
  await searchInput.fill("Reac");
  await page.waitForTimeout(300);

  // Options should be filtered — React should be visible
  const content = page.locator("[data-part='content']").last();
  await expect(content.getByText("React", { exact: true })).toBeVisible();

  // Clear and type a different query
  await searchInput.fill("Vue");
  await page.waitForTimeout(300);

  // Should show Vue
  await expect(content.getByText("Vue", { exact: true })).toBeVisible();

  // Select Vue by clicking
  await content.getByText("Vue", { exact: true }).click();
  await page.waitForTimeout(200);
});