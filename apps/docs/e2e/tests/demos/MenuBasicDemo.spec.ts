import { test, expect } from "@playwright/test";

test.describe("MenuBasicDemo", () => {
  test("opens dropdown and selects menu item", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/menu");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Click the menu trigger
    const trigger = page.getByRole("button", { name: "Actions" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(200);

    // Verify dropdown content visible
    const editItem = page.getByRole("menuitem", { name: "Edit" });
    await expect(editItem).toBeVisible();

    const duplicateItem = page.getByRole("menuitem", { name: "Duplicate" });
    await expect(duplicateItem).toBeVisible();

    const deleteItem = page.getByRole("menuitem", { name: "Delete" });
    await expect(deleteItem).toBeVisible();

    // Click one menu item
    await duplicateItem.click();
    await page.waitForTimeout(200);

    // Menu should close after selection
    await expect(editItem).not.toBeVisible();

    // No errors after interaction
    const postErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(postErrors).toHaveLength(0);
  });
});
