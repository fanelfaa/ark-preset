import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>This is a basic tooltip</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
