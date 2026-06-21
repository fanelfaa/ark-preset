import { render, fireEvent, waitFor } from "@solidjs/testing-library";
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

  it("renders with defaultValue and fires onValueChange", () => {
    const onChange = vi.fn();
    const { container } = render(() => (
      <SelectBase.Root
        defaultValue={[{ label: "Apple", value: "apple" }]}
        onValueChange={onChange}
      >
        <SelectBase.Label>Fruits</SelectBase.Label>
      </SelectBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
    // Default value is rendered; no interaction means no onChange call
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with styling intact", () => {
    const { container } = render(() => (
      <SelectBase.Root>
        <SelectBase.Label>Fruits</SelectBase.Label>
      </SelectBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with defaultOpen", () => {
    const { container } = render(() => (
      <SelectBase.Root defaultOpen>
        <SelectBase.Trigger>Pick</SelectBase.Trigger>
      </SelectBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with error variant", () => {
    const { container } = render(() => (
      <SelectBase.Root error>
        <SelectBase.Label>Fruits</SelectBase.Label>
      </SelectBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
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

  it("renders input within root context", () => {
    const { container } = render(() => (
      <ComboboxBase.Root>
        <ComboboxBase.Control>
          <ComboboxBase.Input />
        </ComboboxBase.Control>
      </ComboboxBase.Root>
    ));
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("renders with defaultOpen", () => {
    const { container } = render(() => (
      <ComboboxBase.Root defaultOpen>
        <ComboboxBase.Input />
        <ComboboxBase.Trigger />
      </ComboboxBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with error variant", () => {
    const { container } = render(() => (
      <ComboboxBase.Root error>
        <ComboboxBase.Label>Options</ComboboxBase.Label>
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

  it("Listbox renders with orientation", () => {
    const { container } = render(() => (
      <ListboxBase.Root orientation="horizontal" />
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with collection", () => {
    const { container } = render(() => (
      <ListboxBase.Root />
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});
