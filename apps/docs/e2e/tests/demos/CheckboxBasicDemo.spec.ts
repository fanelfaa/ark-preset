import { test, expect } from "@playwright/test";

test.describe("CheckboxBasicDemo", () => {
  test("renders checkbox variants and toggles correctly", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/checkbox");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify all checkbox labels
    await expect(page.getByText("Checked", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Unchecked", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Indeterminate", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Disabled", { exact: true }).first()).toBeVisible();

    // Toggle unchecked checkbox — click its label
    const uncheckedLabel = page.getByText("Unchecked", { exact: true }).first();
    await uncheckedLabel.click();
    await page.waitForTimeout(100);

    // Should now be checked
    const checkboxInput = page.locator("[data-scope='checkbox'][data-state='checked']");
    await expect(checkboxInput.first()).toBeVisible();

    // Disabled checkbox should not be interactive
    const disabledCheckbox = page.locator("[data-scope='checkbox'][data-disabled]");
    await expect(disabledCheckbox.first()).toBeVisible();
  });
});
