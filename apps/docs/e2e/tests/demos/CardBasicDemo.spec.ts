import { test, expect } from "@playwright/test";

test.describe("CardBasicDemo", () => {
  test("renders card with header, content, footer and actionable buttons", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/card");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify card content
    await expect(page.getByText("Create Project").first()).toBeVisible();
    await expect(page.getByText(/Deploy your new project/).first()).toBeVisible();
    await expect(page.getByText(/Your project will be deployed/).first()).toBeVisible();

    // Verify action buttons
    const deployButton = page.getByRole("button", { name: "Deploy" }).first();
    const cancelButton = page.getByRole("button", { name: "Cancel" }).first();
    await expect(deployButton).toBeVisible();
    await expect(cancelButton).toBeVisible();

    // Click deploy button — should not throw errors
    await deployButton.click();
    await page.waitForTimeout(200);
  });
});
