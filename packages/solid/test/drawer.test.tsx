import { render, fireEvent, screen, waitFor } from "@solidjs/testing-library";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerGrabber,
  DrawerBase,
  drawerVariants,
} from "../src/drawer";

describe("Drawer", () => {
  it("renders children", () => {
    const { getByText } = render(() => (
      <Drawer>
        <div>Content</div>
      </Drawer>
    ));
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders DrawerTrigger", () => {
    const { getByText } = render(() => (
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
      </Drawer>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("renders DrawerGrabber", () => {
    const { container } = render(() => (
      <Drawer>
        <DrawerGrabber />
      </Drawer>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("exports drawerVariants", () => {
    expect(drawerVariants).toBeDefined();
    expect(typeof drawerVariants).toBe("function");
  });

  it("opens when trigger is clicked", () => {
    render(() => (
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    ));
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
  });

  it("shows content with defaultOpen", () => {
    render(() => (
      <Drawer defaultOpen>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerDescription>Desc</DrawerDescription>
        </DrawerContent>
      </Drawer>
    ));
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("calls onOpenChange when toggled", async () => {
    const onOpenChange = vi.fn();
    render(() => (
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger>Toggle</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
        </DrawerContent>
      </Drawer>
    ));
    fireEvent.click(screen.getByText("Toggle"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1));
  });

  it("trigger onClick fires", () => {
    const onClick = vi.fn();
    render(() => (
      <Drawer>
        <DrawerTrigger onClick={onClick}>Click</DrawerTrigger>
      </Drawer>
    ));
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("DrawerGrabber renders", () => {
    const { container } = render(() => (
      <Drawer>
        <DrawerGrabber />
      </Drawer>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("DrawerTitle", () => {
  it("renders children within drawer context", () => {
    const { getByText } = render(() => (
      <DrawerBase.Root>
        <DrawerTitle>Title</DrawerTitle>
      </DrawerBase.Root>
    ));
    expect(getByText("Title")).toBeInTheDocument();
  });
});

describe("DrawerDescription", () => {
  it("renders children within drawer context", () => {
    const { getByText } = render(() => (
      <DrawerBase.Root>
        <DrawerDescription>Desc</DrawerDescription>
      </DrawerBase.Root>
    ));
    expect(getByText("Desc")).toBeInTheDocument();
  });
});

describe("DrawerBase", () => {
  it("exports sub-components", () => {
    expect(DrawerBase).toHaveProperty("Root");
    expect(DrawerBase).toHaveProperty("RootProvider");
    expect(DrawerBase).toHaveProperty("Trigger");
    expect(DrawerBase).toHaveProperty("Backdrop");
    expect(DrawerBase).toHaveProperty("Positioner");
    expect(DrawerBase).toHaveProperty("Content");
    expect(DrawerBase).toHaveProperty("CloseTrigger");
    expect(DrawerBase).toHaveProperty("Title");
    expect(DrawerBase).toHaveProperty("Description");
    expect(DrawerBase).toHaveProperty("Grabber");
    expect(DrawerBase).toHaveProperty("GrabberIndicator");
    expect(DrawerBase).toHaveProperty("Context");
    expect(DrawerBase).toHaveProperty("Indent");
    expect(DrawerBase).toHaveProperty("IndentBackground");
    expect(DrawerBase).toHaveProperty("SwipeArea");
  });

  it("DrawerBase.Trigger renders within context", () => {
    const { getByText } = render(() => (
      <DrawerBase.Root>
        <DrawerBase.Trigger>Open</DrawerBase.Trigger>
      </DrawerBase.Root>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("DrawerBase.Root renders content with defaultOpen", () => {
    render(() => (
      <DrawerBase.Root defaultOpen>
        <DrawerBase.Content>
          <DrawerBase.Title>Base Title</DrawerBase.Title>
        </DrawerBase.Content>
      </DrawerBase.Root>
    ));
    expect(screen.getByText("Base Title")).toBeInTheDocument();
  });

  it("DrawerBase.Grabber sub-components render within context", () => {
    const { container } = render(() => (
      <DrawerBase.Root defaultOpen>
        <DrawerBase.Grabber>
          <DrawerBase.GrabberIndicator />
        </DrawerBase.Grabber>
      </DrawerBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("DrawerBase.SwipeArea renders", () => {
    const { container } = render(() => (
      <DrawerBase.Root>
        <DrawerBase.SwipeArea />
      </DrawerBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});
