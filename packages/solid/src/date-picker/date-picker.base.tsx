import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import { splitProps, type Component } from "solid-js";
import { datePickerVariants } from "@ark-preset/core";

const styles = datePickerVariants();

const Root: Component<ArkDatePicker.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Root class={styles.root({ class: local.class })} {...others} />;
};
const RootProvider = ArkDatePicker.RootProvider;
const Label: Component<ArkDatePicker.LabelProps & { error?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkDatePicker.Label
      class={styles.label({ class: local.class, error: local.error })}
      {...others}
    />
  );
};
const Context = ArkDatePicker.Context;
const TableHead = ArkDatePicker.TableHead;
const TableBody = ArkDatePicker.TableBody;
const YearSelect = ArkDatePicker.YearSelect;
const MonthSelect = ArkDatePicker.MonthSelect;

// Pass-through positioned portal container
const Positioner = ArkDatePicker.Positioner;

// Styled wrapper components (tv() recipe styling)
const Control: Component<ArkDatePicker.ControlProps & { error?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkDatePicker.Control
      class={styles.control({ class: local.class, error: local.error })}
      {...others}
    />
  );
};

const Input: Component<ArkDatePicker.InputProps & { error?: boolean }> = (props) => {
  const [local, others] = splitProps(props, ["class", "error"]);
  return (
    <ArkDatePicker.Input
      class={styles.input({ class: local.class, error: local.error })}
      {...others}
    />
  );
};

const Content: Component<ArkDatePicker.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Content class={styles.content({ class: local.class })} {...others} />;
};

const View: Component<ArkDatePicker.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.View class={styles.view({ class: local.class })} {...others} />;
};

const ViewControl: Component<ArkDatePicker.ViewControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.ViewControl class={styles.viewControl({ class: local.class })} {...others} />
  );
};

const RangeText: Component<ArkDatePicker.RangeTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.RangeText class={styles.rangeText({ class: local.class })} {...others} />;
};

const Table: Component<ArkDatePicker.TableProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Table class={styles.table({ class: local.class })} {...others} />;
};

const TableRow: Component<ArkDatePicker.TableRowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.TableRow class={styles.tableRow({ class: local.class })} {...others} />;
};

const TableHeader: Component<ArkDatePicker.TableHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.TableHeader class={styles.tableHeader({ class: local.class })} {...others} />
  );
};

const TableCell: Component<ArkDatePicker.TableCellProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.TableCell class={styles.tableCell({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkDatePicker.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const ClearTrigger: Component<ArkDatePicker.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />
  );
};

const PrevTrigger: Component<ArkDatePicker.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.PrevTrigger class={styles.navTrigger({ class: local.class })} {...others} />
  );
};

const NextTrigger: Component<ArkDatePicker.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.NextTrigger class={styles.navTrigger({ class: local.class })} {...others} />
  );
};

const ViewTrigger: Component<ArkDatePicker.ViewTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.ViewTrigger class={styles.viewTrigger({ class: local.class })} {...others} />
  );
};

const TableCellTrigger: Component<ArkDatePicker.TableCellTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.TableCellTrigger
      class={styles.tableCellTrigger({ class: local.class })}
      {...others}
    />
  );
};

export const DatePickerBase = {
  Root,
  RootProvider,
  Label,
  Context,
  TableHead,
  TableBody,
  YearSelect,
  MonthSelect,
  Positioner,
  Control,
  Input,
  Content,
  View,
  ViewControl,
  RangeText,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Trigger,
  ClearTrigger,
  PrevTrigger,
  NextTrigger,
  ViewTrigger,
  TableCellTrigger,
};
