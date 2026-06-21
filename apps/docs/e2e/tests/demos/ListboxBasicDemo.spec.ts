import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders listbox and allows item selection", async ({ page }) => {
  await setupPage(page, "/docs/components/listbox");

  // Verify section label
  await expect(page.getByText("Basic listbox").first()).toBeVisible();

  // Verify all listbox items are visible
  const listbox = page.locator("[data-scope='listbox']").first();
  await expect(listbox).toBeVisible();
  await expect(listbox.getByText("React")).toBeVisible();
  await expect(listbox.getByText("Solid")).toBeVisible();
  await expect(listbox.getByText("Vue")).toBeVisible();
  await expect(listbox.getByText("Svelte")).toBeVisible();

  // Click on "Solid" to select it
  const solidItem = listbox.getByText("Solid");
  await solidItem.click();
  await page.waitForTimeout(200);

  // Verify "Solid" item is now in selected state
  const solidOption = listbox.locator("[data-part='item']").filter({ hasText: "Solid" });
  await expect(solidOption).toHaveAttribute("data-selected", "");

  // Click on "Vue" — selection should change
  const vueItem = listbox.getByText("Vue");
  await vueItem.click();
  await page.waitForTimeout(200);

  // "Vue" should now be selected, "Solid" not
  const vueOption = listbox.locator("[data-part='item']").filter({ hasText: "Vue" });
  await expect(vueOption).toHaveAttribute("data-selected", "");
  await expect(solidOption).not.toHaveAttribute("data-selected", "");
});
