import { test, expect } from "@playwright/test";

test.describe("RadioGroupControlledDemo", () => {
  test("selects radio and verifies controlled state display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/radio-group");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find controlled demo by "Selected:" label
    const selectedLabel = page.getByText(/Selected:/);
    await expect(selectedLabel.first()).toBeVisible();

    // Initially should show "Selected: 1" (Credit Card)
    await expect(selectedLabel.first()).toContainText("1");

    // Get the demo area containing this radio group
    const demoArea = page.locator(".rounded-lg:has-text('Selected:')").first();

    // Click Paypal
    const paypal = demoArea.getByRole("radio", { name: "Paypal" });
    await expect(paypal).toBeVisible();
    await paypal.click();
    await page.waitForTimeout(100);

    // Selected should now show "2"
    await expect(selectedLabel.first()).toContainText("2");

    // Click Debit
    const debit = demoArea.getByRole("radio", { name: "Debit" });
    await expect(debit).toBeVisible();
    await debit.click();
    await page.waitForTimeout(100);

    // Selected should now show "3"
    await expect(selectedLabel.first()).toContainText("3");
  });
});
