import { splitProps, type Component } from "solid-js";
import { tableVariants } from "@ark-preset/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = tableVariants();

type TableProps = HTMLArkProps<"table">;
type TableHeaderProps = HTMLArkProps<"thead">;
type TableBodyProps = HTMLArkProps<"tbody">;
type TableRowProps = HTMLArkProps<"tr">;
type TableHeadProps = HTMLArkProps<"th">;
type TableCellProps = HTMLArkProps<"td">;
type TableCaptionProps = HTMLArkProps<"caption">;

const Table: Component<TableProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.table class={styles.table({ class: local.class })} {...others} />;
};

const TableHeader: Component<TableHeaderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.thead class={styles.header({ class: local.class })} {...others} />;
};

const TableBody: Component<TableBodyProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.tbody class={styles.body({ class: local.class })} {...others} />;
};

const TableRow: Component<TableRowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.tr class={styles.row({ class: local.class })} {...others} />;
};

const TableHead: Component<TableHeadProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.th class={styles.head({ class: local.class })} {...others} />;
};

const TableCell: Component<TableCellProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.td class={styles.cell({ class: local.class })} {...others} />;
};

const TableCaption: Component<TableCaptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.caption class={styles.caption({ class: local.class })} {...others} />;
};

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
};
