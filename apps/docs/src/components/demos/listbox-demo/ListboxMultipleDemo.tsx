import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Listbox, ListboxItem } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function ListboxMultipleDemo() {
  return (
    <DemoWrapper>
      <p class="text-sm text-muted-foreground mb-2">Multiple selection</p>
      <Listbox collection={frameworks} selectionMode="multiple">
        <Index each={frameworks.items}>
          {(item) => <ListboxItem item={item()}>{item().label}</ListboxItem>}
        </Index>
      </Listbox>
    </DemoWrapper>
  );
}
