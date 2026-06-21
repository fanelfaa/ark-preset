import { test, expect } from "@playwright/test";

test.describe("ComboboxRootProviderDemo", () => {
  test("interacts with combobox and verifies external state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/combobox");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify external state output shows default value
    const output = page.getByText(/Value:/).first();
    await expect(output).toBeVisible();
    await expect(output).toContainText("solid");

    // Click combobox input to open
    const inputTrigger = page.locator("[data-scope='combobox'] [data-part='input']").first();
    await inputTrigger.click();
    await page.waitForTimeout(200);

    // Select a different item
    const reactOption = page.getByRole("option", { name: "React" });
    if (await reactOption.isVisible()) {
      await reactOption.click();
      await page.waitForTimeout(200);

      // Output should update
      await expect(output).toContainText("react");
    }
  });
});
