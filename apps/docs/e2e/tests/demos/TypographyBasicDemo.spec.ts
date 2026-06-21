import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("renders all typography variants without errors", async ({ page }) => {
  await setupPage(page, "/docs/components/typography");

  // Verify heading elements
  await expect(page.getByRole("heading", { name: "Heading 1" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heading 2" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heading 3" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heading 4" })).toBeVisible();

  // Verify lead text
  await expect(page.getByText(/Lead text/).first()).toBeVisible();

  // Verify paragraph
  await expect(page.getByText(/Regular paragraph/).first()).toBeVisible();

  // Verify large text
  await expect(page.getByText(/Large text/).first()).toBeVisible();

  // Verify small text
  await expect(page.getByText(/Small text/).first()).toBeVisible();

  // Verify muted text
  await expect(page.getByText(/Muted text/).first()).toBeVisible();

  // Verify inline code
  await expect(page.getByText("InlineCode", { exact: true }).first()).toBeVisible();

  // Verify blockquote
  await expect(page.getByText(/A blockquote/).first()).toBeVisible();

  // Verify list items
  await expect(page.locator(".not-prose").getByText("Unordered list item one").first()).toBeVisible();
  await expect(page.locator(".not-prose").getByText("Unordered list item two").first()).toBeVisible();
  await expect(page.locator(".not-prose").getByText("Unordered list item three").first()).toBeVisible();
});
