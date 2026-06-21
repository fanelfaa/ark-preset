import { render } from "@solidjs/testing-library";
import { Accordion, AccordionBase, accordionVariants } from "../src/accordion";
import { Tabs, TabsBase, tabsVariants } from "../src/tabs";
import { Carousel, CarouselBase, carouselVariants } from "../src/carousel";
import { Collapsible } from "../src/collapsible";
import { Breadcrumb, breadcrumbVariants } from "../src/breadcrumb";
import { Table } from "../src/table";
import { Pagination, PaginationBase, paginationVariants } from "../src/pagination";

// ------------------------------------------------------------------ //
//  Accordion
// ------------------------------------------------------------------ //
describe("Accordion", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Accordion>Section</Accordion>);
    expect(getByText("Section")).toBeInTheDocument();
  });

  it("exports accordionVariants", () => {
    expect(accordionVariants).toBeDefined();
    expect(typeof accordionVariants).toBe("function");
  });
});

describe("AccordionBase", () => {
  it("exports sub-components", () => {
    expect(AccordionBase).toHaveProperty("Root");
    expect(AccordionBase).toHaveProperty("Item");
    expect(AccordionBase).toHaveProperty("ItemTrigger");
    expect(AccordionBase).toHaveProperty("ItemContent");
    expect(AccordionBase).toHaveProperty("ItemIndicator");
  });

  it("AccordionBase.Root renders with children providing context", () => {
    const { container } = render(() => (
      <AccordionBase.Root>
        <AccordionBase.Item />
      </AccordionBase.Root>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Tabs
// ------------------------------------------------------------------ //
describe("Tabs", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Tabs>Tab 1</Tabs>);
    expect(getByText("Tab 1")).toBeInTheDocument();
  });

  it("exports tabsVariants", () => {
    expect(tabsVariants).toBeDefined();
    expect(typeof tabsVariants).toBe("function");
  });
});

describe("TabsBase", () => {
  it("exports sub-components", () => {
    expect(TabsBase).toHaveProperty("Root");
    expect(TabsBase).toHaveProperty("List");
    expect(TabsBase).toHaveProperty("Trigger");
    expect(TabsBase).toHaveProperty("Content");
    expect(TabsBase).toHaveProperty("Indicator");
  });

  it("TabsBase.Root renders", () => {
    const { container } = render(() => <TabsBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Carousel
// ------------------------------------------------------------------ //
describe("Carousel", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Carousel slideCount={3}>Slide</Carousel>);
    expect(getByText("Slide")).toBeInTheDocument();
  });

  it("exports carouselVariants", () => {
    expect(carouselVariants).toBeDefined();
    expect(typeof carouselVariants).toBe("function");
  });
});

describe("CarouselBase", () => {
  it("exports sub-components", () => {
    expect(CarouselBase).toHaveProperty("Root");
    expect(CarouselBase).toHaveProperty("Item");
    expect(CarouselBase).toHaveProperty("ItemGroup");
    expect(CarouselBase).toHaveProperty("Control");
    expect(CarouselBase).toHaveProperty("NextTrigger");
    expect(CarouselBase).toHaveProperty("PrevTrigger");
    expect(CarouselBase).toHaveProperty("Indicator");
  });

  it("CarouselBase.Root renders with slideCount", () => {
    const { container } = render(() => <CarouselBase.Root slideCount={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Collapsible
// ------------------------------------------------------------------ //
describe("Collapsible", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Collapsible>Expandable</Collapsible>);
    expect(getByText("Expandable")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Breadcrumb
// ------------------------------------------------------------------ //
describe("Breadcrumb", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Breadcrumb>Home</Breadcrumb>);
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("exports breadcrumbVariants", () => {
    expect(breadcrumbVariants).toBeDefined();
    expect(typeof breadcrumbVariants).toBe("function");
  });
});

// ------------------------------------------------------------------ //
//  Table
// ------------------------------------------------------------------ //
describe("Table", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Table>Content</Table>);
    expect(getByText("Content")).toBeInTheDocument();
  });
});

// ------------------------------------------------------------------ //
//  Pagination
// ------------------------------------------------------------------ //
describe("Pagination", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Pagination>1</Pagination>);
    expect(getByText("1")).toBeInTheDocument();
  });

  it("exports paginationVariants", () => {
    expect(paginationVariants).toBeDefined();
    expect(typeof paginationVariants).toBe("function");
  });
});

describe("PaginationBase", () => {
  it("exports sub-components", () => {
    expect(PaginationBase).toHaveProperty("Root");
    expect(PaginationBase).toHaveProperty("Item");
    expect(PaginationBase).toHaveProperty("PrevTrigger");
    expect(PaginationBase).toHaveProperty("NextTrigger");
    expect(PaginationBase).toHaveProperty("Ellipsis");
  });

  it("PaginationBase.Root renders", () => {
    const { container } = render(() => <PaginationBase.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
