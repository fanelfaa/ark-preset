import { render } from "@solidjs/testing-library";
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
});
