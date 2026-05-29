import { splitProps, type Component } from "solid-js";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from "./scroll-area.base";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";

type ScrollAreaProps = ArkScrollArea.RootProps & {
  orientation?: "vertical" | "horizontal";
};

const ScrollArea: Component<ScrollAreaProps> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children"]);
  return (
    <ScrollAreaRoot {...others}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          {local.children}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation={local.orientation ?? "vertical"}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
};

export { ScrollArea };

export * from "./scroll-area.base";

export { scrollAreaVariants, type ScrollAreaVariants } from "@ui/core";
