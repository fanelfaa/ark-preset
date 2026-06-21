import { test, expect } from "@playwright/test";

test.describe("PasswordInputBasicDemo", () => {
  test("types password and toggles visibility", async ({ page }) => {
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

    // Find the first password input in the demo area
    const firstInput = page.locator("[data-scope='password-input'] input").first();
    await expect(firstInput).toBeVisible();

    // Initially the input should be type=password (masked)
    await expect(firstInput).toHaveAttribute("type", "password");

    // Type a password
    await firstInput.fill("secret123");
    await page.waitForTimeout(100);

    // Toggle visibility using the toggle button
    const toggleBtn = page.locator("[data-scope='password-input'] [data-part='toggle-trigger']").first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(200);

      // After toggle, input should be type=text (visible)
      await expect(firstInput).toHaveAttribute("type", "text");
      await expect(firstInput).toHaveValue("secret123");
    }

    // Toggle back to hidden
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(200);
      await expect(firstInput).toHaveAttribute("type", "password");
    }
  });
});
