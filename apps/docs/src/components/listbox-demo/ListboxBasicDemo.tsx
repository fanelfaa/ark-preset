import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Listbox, ListboxItem } from "@fan-ui/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function ListboxBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Basic listbox</p>
        <Listbox collection={frameworks}>
          <Index each={frameworks.items}>
            {(item) => <ListboxItem item={item()}>{item().label}</ListboxItem>}
          </Index>
        </Listbox>
      </div>
    </div>
  );
}
