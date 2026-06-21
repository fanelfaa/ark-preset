import { render, fireEvent, screen, waitFor } from "@solidjs/testing-library";
import { Accordion, AccordionBase, accordionVariants } from "../src/accordion";
import { Tabs, TabsBase, tabsVariants } from "../src/tabs";
import { Carousel, CarouselBase, carouselVariants } from "../src/carousel";
import { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleBase } from "../src/collapsible";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, breadcrumbVariants } from "../src/breadcrumb";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, tableVariants } from "../src/table";
import { Pagination, PaginationBase, paginationVariants, PaginationPageList } from "../src/pagination";

// ------------------------------------------------------------------ //
//  Accordion
// ------------------------------------------------------------------ //
describe("Accordion", () => {
  it("renders children", () => {
    const { getByText } = render(() => <Accordion>Section</Accordion>);
    expect(getByText("Section")).toBeInTheDocument();
  });

  it("defaultValue initially opens item", () => {
    const { container } = render(() => (
      <AccordionBase.Root defaultValue={["item-1"]}>
        <AccordionBase.Item value="item-1">
          <AccordionBase.ItemTrigger>Trigger 1</AccordionBase.ItemTrigger>
          <AccordionBase.ItemContent>Content 1</AccordionBase.ItemContent>
        </AccordionBase.Item>
      </AccordionBase.Root>
    ));
    // defaultValue="item-1" should open the content
    const openContent = container.querySelector('[data-state="open"]');
    expect(openContent).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("renders AccordionItemTrigger with indicator", () => {
    const { container } = render(() => (
      <AccordionBase.Root>
        <AccordionBase.Item value="item-1">
          <AccordionBase.ItemTrigger>Trigger</AccordionBase.ItemTrigger>
        </AccordionBase.Item>
      </AccordionBase.Root>
    ));
    const trigger = container.querySelector('[data-part="item-trigger"]');
    expect(trigger).toBeInTheDocument();
  });

  it("renders AccordionItemContent", () => {
    render(() => (
      <AccordionBase.Root defaultValue={["item-1"]}>
        <AccordionBase.Item value="item-1">
          <AccordionBase.ItemContent>Content</AccordionBase.ItemContent>
        </AccordionBase.Item>
      </AccordionBase.Root>
    ));
    expect(screen.getByText("Content")).toBeInTheDocument();
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

  it("defaultValue selects initial tab", () => {
    render(() => (
      <TabsBase.Root defaultValue="tab-2">
        <TabsBase.List>
          <TabsBase.Trigger value="tab-1">Tab 1</TabsBase.Trigger>
          <TabsBase.Trigger value="tab-2">Tab 2</TabsBase.Trigger>
        </TabsBase.List>
        <TabsBase.Content value="tab-1">Content 1</TabsBase.Content>
        <TabsBase.Content value="tab-2">Content 2</TabsBase.Content>
      </TabsBase.Root>
    ));
    // With defaultValue="tab-2", Content 2 should be visible
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders all triggers and content", () => {
    render(() => (
      <TabsBase.Root>
        <TabsBase.List>
          <TabsBase.Trigger value="tab-1">Tab 1</TabsBase.Trigger>
          <TabsBase.Trigger value="tab-2">Tab 2</TabsBase.Trigger>
        </TabsBase.List>
        <TabsBase.Content value="tab-1">Content 1</TabsBase.Content>
        <TabsBase.Content value="tab-2">Content 2</TabsBase.Content>
      </TabsBase.Root>
    ));
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    // Initial content renders (first tab selected by default)
    expect(screen.getByText("Content 1")).toBeInTheDocument();
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

  it("renders slides with CarouselItem and controls", () => {
    const { getByText } = render(() => (
      <Carousel slideCount={3}>
        <CarouselBase.ItemGroup>
          <CarouselBase.Item index={0}>Slide 1</CarouselBase.Item>
          <CarouselBase.Item index={1}>Slide 2</CarouselBase.Item>
          <CarouselBase.Item index={2}>Slide 3</CarouselBase.Item>
        </CarouselBase.ItemGroup>
        <CarouselBase.Control>
          <CarouselBase.PrevTrigger>Prev</CarouselBase.PrevTrigger>
          <CarouselBase.NextTrigger>Next</CarouselBase.NextTrigger>
        </CarouselBase.Control>
      </Carousel>
    ));
    expect(getByText("Slide 1")).toBeInTheDocument();
    expect(getByText("Slide 2")).toBeInTheDocument();
    expect(getByText("Slide 3")).toBeInTheDocument();
    expect(getByText("Prev")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
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

  it("with defaultOpen renders content", () => {
    render(() => (
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content visible</CollapsibleContent>
      </Collapsible>
    ));
    expect(screen.getByText("Content visible")).toBeInTheDocument();
  });

  it("renders trigger and content elements", () => {
    const { container } = render(() => (
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    ));
    expect(screen.getByText("Toggle")).toBeInTheDocument();
    // Content is rendered in DOM (hidden) even when closed
    const content = container.querySelector('[data-part="content"]');
    expect(content).toBeInTheDocument();
  });

  it("exports CollapsibleBase sub-components", () => {
    expect(CollapsibleBase).toHaveProperty("Root");
    expect(CollapsibleBase).toHaveProperty("RootProvider");
    expect(CollapsibleBase).toHaveProperty("Trigger");
    expect(CollapsibleBase).toHaveProperty("Content");
    expect(CollapsibleBase).toHaveProperty("Indicator");
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

  it("renders with nav role", () => {
    const { container } = render(() => <Breadcrumb />);
    expect(container.firstChild?.nodeName).toBe("NAV");
  });

  it("renders BreadcrumbLink with href", () => {
    render(() => (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    ));
    expect(screen.getByText("Home")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Products")).toHaveAttribute("href", "/products");
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

  it("renders as table element", () => {
    const { container } = render(() => <Table />);
    expect(container.firstChild?.nodeName).toBe("TABLE");
  });

  it("renders with header and body", () => {
    render(() => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ));
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
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

  it("renders with count and renders page items", () => {
    const { container } = render(() => (
      <Pagination count={10} pageSize={1}>
        <PaginationPageList />
      </Pagination>
    ));
    // Should render page items via PaginationPageList
    const pageItems = container.querySelectorAll('[data-part="item"]');
    expect(pageItems.length).toBeGreaterThanOrEqual(2);
  });

  it("renders with next and prev triggers", () => {
    const { getByText } = render(() => (
      <Pagination count={10} pageSize={1}>
        <PaginationBase.PrevTrigger>Prev</PaginationBase.PrevTrigger>
        <PaginationBase.NextTrigger>Next</PaginationBase.NextTrigger>
      </Pagination>
    ));
    expect(getByText("Prev")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
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
    const { container } = render(() => <PaginationBase.Root count={5} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
