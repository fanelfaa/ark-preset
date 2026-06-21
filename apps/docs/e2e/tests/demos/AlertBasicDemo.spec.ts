import { test, expect } from "@playwright/test";

test.describe("AlertBasicDemo", () => {
  test("renders alert with title and description", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/alert");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify alert renders with title and description
    await expect(page.getByText("Heads up!")).first().toBeVisible();
    await expect(page.getByText(/You can add components/)).first().toBeVisible();

    // Verify destructive variant
    await expect(page.getByText("Error").first()).toBeVisible();
    await expect(page.getByText(/An error occurred/)).first().toBeVisible();

    // Verify alert has data-scope attribute
    const alerts = page.locator("[data-scope='alert']");
    await expect(alerts.first()).toBeVisible();
  });
});
