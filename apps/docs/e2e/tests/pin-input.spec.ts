import { test, expect } from "@playwright/test";
import { componentUrl } from "../fixtures";

test.describe("Pin Input", () => {
  test.describe.configure({ mode: "parallel" });

  test("pin-input: page loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(componentUrl("pin-input"));
    await page.waitForLoadState("networkidle");

    expect(response?.status()).toBe(200);
    await expect(page.getByText(/component not found/i)).not.toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();

    const relevantErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("Failed to load resource")
    );
    expect(relevantErrors).toHaveLength(0);
  });

  test("pin-input: 'Pin Input' section renders", async ({ page }) => {
    await page.goto(componentUrl("pin-input"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Pin Input", exact: true })).toBeVisible();
  });

  test("pin-input: 'Usage' section renders", async ({ page }) => {
    await page.goto(componentUrl("pin-input"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  });

  test("pin-input: 'API Reference' section renders", async ({ page }) => {
    await page.goto(componentUrl("pin-input"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "API Reference", exact: true })).toBeVisible();
  });

  test("pin-input: 'Installation' section renders", async ({ page }) => {
    await page.goto(componentUrl("pin-input"));
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Installation", exact: true })).toBeVisible();
  });
});
