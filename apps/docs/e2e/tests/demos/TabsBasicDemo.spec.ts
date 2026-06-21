import { test, expect } from "@playwright/test";

test.describe("TabsBasicDemo", () => {
  test("switches tabs and verifies content changes", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/tabs");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Account tab should be active by default
    const accountTab = page.getByRole("tab", { name: "Account" }).first();
    const passwordTab = page.getByRole("tab", { name: "Password" }).first();

    await expect(accountTab).toBeVisible();
    await expect(passwordTab).toBeVisible();

    // Account panel content should be visible
    await expect(
      page.getByText(/make changes to your account/i).first(),
    ).toBeVisible();

    // Click Password tab
    await passwordTab.click();
    await page.waitForTimeout(100);

    // Password panel content should now be visible
    await expect(
      page.getByText(/change your password/i).first(),
    ).toBeVisible();

    // Account panel content should be hidden
    await expect(
      page.getByText(/make changes to your account/i),
    ).not.toBeVisible();
  });
});
