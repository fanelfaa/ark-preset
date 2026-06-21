import { test, expect } from "@playwright/test";

test.describe("SeparatorBasicDemo", () => {
  test("renders separator elements correctly", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/separator");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Horizontal separator: text above and below
    await expect(page.getByText("Content above the separator")).toBeVisible();
    await expect(page.getByText("Content below the separator")).toBeVisible();

    // Separators exist (Ark UI renders them as hr by default for horizontal)
    const separators = page.locator("[data-scope='separator']");
    await expect(separators.first()).toBeVisible();

    // Vertical separator: labels in flex row
    await expect(page.getByText("Left")).toBeVisible();
    await expect(page.getByText("Center")).toBeVisible();
    await expect(page.getByText("Right")).toBeVisible();

    // At least 3 separator elements (2 horizontal context + 2 vertical)
    const count = await separators.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
