import { test, expect } from "@playwright/test";

test.describe("InputBasicDemo", () => {
  test("renders input fields, allows typing, and shows error state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/input");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find input fields by label or placeholder scoped to not-prose (demo area)
    const demoArea = page.locator(".not-prose").first();

    // Basic input with placeholder
    const basicInput = demoArea.getByPlaceholder("Basic input").first();
    await expect(basicInput).toBeVisible();
    await basicInput.fill("Hello world");
    await expect(basicInput).toHaveValue("Hello world");

    // Email input
    const emailInput = demoArea.getByPlaceholder("Enter your email").first();
    await expect(emailInput).toBeVisible();
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");

    // Input with description
    const descInput = demoArea.getByPlaceholder("email@example.com").first();
    await expect(descInput).toBeVisible();
    await expect(demoArea.getByText("We'll never share your email.").first()).toBeVisible();

    // Error state input
    const errorInput = demoArea.getByPlaceholder("Enter value").first();
    await expect(errorInput).toBeVisible();
    await expect(demoArea.getByText("This field is required").first()).toBeVisible();
  });
});
