import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipArrowDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <Tooltip>
          <TooltipTrigger>With Arrow</TooltipTrigger>
          <TooltipContent useArrow>Tooltip with arrow</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
