import { Index, createMemo } from "solid-js";
import { TabsBase, TabsList, TabsTrigger, TabsContent } from "@fan-ui/solid";
import { useTabs } from "@ark-ui/solid/tabs";

const tabData = [
  {
    value: "overview",
    label: "Overview",
    content: "Tabs organize content into separate views where only one view is visible at a time.",
  },
  {
    value: "usage",
    label: "Usage",
    content: "Use Tabs to switch between different sections of content without navigating away.",
  },
];

export default function TabsRootProviderDemo() {
  const tabs = useTabs({ defaultValue: "overview" });
  const value = createMemo(() => tabs().value);

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">Value: {JSON.stringify(value())}</output>
      <TabsBase.RootProvider value={tabs}>
        <TabsList>
          <Index each={tabData}>
            {(tab) => <TabsTrigger value={tab().value}>{tab().label}</TabsTrigger>}
          </Index>
        </TabsList>
        <Index each={tabData}>
          {(tab) => <TabsContent value={tab().value}>{tab().content}</TabsContent>}
        </Index>
      </TabsBase.RootProvider>
    </div>
  );
}
