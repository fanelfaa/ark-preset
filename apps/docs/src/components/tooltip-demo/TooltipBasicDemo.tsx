import { Tooltip, TooltipTrigger, TooltipPositioner, TooltipContent } from "@ui/solid";

export default function TooltipBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipPositioner>
            <TooltipContent>This is a basic tooltip</TooltipContent>
          </TooltipPositioner>
        </Tooltip>
      </div>
    </div>
  );
}
