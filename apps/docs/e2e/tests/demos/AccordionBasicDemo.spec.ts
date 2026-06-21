import { test, expect } from "@playwright/test";

test.describe("AccordionBasicDemo", () => {
  test("renders and expands/collapses items correctly", async ({ page }) => {
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

    // Find accordion triggers in the demo area
    const trigger1 = page.getByRole("button", { name: "Is it accessible?" }).first();
    const trigger2 = page.getByRole("button", { name: "Is it styled?" }).first();

    await expect(trigger1).toBeVisible();
    await expect(trigger2).toBeVisible();

    // Click trigger2 to expand it
    await trigger2.click();
    await page.waitForTimeout(300);

    // Content should be visible
    await expect(
      page.locator("[data-scope='accordion']").getByText(/default styles/i)
    ).toBeVisible();

    // Click trigger2 again to collapse
    await trigger2.click();
    await page.waitForTimeout(300);
  });
});
