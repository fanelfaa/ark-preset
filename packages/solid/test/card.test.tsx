import { render } from "@solidjs/testing-library";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "../src/card";

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Card>Content</Card>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <Card class="my-card">Card</Card>);
    expect(container.firstChild).toHaveClass("my-card");
  });

  it("forwards additional props", () => {
    const { container } = render(() => <Card id="card-1">Card</Card>);
    expect(container.firstChild).toHaveAttribute("id", "card-1");
  });

  it("exports cardVariants", () => {
    expect(cardVariants).toBeDefined();
    expect(typeof cardVariants).toBe("function");
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    const { getByText } = render(() => <CardHeader>Header</CardHeader>);
    expect(getByText("Header")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <CardHeader>Header</CardHeader>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <CardHeader class="my-header">H</CardHeader>);
    expect(container.firstChild).toHaveClass("my-header");
  });
});

describe("CardTitle", () => {
  it("renders children", () => {
    const { getByText } = render(() => <CardTitle>Title</CardTitle>);
    expect(getByText("Title")).toBeInTheDocument();
  });

  it("renders as h3 element", () => {
    const { container } = render(() => <CardTitle>Title</CardTitle>);
    expect(container.firstChild?.nodeName).toBe("H3");
  });

  it("merges custom class", () => {
    const { container } = render(() => <CardTitle class="my-title">Title</CardTitle>);
    expect(container.firstChild).toHaveClass("my-title");
  });
});

describe("CardDescription", () => {
  it("renders children", () => {
    const { getByText } = render(() => <CardDescription>Desc</CardDescription>);
    expect(getByText("Desc")).toBeInTheDocument();
  });

  it("renders as p element", () => {
    const { container } = render(() => <CardDescription>Desc</CardDescription>);
    expect(container.firstChild?.nodeName).toBe("P");
  });

  it("merges custom class", () => {
    const { container } = render(() => <CardDescription class="my-desc">Desc</CardDescription>);
    expect(container.firstChild).toHaveClass("my-desc");
  });
});

describe("CardContent", () => {
  it("renders children", () => {
    const { getByText } = render(() => <CardContent>Content</CardContent>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <CardContent>Content</CardContent>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <CardContent class="my-content">Content</CardContent>);
    expect(container.firstChild).toHaveClass("my-content");
  });
});

describe("CardFooter", () => {
  it("renders children", () => {
    const { getByText } = render(() => <CardFooter>Footer</CardFooter>);
    expect(getByText("Footer")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <CardFooter>Footer</CardFooter>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <CardFooter class="my-footer">Footer</CardFooter>);
    expect(container.firstChild).toHaveClass("my-footer");
  });
});

describe("Card nested structure", () => {
  it("renders all sub-components together", () => {
    const { getByText } = render(() => (
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    ));
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Description")).toBeInTheDocument();
    expect(getByText("Content")).toBeInTheDocument();
    expect(getByText("Footer")).toBeInTheDocument();
  });
});
