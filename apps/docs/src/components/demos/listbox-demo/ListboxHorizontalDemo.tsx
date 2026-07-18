import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import { Listbox, ListboxItem } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
  ],
});

export default function ListboxHorizontalDemo() {
  return (
    <DemoWrapper>
      <p class="text-sm text-muted-foreground mb-2">Horizontal orientation</p>
      <Listbox collection={frameworks} orientation="horizontal">
        <Index each={frameworks.items}>
          {(item) => <ListboxItem item={item()}>{item().label}</ListboxItem>}
        </Index>
      </Listbox>
    </DemoWrapper>
  );
}
