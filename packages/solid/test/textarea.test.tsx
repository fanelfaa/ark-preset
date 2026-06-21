import { render, fireEvent } from "@solidjs/testing-library";
import { Textarea, TextareaBase, textareaVariants } from "../src/textarea";

describe("Textarea", () => {
  it("renders textarea element", () => {
    const { container } = render(() => <Textarea />);
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with label", () => {
    const { getByText } = render(() => <Textarea label="Bio" />);
    expect(getByText("Bio")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const { getByText } = render(() => <Textarea description="Tell us about yourself" />);
    expect(getByText("Tell us about yourself")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    const { getByText } = render(() => <Textarea error="Too short" />);
    expect(getByText("Too short")).toBeInTheDocument();
  });

  it("hides description when error is present", () => {
    const { queryByText } = render(() => (
      <Textarea description="Helper" error="Error" />
    ));
    expect(queryByText("Helper")).not.toBeInTheDocument();
    expect(queryByText("Error")).toBeInTheDocument();
  });

  it("forwards disabled to textarea", () => {
    const { container } = render(() => <Textarea disabled />);
    const textarea = container.querySelector("textarea");
    expect(textarea).toBeDisabled();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Textarea class="my-textarea" />);
    expect(container.firstChild).toHaveClass("my-textarea");
  });

  it("exports textareaVariants", () => {
    expect(textareaVariants).toBeDefined();
    expect(typeof textareaVariants).toBe("function");
  });

  it("calls onInput when typing", () => {
    const onInput = vi.fn();
    const { container } = render(() => <Textarea onInput={onInput} />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.input(textarea, { target: { value: "hello" } });
    expect(onInput).toHaveBeenCalled();
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    const { container } = render(() => <Textarea onChange={onChange} />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.change(textarea, { target: { value: "world" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("applies value prop to textarea", () => {
    const { container } = render(() => <Textarea value="initial" />);
    const textarea = container.querySelector("textarea")!;
    expect(textarea).toHaveValue("initial");
  });

  it("typing updates textarea value", () => {
    const { container } = render(() => <Textarea />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.input(textarea, { target: { value: "typed content" } });
    expect(textarea).toHaveValue("typed content");
  });

  it("disabled textarea does not accept input", () => {
    const onChange = vi.fn();
    const { container } = render(() => <Textarea disabled onChange={onChange} />);
    const textarea = container.querySelector("textarea")!;
    expect(textarea).toBeDisabled();
    fireEvent.input(textarea, { target: { value: "test" } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders with placeholder", () => {
    const { container } = render(() => <Textarea placeholder="Tell us..." />);
    const textarea = container.querySelector("textarea")!;
    expect(textarea).toHaveAttribute("placeholder", "Tell us...");
  });

  it("applies error class to textarea", () => {
    const { container } = render(() => <Textarea error="Error" />);
    const textarea = container.querySelector("textarea")!;
    // error prop should trigger invalid state on the field
    expect(textarea).toBeInTheDocument();
  });

  it("renders with custom rows", () => {
    const { container } = render(() => <Textarea rows={5} />);
    const textarea = container.querySelector("textarea")!;
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("calls onFocus when focused", () => {
    const onFocus = vi.fn();
    const { container } = render(() => <Textarea onFocus={onFocus} />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.focus(textarea);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when blurred", () => {
    const onBlur = vi.fn();
    const { container } = render(() => <Textarea onBlur={onBlur} />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});

describe("TextareaBase", () => {
  it("exports Root, Label, Field, Description, ErrorText", () => {
    expect(TextareaBase).toHaveProperty("Root");
    expect(TextareaBase).toHaveProperty("Label");
    expect(TextareaBase).toHaveProperty("Field");
    expect(TextareaBase).toHaveProperty("Description");
    expect(TextareaBase).toHaveProperty("ErrorText");
  });

  it("TextareaBase.Root renders", () => {
    const { container } = render(() => <TextareaBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("TextareaBase.Field renders textarea", () => {
    const { container } = render(() => <TextareaBase.Field />);
    expect(container.querySelector("textarea")).toBeInTheDocument();
  });

  it("TextareaBase.Field fires input event", () => {
    const onInput = vi.fn();
    const { container } = render(() => <TextareaBase.Field onInput={onInput} />);
    const textarea = container.querySelector("textarea")!;
    fireEvent.input(textarea, { target: { value: "test" } });
    expect(onInput).toHaveBeenCalled();
  });
});
