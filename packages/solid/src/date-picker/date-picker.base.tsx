import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import { splitProps, type Component } from "solid-js";
import { datePickerVariants } from "@ui/core";

const styles = datePickerVariants();

// Simple pass-through re-exports (no styling needed)
export const DatePickerRoot = ArkDatePicker.Root;
export const DatePickerRootProvider = ArkDatePicker.RootProvider;
export const DatePickerLabel = ArkDatePicker.Label;
export const DatePickerContext = ArkDatePicker.Context;
export const DatePickerTableHead = ArkDatePicker.TableHead;
export const DatePickerTableBody = ArkDatePicker.TableBody;
export const DatePickerYearSelect = ArkDatePicker.YearSelect;
export const DatePickerMonthSelect = ArkDatePicker.MonthSelect;

// Styled wrapper components
export const DatePickerPositioner = ArkDatePicker.Positioner;

export const DatePickerControl: Component<ArkDatePicker.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Control class={styles.control({ class: local.class })} {...others} />;
};

export const DatePickerInput: Component<ArkDatePicker.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Input class={styles.input({ class: local.class })} {...others} />;
};

export const DatePickerContent: Component<ArkDatePicker.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Content class={styles.content({ class: local.class })} {...others} />;
};

export const DatePickerView: Component<ArkDatePicker.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.View class={styles.view({ class: local.class })} {...others} />;
};

export const DatePickerViewControl: Component<ArkDatePicker.ViewControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.ViewControl class={styles.viewControl({ class: local.class })} {...others} />;
};

export const DatePickerRangeText: Component<ArkDatePicker.RangeTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.RangeText class={styles.rangeText({ class: local.class })} {...others} />;
};

export const DatePickerTable: Component<ArkDatePicker.TableProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.Table class={styles.table({ class: local.class })} {...others} />;
};

export const DatePickerTableRow: Component<ArkDatePicker.TableRowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.TableRow class={styles.tableRow({ class: local.class })} {...others} />;
};

export const DatePickerTableHeader: Component<ArkDatePicker.TableHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.TableHeader class={styles.tableHeader({ class: local.class })} {...others} />;
};

export const DatePickerTableCell: Component<ArkDatePicker.TableCellProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.TableCell class={styles.tableCell({ class: local.class })} {...others} />;
};
