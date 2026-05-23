import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";
import { createMemo, splitProps, type Component } from "solid-js";
import { collapsibleVariants } from "@ui/core";

const styles = collapsibleVariants();

const CollapsibleRoot: Component<ArkCollapsible.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkCollapsible.Root class={rootClass()} {...others} />;
};

const CollapsibleRootProvider: Component<ArkCollapsible.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkCollapsible.RootProvider class={rootClass()} {...others} />;
};

const CollapsibleTrigger: Component<ArkCollapsible.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const triggerClass = createMemo(() => styles.trigger({ class: local.class }));
  return <ArkCollapsible.Trigger class={triggerClass()} {...others} />;
};

const CollapsibleContent: Component<ArkCollapsible.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return <ArkCollapsible.Content class={contentClass()} {...others} />;
};

const CollapsibleIndicator: Component<ArkCollapsible.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const indicatorClass = createMemo(() => styles.indicator({ class: local.class }));
  return <ArkCollapsible.Indicator class={indicatorClass()} {...others} />;
};

export {
  CollapsibleRoot as Collapsible,
  CollapsibleRootProvider,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleIndicator,
  collapsibleVariants,
};
