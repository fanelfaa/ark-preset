import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { segmentGroupVariants, type SegmentGroupVariants } from "@fan-ui/core";

type SegmentGroupVariantContextValue = Pick<SegmentGroupVariants, "variant" | "orientation">;

const SegmentGroupVariantContext = createContext<SegmentGroupVariantContextValue>();

const useSegmentGroupVariant = () => useContext(SegmentGroupVariantContext);

const styles = segmentGroupVariants();

const Root: Component<ArkSegmentGroup.RootProps & SegmentGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <SegmentGroupVariantContext.Provider
      value={{ variant: local.variant, orientation: local.orientation }}
    >
      <ArkSegmentGroup.Root
        class={styles.root({
          class: local.class,
          variant: local.variant,
          orientation: local.orientation,
        })}
        orientation={local.orientation}
        {...others}
      />
    </SegmentGroupVariantContext.Provider>
  );
};

const RootProvider: Component<ArkSegmentGroup.RootProviderProps & SegmentGroupVariants> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <SegmentGroupVariantContext.Provider
      value={{ variant: local.variant, orientation: local.orientation }}
    >
      <ArkSegmentGroup.RootProvider
        class={styles.root({
          class: local.class,
          variant: local.variant,
          orientation: local.orientation,
        })}
        {...others}
      />
    </SegmentGroupVariantContext.Provider>
  );
};

const Label: Component<ArkSegmentGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSegmentGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

const Item: Component<ArkSegmentGroup.ItemProps & SegmentGroupVariants> = (props) => {
  const ctx = useSegmentGroupVariant();
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <ArkSegmentGroup.Item
      class={styles.item({
        class: local.class,
        variant: local.variant ?? ctx?.variant,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const ItemText: Component<ArkSegmentGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSegmentGroup.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemControl: Component<ArkSegmentGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSegmentGroup.ItemControl class={styles.itemControl({ class: local.class })} {...others} />
  );
};

const ItemHiddenInput = ArkSegmentGroup.ItemHiddenInput;

const Indicator: Component<ArkSegmentGroup.IndicatorProps & SegmentGroupVariants> = (props) => {
  const ctx = useSegmentGroupVariant();
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <ArkSegmentGroup.Indicator
      class={styles.indicator({
        class: local.class,
        variant: local.variant ?? ctx?.variant,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

export const SegmentGroup = {
  Root,
  RootProvider,
  Label,
  Item,
  ItemText,
  ItemControl,
  ItemHiddenInput,
  Indicator,
};

export { SegmentGroupVariantContext, useSegmentGroupVariant };
