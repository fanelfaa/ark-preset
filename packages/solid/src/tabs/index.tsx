import { splitProps, type Component } from "solid-js";
import { Tabs as TabsBase } from "./tabs.base";
import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";

const Tabs = TabsBase.Root;

const TabsList: Component<ArkTabs.ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <TabsBase.List class={local.class} {...others}>
      <TabsBase.Indicator />
      {local.children}
    </TabsBase.List>
  );
};

const TabsTrigger = TabsBase.Trigger;
const TabsContent = TabsBase.Content;

export { Tabs, TabsContent, TabsTrigger, TabsBase, TabsList };

export { tabsVariants, type TabsVariants } from "@fan-ui/core";
