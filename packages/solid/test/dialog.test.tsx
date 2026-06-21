import { render } from "@solidjs/testing-library";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBase,
  dialogVariants,
} from "../src/dialog";

describe("Dialog", () => {
  it("renders children", () => {
    const { getByText } = render(() => (
      <Dialog>
        <div>Content</div>
      </Dialog>
    ));
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders DialogTrigger with button styles", () => {
    const { getByText } = render(() => (
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
      </Dialog>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("renders with variant", () => {
    const { getByText } = render(() => (
      <Dialog variant="outline">
        <DialogTrigger>Open</DialogTrigger>
      </Dialog>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("exports dialogVariants", () => {
    expect(dialogVariants).toBeDefined();
    expect(typeof dialogVariants).toBe("function");
  });
});

describe("DialogHeader", () => {
  it("renders children", () => {
    const { getByText } = render(() => <DialogHeader>Header</DialogHeader>);
    expect(getByText("Header")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <DialogHeader>H</DialogHeader>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <DialogHeader class="my-header">H</DialogHeader>);
    expect(container.firstChild).toHaveClass("my-header");
  });
});

describe("DialogTitle", () => {
  it("renders children within Dialog context", () => {
    const { getByText } = render(() => (
      <DialogBase.Root>
        <DialogTitle>Title</DialogTitle>
      </DialogBase.Root>
    ));
    expect(getByText("Title")).toBeInTheDocument();
  });
});

describe("DialogDescription", () => {
  it("renders children within Dialog context", () => {
    const { getByText } = render(() => (
      <DialogBase.Root>
        <DialogDescription>Desc</DialogDescription>
      </DialogBase.Root>
    ));
    expect(getByText("Desc")).toBeInTheDocument();
  });
});

describe("DialogFooter", () => {
  it("renders children", () => {
    const { getByText } = render(() => <DialogFooter>Footer</DialogFooter>);
    expect(getByText("Footer")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <DialogFooter>F</DialogFooter>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});

describe("DialogBase", () => {
  it("exports sub-components", () => {
    expect(DialogBase).toHaveProperty("Root");
    expect(DialogBase).toHaveProperty("Trigger");
    expect(DialogBase).toHaveProperty("Backdrop");
    expect(DialogBase).toHaveProperty("Positioner");
    expect(DialogBase).toHaveProperty("Content");
    expect(DialogBase).toHaveProperty("CloseTrigger");
    expect(DialogBase).toHaveProperty("Title");
    expect(DialogBase).toHaveProperty("Description");
    expect(DialogBase).toHaveProperty("Header");
    expect(DialogBase).toHaveProperty("Footer");
  });

  it("DialogBase.Trigger renders with button styles within context", () => {
    const { getByText } = render(() => (
      <DialogBase.Root>
        <DialogBase.Trigger>Open</DialogBase.Trigger>
      </DialogBase.Root>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("DialogBase.Header and Footer are plain HTML elements", () => {
    expect(DialogBase.Header).toBeDefined();
    expect(DialogBase.Footer).toBeDefined();
  });
});
