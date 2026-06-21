import { test, expect } from "@playwright/test";

test.describe("RadioGroupRootProviderDemo", () => {
  test("selects radio and verifies external value display", async ({ page }) => {
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

    // Find root provider demo by external output showing "Value:"
    const outputElement = page.locator("output").filter({ hasText: /Value:/ });
    await expect(outputElement.first()).toBeVisible();

    // Initially value should be "1" (Credit Card as default)
    const initialValue = await outputElement.first().textContent();
    expect(initialValue).toContain("1");

    // Find the demo area
    const demoArea = page.locator(".rounded-lg:has(output)").first();

    // Click Paypal
    const paypal = demoArea.getByRole("radio", { name: "Paypal" });
    await expect(paypal).toBeVisible();
    await paypal.click();
    await page.waitForTimeout(100);

    // External value should now show "2"
    const afterValue = await outputElement.first().textContent();
    expect(afterValue).toContain("2");

    // Verify label "Payment Method" is visible
    const label = demoArea.getByText("Payment Method");
    await expect(label).toBeVisible();
  });
});
