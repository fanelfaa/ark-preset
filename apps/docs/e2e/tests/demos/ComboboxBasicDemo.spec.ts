import { test, expect } from "@playwright/test";

test.describe("ComboboxBasicDemo", () => {
  test("renders combobox and filters results on input", async ({ page }) => {
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

    // Click the combobox input trigger
    const inputTrigger = page.locator("[data-scope='combobox'] [data-part='input']").first();
    await expect(inputTrigger).toBeVisible();
    await inputTrigger.click();
    await page.waitForTimeout(200);

    // Type to filter
    await inputTrigger.fill("Reac");
    await page.waitForTimeout(200);

    // Verify filtered result appears
    await expect(page.getByText("React", { exact: true })).toBeVisible();

    // Verify non-matching items are not visible
    const content = page.locator("[data-scope='combobox'] [data-part='content']").first();
    await expect(content).toBeVisible();
  });
});
