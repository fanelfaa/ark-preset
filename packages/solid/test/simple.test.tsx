import { render } from "@solidjs/testing-library";
import { Badge, badgeVariants } from "../src/badge";
import { Spinner, spinnerVariants } from "../src/spinner";
import { Separator, separatorVariants } from "../src/separator";
import { Skeleton } from "../src/skeleton";
import { AspectRatio } from "../src/aspect-ratio";

// ------------------------------------------------------------------ //
//  Badge
// ------------------------------------------------------------------ //
describe("Badge", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Badge>Hello</Badge>);
    expect(getByText("Hello")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    const { container } = render(() => <Badge>Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { container } = render(() => <Badge variant="secondary">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    const { container } = render(() => <Badge variant="outline">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Badge class="my-custom">Badge</Badge>);
    expect(container.firstChild).toHaveClass("my-custom");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Badge data-testid="badge-1">Badge</Badge>);
    expect(container.firstChild).toHaveAttribute("data-testid", "badge-1");
  });

  it("exports badgeVariants", () => {
    expect(badgeVariants).toBeDefined();
    expect(typeof badgeVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Spinner
// ------------------------------------------------------------------ //
describe("Spinner", () => {
  it("renders with aria attributes", () => {
    const { container } = render(() => <Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveAttribute("role", "status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("renders with size variant", () => {
    const { container } = render(() => <Spinner size="lg" />);
    // JSDOM / happy-dom can render SVG inside
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Spinner class="my-spinner" />);
    expect(container.firstChild).toHaveClass("my-spinner");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Spinner id="loading-1" />);
    expect(container.firstChild).toHaveAttribute("id", "loading-1");
  });

  it("exports spinnerVariants", () => {
    expect(spinnerVariants).toBeDefined();
    expect(typeof spinnerVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Separator
// ------------------------------------------------------------------ //
describe("Separator", () => {
  it("renders", () => {
    const { container } = render(() => <Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Separator class="my-sep" />);
    expect(container.firstChild).toHaveClass("my-sep");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Separator data-orientation="horizontal" />);
    expect(container.firstChild).toHaveAttribute("data-orientation", "horizontal");
  });

  it("exports separatorVariants", () => {
    expect(separatorVariants).toBeDefined();
    expect(typeof separatorVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Skeleton
// ------------------------------------------------------------------ //
describe("Skeleton", () => {
  it("renders", () => {
    const { container } = render(() => <Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Skeleton class="my-sk" />);
    expect(container.firstChild).toHaveClass("my-sk");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Skeleton data-testid="sk" />);
    expect(container.firstChild).toHaveAttribute("data-testid", "sk");
  });

  it("renders with width and height", () => {
    const { container } = render(() => <Skeleton class="h-8 w-32" />);
    expect(container.firstChild).toHaveClass("h-8", "w-32");
  });
});

// ------------------------------------------------------------------ //
//  AspectRatio
// ------------------------------------------------------------------ //
describe("AspectRatio", () => {
  it("renders children", () => {
    const { getByText } = render(() => (
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    ));
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => (
      <AspectRatio ratio={4 / 3} class="my-ar">
        <div>Content</div>
      </AspectRatio>
    ));
    expect(container.firstChild).toHaveClass("my-ar");
  });
});
