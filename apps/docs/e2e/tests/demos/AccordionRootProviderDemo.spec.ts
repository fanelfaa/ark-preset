import { test, expect } from "@playwright/test";

test.describe("AccordionRootProviderDemo", () => {
  test("renders and updates external state display on toggle", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/accordion");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // RootProvider demo has an <output> with accordion value
    const output = page.locator("[data-scope='accordion']").locator("output");
    await expect(output).toBeVisible();
    await expect(output).toContainText("item-1");

    // Click second trigger to expand item-2
    const trigger2 = page.getByRole("button", { name: "Why use RootProvider?" }).first();
    await trigger2.click();
    await page.waitForTimeout(300);

    // Output should now contain both item-1 and item-2
    await expect(output).toContainText("item-2");
  });
});
