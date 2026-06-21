import { render, fireEvent } from "@solidjs/testing-library";
import { Input, InputBase, inputVariants } from "../src/input";

describe("Input", () => {
  it("renders input element", () => {
    const { container } = render(() => <Input />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("renders with label", () => {
    const { getByText } = render(() => <Input label="Username" />);
    expect(getByText("Username")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const { getByText } = render(() => <Input description="Enter your name" />);
    expect(getByText("Enter your name")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    const { getByText } = render(() => <Input error="This field is required" />);
    expect(getByText("This field is required")).toBeInTheDocument();
  });

  it("does not render description when error is present", () => {
    const { queryByText } = render(() => (
      <Input description="Helper text" error="Error text" />
    ));
    expect(queryByText("Helper text")).not.toBeInTheDocument();
    expect(queryByText("Error text")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    const { container } = render(() => <Input placeholder="Type here..." />);
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("placeholder", "Type here...");
  });

  it("forwards additional props to the field", () => {
    const { container } = render(() => <Input disabled />);
    const input = container.querySelector("input");
    expect(input).toBeDisabled();
  });

  it("merges custom class on root", () => {
    const { container } = render(() => <Input class="my-input" />);
    // Root element should have the class
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("my-input");
  });

  it("exports inputVariants", () => {
    expect(inputVariants).toBeDefined();
    expect(typeof inputVariants).toBe("function");
  });

  it("calls onInput when typing", () => {
    const onInput = vi.fn();
    const { container } = render(() => <Input onInput={onInput} />);
    const input = container.querySelector("input")!;
    fireEvent.input(input, { target: { value: "hello" } });
    expect(onInput).toHaveBeenCalled();
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input onChange={onChange} />);
    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "world" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onFocus when focused", () => {
    const onFocus = vi.fn();
    const { container } = render(() => <Input onFocus={onFocus} />);
    const input = container.querySelector("input")!;
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when blurred", () => {
    const onBlur = vi.fn();
    const { container } = render(() => <Input onBlur={onBlur} />);
    const input = container.querySelector("input")!;
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("applies value prop to input", () => {
    const { container } = render(() => <Input value="test value" />);
    const input = container.querySelector("input")!;
    expect(input).toHaveValue("test value");
  });

  it("typing updates input value", () => {
    const { container } = render(() => <Input />);
    const input = container.querySelector("input")!;
    fireEvent.input(input, { target: { value: "typed" } });
    expect(input).toHaveValue("typed");
  });

  it("disabled input does not accept input", () => {
    const onChange = vi.fn();
    const { container } = render(() => <Input disabled onChange={onChange} />);
    const input = container.querySelector("input")!;
    expect(input).toBeDisabled();
    fireEvent.input(input, { target: { value: "test" } });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("InputBase", () => {
  it("exports Root, Label, Field, Description, ErrorText", () => {
    expect(InputBase).toHaveProperty("Root");
    expect(InputBase).toHaveProperty("Label");
    expect(InputBase).toHaveProperty("Field");
    expect(InputBase).toHaveProperty("Description");
    expect(InputBase).toHaveProperty("ErrorText");
  });

  it("InputBase.Root renders", () => {
    const { container } = render(() => <InputBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("InputBase.Field renders input element", () => {
    const { container } = render(() => <InputBase.Field />);
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
  });

  it("InputBase.Label renders label text", () => {
    const { getByText } = render(() => <InputBase.Label>Name</InputBase.Label>);
    expect(getByText("Name")).toBeInTheDocument();
  });

  it("InputBase.Description renders helper text within field context", () => {
    const { getByText } = render(() => (
      <InputBase.Root>
        <InputBase.Description>Help</InputBase.Description>
      </InputBase.Root>
    ));
    expect(getByText("Help")).toBeInTheDocument();
  });

  it("InputBase.ErrorText renders error within field context", () => {
    const { getByText } = render(() => (
      <InputBase.Root invalid>
        <InputBase.ErrorText>Error</InputBase.ErrorText>
      </InputBase.Root>
    ));
    expect(getByText("Error")).toBeInTheDocument();
  });

  it("InputBase.Field fires input event", () => {
    const onInput = vi.fn();
    const { container } = render(() => <InputBase.Field onInput={onInput} />);
    const input = container.querySelector("input")!;
    fireEvent.input(input, { target: { value: "test" } });
    expect(onInput).toHaveBeenCalled();
  });
});
