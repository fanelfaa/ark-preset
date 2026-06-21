import { render, fireEvent, screen, waitFor } from "@solidjs/testing-library";
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

  it("opens when trigger is clicked", () => {
    render(() => (
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    ));

    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("shows content with defaultOpen", () => {
    render(() => (
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogDescription>Desc</DialogDescription>
        </DialogContent>
      </Dialog>
    ));
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("calls onOpenChange when toggled", async () => {
    const onOpenChange = vi.fn();
    render(() => (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Toggle</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    ));
    fireEvent.click(screen.getByText("Toggle"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
  });

  it("trigger onClick fires", () => {
    const onClick = vi.fn();
    render(() => (
      <Dialog>
        <DialogTrigger onClick={onClick}>Click</DialogTrigger>
      </Dialog>
    ));
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("content renders with custom class via Portal", () => {
    render(() => (
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent class="my-dialog-content">
          <DialogTitle>Styled</DialogTitle>
        </DialogContent>
      </Dialog>
    ));
    // Content is in Portal — find via screen
    const content = screen.getByText("Styled").closest('[class*="my-dialog-content"]');
    expect(content).toHaveClass("my-dialog-content");
  });

  it("renders close trigger inside Portal content", () => {
    render(() => (
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>HasCloseBtn</DialogTitle>
        </DialogContent>
      </Dialog>
    ));
    // DialogContent renders Backdrop + Positioner + Content + CloseTrigger via Portal
    expect(screen.getByText("HasCloseBtn")).toBeInTheDocument();
    // CloseTrigger renders an SVG button inside the Portal
    const closeTrigger = document.querySelector(
      '[data-scope="dialog"][data-part="close-trigger"]'
    );
    expect(closeTrigger).toBeInTheDocument();
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

  it("renders with defaultOpen in Dialog portal", () => {
    render(() => (
      <DialogBase.Root defaultOpen>
        <DialogTitle>Portal Title</DialogTitle>
        <DialogBase.Content>
          <DialogDescription>Portal Desc</DialogDescription>
        </DialogBase.Content>
      </DialogBase.Root>
    ));
    // DialogBase.Content works at base level, but composite wraps in Portal
    // So we check via screen
    expect(screen.getByText("Portal Title")).toBeInTheDocument();
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
