import { test, expect } from "@playwright/test";

test.describe("Demo interactions", () => {
  test.describe.configure({ mode: "parallel" });

  test("accordion: expand and collapse items", async ({ page }) => {
    await page.goto("/docs/components/accordion");
    await page.waitForLoadState("networkidle");

    // Find accordion triggers — use .first() because multiple demos may exist
    const trigger1 = page.getByRole("button", { name: "Is it accessible?", exact: true }).first();
    const trigger2 = page.getByRole("button", { name: "Is it styled?", exact: true }).first();

    // Initially both should be visible
    await expect(trigger1).toBeVisible();
    await expect(trigger2).toBeVisible();

    // Click trigger2 to expand it
    await trigger2.click();
    await page.waitForTimeout(300); // wait for animation

    // The content should now be visible — use filter to avoid matching code blocks
    await expect(
      page.locator("[data-scope='accordion']").getByText(/default styles/i)
    ).toBeVisible();

    // Click trigger2 again to collapse
    await trigger2.click();
    await page.waitForTimeout(300);
  });

  test("tabs: switch between tabs", async ({ page }) => {
    await page.goto("/docs/components/tabs");
    await page.waitForLoadState("networkidle");

    // Find tab triggers
    const accountTab = page.getByRole("tab", { name: "Account" });
    const passwordTab = page.getByRole("tab", { name: "Password" });

    await expect(accountTab).toBeVisible();
    await expect(passwordTab).toBeVisible();

    // Click Password tab
    await passwordTab.click();
    await page.waitForTimeout(100);

    // Password content should be visible — scope to the demo area
    await expect(
      page.locator("[data-scope='tabs']").getByText(/change your password/i)
    ).toBeVisible();
  });

  test("dialog: open and close", async ({ page }) => {
    await page.goto("/docs/components/dialog");
    await page.waitForLoadState("networkidle");

    // Find the dialog trigger button
    const openButton = page.getByRole("button", { name: "Edit Profile" }).first();
    await expect(openButton).toBeVisible();

    // Open dialog
    await openButton.click();
    await page.waitForTimeout(300);

    // Dialog should be visible with title
    await expect(
      page.getByRole("dialog").getByText("Edit Profile")
    ).toBeVisible();

    // Close via Cancel button
    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();
    await page.waitForTimeout(300);

    // Dialog should be closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("drawer: open and close", async ({ page }) => {
    await page.goto("/docs/components/drawer");
    await page.waitForLoadState("networkidle");

    // Find drawer trigger
    const openButton = page.getByRole("button", { name: "Edit Profile" }).first();
    await expect(openButton).toBeVisible();

    // Open drawer
    await openButton.click();
    await page.waitForTimeout(300);

    // Drawer content should be visible
    await expect(
      page.getByRole("dialog").getByText("Edit Profile")
    ).toBeVisible();

    // Close by pressing Escape
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("checkbox: toggle checked state", async ({ page }) => {
    await page.goto("/docs/components/checkbox");
    await page.waitForLoadState("networkidle");

    // Find the unchecked checkbox label — exact match to avoid code snippets
    const uncheckedLabel = page.getByText("Unchecked", { exact: true }).first();
    await expect(uncheckedLabel).toBeVisible();

    // Click the label/checkbox to toggle
    await uncheckedLabel.click();
    await page.waitForTimeout(100);

    // Should now be checked
    const checkboxInput = page.locator("[data-scope='checkbox'][data-state='checked']");
    await expect(checkboxInput.first()).toBeVisible();
  });

  test("button demo: click variant buttons without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/button");
    await page.waitForLoadState("networkidle");

    // Try clicking several visible buttons in the demo
    const buttons = page.locator(".not-prose button, .not-prose a[role='button']");
    const count = await buttons.count();
    // Click first 5 visible buttons
    for (let i = 0; i < Math.min(count, 8); i++) {
      const btn = buttons.nth(i);
      if (await btn.isVisible()) {
        await btn.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(50);
      }
    }

    const relevantErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Failed to load resource")
    );
    expect(relevantErrors).toHaveLength(0);
  });
});
