import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import {
  Heading,
  Paragraph,
  TextLead,
  TextLarge,
  TextSmall,
  TextMuted,
  TextInlineCode,
  TextBlockquote,
  TextList,
  typographyVariants,
} from "../src/typography";

describe("Typography", () => {
  describe("Heading", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Heading>Heading Text</Heading>);
      expect(getByText("Heading Text")).toBeInTheDocument();
    });

    it("renders as h1 element by default", () => {
      const { container } = render(() => <Heading>H1</Heading>);
      expect(container.firstChild?.nodeName).toBe("H1");
    });

    it("renders specific levels", () => {
      const { container: h1 } = render(() => <Heading level={1}>H1</Heading>);
      expect(h1.firstChild?.nodeName).toBe("H1");

      const { container: h2 } = render(() => <Heading level={2}>H2</Heading>);
      expect(h2.firstChild?.nodeName).toBe("H2");

      const { container: h3 } = render(() => <Heading level={3}>H3</Heading>);
      expect(h3.firstChild?.nodeName).toBe("H3");

      const { container: h4 } = render(() => <Heading level={4}>H4</Heading>);
      expect(h4.firstChild?.nodeName).toBe("H4");

      const { container: h5 } = render(() => <Heading level={5}>H5</Heading>);
      expect(h5.firstChild?.nodeName).toBe("H5");

      const { container: h6 } = render(() => <Heading level={6}>H6</Heading>);
      expect(h6.firstChild?.nodeName).toBe("H6");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Heading class="my-h1">H1</Heading>);
      expect(container.firstChild).toHaveClass("my-h1");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Heading id="heading-1">H1</Heading>);
      expect(container.firstChild).toHaveAttribute("id", "heading-1");
    });
  });

  describe("Paragraph", () => {
    it("renders children", () => {
      const { getByText } = render(() => <Paragraph>Paragraph</Paragraph>);
      expect(getByText("Paragraph")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <Paragraph>P</Paragraph>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <Paragraph class="my-p">P</Paragraph>);
      expect(container.firstChild).toHaveClass("my-p");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <Paragraph id="paragraph-1">P</Paragraph>);
      expect(container.firstChild).toHaveAttribute("id", "paragraph-1");
    });
  });

  describe("TextLead", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextLead>Lead text</TextLead>);
      expect(getByText("Lead text")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <TextLead>Lead</TextLead>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextLead class="my-lead">Lead</TextLead>);
      expect(container.firstChild).toHaveClass("my-lead");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextLead id="lead-1">Lead</TextLead>);
      expect(container.firstChild).toHaveAttribute("id", "lead-1");
    });
  });

  describe("TextLarge", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextLarge>Large text</TextLarge>);
      expect(getByText("Large text")).toBeInTheDocument();
    });

    it("renders as div element", () => {
      const { container } = render(() => <TextLarge>Large</TextLarge>);
      expect(container.firstChild?.nodeName).toBe("DIV");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextLarge class="my-large">Large</TextLarge>);
      expect(container.firstChild).toHaveClass("my-large");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextLarge id="large-1">Large</TextLarge>);
      expect(container.firstChild).toHaveAttribute("id", "large-1");
    });
  });

  describe("TextSmall", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextSmall>Small text</TextSmall>);
      expect(getByText("Small text")).toBeInTheDocument();
    });

    it("renders as small element", () => {
      const { container } = render(() => <TextSmall>Small</TextSmall>);
      expect(container.firstChild?.nodeName).toBe("SMALL");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextSmall class="my-small">Small</TextSmall>);
      expect(container.firstChild).toHaveClass("my-small");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextSmall id="small-1">Small</TextSmall>);
      expect(container.firstChild).toHaveAttribute("id", "small-1");
    });
  });

  describe("TextMuted", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextMuted>Muted text</TextMuted>);
      expect(getByText("Muted text")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(() => <TextMuted>Muted</TextMuted>);
      expect(container.firstChild?.nodeName).toBe("P");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextMuted class="my-muted">Muted</TextMuted>);
      expect(container.firstChild).toHaveClass("my-muted");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextMuted id="muted-1">Muted</TextMuted>);
      expect(container.firstChild).toHaveAttribute("id", "muted-1");
    });
  });

  describe("TextInlineCode", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextInlineCode>code</TextInlineCode>);
      expect(getByText("code")).toBeInTheDocument();
    });

    it("renders as code element", () => {
      const { container } = render(() => <TextInlineCode>code</TextInlineCode>);
      expect(container.firstChild?.nodeName).toBe("CODE");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextInlineCode class="my-code">code</TextInlineCode>);
      expect(container.firstChild).toHaveClass("my-code");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextInlineCode id="code-1">code</TextInlineCode>);
      expect(container.firstChild).toHaveAttribute("id", "code-1");
    });
  });

  describe("TextBlockquote", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextBlockquote>Quote</TextBlockquote>);
      expect(getByText("Quote")).toBeInTheDocument();
    });

    it("renders as blockquote element", () => {
      const { container } = render(() => <TextBlockquote>Quote</TextBlockquote>);
      expect(container.firstChild?.nodeName).toBe("BLOCKQUOTE");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextBlockquote class="my-quote">Quote</TextBlockquote>);
      expect(container.firstChild).toHaveClass("my-quote");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextBlockquote id="quote-1">Quote</TextBlockquote>);
      expect(container.firstChild).toHaveAttribute("id", "quote-1");
    });
  });

  describe("TextList", () => {
    it("renders children", () => {
      const { getByText } = render(() => <TextList>Item</TextList>);
      expect(getByText("Item")).toBeInTheDocument();
    });

    it("renders as ul element", () => {
      const { container } = render(() => <TextList>List</TextList>);
      expect(container.firstChild?.nodeName).toBe("UL");
    });

    it("merges custom class", () => {
      const { container } = render(() => <TextList class="my-list">List</TextList>);
      expect(container.firstChild).toHaveClass("my-list");
    });

    it("forwards additional props", () => {
      const { container } = render(() => <TextList id="list-1">List</TextList>);
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
