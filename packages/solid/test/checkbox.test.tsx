import { render, fireEvent, screen, waitFor } from "@solidjs/testing-library";
import {
  Checkbox,
  CheckboxRootProvider,
  CheckboxLabel,
  CheckboxBase,
  checkboxVariants,
} from "../src/checkbox";

describe("Checkbox", () => {
  it("renders with children", () => {
    const { getByText } = render(() => <Checkbox>Accept terms</Checkbox>);
    expect(getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders hidden input element", () => {
    const { container } = render(() => <Checkbox>Accept</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
  });

  it("renders CheckboxLabel within checkbox context", () => {
    const { getByText } = render(() => (
      <CheckboxBase.Root>
        <CheckboxLabel>Label</CheckboxLabel>
      </CheckboxBase.Root>
    ));
    expect(getByText("Label")).toBeInTheDocument();
  });

  it("toggles checked state on click", async () => {
    const { container } = render(() => (
      <Checkbox>Toggle me</Checkbox>
    ));
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    // Initially unchecked
    expect(input.checked).toBe(false);
    // Click the label text
    fireEvent.click(screen.getByText("Toggle me"));
    // Wait for state to update (Zag machine processes asynchronously)
    await waitFor(() => {
      expect(input.checked).toBe(true);
    });
  });

  it("checked prop controls checked state", () => {
    const { container } = render(() => <Checkbox checked>Checked</Checkbox>);
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("defaultChecked works for uncontrolled", () => {
    const { container } = render(() => (
      <Checkbox defaultChecked>Default</Checkbox>
    ));
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("disabled prevents checking", () => {
    const onCheckedChange = vi.fn();
    const { getByText } = render(() => (
      <Checkbox disabled onCheckedChange={onCheckedChange}>
        Disabled
      </Checkbox>
    ));
    const label = getByText("Disabled");
    fireEvent.click(label);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Checkbox class="my-cb">Check</Checkbox>);
    expect(container.firstChild).toHaveClass("my-cb");
  });

  it("forwards additional props", () => {
    const { container } = render(() => (
      <Checkbox disabled>Disabled</Checkbox>
    ));
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeDisabled();
  });

  it("exports checkboxVariants", () => {
    expect(checkboxVariants).toBeDefined();
    expect(typeof checkboxVariants).toBe("function");
  });
});

describe("CheckboxRootProvider", () => {
  it("is exported", () => {
    expect(CheckboxRootProvider).toBeDefined();
    expect(typeof CheckboxRootProvider).toBe("function");
  });
});

describe("CheckboxBase", () => {
  it("exports Root, RootProvider, Control, Label, Indicator, HiddenInput, Group, GroupProvider", () => {
    expect(CheckboxBase).toHaveProperty("Root");
    expect(CheckboxBase).toHaveProperty("RootProvider");
    expect(CheckboxBase).toHaveProperty("Control");
    expect(CheckboxBase).toHaveProperty("Label");
    expect(CheckboxBase).toHaveProperty("Indicator");
    expect(CheckboxBase).toHaveProperty("HiddenInput");
    expect(CheckboxBase).toHaveProperty("Group");
    expect(CheckboxBase).toHaveProperty("GroupProvider");
  });

  it("CheckboxBase.Root renders", () => {
    const { container } = render(() => <CheckboxBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("CheckboxBase.Control renders within checkbox context", () => {
    const { container } = render(() => (
      <CheckboxBase.Root>
        <CheckboxBase.Control />
      </CheckboxBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("CheckboxBase.Indicator renders within checkbox context", () => {
    const { container } = render(() => (
      <CheckboxBase.Root>
        <CheckboxBase.Indicator />
      </CheckboxBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});
