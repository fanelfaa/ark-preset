import { RatingGroup as ArkRatingGroup } from "@ark-ui/solid/rating-group";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { ratingGroupVariants, type RatingGroupVariants } from "@ark-preset/core";

type RatingGroupVariantContextValue = Pick<RatingGroupVariants, "size" | "orientation">;

const RatingGroupVariantContext = createContext<RatingGroupVariantContextValue>();

const useRatingGroupVariant = () => useContext(RatingGroupVariantContext);

const styles = ratingGroupVariants();

const Root: Component<ArkRatingGroup.RootProps & RatingGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size", "orientation"]);
  return (
    <RatingGroupVariantContext.Provider
      value={{ size: local.size, orientation: local.orientation }}
    >
      <ArkRatingGroup.Root
        class={styles.root({
          class: local.class,
          size: local.size,
          orientation: local.orientation,
        })}
        {...others}
      />
    </RatingGroupVariantContext.Provider>
  );
};

const RootProvider: Component<ArkRatingGroup.RootProviderProps & RatingGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size", "orientation"]);
  return (
    <RatingGroupVariantContext.Provider
      value={{ size: local.size, orientation: local.orientation }}
    >
      <ArkRatingGroup.RootProvider
        class={styles.root({
          class: local.class,
          size: local.size,
          orientation: local.orientation,
        })}
        {...others}
      />
    </RatingGroupVariantContext.Provider>
  );
};

const Label: Component<ArkRatingGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRatingGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

const Control: Component<ArkRatingGroup.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRatingGroup.Control class={styles.control({ class: local.class })} {...others} />;
};

const Item: Component<ArkRatingGroup.ItemProps & RatingGroupVariants> = (props) => {
  const ctx = useRatingGroupVariant();
  const [local, others] = splitProps(props, ["class", "size", "orientation"]);
  return (
    <ArkRatingGroup.Item
      class={styles.item({
        class: local.class,
        size: local.size ?? ctx?.size,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const ItemContext = ArkRatingGroup.ItemContext;

const Context = ArkRatingGroup.Context;

const HiddenInput = ArkRatingGroup.HiddenInput;

export const RatingGroup = {
  Root,
  RootProvider,
  Label,
  Control,
  Item,
  ItemContext,
  Context,
  HiddenInput,
};

export { RatingGroupVariantContext, useRatingGroupVariant };
