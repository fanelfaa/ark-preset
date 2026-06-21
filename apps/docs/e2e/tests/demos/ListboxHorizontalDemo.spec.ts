import { test, expect } from "@playwright/test";

test.describe("ListboxHorizontalDemo", () => {
  test("renders horizontal listbox and allows item selection", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/listbox");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

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
});
