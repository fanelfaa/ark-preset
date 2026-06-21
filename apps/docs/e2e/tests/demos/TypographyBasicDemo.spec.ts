import { test, expect } from "@playwright/test";

test.describe("TypographyBasicDemo", () => {
  test("renders all typography variants without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/typography");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify heading elements
    await expect(page.getByText("Heading 1")).toBeVisible();
    await expect(page.getByText("Heading 2")).toBeVisible();
    await expect(page.getByText("Heading 3")).toBeVisible();
    await expect(page.getByText("Heading 4")).toBeVisible();

    // Verify lead text
    await expect(page.getByText(/Lead text/)).toBeVisible();

    // Verify paragraph
    await expect(page.getByText(/Regular paragraph/)).toBeVisible();

    // Verify large text
    await expect(page.getByText(/Large text/)).toBeVisible();

    // Verify small text
    await expect(page.getByText(/Small text/)).toBeVisible();

    // Verify muted text
    await expect(page.getByText(/Muted text/)).toBeVisible();

    // Verify inline code
    await expect(page.getByText("InlineCode")).toBeVisible();

    // Verify blockquote
    await expect(page.getByText(/A blockquote/)).toBeVisible();

    // Verify list items
    await expect(page.getByText("Unordered list item one")).toBeVisible();
    await expect(page.getByText("Unordered list item two")).toBeVisible();
    await expect(page.getByText("Unordered list item three")).toBeVisible();
  });
});
