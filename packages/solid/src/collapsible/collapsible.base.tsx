import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";
import { splitProps, type Component } from "solid-js";
import { collapsibleVariants } from "@ui/core";

const styles = collapsibleVariants();

const Root: Component<ArkCollapsible.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkCollapsible.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Trigger: Component<ArkCollapsible.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Content: Component<ArkCollapsible.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Content class={styles.content({ class: local.class })} {...others} />;
};

const Indicator: Component<ArkCollapsible.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCollapsible.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const Collapsible = { Root, RootProvider, Trigger, Content, Indicator };
