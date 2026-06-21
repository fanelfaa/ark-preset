import { test, expect } from "@playwright/test";

test.describe("ProgressBasicDemo", () => {
  test("renders progress bar at 65% with label and value text", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/progress");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Find the progress demo
    const progressBar = page.locator("[data-scope='progress']").first();
    await expect(progressBar).toBeVisible();

    // Verify label "Loading"
    const label = progressBar.getByText("Loading");
    await expect(label).toBeVisible();

    // Verify value text shows percentage
    const valueText = progressBar.getByText(/65%|65/);
    await expect(valueText.first()).toBeVisible();

    // Verify track exists
    const track = progressBar.locator("[data-part='track']");
    await expect(track.first()).toBeVisible();

    // Verify the range fill has correct width (aria-valuenow should be 65)
    const range = progressBar.locator("[data-part='range']");
    await expect(range.first()).toBeVisible();
    await expect(range.first()).toHaveAttribute("aria-valuenow", "65");
  });
});
