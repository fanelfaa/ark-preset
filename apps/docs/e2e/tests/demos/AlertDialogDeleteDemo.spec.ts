import { test, expect } from "@playwright/test";

test.describe("AlertDialogDeleteDemo", () => {
  test("opens dialog and triggers delete action", async ({ page }) => {
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

    // Verify open state display
    const openOutput = page.getByText(/Open:/).first();
    await expect(openOutput).toBeVisible();
    await expect(openOutput).toContainText("false");

    // Open dialog via button
    const deleteButton = page.getByRole("button", { name: "Delete Account" }).first();
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();
    await page.waitForTimeout(300);

    // Dialog should be open
    await expect(page.getByRole("alertdialog")).toBeVisible();
    await expect(openOutput).toContainText("true");

    // Click destructive Delete button inside dialog
    const confirmDeleteButton = page.getByRole("button", { name: "Delete" });
    await confirmDeleteButton.click();
    await page.waitForTimeout(300);

    // Dialog should close, account deleted message shown
    await expect(page.getByRole("alertdialog")).not.toBeVisible();
    await expect(page.getByText(/Account has been deleted/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Account Deleted" })).toBeDisabled();
  });
});
