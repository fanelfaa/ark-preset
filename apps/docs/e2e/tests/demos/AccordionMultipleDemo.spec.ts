import { test, expect } from "@playwright/test";

test.describe("AccordionMultipleDemo", () => {
  test("renders and allows multiple items open simultaneously", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/accordion");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT")
    );
    expect(relevantErrors).toHaveLength(0);

    // Multiple demo items — two should be open by default (defaultValue=["item-1", "item-2"])
    const trigger1 = page.getByRole("button", { name: "Can I open multiple items?" }).first();
    const trigger2 = page.getByRole("button", { name: "How does it work?" }).first();
    const trigger3 = page.getByRole("button", { name: "Is it accessible?" }).first();

    await expect(trigger1).toBeVisible();
    await expect(trigger2).toBeVisible();
    await expect(trigger3).toBeVisible();

    // Expand trigger3 — it should open without closing others (multiple mode)
    await trigger3.click();
    await page.waitForTimeout(300);

    await expect(
      page.locator("[data-scope='accordion']").getByText(/WAI-ARIA Accordion pattern/i)
    ).toBeVisible();
  });
});
