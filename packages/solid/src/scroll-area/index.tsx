import { splitProps, type Component } from "solid-js";
import { ScrollArea as ScrollAreaBase } from "./scroll-area.base";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";

type ScrollAreaProps = ArkScrollArea.RootProps & {
  orientation?: "vertical" | "horizontal";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children"]);
  return (
    <ScrollAreaBase.Root {...others}>
      <ScrollAreaBase.Viewport>
        <ScrollAreaBase.Content>{local.children}</ScrollAreaBase.Content>
      </ScrollAreaBase.Viewport>
      <ScrollAreaBase.Scrollbar orientation={local.orientation ?? "vertical"}>
        <ScrollAreaBase.Thumb />
      </ScrollAreaBase.Scrollbar>
      <ScrollAreaBase.Corner />
    </ScrollAreaBase.Root>
  );
};

export { ScrollArea, ScrollAreaBase };

export { scrollAreaVariants, type ScrollAreaVariants } from "@fan-ui/core";
