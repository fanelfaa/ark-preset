import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Listbox, ListboxItem } from "@ark-preset/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
  ],
});

export default function ListboxBasicDemo() {
  return (
    <Listbox collection={frameworks}>
      <Index each={frameworks.items}>
        {(item) => <ListboxItem item={item()}>{item().label}</ListboxItem>}
      </Index>
    </Listbox>
  );
}
