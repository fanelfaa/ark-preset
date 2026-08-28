import { type ComboboxInputValueChangeDetails, useFilter, useListCollection } from "@ark-ui/solid";
import { Index } from "solid-js";
import {
  Combobox,
  ComboboxLabel,
  ComboboxInputTrigger,
  ComboboxContent,
  ComboboxItem,
} from "@ark-preset/solid";

export default function ComboboxErrorDemo() {
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
    <div>
      <Combobox collection={collection()} onInputValueChange={handleInputChange} error>
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
