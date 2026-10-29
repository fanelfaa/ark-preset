import { Show, splitProps, type Component } from "solid-js";
import { ScrollArea as ScrollAreaBase } from "./scroll-area.base";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";

type ScrollAreaProps = ArkScrollArea.RootProps & {
  orientation?: "vertical" | "horizontal" | "both";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children", "class"]);
  const orientation = () => local.orientation ?? "vertical";

  return (
    <ScrollAreaBase.Root class={local.class} {...others}>
      <ScrollAreaBase.Viewport>
        <ScrollAreaBase.Content>{local.children}</ScrollAreaBase.Content>
      </ScrollAreaBase.Viewport>
      <Show when={orientation() === "vertical" || orientation() === "both"}>
        <ScrollAreaBase.Scrollbar orientation="vertical">
          <ScrollAreaBase.Thumb />
        </ScrollAreaBase.Scrollbar>
      </Show>
      <Show when={orientation() === "horizontal" || orientation() === "both"}>
        <ScrollAreaBase.Scrollbar orientation="horizontal">
          <ScrollAreaBase.Thumb />
        </ScrollAreaBase.Scrollbar>
      </Show>
      <ScrollAreaBase.Corner />
    </ScrollAreaBase.Root>
  );
};

export { ScrollArea, ScrollAreaBase, type ScrollAreaProps };

export { scrollAreaVariants, type ScrollAreaVariants } from "@ark-preset/core";
