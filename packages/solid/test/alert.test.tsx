import { render } from "@solidjs/testing-library";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  alertVariants,
} from "../src/alert";

describe("Alert", () => {
  it("renders children", () => {
    const { getByText } = render(() => (
      <Alert>
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    ));
    expect(getByText("Warning")).toBeInTheDocument();
  });

  it("has role='alert'", () => {
    const { container } = render(() => <Alert>Alert</Alert>);
    expect(container.firstChild).toHaveAttribute("role", "alert");
  });

  it("renders as div element", () => {
    const { container } = render(() => <Alert>Alert</Alert>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders with destructive variant", () => {
    const { container } = render(() => (
      <Alert variant="destructive">Destructive</Alert>
    ));
    expect(container.firstChild).toBeInTheDocument();
  });

  it("merges custom class", () => {
    const { container } = render(() => <Alert class="my-alert">Alert</Alert>);
    expect(container.firstChild).toHaveClass("my-alert");
  });

  it("forwards additional props", () => {
    const { container } = render(() => (
      <Alert data-testid="alert-1">Alert</Alert>
    ));
    expect(container.firstChild).toHaveAttribute("data-testid", "alert-1");
  });

  it("renders all sub-elements together", () => {
    const { getByText } = render(() => (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
        <AlertAction>Retry</AlertAction>
      </Alert>
    ));
    expect(getByText("Error")).toBeInTheDocument();
    expect(getByText("Something went wrong")).toBeInTheDocument();
    expect(getByText("Retry")).toBeInTheDocument();
  });

  it("exports alertVariants", () => {
    expect(alertVariants).toBeDefined();
    expect(typeof alertVariants).toBe("function");
  });
});

describe("AlertTitle", () => {
  it("renders children", () => {
    const { getByText } = render(() => <AlertTitle>Title</AlertTitle>);
    expect(getByText("Title")).toBeInTheDocument();
  });

  it("renders as h5 element", () => {
    const { container } = render(() => <AlertTitle>Title</AlertTitle>);
    expect(container.firstChild?.nodeName).toBe("H5");
  });

  it("merges custom class", () => {
    const { container } = render(() => <AlertTitle class="my-title">Title</AlertTitle>);
    expect(container.firstChild).toHaveClass("my-title");
  });
});

describe("AlertDescription", () => {
  it("renders children", () => {
    const { getByText } = render(() => <AlertDescription>Desc</AlertDescription>);
    expect(getByText("Desc")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <AlertDescription>Desc</AlertDescription>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <AlertDescription class="my-desc">Desc</AlertDescription>);
    expect(container.firstChild).toHaveClass("my-desc");
  });
});

describe("AlertAction", () => {
  it("renders children", () => {
    const { getByText } = render(() => <AlertAction>Action</AlertAction>);
    expect(getByText("Action")).toBeInTheDocument();
  });

  it("renders as div element", () => {
    const { container } = render(() => <AlertAction>Action</AlertAction>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("merges custom class", () => {
    const { container } = render(() => <AlertAction class="my-action">Action</AlertAction>);
    expect(container.firstChild).toHaveClass("my-action");
  });
});
