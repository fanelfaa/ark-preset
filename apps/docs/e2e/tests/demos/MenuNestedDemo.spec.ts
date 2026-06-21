import { test, expect } from "@playwright/test";

test.describe("MenuNestedDemo", () => {
  test("opens nested menu and verifies submenu items", async ({ page }) => {
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

    // Open the menu
    const trigger = page.getByRole("button", { name: "Actions" }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    await page.waitForTimeout(200);

    // Verify top-level items
    const newItem = page.getByRole("menuitem", { name: "New..." });
    await expect(newItem).toBeVisible();

    const shareItem = page.getByRole("menuitem", { name: "Share" });
    await expect(shareItem).toBeVisible();

    // Hover over "Share" to open nested submenu
    await shareItem.hover();
    await page.waitForTimeout(300);

    // Verify submenu items appear
    const twitterItem = page.getByRole("menuitem", { name: "Twitter" });
    await expect(twitterItem).toBeVisible();

    const facebookItem = page.getByRole("menuitem", { name: "Facebook" });
    await expect(facebookItem).toBeVisible();

    const emailItem = page.getByRole("menuitem", { name: "Email" });
    await expect(emailItem).toBeVisible();

    // Click a submenu item
    await emailItem.click();
    await page.waitForTimeout(200);

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
