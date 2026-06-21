import { test, expect } from "@playwright/test";

test.describe("SelectMultipleDemo", () => {
  test("opens select and picks multiple options", async ({ page }) => {
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

    // Find the select trigger via its placeholder
    const trigger = page.getByRole("button", { name: "Select a framework" }).first();
    await expect(trigger).toBeVisible();

    // Open the dropdown
    await trigger.click();
    await page.waitForTimeout(200);

    // Select "React" option
    const reactOption = page.getByRole("option", { name: "React" }).first();
    await expect(reactOption).toBeVisible();
    await reactOption.click();

    // Select "Svelte" option — keep dropdown open for multiple
    await trigger.click();
    await page.waitForTimeout(200);
    const svelteOption = page.getByRole("option", { name: "Svelte" }).first();
    await svelteOption.click();

    // Verify multiple selections shown on trigger (count or tags)
    await expect(trigger).toContainText("React");
    await expect(trigger).toContainText("Svelte");
  });
});
