import { test, expect } from "@playwright/test";

test.describe("SelectRootProviderDemo", () => {
  test("opens select, picks option, verifies external state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/select");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // External state shows default value "solid"
    const output = page.locator("output").first();
    await expect(output).toContainText('["solid"]');

    // Trigger shows "Solid.js" by default
    const trigger = page.getByRole("button", { name: "Select a framework" }).first();
    await expect(trigger).toContainText("Solid.js");

    // Open dropdown
    await trigger.click();
    await page.waitForTimeout(200);

    // Pick "Vue"
    const vueOption = page.getByRole("option", { name: "Vue" }).first();
    await vueOption.click();

    // External state should update to "vue"
    await expect(output).toContainText('["vue"]');
    await expect(trigger).toContainText("Vue");
  });
});
