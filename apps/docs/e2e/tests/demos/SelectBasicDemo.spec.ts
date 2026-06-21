import { test, expect } from "@playwright/test";

test.describe("SelectBasicDemo", () => {
  test("opens dropdown and picks an option", async ({ page }) => {
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

    // Find the select trigger in the Basic demo
    const trigger = page.getByRole("button", { name: "Select a framework" }).first();
    await expect(trigger).toBeVisible();

    // Open the select dropdown
    await trigger.click();
    await page.waitForTimeout(200);

    // Pick "Solid.js" from the dropdown
    const solidOption = page.getByRole("option", { name: "Solid.js" }).first();
    await expect(solidOption).toBeVisible();
    await solidOption.click();

    // Trigger should now show "Solid.js"
    await expect(trigger).toContainText("Solid.js");
  });
});
