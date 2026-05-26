import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import { splitProps, type Component } from "solid-js";
import { tabsVariants } from "@ui/core";

const styles = tabsVariants();

export const TabsRoot: Component<ArkTabs.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Root class={styles.root({ class: local.class })} {...others} />;
};

export const TabsRootProvider: Component<ArkTabs.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const TabsList: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.List class={styles.list({ class: local.class })} {...others} />;
};

export const TabsTrigger: Component<ArkTabs.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

export const TabsContent: Component<ArkTabs.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Content class={styles.content({ class: local.class })} {...others} />;
};

export const TabsIndicator: Component<ArkTabs.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};
