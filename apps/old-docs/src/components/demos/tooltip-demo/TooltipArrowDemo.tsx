import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipArrowDemo() {
  return (
    <div class="flex justify-center">
      <Tooltip>
        <TooltipTrigger>With Arrow</TooltipTrigger>
        <TooltipContent useArrow>Tooltip with arrow</TooltipContent>
      </Tooltip>
    </div>
  );
}
