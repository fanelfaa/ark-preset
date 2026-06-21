import { render } from "@solidjs/testing-library";
import { Select, SelectBase, selectVariants } from "../src/select";
import { Combobox, ComboboxBase, comboboxVariants } from "../src/combobox";
import { Listbox, ListboxBase, listboxVariants } from "../src/listbox";

// ------------------------------------------------------------------ //
//  Select
// ------------------------------------------------------------------ //
describe("Select", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Select>Option</Select>);
    expect(getByText("Option")).toBeInTheDocument();
  });

  it("exports selectVariants", () => {
    expect(selectVariants).toBeDefined();
    expect(typeof selectVariants).toBe("function");
  });
});

describe("SelectBase", () => {
  it("exports sub-components", () => {
    expect(SelectBase).toHaveProperty("Root");
    expect(SelectBase).toHaveProperty("RootProvider");
    expect(SelectBase).toHaveProperty("Label");
    expect(SelectBase).toHaveProperty("Trigger");
    expect(SelectBase).toHaveProperty("ValueText");
    expect(SelectBase).toHaveProperty("Positioner");
    expect(SelectBase).toHaveProperty("Item");
    expect(SelectBase).toHaveProperty("ItemText");
    expect(SelectBase).toHaveProperty("ItemIndicator");
    expect(SelectBase).toHaveProperty("Control");
    expect(SelectBase).toHaveProperty("Indicator");
    expect(SelectBase).toHaveProperty("Content");
    expect(SelectBase).toHaveProperty("ClearTrigger");
    expect(SelectBase).toHaveProperty("HiddenSelect");
    expect(SelectBase).toHaveProperty("ItemGroup");
    expect(SelectBase).toHaveProperty("ItemGroupLabel");
    expect(SelectBase).toHaveProperty("List");
  });

  it("SelectBase.Root renders with children providing context", () => {
    const { getByText } = render(() => (
      <SelectBase.Root>
        <SelectBase.Label>Fruits</SelectBase.Label>
      </SelectBase.Root>
    ));
    expect(getByText("Fruits")).toBeInTheDocument();
  });

  it("SelectBase.Trigger renders within select context", () => {
    const { getByText } = render(() => (
      <SelectBase.Root>
        <SelectBase.Trigger>Pick</SelectBase.Trigger>
      </SelectBase.Root>
    ));
    expect(getByText("Pick")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Combobox
// ------------------------------------------------------------------ //
describe("Combobox", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Combobox>Option</Combobox>);
    expect(getByText("Option")).toBeInTheDocument();
  });

  it("exports comboboxVariants", () => {
    expect(comboboxVariants).toBeDefined();
    expect(typeof comboboxVariants).toBe("function");
  });
});

describe("ComboboxBase", () => {
  it("exports sub-components", () => {
    expect(ComboboxBase).toHaveProperty("Root");
    expect(ComboboxBase).toHaveProperty("Label");
    expect(ComboboxBase).toHaveProperty("Control");
    expect(ComboboxBase).toHaveProperty("Input");
    expect(ComboboxBase).toHaveProperty("Trigger");
    expect(ComboboxBase).toHaveProperty("Positioner");
    expect(ComboboxBase).toHaveProperty("Content");
    expect(ComboboxBase).toHaveProperty("Item");
    expect(ComboboxBase).toHaveProperty("ItemText");
    expect(ComboboxBase).toHaveProperty("ItemIndicator");
    expect(ComboboxBase).toHaveProperty("ClearTrigger");
  });

  it("ComboboxBase.Trigger renders within combobox context", () => {
    const { container } = render(() => (
      <ComboboxBase.Root>
        <ComboboxBase.Trigger />
      </ComboboxBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Listbox
// ------------------------------------------------------------------ //
describe("Listbox", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Listbox>Item</Listbox>);
    expect(getByText("Item")).toBeInTheDocument();
  });

  it("exports listboxVariants", () => {
    expect(listboxVariants).toBeDefined();
    expect(typeof listboxVariants).toBe("function");
  });
});

describe("ListboxBase", () => {
  it("exports sub-components", () => {
    expect(ListboxBase).toHaveProperty("Root");
    expect(ListboxBase).toHaveProperty("RootProvider");
    expect(ListboxBase).toHaveProperty("Content");
    expect(ListboxBase).toHaveProperty("Item");
    expect(ListboxBase).toHaveProperty("ItemText");
    expect(ListboxBase).toHaveProperty("ItemIndicator");
    expect(ListboxBase).toHaveProperty("Empty");
    expect(ListboxBase).toHaveProperty("ItemGroup");
    expect(ListboxBase).toHaveProperty("ItemGroupLabel");
    expect(ListboxBase).toHaveProperty("ValueText");
    expect(ListboxBase).toHaveProperty("Input");
  });

  it("ListboxBase.Root renders", () => {
    const { container } = render(() => <ListboxBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
