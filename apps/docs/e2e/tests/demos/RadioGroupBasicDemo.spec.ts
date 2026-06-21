import { test, expect } from "@playwright/test";

test.describe("RadioGroupBasicDemo", () => {
  test("selects radio options and verifies selection changes", async ({ page }) => {
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

    // Find radio group items
    const creditCard = page.getByRole("radio", { name: "Credit Card" });
    const paypal = page.getByRole("radio", { name: "Paypal" });
    const debit = page.getByRole("radio", { name: "Debit" });

    // Credit Card should be initially checked (defaultValue=1)
    await expect(creditCard.first()).toBeChecked();

    // Click Paypal
    await paypal.first().click();
    await page.waitForTimeout(100);

    // Paypal should now be checked, Credit Card unchecked
    await expect(paypal.first()).toBeChecked();
    await expect(creditCard.first()).not.toBeChecked();

    // Click Debit
    await debit.first().click();
    await page.waitForTimeout(100);

    await expect(debit.first()).toBeChecked();
  });
});
