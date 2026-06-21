import { render, fireEvent } from "@solidjs/testing-library";
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

  it("renders with variant styles", () => {
    const { container } = render(() => <Badge variant="secondary">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    const { container } = render(() => <Badge variant="outline">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with destructive variant", () => {
    const { container } = render(() => <Badge variant="destructive">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with ghost variant", () => {
    const { container } = render(() => <Badge variant="ghost">Badge</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with link variant", () => {
    const { container } = render(() => <Badge variant="link">Badge</Badge>);
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

  it("forwards onClick handler", () => {
    const handleClick = vi.fn();
    const { container } = render(() => <Badge onClick={handleClick}>Clickable</Badge>);
    fireEvent.click(container.firstChild!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as span element", () => {
    const { container } = render(() => <Badge>Badge</Badge>);
    expect(container.firstChild?.nodeName).toBe("SPAN");
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

  it("renders with size sm", () => {
    const { container } = render(() => <Spinner size="sm" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size md", () => {
    const { container } = render(() => <Spinner size="md" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size lg", () => {
    const { container } = render(() => <Spinner size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with size xl", () => {
    const { container } = render(() => <Spinner size="xl" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders SVG inside", () => {
    const { container } = render(() => <Spinner />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Spinner class="my-spinner" />);
    expect(container.firstChild).toHaveClass("my-spinner");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Spinner id="loading-1" />);
    expect(container.firstChild).toHaveAttribute("id", "loading-1");
  });

  it("renders as span element", () => {
    const { container } = render(() => <Spinner />);
    expect(container.firstChild?.nodeName).toBe("SPAN");
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

  it("has role separator", () => {
    const { container } = render(() => <Separator />);
    expect(container.firstChild).toHaveAttribute("role", "separator");
  });

  it("renders with horizontal orientation by default", () => {
    const { container } = render(() => <Separator />);
    expect(container.firstChild).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders with vertical orientation", () => {
    const { container } = render(() => <Separator orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders as div element", () => {
    const { container } = render(() => <Separator />);
    expect(container.firstChild?.nodeName).toBe("DIV");
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

  it("renders as div element", () => {
    const { container } = render(() => <Skeleton />);
    expect(container.firstChild?.nodeName).toBe("DIV");
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

  it("forwards onClick handler", () => {
    const handleClick = vi.fn();
    const { container } = render(() => <Skeleton onClick={handleClick} />);
    fireEvent.click(container.firstChild!);
    expect(handleClick).toHaveBeenCalledTimes(1);
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

  it("renders as div element", () => {
    const { container } = render(() => (
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    ));
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies padding-bottom based on ratio", () => {
    const { container } = render(() => (
      <AspectRatio ratio={4 / 3}>
        <div>Content</div>
      </AspectRatio>
    ));
    const el = container.firstChild as HTMLElement;
    // 1 / (4/3) = 0.75 = 75%
    expect(el.style.paddingBottom).toBe("75%");
  });

  it("uses default 16/9 ratio when none provided", () => {
    const { container } = render(() => (
      <AspectRatio>
        <div>Content</div>
      </AspectRatio>
    ));
    const el = container.firstChild as HTMLElement;
    // 1 / (16/9) = 0.5625 = 56.25%
    expect(el.style.paddingBottom).toBe("56.25%");
  });
});
