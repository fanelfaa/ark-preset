import { render } from "@solidjs/testing-library";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  List,
  typographyVariants,
} from "../src/typography";

describe("Typography", () => {
  describe("H1", () => {
    it("renders children", () => {
      const { getByText } = render(() => <H1>Heading 1</H1>);
      expect(getByText("Heading 1")).toBeInTheDocument();
    });

    it("renders as h1 element", () => {
      const { container } = render(() => <H1>H1</H1>);
      expect(container.firstChild?.nodeName).toBe("H1");
    });

    it("merges custom class", () => {
      const { container } = render(() => <H1 class="my-h1">H1</H1>);
      expect(container.firstChild).toHaveClass("my-h1");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <H1 id="h1-1">H1</H1>);
      expect(container.firstChild).toHaveAttribute("id", "h1-1");
    });
  });

  describe("H2", () => {
    it("renders children", () => {
      const { getByText } = render(() => <H2>Heading 2</H2>);
      expect(getByText("Heading 2")).toBeInTheDocument();
    });

    it("renders as h2 element", () => {
      const { container } = render(() => <H2>H2</H2>);
      expect(container.firstChild?.nodeName).toBe("H2");
    });

    it("merges custom class", () => {
      const { container } = render(() => <H2 class="my-h2">H2</H2>);
      expect(container.firstChild).toHaveClass("my-h2");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <H2 id="h2-1">H2</H2>);
      expect(container.firstChild).toHaveAttribute("id", "h2-1");
    });
  });

  describe("H3", () => {
    it("renders children", () => {
      const { getByText } = render(() => <H3>Heading 3</H3>);
      expect(getByText("Heading 3")).toBeInTheDocument();
    });

    it("renders as h3 element", () => {
      const { container } = render(() => <H3>H3</H3>);
      expect(container.firstChild?.nodeName).toBe("H3");
    });

    it("merges custom class", () => {
      const { container } = render(() => <H3 class="my-h3">H3</H3>);
      expect(container.firstChild).toHaveClass("my-h3");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <H3 id="h3-1">H3</H3>);
      expect(container.firstChild).toHaveAttribute("id", "h3-1");
    });
  });

  describe("H4", () => {
    it("renders children", () => {
      const { getByText } = render(() => <H4>Heading 4</H4>);
      expect(getByText("Heading 4")).toBeInTheDocument();
    });

    it("renders as h4 element", () => {
      const { container } = render(() => <H4>H4</H4>);
      expect(container.firstChild?.nodeName).toBe("H4");
    });

    it("merges custom class", () => {
      const { container } = render(() => <H4 class="my-h4">H4</H4>);
      expect(container.firstChild).toHaveClass("my-h4");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <H4 id="h4-1">H4</H4>);
      expect(container.firstChild).toHaveAttribute("id", "h4-1");
    });
  });

  describe("P", () => {
    it("renders children", () => {
      const { getByText } = render(() => <P>Paragraph</P>);
      expect(getByText("Paragraph")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <P>P</P>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <P class="my-p">P</P>);
      expect(container.firstChild).toHaveClass("my-p");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <P id="paragraph-1">P</P>);
      expect(container.firstChild).toHaveAttribute("id", "paragraph-1");
    });
  });

  describe("Lead", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Lead>Lead text</Lead>);
      expect(getByText("Lead text")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <Lead>Lead</Lead>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Lead class="my-lead">Lead</Lead>);
      expect(container.firstChild).toHaveClass("my-lead");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Lead id="lead-1">Lead</Lead>);
      expect(container.firstChild).toHaveAttribute("id", "lead-1");
    });
  });

  describe("Large", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Large>Large text</Large>);
      expect(getByText("Large text")).toBeInTheDocument();
    });

    it("renders as div element", () => {
      const { container } = render(() => <Large>Large</Large>);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Large class="my-large">Large</Large>);
      expect(container.firstChild).toHaveClass("my-large");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Large id="large-1">Large</Large>);
      expect(container.firstChild).toHaveAttribute("id", "large-1");
    });
  });

  describe("Small", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Small>Small text</Small>);
      expect(getByText("Small text")).toBeInTheDocument();
    });

    it("renders as small element", () => {
      const { container } = render(() => <Small>Small</Small>);
      expect(container.firstChild?.nodeName).toBe("SMALL");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Small class="my-small">Small</Small>);
      expect(container.firstChild).toHaveClass("my-small");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Small id="small-1">Small</Small>);
      expect(container.firstChild).toHaveAttribute("id", "small-1");
    });
  });

  describe("Muted", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Muted>Muted text</Muted>);
      expect(getByText("Muted text")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <Muted>Muted</Muted>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Muted class="my-muted">Muted</Muted>);
      expect(container.firstChild).toHaveClass("my-muted");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Muted id="muted-1">Muted</Muted>);
      expect(container.firstChild).toHaveAttribute("id", "muted-1");
    });
  });

  describe("InlineCode", () => {
    it("renders children", () => {
      const { getByText } = render(() => <InlineCode>code</InlineCode>);
      expect(getByText("code")).toBeInTheDocument();
    });

    it("renders as code element", () => {
      const { container } = render(() => <InlineCode>code</InlineCode>);
      expect(container.firstChild?.nodeName).toBe("CODE");
    });

    it("merges custom class", () => {
      const { container } = render(() => <InlineCode class="my-code">code</InlineCode>);
      expect(container.firstChild).toHaveClass("my-code");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <InlineCode id="code-1">code</InlineCode>);
      expect(container.firstChild).toHaveAttribute("id", "code-1");
    });
  });

  describe("Blockquote", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Blockquote>Quote</Blockquote>);
      expect(getByText("Quote")).toBeInTheDocument();
    });

    it("renders as blockquote element", () => {
      const { container } = render(() => <Blockquote>Quote</Blockquote>);
      expect(container.firstChild?.nodeName).toBe("BLOCKQUOTE");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Blockquote class="my-quote">Quote</Blockquote>);
      expect(container.firstChild).toHaveClass("my-quote");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Blockquote id="quote-1">Quote</Blockquote>);
      expect(container.firstChild).toHaveAttribute("id", "quote-1");
    });
  });

  describe("List", () => {
    it("renders children", () => {
      const { getByText } = render(() => <List>Item</List>);
      expect(getByText("Item")).toBeInTheDocument();
    });

    it("renders as ul element", () => {
      const { container } = render(() => <List>List</List>);
      expect(container.firstChild?.nodeName).toBe("UL");
    });

    it("merges custom class", () => {
      const { container } = render(() => <List class="my-list">List</List>);
      expect(container.firstChild).toHaveClass("my-list");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <List id="list-1">List</List>);
      expect(container.firstChild).toHaveAttribute("id", "list-1");
    });
  });

  describe("Typography utilities", () => {
    it("exports typographyVariants", () => {
      expect(typographyVariants).toBeDefined();
      expect(typeof typographyVariants).toBe("function");
    });
  });
});
