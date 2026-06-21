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
  });

  describe("Typography utilities", () => {
    it("exports typographyVariants", () => {
      expect(typographyVariants).toBeDefined();
      expect(typeof typographyVariants).toBe("function");
    });

    it("merges custom class on H1", () => {
      const { container } = render(() => <H1 class="my-h1">H1</H1>);
      expect(container.firstChild).toHaveClass("my-h1");
    });

    it("forwards additional props on P", () => {
      const { container } = render(() => <P id="paragraph-1">P</P>);
      expect(container.firstChild).toHaveAttribute("id", "paragraph-1");
    });
  });
});
