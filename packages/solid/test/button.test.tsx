import { render } from "@solidjs/testing-library";
import { Button, buttonVariants } from "../src/button";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    const { container } = render(() => <Button>Button</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with variant styles", () => {
    const { container } = render(() => (
      <Button variant="secondary">Secondary</Button>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    const { container } = render(() => <Button variant="outline">Outline</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with ghost variant", () => {
    const { container } = render(() => <Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container } = render(() => <Button size="lg">Large</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows spinner when loading", () => {
    const { container } = render(() => <Button loading>Loading</Button>);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it("is disabled when loading", () => {
    const { container } = render(() => <Button loading>Loading</Button>);
    expect(container.firstChild).toBeDisabled();
  });

  it("is disabled when disabled prop is set", () => {
    const { container } = render(() => <Button disabled>Disabled</Button>);
    expect(container.firstChild).toBeDisabled();
  });

  it("hides children text when loading but still renders", () => {
    const { getByText } = render(() => <Button loading>Submit</Button>);
    // Children should still be present even when loading
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Button class="my-btn">Custom</Button>);
    expect(container.firstChild).toHaveClass("my-btn");
  });

  it("forwards additional props", () => {
    const { container } = render(() => (
      <Button type="submit" data-action="save">
        Save
      </Button>
    ));
    expect(container.firstChild).toHaveAttribute("type", "submit");
    expect(container.firstChild).toHaveAttribute("data-action", "save");
  });

  it("renders as button element", () => {
    const { container } = render(() => <Button>Button</Button>);
    expect(container.firstChild?.nodeName).toBe("BUTTON");
  });

  it("exports buttonVariants", () => {
    expect(buttonVariants).toBeDefined();
    expect(typeof buttonVariants).toBe("function");
  });
});
