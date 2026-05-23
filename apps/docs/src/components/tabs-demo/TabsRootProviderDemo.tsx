import { useTabs } from "@ark-ui/solid/tabs";
import { TabsList, TabsTrigger, TabsContent, TabsIndicator, TabsRootProvider } from "@ui/solid";

export default function TabsRootProviderDemo() {
  const tabs = useTabs({ defaultValue: "overview" });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(tabs().value)}
      </output>

      <TabsRootProvider value={tabs}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="overview">
          <div class="text-sm text-foreground">
            Tabs organize content into separate views where only one view is visible at a time.
          </div>
        </TabsContent>
        <TabsContent value="usage">
          <div class="text-sm text-foreground">
            Use Tabs to switch between different sections of content without navigating away.
          </div>
        </TabsContent>
      </TabsRootProvider>
    </div>
  );
}
