import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("renders with brand and navigation links", async ({ page }) => {
    await page.goto("/");

    // Brand link
    const brand = page.getByRole("link", { name: "UI", exact: true });
    await expect(brand).toBeVisible();

    // Navigation links — filter to header nav only
    await expect(page.getByRole("link", { name: "Docs", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Components", exact: true }).first()).toBeVisible();

    // Hero heading
    await expect(
      page.getByRole("heading", { name: "UI Component Library" })
    ).toBeVisible();

    // "Browse Components" CTA button
    await expect(
      page.getByRole("link", { name: "Browse Components" })
    ).toBeVisible();

    // Component category sections
    await expect(
      page.getByRole("heading", { name: "Quick Start" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Components", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Popular Components" })
    ).toBeVisible();
  });

  test("does not have console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    expect(errors).toHaveLength(0);
  });
});
