import { type ComboboxInputValueChangeDetails, useFilter, useListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Combobox,
  ComboboxLabel,
  ComboboxInputTrigger,
  ComboboxContent,
  ComboboxItem,
} from "@fan-ui/solid";

export default function ComboboxBasicDemo() {
  const filterFn = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: [
      { label: "React", value: "react" },
      { label: "Solid.js", value: "solid" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ],
    filter: filterFn().contains,
  });

  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    filter(details.inputValue);
  };

  return (
    <div class="rounded-lg border border-border p-6">
      <Combobox collection={collection()} onInputValueChange={handleInputChange}>
        <ComboboxLabel>Framework</ComboboxLabel>
        <ComboboxInputTrigger placeholder="Search frameworks..." />
        <ComboboxContent>
          <Index each={collection().items}>
            {(item) => <ComboboxItem item={item()}>{item().label}</ComboboxItem>}
          </Index>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
