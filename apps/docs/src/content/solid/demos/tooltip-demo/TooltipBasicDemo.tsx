import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipBasicDemo() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Tooltip content</TooltipContent>
    </Tooltip>
  );
}
