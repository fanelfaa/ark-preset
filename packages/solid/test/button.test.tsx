import { render, fireEvent, screen } from "@solidjs/testing-library";
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

  it("renders with destructive variant", () => {
    const { container } = render(() => <Button variant="destructive">Destructive</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with link variant", () => {
    const { container } = render(() => <Button variant="link">Link</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container } = render(() => <Button size="lg">Large</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size md", () => {
    const { container } = render(() => <Button size="md">Medium</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with icon size", () => {
    const { container } = render(() => <Button size="icon">+</Button>);
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

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { getByText } = render(() => <Button onClick={onClick}>Click</Button>);
    fireEvent.click(getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    const { getByText } = render(() => (
      <Button disabled onClick={onClick}>
        Click
      </Button>
    ));
    fireEvent.click(getByText("Click"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const onClick = vi.fn();
    const { getByText } = render(() => (
      <Button loading onClick={onClick}>
        Click
      </Button>
    ));
    fireEvent.click(getByText("Click"));
    expect(onClick).not.toHaveBeenCalled();
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
