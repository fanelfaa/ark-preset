import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import { splitProps, type Component } from "solid-js";
import { tabsVariants } from "@fan-ui/core";

const styles = tabsVariants();

const Root: Component<ArkTabs.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkTabs.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const List: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.List class={styles.list({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkTabs.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Content: Component<ArkTabs.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Content class={styles.content({ class: local.class })} {...others} />;
};

const Indicator: Component<ArkTabs.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTabs.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const Tabs = {
  Root,
  RootProvider,
  List,
  Trigger,
  Content,
  Indicator,
};
