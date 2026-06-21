import { render } from "@solidjs/testing-library";
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
});
