import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipBasicDemo() {
  return (
    <div class="flex justify-center">
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>This is a basic tooltip</TooltipContent>
      </Tooltip>
    </div>
  );
}
