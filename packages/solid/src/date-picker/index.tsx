import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import { children, Show, splitProps, type Component } from "solid-js";
import { buttonVariants } from "@ui/core";

import { datePickerVariants } from "@ui/core";

import { DatePickerRoot } from "./date-picker.base";

const styles = datePickerVariants();

export const DatePicker = DatePickerRoot;

export const DatePickerTrigger: Component<ArkDatePicker.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  return (
    <ArkDatePicker.Trigger class={styles.trigger({ class: local.class })} {...others}>
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
    </ArkDatePicker.Trigger>
  );
};

export const DatePickerClearTrigger: Component<ArkDatePicker.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkDatePicker.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />;
};

export const DatePickerPrevTrigger: Component<ArkDatePicker.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  return (
    <ArkDatePicker.PrevTrigger
      class={styles.navTrigger({ class: [buttonVariants({ variant: "outline" }), local.class, "size-7"] })}
      {...others}
    >
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
    </ArkDatePicker.PrevTrigger>
  );
};

export const DatePickerNextTrigger: Component<ArkDatePicker.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const resolvedChildren = children(() => local.children);
  const hasChildren = () => resolvedChildren.toArray().length !== 0;

  return (
    <ArkDatePicker.NextTrigger
      class={styles.navTrigger({ class: [buttonVariants({ variant: "outline" }), local.class, "size-7"] })}
      {...others}
    >
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
    </ArkDatePicker.NextTrigger>
  );
};

export const DatePickerViewTrigger: Component<ArkDatePicker.ViewTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.ViewTrigger
      class={styles.viewTrigger({ class: [buttonVariants({ variant: "ghost" }), local.class] })}
      {...others}
    />
  );
};

export const DatePickerTableCellTrigger: Component<ArkDatePicker.TableCellTriggerProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkDatePicker.TableCellTrigger
      class={styles.tableCellTrigger({ class: [buttonVariants({ variant: "ghost" }), local.class] })}
      {...others}
    />
  );
};

export * from "./date-picker.base";

export { datePickerVariants, type DatePickerVariants } from "@ui/core";
