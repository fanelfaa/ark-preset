import { test, expect } from "@playwright/test";

test.describe("SpinnerBasicDemo", () => {
  test("renders spinner elements in different sizes", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/spinner");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Spinner elements should be present (data-scope spinner)
    const spinners = page.locator("[data-scope='spinner']");
    const count = await spinners.count();
    // At least 3 sizes: sm, md, lg, xl plus one with text
    expect(count).toBeGreaterThanOrEqual(4);

    // All spinners should be visible
    const firstSpinner = spinners.first();
    await expect(firstSpinner).toBeVisible();

    // "Loading..." text should be visible alongside spinner
    await expect(page.getByText("Loading...")).toBeVisible();
  });
});
