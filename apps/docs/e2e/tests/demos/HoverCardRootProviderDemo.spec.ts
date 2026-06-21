import { test, expect } from "@playwright/test";

test.describe("HoverCardRootProviderDemo", () => {
  test("renders root provider hover card and shows content on hover", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/hover-card");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Verify section label
    await expect(page.getByText("RootProvider pattern").first()).toBeVisible();

    // Hover over the trigger in the root provider demo
    const trigger = page.locator("[data-scope='hover-card'] [data-part='trigger']")
      .filter({ hasText: "Hover me" }).first();
    await expect(trigger).toBeVisible();
    await trigger.hover();
    await page.waitForTimeout(500);

    // The hover card content should appear
    const content = page.locator("[data-scope='hover-card'] [data-part='content']").first();
    await expect(content).toBeVisible({ timeout: 5000 });
    await expect(content).toContainText("Content controlled via machine");
  });
});
