import { createListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  SelectBase,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@ark-preset/solid";

const items = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid.js", value: "solid" },
  ],
});

export default function SelectErrorDemo() {
  return (
    <div>
      <SelectBase.Root collection={items} error>
        <SelectLabel>Framework</SelectLabel>
        <SelectTrigger placeholder="Select..." />
        <SelectContent>
          <Index each={items.items}>
            {(item) => <SelectItem item={item()}>{item().label}</SelectItem>}
          </Index>
        </SelectContent>
      </SelectBase.Root>
    </div>
  );
}
