import { test, expect } from "@playwright/test";

test.describe("TableBasicDemo", () => {
  test("renders table with caption, headers, rows, and cells", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/table");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // Table should have caption
    await expect(page.getByText("A list of recent invoices.")).toBeVisible();

    // Table headers should be visible
    await expect(page.getByRole("columnheader", { name: "Invoice" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Status" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Method" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Amount" })).toBeVisible();

    // Rows and cells — verify specific invoice data
    await expect(page.getByRole("cell", { name: "INV001" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "Paid" }).first()).toBeVisible();
    await expect(page.getByRole("cell", { name: "$250.00" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "$450.00" })).toBeVisible();

    // Table should have data-scope
    const table = page.locator("[data-scope='table']");
    await expect(table.first()).toBeVisible();
  });
});
