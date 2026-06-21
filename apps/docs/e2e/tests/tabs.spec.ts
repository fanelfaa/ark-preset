import { test, expect } from "@playwright/test";
import { componentUrl } from "../fixtures";

test.describe("Tabs", () => {
  test.describe.configure({ mode: "parallel" });

  test("tabs: page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(componentUrl("tabs"));
    await page.waitForLoadState("networkidle");

    expect(response?.status()).toBe(200);
    await expect(page.getByText(/component not found/i)).not.toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();

    const relevantErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Failed to load resource")
    );
    expect(relevantErrors).toHaveLength(0);
  });

  test("tabs: 'Tabs' section renders", async ({ page }) => {
    await page.goto(componentUrl("tabs"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Tabs", exact: true })).toBeVisible();
  });

  test("tabs: 'Usage' section renders", async ({ page }) => {
    await page.goto(componentUrl("tabs"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  });

  test("tabs: 'API Reference' section renders", async ({ page }) => {
    await page.goto(componentUrl("tabs"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "API Reference", exact: true })).toBeVisible();
  });

  test("tabs: 'Installation' section renders", async ({ page }) => {
    await page.goto(componentUrl("tabs"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Installation", exact: true })).toBeVisible();
  });
});
