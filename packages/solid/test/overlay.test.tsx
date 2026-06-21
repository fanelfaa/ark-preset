import { render } from "@solidjs/testing-library";
import { Tooltip, TooltipBase, tooltipVariants } from "../src/tooltip";
import { Popover, PopoverBase, popoverVariants } from "../src/popover";
import { HoverCard, HoverCardBase, hoverCardVariants } from "../src/hover-card";
import { AlertDialog, AlertDialogBase, alertDialogVariants } from "../src/alert-dialog";

// ------------------------------------------------------------------ //
//  Tooltip
// ------------------------------------------------------------------ //
describe("Tooltip", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Tooltip>Hover me</Tooltip>);
    expect(getByText("Hover me")).toBeInTheDocument();
  });

  it("exports tooltipVariants", () => {
    expect(tooltipVariants).toBeDefined();
    expect(typeof tooltipVariants).toBe("function");
  });
});

describe("TooltipBase", () => {
  it("exports sub-components", () => {
    expect(TooltipBase).toHaveProperty("Root");
    expect(TooltipBase).toHaveProperty("Trigger");
    expect(TooltipBase).toHaveProperty("Arrow");
    expect(TooltipBase).toHaveProperty("ArrowTip");
    expect(TooltipBase).toHaveProperty("Content");
    expect(TooltipBase).toHaveProperty("Positioner");
  });

  it("TooltipBase.Trigger renders within tooltip context", () => {
    const { getByText } = render(() => (
      <TooltipBase.Root>
        <TooltipBase.Trigger>Trigger</TooltipBase.Trigger>
      </TooltipBase.Root>
    ));
    expect(getByText("Trigger")).toBeInTheDocument();
  });

  it("TooltipBase.Content renders within tooltip context", () => {
    const { getByText } = render(() => (
      <TooltipBase.Root>
        <TooltipBase.Content>Tooltip content</TooltipBase.Content>
      </TooltipBase.Root>
    ));
    expect(getByText("Tooltip content")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Popover
// ------------------------------------------------------------------ //
describe("Popover", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Popover>Content</Popover>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("exports popoverVariants", () => {
    expect(popoverVariants).toBeDefined();
    expect(typeof popoverVariants).toBe("function");
  });
});

describe("PopoverBase", () => {
  it("exports sub-components", () => {
    expect(PopoverBase).toHaveProperty("Root");
    expect(PopoverBase).toHaveProperty("Trigger");
    expect(PopoverBase).toHaveProperty("Positioner");
    expect(PopoverBase).toHaveProperty("Content");
    expect(PopoverBase).toHaveProperty("Title");
    expect(PopoverBase).toHaveProperty("Description");
    expect(PopoverBase).toHaveProperty("CloseTrigger");
    expect(PopoverBase).toHaveProperty("Arrow");
    expect(PopoverBase).toHaveProperty("ArrowTip");
  });

  it("PopoverBase.Trigger renders within popover context", () => {
    const { getByText } = render(() => (
      <PopoverBase.Root>
        <PopoverBase.Trigger>Open</PopoverBase.Trigger>
      </PopoverBase.Root>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });

  it("PopoverBase.Content renders within popover context", () => {
    const { getByText } = render(() => (
      <PopoverBase.Root>
        <PopoverBase.Content>Content</PopoverBase.Content>
      </PopoverBase.Root>
    ));
    expect(getByText("Content")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  HoverCard
// ------------------------------------------------------------------ //
describe("HoverCard", () => {
  it("renders children", () => {
    const { getByText } = render(() => <HoverCard>Content</HoverCard>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("exports hoverCardVariants", () => {
    expect(hoverCardVariants).toBeDefined();
    expect(typeof hoverCardVariants).toBe("function");
  });
});

describe("HoverCardBase", () => {
  it("exports sub-components", () => {
    expect(HoverCardBase).toHaveProperty("Root");
    expect(HoverCardBase).toHaveProperty("Trigger");
    expect(HoverCardBase).toHaveProperty("Arrow");
    expect(HoverCardBase).toHaveProperty("ArrowTip");
    expect(HoverCardBase).toHaveProperty("Content");
    expect(HoverCardBase).toHaveProperty("Positioner");
  });

  it("HoverCardBase.Content renders within hover-card context", () => {
    const { getByText } = render(() => (
      <HoverCardBase.Root>
        <HoverCardBase.Content>Card content</HoverCardBase.Content>
      </HoverCardBase.Root>
    ));
    expect(getByText("Card content")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  AlertDialog
// ------------------------------------------------------------------ //
describe("AlertDialog", () => {
  it("renders children", () => {
    const { getByText } = render(() => <AlertDialog>Content</AlertDialog>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("exports alertDialogVariants", () => {
    expect(alertDialogVariants).toBeDefined();
    expect(typeof alertDialogVariants).toBe("function");
  });
});

describe("AlertDialogBase", () => {
  it("exports sub-components", () => {
    expect(AlertDialogBase).toHaveProperty("Root");
    expect(AlertDialogBase).toHaveProperty("Trigger");
    expect(AlertDialogBase).toHaveProperty("Backdrop");
    expect(AlertDialogBase).toHaveProperty("Positioner");
    expect(AlertDialogBase).toHaveProperty("Content");
    expect(AlertDialogBase).toHaveProperty("Title");
    expect(AlertDialogBase).toHaveProperty("Description");
    expect(AlertDialogBase).toHaveProperty("Cancel");
    expect(AlertDialogBase).toHaveProperty("Action");
  });

  it("AlertDialogBase.Backdrop renders within context", () => {
    const { container } = render(() => (
      <AlertDialogBase.Root>
        <AlertDialogBase.Backdrop />
      </AlertDialogBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("AlertDialogBase.Trigger renders within context", () => {
    const { getByText } = render(() => (
      <AlertDialogBase.Root>
        <AlertDialogBase.Trigger>Open</AlertDialogBase.Trigger>
      </AlertDialogBase.Root>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });
});
