import { splitProps, type Component } from "solid-js";
import { HoverCard as HoverCardBase } from "./hover-card.base";
import { HoverCard as ArkHoverCard } from "@ark-ui/solid/hover-card";

const HoverCard = HoverCardBase.Root;

const HoverCardTrigger = HoverCardBase.Trigger;

type HoverCardContentProps = ArkHoverCard.ContentProps & {
  /** When true, renders an arrow pointing to the trigger element */
  useArrow?: boolean;
};

const HoverCardContent: Component<HoverCardContentProps> = (props) => {
  const [local, others] = splitProps(props, ["useArrow", "children"]);
  return (
    <HoverCardBase.Positioner>
      <HoverCardBase.Content {...others}>
        {local.useArrow && (
          <HoverCardBase.Arrow>
            <HoverCardBase.ArrowTip />
          </HoverCardBase.Arrow>
        )}
        {local.children}
      </HoverCardBase.Content>
    </HoverCardBase.Positioner>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardBase };

export { hoverCardVariants, type HoverCardVariants } from "@ui/core";
