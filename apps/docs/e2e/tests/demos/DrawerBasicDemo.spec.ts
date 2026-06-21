import { test, expect } from "@playwright/test";

test.describe("DrawerBasicDemo", () => {
  test("opens drawer, verifies content, and closes via Escape", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/drawer");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the drawer trigger button
    const openButton = page.getByRole("button", { name: "Edit Profile" }).first();
    await expect(openButton).toBeVisible();
    await openButton.click();
    await page.waitForTimeout(300);

    // Drawer content should be visible as a dialog
    const drawer = page.getByRole("dialog").first();
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText("Edit Profile")).toBeVisible();
    await expect(drawer.getByText(/Make changes to your profile/)).toBeVisible();

    // Verify form fields inside drawer
    await expect(drawer.getByLabel("Name")).toBeVisible();
    await expect(drawer.getByLabel("Email")).toBeVisible();

    // Close drawer by pressing Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // Drawer should be closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
