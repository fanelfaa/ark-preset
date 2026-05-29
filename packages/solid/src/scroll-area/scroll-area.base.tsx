import { scrollAreaVariants } from "@ui/core";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { splitProps, type Component } from "solid-js";

const styles = scrollAreaVariants();

export const ScrollAreaRoot: Component<ArkScrollArea.RootProps> = (props) => {
  return <ArkScrollArea.Root {...props} />;
};

export const ScrollAreaViewport: Component<ArkScrollArea.ViewportProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Viewport class={styles.viewport({ class: local.class })} {...others} />;
};

export const ScrollAreaContent: Component<ArkScrollArea.ContentProps> = (props) => {
  return <ArkScrollArea.Content {...props} />;
};

export interface ScrollAreaScrollbarProps extends ArkScrollArea.ScrollbarProps {
  orientation?: "vertical" | "horizontal";
}

export const ScrollAreaScrollbar: Component<ScrollAreaScrollbarProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <ArkScrollArea.Scrollbar
      class={styles.scrollbar({ class: local.class, orientation: local.orientation })}
      orientation={local.orientation}
      {...others}
    />
  );
};

export const ScrollAreaThumb: Component<ArkScrollArea.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Thumb class={styles.thumb({ class: local.class })} {...others} />;
};

export const ScrollAreaCorner: Component<ArkScrollArea.CornerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkScrollArea.Corner class={styles.corner({ class: local.class })} {...others} />;
};

// Re-export types
export type { ScrollAreaRootProps } from "@ark-ui/solid/scroll-area";
