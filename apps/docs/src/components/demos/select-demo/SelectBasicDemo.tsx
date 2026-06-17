import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem } from "@ark-preset/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function SelectBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Select collection={frameworks}>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger placeholder="Select a framework" />
        <SelectContent>
          <Index each={frameworks.items}>
            {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
          </Index>
        </SelectContent>
      </Select>
    </div>
  );
}
