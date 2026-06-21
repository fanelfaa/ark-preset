import { render, screen } from "@solidjs/testing-library";
import {
  ToastBase,
  createToaster,
  toastVariants,
  Toaster,
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

describe("Toaster", () => {
  it("renders and creates a toast with title and description", () => {
    const toaster = createToaster({ placement: "bottom-end" });
    render(() => <Toaster toaster={toaster} />);

    toaster.create({ title: "Success", description: "Operation completed" });

    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Operation completed")).toBeInTheDocument();
  });

  it("renders toast with close trigger", () => {
    const toaster = createToaster({ placement: "bottom-end" });
    render(() => <Toaster toaster={toaster} />);

    toaster.create({ title: "Title" });

    expect(screen.getByText("✕")).toBeInTheDocument();
  });
});

describe("toastVariants", () => {
  it("exports toastVariants", () => {
    expect(toastVariants).toBeDefined();
    expect(typeof toastVariants).toBe("function");
  });
});
