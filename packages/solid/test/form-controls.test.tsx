import { render } from "@solidjs/testing-library";
import { Toggle, toggleVariants } from "../src/toggle";
import { ToggleGroup, ToggleGroupBase, toggleGroupVariants } from "../src/toggle-group";
import { Switch, SwitchBase, switchVariants } from "../src/switch";
import { RadioGroup, RadioGroupBase, radioGroupVariants } from "../src/radio-group";
import { SegmentGroup, SegmentGroupBase, segmentGroupVariants } from "../src/segment-group";
import { RatingGroup, RatingGroupBase, ratingGroupVariants } from "../src/rating-group";

// ------------------------------------------------------------------ //
//  Toggle
// ------------------------------------------------------------------ //
describe("Toggle", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Toggle>Bold</Toggle>);
    expect(getByText("Bold")).toBeInTheDocument();
  });

  it("renders with variant", () => {
    const { container } = render(() => <Toggle variant="outline">B</Toggle>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size", () => {
    const { container } = render(() => <Toggle size="lg">B</Toggle>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards button props", () => {
    const { container } = render(() => <Toggle disabled>B</Toggle>);
    expect(container.firstChild).toBeDisabled();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Toggle class="my-toggle">B</Toggle>);
    expect(container.firstChild).toHaveClass("my-toggle");
  });

  it("exports toggleVariants", () => {
    expect(toggleVariants).toBeDefined();
    expect(typeof toggleVariants).toBe("function");
  });

  it("applies data-state via defaultPressed", () => {
    const { container } = render(() => <Toggle defaultPressed={true}>B</Toggle>);
    expect(container.firstChild).toHaveAttribute("data-state", "on");
  });

  it("applies data-state via controlled pressed prop", () => {
    const { container } = render(() => <Toggle pressed={false}>B</Toggle>);
    expect(container.firstChild).toHaveAttribute("data-state", "off");
  });

  it("renders with disabled attribute", () => {
    const { container } = render(() => <Toggle disabled>B</Toggle>);
    expect(container.firstChild).toBeDisabled();
  });

  it("renders with aria-pressed attribute", () => {
    const { container } = render(() => <Toggle pressed={true}>B</Toggle>);
    expect(container.firstChild).toHaveAttribute("aria-pressed", "true");
  });

  it("renders all size variants without error", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      const { container } = render(() => <Toggle size={size}>B</Toggle>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

// ------------------------------------------------------------------ //
//  ToggleGroup
// ------------------------------------------------------------------ //
describe("ToggleGroup", () => {
  it("renders children", () => {
    const { getByText } = render(() => <ToggleGroup>Items</ToggleGroup>);
    expect(getByText("Items")).toBeInTheDocument();
  });

  it("exports toggleGroupVariants", () => {
    expect(toggleGroupVariants).toBeDefined();
    expect(typeof toggleGroupVariants).toBe("function");
  });
});

describe("ToggleGroupBase", () => {
  it("exports sub-components", () => {
    expect(ToggleGroupBase).toHaveProperty("Root");
    expect(ToggleGroupBase).toHaveProperty("Item");
  });

  it("ToggleGroupBase.Root renders", () => {
    const { container } = render(() => <ToggleGroupBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("ToggleGroupBase.Item renders within context", () => {
    const { container } = render(() => (
      <ToggleGroupBase.Root>
        <ToggleGroupBase.Item value="a">A</ToggleGroupBase.Item>
      </ToggleGroupBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with value selected", () => {
    render(() => (
      <ToggleGroupBase.Root value={["a"]}>
        <ToggleGroupBase.Item value="a">A</ToggleGroupBase.Item>
        <ToggleGroupBase.Item value="b">B</ToggleGroupBase.Item>
      </ToggleGroupBase.Root>
    ));
    const selectedBtn = document.body.querySelector(
      '[data-scope="toggle-group"] button[data-state="on"]'
    );
    expect(selectedBtn).toBeTruthy();
    expect(selectedBtn?.textContent).toBe("A");
  });

  it("renders multiple items", () => {
    render(() => (
      <ToggleGroupBase.Root>
        <ToggleGroupBase.Item value="a">A</ToggleGroupBase.Item>
        <ToggleGroupBase.Item value="b">B</ToggleGroupBase.Item>
        <ToggleGroupBase.Item value="c">C</ToggleGroupBase.Item>
      </ToggleGroupBase.Root>
    ));
    const items = document.body.querySelectorAll('[data-scope="toggle-group"] button');
    expect(items.length).toBe(3);
  });
});

// ------------------------------------------------------------------ //
//  Switch
// ------------------------------------------------------------------ //
describe("Switch", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Switch>Enable</Switch>);
    expect(getByText("Enable")).toBeInTheDocument();
  });

  it("renders with label", () => {
    const { getByText } = render(() => <Switch>Notifications</Switch>);
    expect(getByText("Notifications")).toBeInTheDocument();
  });

  it("forwards disabled prop", () => {
    const { container } = render(() => <Switch disabled>Off</Switch>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Switch class="my-switch">S</Switch>);
    expect(container.firstChild).toHaveClass("my-switch");
  });

  it("exports switchVariants", () => {
    expect(switchVariants).toBeDefined();
    expect(typeof switchVariants).toBe("function");
  });

  it("applies data-state via defaultChecked", () => {
    const { container } = render(() => <Switch defaultChecked>On</Switch>);
    expect(container.firstChild).toHaveAttribute("data-state", "checked");
  });

  it("applies data-state when unchecked", () => {
    const { container } = render(() => <Switch defaultChecked={false}>Off</Switch>);
    expect(container.firstChild).toHaveAttribute("data-state", "unchecked");
  });

  it("renders with data-disabled attribute when disabled", () => {
    const { container } = render(() => <Switch disabled>Off</Switch>);
    expect(container.firstChild).toHaveAttribute("data-disabled");
  });

  it("renders children text", () => {
    const { getByText } = render(() => <Switch>Label text</Switch>);
    expect(getByText("Label text")).toBeInTheDocument();
  });
});

describe("SwitchBase", () => {
  it("exports Root, Control, Label, Thumb, HiddenInput", () => {
    expect(SwitchBase).toHaveProperty("Root");
    expect(SwitchBase).toHaveProperty("Control");
    expect(SwitchBase).toHaveProperty("Label");
    expect(SwitchBase).toHaveProperty("Thumb");
    expect(SwitchBase).toHaveProperty("HiddenInput");
  });

  it("SwitchBase.Root renders", () => {
    const { container } = render(() => <SwitchBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  RadioGroup
// ------------------------------------------------------------------ //
describe("RadioGroup", () => {
  it("renders children", () => {
    const { getByText } = render(() => <RadioGroup>Option 1</RadioGroup>);
    expect(getByText("Option 1")).toBeInTheDocument();
  });

  it("exports radioGroupVariants", () => {
    expect(radioGroupVariants).toBeDefined();
    expect(typeof radioGroupVariants).toBe("function");
  });

  it("renders with value selected", () => {
    render(() => (
      <RadioGroup value="a">
        <RadioGroupBase.Item value="a">Option A</RadioGroupBase.Item>
        <RadioGroupBase.Item value="b">Option B</RadioGroupBase.Item>
      </RadioGroup>
    ));
    const checkedItem = document.body.querySelector(
      '[data-scope="radio-group"] [data-state="checked"]'
    );
    expect(checkedItem).toBeTruthy();
  });

  it("renders item text within items", () => {
    const { getByText } = render(() => (
      <RadioGroup value="a">
        <RadioGroupBase.Item value="a">Option A</RadioGroupBase.Item>
        <RadioGroupBase.Item value="b">Option B</RadioGroupBase.Item>
      </RadioGroup>
    ));
    expect(getByText("Option A")).toBeInTheDocument();
    expect(getByText("Option B")).toBeInTheDocument();
  });
});

describe("RadioGroupBase", () => {
  it("exports sub-components", () => {
    expect(RadioGroupBase).toHaveProperty("Root");
    expect(RadioGroupBase).toHaveProperty("RootProvider");
    expect(RadioGroupBase).toHaveProperty("Label");
    expect(RadioGroupBase).toHaveProperty("Item");
    expect(RadioGroupBase).toHaveProperty("ItemControl");
    expect(RadioGroupBase).toHaveProperty("ItemText");
    expect(RadioGroupBase).toHaveProperty("Indicator");
    expect(RadioGroupBase).toHaveProperty("ItemHiddenInput");
  });

  it("RadioGroupBase.Root renders", () => {
    const { container } = render(() => <RadioGroupBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  SegmentGroup
// ------------------------------------------------------------------ //
describe("SegmentGroup", () => {
  it("renders children", () => {
    const { getByText } = render(() => <SegmentGroup>Tab A</SegmentGroup>);
    expect(getByText("Tab A")).toBeInTheDocument();
  });

  it("exports segmentGroupVariants", () => {
    expect(segmentGroupVariants).toBeDefined();
    expect(typeof segmentGroupVariants).toBe("function");
  });

  it("renders with value selected", () => {
    render(() => (
      <SegmentGroup value="tab1">
        <SegmentGroupBase.Item value="tab1">Tab 1</SegmentGroupBase.Item>
        <SegmentGroupBase.Item value="tab2">Tab 2</SegmentGroupBase.Item>
      </SegmentGroup>
    ));
    const checkedItem = document.body.querySelector(
      '[data-scope="segment-group"] [data-state="checked"]'
    );
    expect(checkedItem).toBeTruthy();
  });

  it("renders item text within items", () => {
    const { getByText } = render(() => (
      <SegmentGroup value="tab1">
        <SegmentGroupBase.Item value="tab1">Tab 1</SegmentGroupBase.Item>
        <SegmentGroupBase.Item value="tab2">Tab 2</SegmentGroupBase.Item>
      </SegmentGroup>
    ));
    expect(getByText("Tab 1")).toBeInTheDocument();
    expect(getByText("Tab 2")).toBeInTheDocument();
  });
});

describe("SegmentGroupBase", () => {
  it("exports sub-components", () => {
    expect(SegmentGroupBase).toHaveProperty("Root");
    expect(SegmentGroupBase).toHaveProperty("Label");
    expect(SegmentGroupBase).toHaveProperty("Item");
    expect(SegmentGroupBase).toHaveProperty("ItemText");
    expect(SegmentGroupBase).toHaveProperty("ItemControl");
    expect(SegmentGroupBase).toHaveProperty("Indicator");
  });

  it("SegmentGroupBase.Root renders", () => {
    const { container } = render(() => <SegmentGroupBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  RatingGroup (was in remaining.test.tsx)
// ------------------------------------------------------------------ //
describe("RatingGroup", () => {
  it("renders children", () => {
    const { getByText } = render(() => <RatingGroup>Rate</RatingGroup>);
    expect(getByText("Rate")).toBeInTheDocument();
  });

  it("exports ratingGroupVariants", () => {
    expect(ratingGroupVariants).toBeDefined();
    expect(typeof ratingGroupVariants).toBe("function");
  });

  it("renders correct number of star items with count prop", () => {
    const { container } = render(() => <RatingGroup count={3} />);
    const items = container.querySelectorAll('[data-part="item"]');
    expect(items.length).toBe(3);
  });

  it("renders with defaultValue selected", () => {
    const { container } = render(() => <RatingGroup count={3} defaultValue={2} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size variant", () => {
    const { container } = render(() => <RatingGroup size="lg" count={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with orientation variant", () => {
    const { container } = render(() => <RatingGroup orientation="vertical" count={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("RatingGroupBase", () => {
  it("exports sub-components", () => {
    expect(RatingGroupBase).toHaveProperty("Root");
    expect(RatingGroupBase).toHaveProperty("RootProvider");
    expect(RatingGroupBase).toHaveProperty("Label");
    expect(RatingGroupBase).toHaveProperty("Control");
    expect(RatingGroupBase).toHaveProperty("Item");
    expect(RatingGroupBase).toHaveProperty("ItemContext");
    expect(RatingGroupBase).toHaveProperty("Context");
    expect(RatingGroupBase).toHaveProperty("HiddenInput");
  });

  it("RatingGroupBase.Root renders", () => {
    const { container } = render(() => <RatingGroupBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
