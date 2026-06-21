import { test, expect } from "@playwright/test";

test.describe("RadioGroupDisabledDemo", () => {
  test("verifies disabled option cannot be selected", async ({ page }) => {
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

    // Credit Card should be initially selected (defaultValue=1)
    const creditCard = page.getByRole("radio", { name: "Credit Card" });
    await expect(creditCard.first()).toBeChecked();

    // Debit should be disabled
    const debit = page.getByRole("radio", { name: "Debit" });
    await expect(debit.first()).toBeDisabled();

    // Click Paypal (should work since it's enabled)
    const paypal = page.getByRole("radio", { name: "Paypal" });
    await paypal.first().click();
    await page.waitForTimeout(100);

    await expect(paypal.first()).toBeChecked();
    await expect(creditCard.first()).not.toBeChecked();

    // Debit should still be unchecked
    await expect(debit.first()).not.toBeChecked();
  });
});
