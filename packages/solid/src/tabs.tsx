import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import { createMemo, splitProps, type Component } from "solid-js";
import { tabsVariants } from "@ui/core";

// Global variant instance (no params)
const styles = tabsVariants();

const TabsRoot: Component<ArkTabs.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkTabs.Root class={rootClass()} {...others} />;
};

const TabsList: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const listClass = createMemo(() => styles.list({ class: local.class }));
  return <ArkTabs.List class={listClass()} {...others} />;
};

const TabsTrigger: Component<ArkTabs.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const triggerClass = createMemo(() => styles.trigger({ class: local.class }));
  return <ArkTabs.Trigger class={triggerClass()} {...others} />;
};

const TabsContent: Component<ArkTabs.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const contentClass = createMemo(() => styles.content({ class: local.class }));
  return <ArkTabs.Content class={contentClass()} {...others} />;
};

const TabsIndicator: Component<ArkTabs.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const indicatorClass = createMemo(() => styles.indicator({ class: local.class }));
  return <ArkTabs.Indicator class={indicatorClass()} {...others} />;
};

const TabsRootProvider: Component<ArkTabs.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const rootClass = createMemo(() => styles.root({ class: local.class }));
  return <ArkTabs.RootProvider class={rootClass()} {...others} />;
};

export { TabsRoot as Tabs, TabsRootProvider, TabsList, TabsTrigger, TabsContent, TabsIndicator, tabsVariants };
