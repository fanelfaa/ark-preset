import { test, expect } from "@playwright/test";

test.describe("AlertDialogBasicDemo", () => {
  test("opens dialog, shows title/description, and closes with Cancel", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/alert-dialog");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Open dialog
    const openButton = page.getByRole("button", { name: "Delete Account" }).first();
    await expect(openButton).toBeVisible();
    await openButton.click();
    await page.waitForTimeout(300);

    // Verify dialog content
    await expect(page.getByRole("alertdialog")).toBeVisible();
    await expect(page.getByText("Are you absolutely sure?")).toBeVisible();
    await expect(page.getByText(/This action cannot be undone/)).toBeVisible();

    // Close with Cancel
    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();
    await page.waitForTimeout(300);

    await expect(page.getByRole("alertdialog")).not.toBeVisible();
  });
});
