import { test, expect } from "@playwright/test";

test.describe("Framework Routing", () => {
  test("navigates to solid component and switches framework", async ({ page }) => {
    // Start at a solid component page
    await page.goto("/solid/components/button");

    // Verify it's on Solid
    await expect(page.locator("h1")).toContainText("Solid Button");
    await expect(page.locator('[data-testid="framework-selector"]')).toHaveValue("solid");

    // Wait for hydration
    await page.waitForTimeout(1000);

    // Switch to React
    await page.locator('[data-testid="framework-selector"]').selectOption("react");

    // URL should update to /react/components/button
    await expect(page).toHaveURL(/\/react\/components\/button/);

    // Verify it's on React
    await expect(page.locator("h1")).toContainText("React Button");
    await expect(page.locator('[data-testid="framework-selector"]')).toHaveValue("react");

    // Switch to Vue
    await page.locator('[data-testid="framework-selector"]').selectOption("vue");

    // URL should update to /vue/components/button
    await expect(page).toHaveURL(/\/vue\/components\/button/);

    // Verify it's on Vue
    await expect(page.locator("h1")).toContainText("Vue Button");
    await expect(page.locator('[data-testid="framework-selector"]')).toHaveValue("vue");
  });

  test("sidebar links update based on framework", async ({ page }) => {
    // Start at solid
    await page.goto("/solid/components/button");

    // The Input link should point to solid
    const inputLink = page.locator("nav").locator("a", { hasText: "Input" }).first();
    await expect(inputLink).toHaveAttribute("href", "/solid/components/input");

    await page.waitForTimeout(1000);

    // Switch to React
    await page.locator('[data-testid="framework-selector"]').selectOption("react");

    // The Input link should now point to react
    const inputLinkReact = page.locator("nav").locator("a", { hasText: "Input" }).first();
    await expect(inputLinkReact).toHaveAttribute("href", "/react/components/input");
  });
});
