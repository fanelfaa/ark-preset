import { useFilter, useListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "@fan-ui/solid";

export default function SelectSearchableDemo() {
  const filterFn = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React", value: "react" },
      { label: "Solid.js", value: "solid" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
      { label: "Angular", value: "angular" },
      { label: "Ember", value: "ember" },
      { label: "Lit", value: "lit" },
      { label: "Preact", value: "preact" },
    ],
    filter: filterFn().contains,
  });

  return (
    <div class="rounded-lg border border-border p-6">
      <Select collection={collection()} searchable onSearch={(value) => filter(value)}>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger placeholder="Select a framework" />
        <SelectContent>
          <Index each={collection().items}>
            {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
          </Index>
        </SelectContent>
      </Select>
    </div>
  );
}
