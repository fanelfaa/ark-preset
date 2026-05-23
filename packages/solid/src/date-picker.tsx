import { children, createMemo, Show, splitProps, type Component } from "solid-js";
import { DatePicker as DatePickerPrimitive } from "@ark-ui/solid/date-picker";
import { datePickerVariants, buttonVariants } from "@ui/core";

const styles = datePickerVariants();

export const DatePicker = DatePickerPrimitive.Root;
export const DatePickerRootProvider = DatePickerPrimitive.RootProvider;
export const DatePickerLabel = DatePickerPrimitive.Label;
export const DatePickerContext = DatePickerPrimitive.Context;
export const DatePickerTableHead = DatePickerPrimitive.TableHead;
export const DatePickerTableBody = DatePickerPrimitive.TableBody;
export const DatePickerYearSelect = DatePickerPrimitive.YearSelect;
export const DatePickerMonthSelect = DatePickerPrimitive.MonthSelect;
export const DatePickerPositioner = DatePickerPrimitive.Positioner;

export const DatePickerControl: Component<DatePickerPrimitive.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const controlClass = createMemo(() => styles.control({ class: local.class }));
  return <DatePickerPrimitive.Control class={controlClass()} {...others} />;
};

export const DatePickerInput: Component<DatePickerPrimitive.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const inputClass = createMemo(() => styles.input({ class: local.class }));
  return <DatePickerPrimitive.Input class={inputClass()} {...others} />;
};

export const DatePickerTrigger: Component<DatePickerPrimitive.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  const triggerClass = createMemo(() => styles.trigger({ class: local.class }));

  return (
    <DatePickerPrimitive.Trigger class={triggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M11 15h1" />
          <path d="M12 15v3" />
          <title>Calendar</title>
        </svg>
      </Show>
    </DatePickerPrimitive.Trigger>
  );
};

export const DatePickerClearTrigger: Component<DatePickerPrimitive.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const clearTriggerClass = createMemo(() => styles.clearTrigger({ class: local.class }));
  return <DatePickerPrimitive.ClearTrigger class={clearTriggerClass()} {...others} />;
};

export const DatePickerContent: Component<DatePickerPrimitive.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return (
    <DatePickerPrimitive.Content class={contentClass()} {...others}>
      {local.children}
    </DatePickerPrimitive.Content>
  );
};

export const DatePickerView: Component<DatePickerPrimitive.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const viewClass = createMemo(() => styles.view({ class: local.class }));
  return <DatePickerPrimitive.View class={viewClass()} {...others} />;
};

export const DatePickerViewControl: Component<DatePickerPrimitive.ViewControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const viewControlClass = createMemo(() => styles.viewControl({ class: local.class }));
  return <DatePickerPrimitive.ViewControl class={viewControlClass()} {...others} />;
};

export const DatePickerPrevTrigger: Component<DatePickerPrimitive.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  const navTriggerClass = createMemo(() =>
    styles.navTrigger({ class: [buttonVariants({ variant: "outline" }), local.class, "size-7"] }),
  );

  return (
    <DatePickerPrimitive.PrevTrigger class={navTriggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M15 6l-6 6l6 6" />
          <title>Previous</title>
        </svg>
      </Show>
    </DatePickerPrimitive.PrevTrigger>
  );
};

export const DatePickerNextTrigger: Component<DatePickerPrimitive.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  const navTriggerClass = createMemo(() =>
    styles.navTrigger({ class: [buttonVariants({ variant: "outline" }), local.class, "size-7"] }),
  );

  return (
    <DatePickerPrimitive.NextTrigger class={navTriggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M9 6l6 6l-6 6" />
          <title>Next</title>
        </svg>
      </Show>
    </DatePickerPrimitive.NextTrigger>
  );
};

export const DatePickerViewTrigger: Component<DatePickerPrimitive.ViewTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const viewTriggerClass = createMemo(() =>
    styles.viewTrigger({ class: [buttonVariants({ variant: "ghost" }), local.class] }),
  );
  return <DatePickerPrimitive.ViewTrigger class={viewTriggerClass()} {...others} />;
};

export const DatePickerRangeText: Component<DatePickerPrimitive.RangeTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rangeTextClass = createMemo(() => styles.rangeText({ class: local.class }));
  return <DatePickerPrimitive.RangeText class={rangeTextClass()} {...others} />;
};

export const DatePickerTable: Component<DatePickerPrimitive.TableProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const tableClass = createMemo(() => styles.table({ class: local.class }));
  return <DatePickerPrimitive.Table class={tableClass()} {...others} />;
};

export const DatePickerTableRow: Component<DatePickerPrimitive.TableRowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const tableRowClass = createMemo(() => styles.tableRow({ class: local.class }));
  return <DatePickerPrimitive.TableRow class={tableRowClass()} {...others} />;
};

export const DatePickerTableHeader: Component<DatePickerPrimitive.TableHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const tableHeaderClass = createMemo(() => styles.tableHeader({ class: local.class }));
  return <DatePickerPrimitive.TableHeader class={tableHeaderClass()} {...others} />;
};

export const DatePickerTableCell: Component<DatePickerPrimitive.TableCellProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const tableCellClass = createMemo(() => styles.tableCell({ class: local.class }));
  return <DatePickerPrimitive.TableCell class={tableCellClass()} {...others} />;
};

export const DatePickerTableCellTrigger: Component<DatePickerPrimitive.TableCellTriggerProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);
  const tableCellTriggerClass = createMemo(() =>
    styles.tableCellTrigger({ class: [buttonVariants({ variant: "ghost" }), local.class] }),
  );
  return <DatePickerPrimitive.TableCellTrigger class={tableCellTriggerClass()} {...others} />;
};

export { datePickerVariants };
