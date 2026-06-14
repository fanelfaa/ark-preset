import { splitProps, type Component } from "solid-js";
import { Listbox as ListboxBase } from "./listbox.base";
import { Listbox as ArkListbox, type CollectionItem } from "@ark-ui/solid/listbox";
import type { ListboxVariants } from "@fan-ui/core";

const Listbox: Component<ArkListbox.RootProps<CollectionItem>> = (props) => {
  const [local, others] = splitProps(props, ["collection", "children"]);
  return (
    <ListboxBase.Root collection={local.collection} {...others}>
      <ListboxBase.Content>{local.children}</ListboxBase.Content>
    </ListboxBase.Root>
  );
};

const ListboxItem: Component<ArkListbox.ItemProps & ListboxVariants> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ListboxBase.Item {...others}>
      <ListboxBase.ItemText>{local.children}</ListboxBase.ItemText>
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
  );
};

const ListboxContent: Component<ArkListbox.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return <ListboxBase.Content {...others}>{local.children}</ListboxBase.Content>;
};

const ListboxEmpty: Component<ArkListbox.EmptyProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return <ListboxBase.Empty {...others}>{local.children}</ListboxBase.Empty>;
};

export { Listbox, ListboxItem, ListboxContent, ListboxEmpty, ListboxBase };

export { listboxVariants, type ListboxVariants } from "@fan-ui/core";
