import { test, expect } from "@playwright/test";

test.describe("DialogRootProviderDemo", () => {
  test("opens dialog from external button and verifies external state display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/dialog");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify the external state output is visible and initially shows closed
    const output = page.locator("output").filter({ hasText: /Open:/ }).first();
    await expect(output).toBeVisible();
    await expect(output).toContainText("false");

    // Click the external "Open Dialog From Outside" button
    const externalButton = page.getByRole("button", { name: "Open Dialog From Outside" });
    await expect(externalButton).toBeVisible();
    await externalButton.click();
    await page.waitForTimeout(300);

    // Dialog should now be open
    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText("Externally Controlled Dialog")).toBeVisible();

    // External state output should reflect open state
    await expect(output).toContainText("true");

    // Close via the Cancel button inside the dialog
    const cancelButton = dialog.getByRole("button", { name: "Cancel" });
    await cancelButton.click();
    await page.waitForTimeout(300);

    // Dialog should be closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(output).toContainText("false");
  });
});
