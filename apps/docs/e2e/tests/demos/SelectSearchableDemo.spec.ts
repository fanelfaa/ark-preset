import { test, expect } from "@playwright/test";

test.describe("SelectSearchableDemo", () => {
  test("opens select, types search, verifies filtered results", async ({ page }) => {
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

    // Find the searchable select trigger
    const trigger = page
      .locator("[data-scope='select']")
      .filter({ hasText: "Select a framework" })
      .first()
      .locator("[data-scope='select'] button, button")
      .first();

    // Click to open the select dropdown
    await trigger.click();
    await page.waitForTimeout(200);

    // Type "So" into the search input inside the dropdown
    const searchInput = page.locator("[data-scope='select'] input[type='text']").first();
    await searchInput.fill("So");
    await page.waitForTimeout(200);

    // Only "Solid.js" should appear (matches "So")
    const solidOption = page.getByRole("option", { name: "Solid.js" }).first();
    await expect(solidOption).toBeVisible();

    // "Vue" should NOT appear (doesn't match "So")
    const vueOption = page.getByRole("option", { name: "Vue" });
    await expect(vueOption).not.toBeVisible();

    // Select "Solid.js"
    await solidOption.click();
  });
});
