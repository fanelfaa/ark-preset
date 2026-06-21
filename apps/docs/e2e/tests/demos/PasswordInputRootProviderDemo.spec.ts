import { test, expect } from "@playwright/test";

test.describe("PasswordInputRootProviderDemo", () => {
  test("toggles visibility via external button", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/password-input");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the demo area containing external "Toggle" button and password input
    const toggleButton = page.getByRole("button", { name: "Toggle" }).first();
    await expect(toggleButton).toBeVisible();

    // Find the password input in the same demo area
    const passwordInput = page.locator("[data-scope='password-input'] input").first();
    await expect(passwordInput).toBeVisible();

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Click external Toggle button
    await toggleButton.click();
    await page.waitForTimeout(200);

    // Password should now be visible
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle back
    await toggleButton.click();
    await page.waitForTimeout(200);
    await expect(passwordInput).toHaveAttribute("type", "password");
  });
});
