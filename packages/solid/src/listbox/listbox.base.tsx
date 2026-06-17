import { Listbox as ArkListbox, type CollectionItem } from "@ark-ui/solid/listbox";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { listboxVariants, type ListboxVariants } from "@ark-preset/core";

type ListboxVariantContextValue = Pick<ListboxVariants, "orientation">;

const ListboxVariantContext = createContext<ListboxVariantContextValue>();

const useListboxVariant = () => useContext(ListboxVariantContext);

const styles = listboxVariants();

const Root = <T extends CollectionItem>(props: ArkListbox.RootProps<T> & ListboxVariants) => {
  const [local, others] = splitProps(props, ["class", "orientation"] as const);
  return (
    <ListboxVariantContext.Provider value={{ orientation: local.orientation }}>
      <ArkListbox.Root
        class={styles.root({
          class: local.class,
          orientation: local.orientation,
        })}
        orientation={local.orientation}
        {...others}
      />
    </ListboxVariantContext.Provider>
  );
};

const RootProvider = <T extends CollectionItem>(
  props: ArkListbox.RootProviderProps<T> & ListboxVariants,
) => {
  const [local, others] = splitProps(props, ["class", "orientation"] as const);
  return (
    <ListboxVariantContext.Provider value={{ orientation: local.orientation }}>
      <ArkListbox.RootProvider
        class={styles.root({
          class: local.class,
          orientation: local.orientation,
        })}
        {...others}
      />
    </ListboxVariantContext.Provider>
  );
};

const Content: Component<ArkListbox.ContentProps & ListboxVariants> = (props) => {
  const ctx = useListboxVariant();
  const [local, others] = splitProps(props, ["class", "orientation"] as const);
  return (
    <ArkListbox.Content
      class={styles.content({
        class: local.class,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const Item: Component<ArkListbox.ItemProps & ListboxVariants> = (props) => {
  const ctx = useListboxVariant();
  const [local, others] = splitProps(props, ["class", "orientation"] as const);
  return (
    <ArkListbox.Item
      class={styles.item({
        class: local.class,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const ItemText: Component<ArkListbox.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkListbox.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkListbox.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkListbox.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

// Parts without tv() — direct spread, no splitProps
const Empty: Component<ArkListbox.EmptyProps> = (props) => <ArkListbox.Empty {...props} />;
const ItemGroup: Component<ArkListbox.ItemGroupProps> = (props) => (
  <ArkListbox.ItemGroup {...props} />
);
const ItemGroupLabel: Component<ArkListbox.ItemGroupLabelProps> = (props) => (
  <ArkListbox.ItemGroupLabel {...props} />
);
const ValueText: Component<ArkListbox.ValueTextProps> = (props) => (
  <ArkListbox.ValueText {...props} />
);
const Input: Component<ArkListbox.InputProps> = (props) => <ArkListbox.Input {...props} />;

export const Listbox = {
  Root,
  RootProvider,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  Empty,
  ItemGroup,
  ItemGroupLabel,
  ValueText,
  Input,
};

export { ListboxVariantContext, useListboxVariant };
