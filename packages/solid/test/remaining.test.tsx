import { render } from "@solidjs/testing-library";
import { NumberInput, NumberInputBase, numberInputVariants } from "../src/number-input";
import { PinInput, PinInputBase, pinInputVariants } from "../src/pin-input";
import { PasswordInput, passwordInputVariants } from "../src/password-input";
import { Slider, sliderVariants } from "../src/slider";
import { Progress, ProgressBase, progressVariants } from "../src/progress";
import { TagsInput, TagsInputBase, tagsInputVariants } from "../src/tags-input";
import { ColorPicker, ColorPickerBase, colorPickerVariants } from "../src/color-picker";
import { DatePicker, DatePickerBase, datePickerVariants } from "../src/date-picker";
import { Menu, MenuBase, menuVariants } from "../src/menu";
import { ScrollArea, scrollAreaVariants } from "../src/scroll-area";
import { Avatar, AvatarBase, avatarVariants } from "../src/avatar";

// ------------------------------------------------------------------ //
//  NumberInput
// ------------------------------------------------------------------ //
describe("NumberInput", () => {
  it("renders with label", () => {
    const { getByText } = render(() => <NumberInput label="Age" />);
    expect(getByText("Age")).toBeInTheDocument();
  });

  it("renders input element", () => {
    const { container } = render(() => <NumberInput />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <NumberInput class="my-num" />);
    expect(container.firstChild).toHaveClass("my-num");
  });

  it("exports numberInputVariants", () => {
    expect(numberInputVariants).toBeDefined();
    expect(typeof numberInputVariants).toBe("function");
  });
});

describe("NumberInputBase", () => {
  it("exports sub-components", () => {
    expect(NumberInputBase).toHaveProperty("Root");
    expect(NumberInputBase).toHaveProperty("Label");
    expect(NumberInputBase).toHaveProperty("Input");
    expect(NumberInputBase).toHaveProperty("Control");
    expect(NumberInputBase).toHaveProperty("IncrementTrigger");
    expect(NumberInputBase).toHaveProperty("DecrementTrigger");
  });

  it("NumberInputBase.Root renders", () => {
    const { container } = render(() => <NumberInputBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  PinInput
// ------------------------------------------------------------------ //
describe("PinInput", () => {
  it("renders with label within pin-input context", () => {
    const { getByText } = render(() => (
      <PinInputBase.Root>
        <PinInputBase.Label>OTP</PinInputBase.Label>
      </PinInputBase.Root>
    ));
    expect(getByText("OTP")).toBeInTheDocument();
  });

  it("exports pinInputVariants", () => {
    expect(pinInputVariants).toBeDefined();
    expect(typeof pinInputVariants).toBe("function");
  });
});

describe("PinInputBase", () => {
  it("exports sub-components", () => {
    expect(PinInputBase).toHaveProperty("Root");
    expect(PinInputBase).toHaveProperty("Label");
    expect(PinInputBase).toHaveProperty("Input");
    expect(PinInputBase).toHaveProperty("Control");
  });

  it("PinInputBase.Root renders", () => {
    const { container } = render(() => <PinInputBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  PasswordInput
// ------------------------------------------------------------------ //
describe("PasswordInput", () => {
  it("renders with label", () => {
    const { getByText } = render(() => <PasswordInput label="Password" />);
    expect(getByText("Password")).toBeInTheDocument();
  });

  it("renders input element with type password", () => {
    const { container } = render(() => <PasswordInput />);
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <PasswordInput class="my-pw" />);
    expect(container.firstChild).toHaveClass("my-pw");
  });

  it("exports passwordInputVariants", () => {
    expect(passwordInputVariants).toBeDefined();
    expect(typeof passwordInputVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Slider
// ------------------------------------------------------------------ //
describe("Slider", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Slider>Volume</Slider>);
    expect(getByText("Volume")).toBeInTheDocument();
  });

  it("exports sliderVariants", () => {
    expect(sliderVariants).toBeDefined();
    expect(typeof sliderVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Progress
// ------------------------------------------------------------------ //
describe("Progress", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Progress>Loading</Progress>);
    expect(getByText("Loading")).toBeInTheDocument();
  });

  it("exports progressVariants", () => {
    expect(progressVariants).toBeDefined();
    expect(typeof progressVariants).toBe("function");
  });
});

describe("ProgressBase", () => {
  it("exports sub-components", () => {
    expect(ProgressBase).toHaveProperty("Root");
    expect(ProgressBase).toHaveProperty("Label");
    expect(ProgressBase).toHaveProperty("Track");
    expect(ProgressBase).toHaveProperty("Range");
    expect(ProgressBase).toHaveProperty("ValueText");
    expect(ProgressBase).toHaveProperty("View");
  });

  it("ProgressBase.Root renders", () => {
    const { container } = render(() => <ProgressBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  TagsInput
// ------------------------------------------------------------------ //
describe("TagsInput", () => {
  it("renders with placeholder", () => {
    const { container } = render(() => <TagsInput placeholder="Add tag" />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "Add tag");
  });

  it("renders default tags", () => {
    const { container } = render(() => <TagsInput />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("exports tagsInputVariants", () => {
    expect(tagsInputVariants).toBeDefined();
    expect(typeof tagsInputVariants).toBe("function");
  });
});

describe("TagsInputBase", () => {
  it("exports sub-components", () => {
    expect(TagsInputBase).toHaveProperty("Root");
    expect(TagsInputBase).toHaveProperty("Label");
    expect(TagsInputBase).toHaveProperty("Control");
    expect(TagsInputBase).toHaveProperty("Input");
    expect(TagsInputBase).toHaveProperty("ClearTrigger");
    expect(TagsInputBase).toHaveProperty("Item");
    expect(TagsInputBase).toHaveProperty("ItemText");
    expect(TagsInputBase).toHaveProperty("ItemDeleteTrigger");
  });

  it("TagsInputBase.Root renders", () => {
    const { container } = render(() => <TagsInputBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  ColorPicker
// ------------------------------------------------------------------ //
describe("ColorPicker", () => {
  it("renders children within color-picker context", () => {
    const { getByText } = render(() => (
      <ColorPickerBase.Root>
        <ColorPickerBase.Label>Pick color</ColorPickerBase.Label>
      </ColorPickerBase.Root>
    ));
    expect(getByText("Pick color")).toBeInTheDocument();
  });

  it("exports colorPickerVariants", () => {
    expect(colorPickerVariants).toBeDefined();
    expect(typeof colorPickerVariants).toBe("function");
  });
});

describe("ColorPickerBase", () => {
  it("exports sub-components", () => {
    expect(ColorPickerBase).toHaveProperty("Root");
    expect(ColorPickerBase).toHaveProperty("Label");
    expect(ColorPickerBase).toHaveProperty("Control");
    expect(ColorPickerBase).toHaveProperty("Trigger");
    expect(ColorPickerBase).toHaveProperty("Positioner");
    expect(ColorPickerBase).toHaveProperty("Content");
    expect(ColorPickerBase).toHaveProperty("Area");
    expect(ColorPickerBase).toHaveProperty("AreaThumb");
    expect(ColorPickerBase).toHaveProperty("ChannelSlider");
    expect(ColorPickerBase).toHaveProperty("ChannelSliderThumb");
    expect(ColorPickerBase).toHaveProperty("ChannelInput");
    expect(ColorPickerBase).toHaveProperty("EyeDropperTrigger");
    expect(ColorPickerBase).toHaveProperty("SwatchGroup");
    expect(ColorPickerBase).toHaveProperty("SwatchTrigger");
  });

  it("ColorPickerBase.Root renders", () => {
    const { container } = render(() => <ColorPickerBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  DatePicker
// ------------------------------------------------------------------ //
describe("DatePicker", () => {
  it("renders children within date-picker context", () => {
    const { getByText } = render(() => (
      <DatePickerBase.Root>
        <DatePickerBase.Label>Pick date</DatePickerBase.Label>
      </DatePickerBase.Root>
    ));
    expect(getByText("Pick date")).toBeInTheDocument();
  });

  it("exports datePickerVariants", () => {
    expect(datePickerVariants).toBeDefined();
    expect(typeof datePickerVariants).toBe("function");
  });
});

describe("DatePickerBase", () => {
  it("exports sub-components", () => {
    expect(DatePickerBase).toHaveProperty("Root");
    expect(DatePickerBase).toHaveProperty("RootProvider");
    expect(DatePickerBase).toHaveProperty("Label");
    expect(DatePickerBase).toHaveProperty("Context");
    expect(DatePickerBase).toHaveProperty("TableHead");
    expect(DatePickerBase).toHaveProperty("TableBody");
    expect(DatePickerBase).toHaveProperty("YearSelect");
    expect(DatePickerBase).toHaveProperty("MonthSelect");
    expect(DatePickerBase).toHaveProperty("Positioner");
    expect(DatePickerBase).toHaveProperty("Control");
    expect(DatePickerBase).toHaveProperty("Input");
    expect(DatePickerBase).toHaveProperty("Content");
    expect(DatePickerBase).toHaveProperty("View");
    expect(DatePickerBase).toHaveProperty("ViewControl");
    expect(DatePickerBase).toHaveProperty("RangeText");
    expect(DatePickerBase).toHaveProperty("Table");
    expect(DatePickerBase).toHaveProperty("TableRow");
    expect(DatePickerBase).toHaveProperty("TableHeader");
    expect(DatePickerBase).toHaveProperty("TableCell");
    expect(DatePickerBase).toHaveProperty("Trigger");
    expect(DatePickerBase).toHaveProperty("ClearTrigger");
    expect(DatePickerBase).toHaveProperty("PrevTrigger");
    expect(DatePickerBase).toHaveProperty("NextTrigger");
    expect(DatePickerBase).toHaveProperty("ViewTrigger");
    expect(DatePickerBase).toHaveProperty("TableCellTrigger");
  });

  it("DatePickerBase.Root renders", () => {
    const { container } = render(() => <DatePickerBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Menu
// ------------------------------------------------------------------ //
describe("Menu", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Menu>Item 1</Menu>);
    expect(getByText("Item 1")).toBeInTheDocument();
  });

  it("exports menuVariants", () => {
    expect(menuVariants).toBeDefined();
    expect(typeof menuVariants).toBe("function");
  });
});

describe("MenuBase", () => {
  it("exports sub-components", () => {
    expect(MenuBase).toHaveProperty("Root");
    expect(MenuBase).toHaveProperty("Trigger");
    expect(MenuBase).toHaveProperty("Positioner");
    expect(MenuBase).toHaveProperty("Content");
    expect(MenuBase).toHaveProperty("Item");
    expect(MenuBase).toHaveProperty("ItemText");
    expect(MenuBase).toHaveProperty("ItemGroup");
    expect(MenuBase).toHaveProperty("Separator");
  });

  it("MenuBase.Trigger renders within menu context", () => {
    const { getByText } = render(() => (
      <MenuBase.Root>
        <MenuBase.Trigger>Open</MenuBase.Trigger>
      </MenuBase.Root>
    ));
    expect(getByText("Open")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  ScrollArea
// ------------------------------------------------------------------ //
describe("ScrollArea", () => {
  it("renders children", () => {
    const { getByText } = render(() => <ScrollArea>Scrollable</ScrollArea>);
    expect(getByText("Scrollable")).toBeInTheDocument();
  });

  it("renders with variant", () => {
    const { container } = render(() => (
      <ScrollArea variant="hover">Content</ScrollArea>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("exports scrollAreaVariants", () => {
    expect(scrollAreaVariants).toBeDefined();
    expect(typeof scrollAreaVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Avatar
// ------------------------------------------------------------------ //
describe("Avatar", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Avatar>User</Avatar>);
    expect(getByText("User")).toBeInTheDocument();
  });

  it("exports avatarVariants", () => {
    expect(avatarVariants).toBeDefined();
    expect(typeof avatarVariants).toBe("function");
  });
});

describe("AvatarBase", () => {
  it("exports sub-components", () => {
    expect(AvatarBase).toHaveProperty("Root");
    expect(AvatarBase).toHaveProperty("Fallback");
    expect(AvatarBase).toHaveProperty("Image");
  });

  it("AvatarBase.Root renders", () => {
    const { container } = render(() => <AvatarBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
