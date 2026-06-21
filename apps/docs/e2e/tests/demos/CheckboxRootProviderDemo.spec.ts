import { test, expect } from "@playwright/test";

test.describe("CheckboxRootProviderDemo", () => {
  test("toggles checkbox and verifies external state display", async ({ page }) => {
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

    // Verify external state output
    const output = page.getByText(/Checked:/).first();
    await expect(output).toBeVisible();
    await expect(output).toContainText("true"); // defaultChecked: true

    // Toggle checkbox
    const checkboxLabel = page.getByText("Subscribe to newsletter", { exact: true }).first();
    await checkboxLabel.click();
    await page.waitForTimeout(100);

    // Output should now show false
    await expect(output).toContainText("false");
  });
});
