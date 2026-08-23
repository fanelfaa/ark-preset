import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("selects radio options and verifies selection changes", async ({ page }) => {
  await setupPage(page, "/docs/components/radio-group");

  // Find radio group items
  const creditCard = page.getByRole("radio", { name: "Credit Card" });
  const paypal = page.getByRole("radio", { name: "Paypal" });
  const debit = page.getByRole("radio", { name: "Debit" });

  // Credit Card should be initially checked (defaultValue=1)
  await expect(creditCard.first()).toBeChecked();

  // Click Paypal
  await paypal.first().click({ force: true });
  await page.waitForTimeout(100);

  // Paypal should now be checked, Credit Card unchecked
  await expect(paypal.first()).toBeChecked();
  await expect(creditCard.first()).not.toBeChecked();

  // Click Debit
  await debit.first().click({ force: true });
  await page.waitForTimeout(100);

  await expect(debit.first()).toBeChecked();
});
