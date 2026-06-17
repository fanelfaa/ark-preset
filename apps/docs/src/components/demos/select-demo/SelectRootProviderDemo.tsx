import { useSelect, createListCollection } from "@ark-ui/solid/select";
import { Index } from "solid-js";
import {
  SelectRootProvider,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@ark-preset/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function SelectRootProviderDemo() {
  const select = useSelect({ collection: frameworks, defaultValue: ["solid"] });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Value: {JSON.stringify(select().value)}
      </output>

      <SelectRootProvider value={select}>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger placeholder="Select a framework" />
        <SelectContent>
          <Index each={frameworks.items}>
            {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
          </Index>
        </SelectContent>
      </SelectRootProvider>
    </div>
  );
}
