import { test, expect } from "@playwright/test";

test.describe("ToastBasicDemo", () => {
  test("creates toasts by clicking buttons", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/toast");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Click "Default" button to create default toast
    const defaultBtn = page.getByRole("button", { name: "Default" }).first();
    await expect(defaultBtn).toBeVisible();
    await defaultBtn.click();
    await page.waitForTimeout(300);

    // Verify toast appears with title "Default toast"
    const toastTitle = page.getByText("Default toast");
    await expect(toastTitle.first()).toBeVisible();

    // Click "Success" button
    const successBtn = page.getByRole("button", { name: "Success" }).first();
    await expect(successBtn).toBeVisible();
    await successBtn.click();
    await page.waitForTimeout(300);

    // Verify success toast appears
    const successToast = page.getByText("Success toast");
    await expect(successToast.first()).toBeVisible();

    // Click "Warning" button
    const warningBtn = page.getByRole("button", { name: "Warning" }).first();
    await expect(warningBtn).toBeVisible();
    await warningBtn.click();
    await page.waitForTimeout(300);

    // Verify warning toast appears
    const warningToast = page.getByText("Warning toast");
    await expect(warningToast.first()).toBeVisible();

    // Click "Error" button
    const errorBtn = page.getByRole("button", { name: "Error" }).first();
    await expect(errorBtn).toBeVisible();
    await errorBtn.click();
    await page.waitForTimeout(300);

    // Verify error toast appears
    const errorToast = page.getByText("Error toast");
    await expect(errorToast.first()).toBeVisible();
  });
});
