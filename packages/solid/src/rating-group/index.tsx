import { Index, splitProps, type Component } from "solid-js";
import { RatingGroup as RatingGroupBase } from "./rating-group.base";
import { RatingGroup as ArkRatingGroup } from "@ark-ui/solid/rating-group";
import { ratingGroupVariants, type RatingGroupVariants } from "@ui/core";

const styles = ratingGroupVariants();

const RatingGroupItem: Component<ArkRatingGroup.ItemProps & RatingGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["index", "class", "size"]);
  return (
    <RatingGroupBase.Item
      index={local.index}
      class={styles.item({ class: local.class, size: local.size })}
      {...others}
    >
      <RatingGroupBase.ItemContext>
        {(context) => (
          <span class={styles.itemIndicator()}>
            {/* Background unfilled star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-full"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {/* Foreground filled star (hidden when not highlighted, clip-path for half) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="absolute inset-0 size-full opacity-0 group-data-[highlighted]:opacity-100 group-data-[half]:[clip-path:inset(0_50%_0_0)]"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        )}
      </RatingGroupBase.ItemContext>
    </RatingGroupBase.Item>
  );
};

const RatingGroup: Component<ArkRatingGroup.RootProps & RatingGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["size", "orientation", "children"]);
  return (
    <RatingGroupBase.Root size={local.size} orientation={local.orientation} {...others}>
      {local.children}
      <RatingGroupBase.Context>
        {(context) => (
          <RatingGroupBase.Control>
            <Index each={context().items}>
              {(item) => <RatingGroupItem index={item()} />}
            </Index>
            <RatingGroupBase.HiddenInput />
          </RatingGroupBase.Control>
        )}
      </RatingGroupBase.Context>
    </RatingGroupBase.Root>
  );
};

const RatingGroupLabel: Component<ArkRatingGroup.LabelProps> = (props) => {
  return <RatingGroupBase.Label {...props} />;
};

const RatingGroupControl: Component<ArkRatingGroup.ControlProps> = (props) => {
  return <RatingGroupBase.Control {...props} />;
};

const RatingGroupContext: Component<ArkRatingGroup.ContextProps> = (props) => {
  return <RatingGroupBase.Context {...props} />;
};

const RatingGroupHiddenInput: Component<ArkRatingGroup.HiddenInputProps> = (props) => {
  return <RatingGroupBase.HiddenInput {...props} />;
};

export {
  RatingGroup,
  RatingGroupItem,
  RatingGroupLabel,
  RatingGroupControl,
  RatingGroupContext,
  RatingGroupHiddenInput,
  RatingGroupBase,
};

export { ratingGroupVariants, type RatingGroupVariants } from "@ui/core";
