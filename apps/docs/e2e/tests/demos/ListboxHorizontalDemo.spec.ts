import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders horizontal listbox and allows item selection", async ({ page }) => {
  await setupPage(page, "/docs/components/listbox");

  // Verify section label
  await expect(page.getByText("Horizontal orientation").first()).toBeVisible();

  // Find the horizontal listbox
  const horizontalListbox = page.locator("[data-orientation='horizontal']").first();
  await expect(horizontalListbox).toBeVisible();
  await expect(horizontalListbox.getByText("React")).toBeVisible();
  await expect(horizontalListbox.getByText("Solid")).toBeVisible();
  await expect(horizontalListbox.getByText("Vue")).toBeVisible();

  // Click on "React" to select it
  const reactItem = horizontalListbox.getByText("React");
  await reactItem.click();
  await page.waitForTimeout(200);

  // Verify "React" is selected
  const reactOption = horizontalListbox.locator("[data-part='item']").filter({ hasText: "React" });
  await expect(reactOption).toHaveAttribute("data-selected", "");

  // Navigate with keyboard — press ArrowRight to move to next item
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);

  // "Solid" should now be highlighted/focused
  const solidOption = horizontalListbox.locator("[data-part='item']").filter({ hasText: "Solid" });
  await expect(solidOption).toBeVisible();

  // Press Enter to select
  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  await expect(solidOption).toHaveAttribute("data-selected", "");
});
