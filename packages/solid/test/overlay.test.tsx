import { render, fireEvent, screen, waitFor } from "@solidjs/testing-library";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipBase, tooltipVariants } from "../src/tooltip";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverBase, popoverVariants } from "../src/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardBase, hoverCardVariants } from "../src/hover-card";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogBase, alertDialogVariants } from "../src/alert-dialog";

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

  it("Tooltip shows content with defaultOpen", () => {
    const { getByText } = render(() => (
      <TooltipBase.Root defaultOpen>
        <TooltipBase.Trigger>Hover me</TooltipBase.Trigger>
        <TooltipBase.Content>Tooltip visible</TooltipBase.Content>
      </TooltipBase.Root>
    ));
    expect(getByText("Tooltip visible")).toBeInTheDocument();
  });

  it("Tooltip composites render together", () => {
    const { getByText } = render(() => (
      <Tooltip defaultOpen>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Composite content</TooltipContent>
      </Tooltip>
    ));
    expect(getByText("Composite content")).toBeInTheDocument();
  });

  it("Tooltip trigger onClick fires", () => {
    const onClick = vi.fn();
    const { getByText } = render(() => (
      <TooltipBase.Root>
        <TooltipBase.Trigger onClick={onClick}>Click</TooltipBase.Trigger>
      </TooltipBase.Root>
    ));
    fireEvent.click(getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
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

  it("Popover shows content with defaultOpen (Portal)", () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
        </PopoverContent>
      </Popover>
    ));
    // PopoverContent uses Portal — use screen
    expect(screen.getByText("Popover Title")).toBeInTheDocument();
  });

  it("Popover opens when trigger is clicked", () => {
    render(() => (
      <Popover>
        <PopoverTrigger>Show popover</PopoverTrigger>
        <PopoverContent>
          <PopoverDescription>Popover desc</PopoverDescription>
        </PopoverContent>
      </Popover>
    ));
    fireEvent.click(screen.getByText("Show popover"));
    expect(screen.getByText("Popover desc")).toBeInTheDocument();
  });

  it("Popover trigger onClick fires", () => {
    const onClick = vi.fn();
    render(() => (
      <Popover>
        <PopoverTrigger onClick={onClick}>Click</PopoverTrigger>
      </Popover>
    ));
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Popover renders close trigger inside Portal", () => {
    render(() => (
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>ClosablePopover</PopoverTitle>
        </PopoverContent>
      </Popover>
    ));
    expect(screen.getByText("ClosablePopover")).toBeInTheDocument();
    // PopoverContent includes a CloseTrigger + Arrow inside Portal
    const closeTrigger = document.querySelector(
      '[data-scope="popover"][data-part="close-trigger"]'
    );
    expect(closeTrigger).toBeInTheDocument();
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

  it("HoverCard shows content with defaultOpen", () => {
    const { getByText } = render(() => (
      <HoverCard defaultOpen>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>Card visible</HoverCardContent>
      </HoverCard>
    ));
    expect(getByText("Card visible")).toBeInTheDocument();
  });

  it("HoverCard composite renders trigger and content", () => {
    const { getByText } = render(() => (
      <HoverCard defaultOpen>
        <HoverCardTrigger>Trigger</HoverCardTrigger>
        <HoverCardContent useArrow>With arrow</HoverCardContent>
      </HoverCard>
    ));
    expect(getByText("With arrow")).toBeInTheDocument();
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

  it("AlertDialog shows content with defaultOpen (Portal)", () => {
    render(() => (
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Alert Title</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    ));
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });

  it("AlertDialog opens when trigger is clicked", () => {
    render(() => (
      <AlertDialog>
        <AlertDialogTrigger>Show alert</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogDescription>Alert desc</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    ));
    fireEvent.click(screen.getByText("Show alert"));
    expect(screen.getByText("Alert desc")).toBeInTheDocument();
  });

  it("AlertDialog renders Cancel and Action buttons within Portal", () => {
    render(() => (
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Action</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    ));
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("AlertDialogCancel onClick fires", () => {
    const onClick = vi.fn();
    render(() => (
      <AlertDialog defaultOpen>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogCancel onClick={onClick}>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    ));
    // AlertDialogCancel renders a CloseTrigger with button styles — find via screen
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("AlertDialogBase.Backdrop renders with defaultOpen", () => {
    const { container } = render(() => (
      <AlertDialogBase.Root defaultOpen>
        <AlertDialogBase.Backdrop />
      </AlertDialogBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("AlertDialogBase.Cancel and Action render within context", () => {
    const { getByText } = render(() => (
      <AlertDialogBase.Root defaultOpen>
        <AlertDialogBase.Content>
          <AlertDialogBase.Cancel>No</AlertDialogBase.Cancel>
          <AlertDialogBase.Action>Yes</AlertDialogBase.Action>
        </AlertDialogBase.Content>
      </AlertDialogBase.Root>
    ));
    // AlertDialogBase.Content does NOT use Portal — use getByText
    expect(getByText("No")).toBeInTheDocument();
    expect(getByText("Yes")).toBeInTheDocument();
  });
});
