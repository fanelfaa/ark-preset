import { test, expect } from "@playwright/test";

test.describe("PinInputRootProviderDemo", () => {
  test("types pin and verifies external state display", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/pin-input");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the root provider demo by the Code label and output element
    const codeLabel = page.getByText("Code");
    await expect(codeLabel.first()).toBeVisible();

    // Find the external state output
    const outputElement = page.locator("output").filter({ hasText: /Value:/ });
    await expect(outputElement.first()).toBeVisible();

    // Initially value should be empty array
    const initialOutput = await outputElement.first().textContent();
    expect(initialOutput).toContain("[]");

    // Find pin inputs near the "Code" label
    const demoArea = page.locator(".rounded-lg:has-text('Code')").first();
    const pinInputs = demoArea.locator("[data-scope='pin-input'] input");

    // Type digits
    const digits = ["5", "6", "7", "8"];
    const count = await pinInputs.count();
    for (let i = 0; i < Math.min(4, count); i++) {
      const pin = pinInputs.nth(i);
      if (await pin.isVisible()) {
        await pin.fill(digits[i]);
        await page.waitForTimeout(50);
      }
    }

    // Verify external state now shows the typed values
    const afterOutput = await outputElement.first().textContent();
    expect(afterOutput).toContain("5");
    expect(afterOutput).toContain("6");
    expect(afterOutput).toContain("7");
    expect(afterOutput).toContain("8");
  });
});
