import { splitProps, type Component } from "solid-js";
import { Tooltip as TooltipBase } from "./tooltip.base";
import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";

const Tooltip = TooltipBase.Root;

const TooltipTrigger = TooltipBase.Trigger;

type TooltipContentProps = ArkTooltip.ContentProps & {
  /** When true, renders an arrow pointing to the trigger element */
  useArrow?: boolean;
};

const TooltipContent: Component<TooltipContentProps> = (props) => {
  const [local, others] = splitProps(props, ["useArrow", "children"]);
  return (
    <TooltipBase.Positioner>
      <TooltipBase.Content {...others}>
        {local.useArrow && (
          <TooltipBase.Arrow>
            <TooltipBase.ArrowTip />
          </TooltipBase.Arrow>
        )}
        {local.children}
      </TooltipBase.Content>
    </TooltipBase.Positioner>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipBase };

export { tooltipVariants, type TooltipVariants } from "@fan-ui/core";
