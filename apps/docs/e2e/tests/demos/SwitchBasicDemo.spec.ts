import { test, expect } from "@playwright/test";

test.describe("SwitchBasicDemo", () => {
  test("renders switches and toggles checked state", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/docs/components/switch");
    await page.waitForLoadState("networkidle");

    const relevantErrors = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("Failed to load resource") &&
        !e.includes("ERR_BLOCKED_BY_CLIENT"),
    );
    expect(relevantErrors).toHaveLength(0);

    // "Off" switch — should be unchecked initially
    const offSwitch = page.locator("[data-scope='switch']").first();
    await expect(offSwitch).toBeVisible();
    await expect(offSwitch).not.toHaveAttribute("data-state", "checked");

    // "On" switch — should be checked (defaultChecked)
    const onSwitch = page.locator("[data-scope='switch']").nth(1);
    await expect(onSwitch).toHaveAttribute("data-state", "checked");

    // "Disabled" switch — should be disabled
    const disabledSwitch = page.locator("[data-scope='switch']").nth(2);
    await expect(disabledSwitch).toHaveAttribute("data-disabled", "");

    // Click the "Off" switch to toggle it on
    const offLabel = page.getByText("Off", { exact: true }).first();
    await offLabel.click();
    await page.waitForTimeout(100);

    // Should now be checked
    await expect(offSwitch).toHaveAttribute("data-state", "checked");

    // Click the "On" switch to toggle it off
    const onLabel = page.getByText("On", { exact: true }).first();
    await onLabel.click();
    await page.waitForTimeout(100);

    // Should now be unchecked
    await expect(onSwitch).not.toHaveAttribute("data-state", "checked");
  });
});
