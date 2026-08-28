import { createListCollection } from "@ark-ui/solid";
import { useListbox } from "@ark-ui/solid/listbox";
import { Index } from "solid-js";
import { ListboxBase } from "@ark-preset/solid";

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
  ],
});

export default function ListboxRootProviderDemo() {
  const listbox = useListbox({ collection: frameworks });

  return (
    <ListboxBase.RootProvider value={listbox}>
      <ListboxBase.Content>
        <Index each={frameworks.items}>
          {(item) => (
            <ListboxBase.Item item={item()}>
              <ListboxBase.ItemText>{item().label}</ListboxBase.ItemText>
              <ListboxBase.ItemIndicator>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </ListboxBase.ItemIndicator>
            </ListboxBase.Item>
          )}
        </Index>
      </ListboxBase.Content>
    </ListboxBase.RootProvider>
  );
}
