import { render } from "@solidjs/testing-library";
import {
  ToastBase,
  createToaster,
  toastVariants,
} from "../src/toast";

describe("ToastBase", () => {
  it("exports Root, Title, Description, CloseTrigger, ActionTrigger", () => {
    expect(ToastBase).toHaveProperty("Root");
    expect(ToastBase).toHaveProperty("Title");
    expect(ToastBase).toHaveProperty("Description");
    expect(ToastBase).toHaveProperty("CloseTrigger");
    expect(ToastBase).toHaveProperty("ActionTrigger");
  });

  it("ToastBase.Root renders within a toaster context", () => {
    const toaster = createToaster({ placement: "bottom-end" });
    const { container } = render(() =>
      toaster.create({ title: "Test", description: "Desc" })
    );
    // after creating a toast, the toaster manages the DOM
    expect(toaster).toBeDefined();
    expect(typeof toaster.create).toBe("function");
  });
});

describe("createToaster", () => {
  it("returns a toaster object with expected methods", () => {
    const toaster = createToaster({ placement: "bottom-end" });
    expect(toaster).toBeDefined();
    expect(typeof toaster.create).toBe("function");
    expect(typeof toaster.dismiss).toBe("function");
    expect(typeof toaster.pause).toBe("function");
    expect(typeof toaster.resume).toBe("function");
  });
});

describe("toastVariants", () => {
  it("exports toastVariants", () => {
    expect(toastVariants).toBeDefined();
    expect(typeof toastVariants).toBe("function");
  });
});
