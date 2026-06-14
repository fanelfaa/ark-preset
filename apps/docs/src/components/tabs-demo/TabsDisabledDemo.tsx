import { Index } from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@fan-ui/solid";

const tabs = [
  { value: "active", label: "Active", content: "This tab is enabled and functional." },
  { value: "settings", label: "Settings", content: "Configure your preferences here." },
  {
    value: "disabled",
    label: "Disabled",
    content: "This content is not accessible.",
    disabled: true,
  },
];

export default function TabsDisabledDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Tabs defaultValue="active">
        <TabsList>
          <Index each={tabs}>
            {(tab) => (
              <TabsTrigger value={tab().value} disabled={tab().disabled}>
                {tab().label}
              </TabsTrigger>
            )}
          </Index>
        </TabsList>
        <Index each={tabs}>
          {(tab) => (
            <TabsContent value={tab().value}>
              <div class="text-sm text-foreground">{tab().content}</div>
            </TabsContent>
          )}
        </Index>
      </Tabs>
    </div>
  );
}
