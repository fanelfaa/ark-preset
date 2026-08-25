import { test, expect } from "@playwright/test";

test("Homepage renders correctly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("UI Component Library");
  await expect(page.locator("text=Browse Components")).toBeVisible();
});

test("Setup page renders correctly", async ({ page }) => {
  await page.goto("/docs/quickstart");
  await expect(page.locator("h1")).toContainText("Quickstart");
  await expect(page.locator("text=Prerequisites")).toBeVisible();
});

test("Button page renders correctly in solid collection", async ({ page }) => {
  await page.goto("/solid/components/button");
  await expect(page.locator("h1")).toContainText("Button");
  await expect(page.locator("h2", { hasText: "Installation" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Usage" })).toBeVisible();
});
