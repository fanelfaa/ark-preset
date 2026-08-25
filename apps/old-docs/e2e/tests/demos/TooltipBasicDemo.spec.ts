import { test, expect } from "@playwright/test";
import { setupPage } from "../../fixtures";

test("shows tooltip content on hover", async ({ page }) => {
  await setupPage(page, "/docs/components/tooltip");

  // Find the "Hover me" trigger for basic tooltip
  const trigger = page.getByText("Hover me").first();
  await expect(trigger).toBeVisible();

  // Hover to show tooltip
  await trigger.hover();
  await page.waitForTimeout(500);

  // Tooltip content should appear
  const tooltipContent = page.getByText("This is a basic tooltip");
  await expect(tooltipContent.first()).toBeVisible();

  // Move mouse away
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
});
