import { test, expect } from "@playwright/test";
import { componentUrl } from "../fixtures";

test.describe("Popover", () => {
  test.describe.configure({ mode: "parallel" });

  test("popover: page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(componentUrl("popover"));
    await page.waitForLoadState("networkidle");

    expect(response?.status()).toBe(200);
    await expect(page.getByText(/component not found/i)).not.toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();

    const relevantErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Failed to load resource")
    );
    expect(relevantErrors).toHaveLength(0);
  });

  test("popover: 'Popover' section renders", async ({ page }) => {
    await page.goto(componentUrl("popover"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Popover", exact: true })).toBeVisible();
  });

  test("popover: 'Usage' section renders", async ({ page }) => {
    await page.goto(componentUrl("popover"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  });

  test("popover: 'API Reference' section renders", async ({ page }) => {
    await page.goto(componentUrl("popover"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "API Reference", exact: true })).toBeVisible();
  });

  test("popover: 'Installation' section renders", async ({ page }) => {
    await page.goto(componentUrl("popover"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Installation", exact: true })).toBeVisible();
  });
});
