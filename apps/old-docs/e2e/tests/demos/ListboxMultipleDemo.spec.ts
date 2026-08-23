import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders multiple selection listbox and allows selecting multiple items", async ({ page }) => {
  await setupPage(page, "/docs/components/listbox");

  // Verify section label
  await expect(page.getByText("Multiple selection").first()).toBeVisible();

  // Find the multiple listbox
  const multiListbox = page.locator("[data-scope='listbox'][aria-multiselectable='true']").first();
  await expect(multiListbox).toBeVisible();
  await expect(multiListbox.getByText("React")).toBeVisible();
  await expect(multiListbox.getByText("Solid")).toBeVisible();
  await expect(multiListbox.getByText("Vue")).toBeVisible();
  await expect(multiListbox.getByText("Svelte")).toBeVisible();

  // Select "React"
  const reactItem = multiListbox.getByText("React");
  await reactItem.click();
  await page.waitForTimeout(200);
  const reactOption = multiListbox.locator("[data-part='item']").filter({ hasText: "React" });
  await expect(reactOption).toHaveAttribute("data-selected", "");

  // Select "Vue" (should also be selected — multiselect)
  const vueItem = multiListbox.getByText("Vue");
  await vueItem.click();
  await page.waitForTimeout(200);
  const vueOption = multiListbox.locator("[data-part='item']").filter({ hasText: "Vue" });
  await expect(vueOption).toHaveAttribute("data-selected", "");

  // "React" should still be selected
  await expect(reactOption).toHaveAttribute("data-selected", "");

  // Deselect "React" by clicking again
  await reactItem.click();
  await page.waitForTimeout(200);
  await expect(reactOption).not.toHaveAttribute("data-selected", "");

  // "Vue" should still be selected
  await expect(vueOption).toHaveAttribute("data-selected", "");
});
