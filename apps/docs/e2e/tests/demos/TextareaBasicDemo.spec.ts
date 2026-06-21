import { test, expect } from "@playwright/test";

test.describe("TextareaBasicDemo", () => {
  test("renders textareas and types text", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/textarea");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify textarea elements exist
    const textareas = page.locator("textarea");
    const count = await textareas.count();
    expect(count).toBeGreaterThanOrEqual(4);

    // Type into the first basic textarea
    const basicTextarea = page.getByPlaceholder("Basic textarea").first();
    await expect(basicTextarea).toBeVisible();
    await basicTextarea.fill("Hello, this is a test message.");
    await page.waitForTimeout(100);
    await expect(basicTextarea).toHaveValue("Hello, this is a test message.");

    // Verify label "Bio" exists
    const bioLabel = page.getByText("Bio");
    await expect(bioLabel.first()).toBeVisible();

    // Verify error state textarea has error message
    const errorMsg = page.getByText("This field is required");
    await expect(errorMsg.first()).toBeVisible();
  });
});
