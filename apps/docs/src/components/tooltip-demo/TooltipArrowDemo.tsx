import {
  Tooltip,
  TooltipTrigger,
  TooltipPositioner,
  TooltipContent,
  TooltipArrow,
  TooltipArrowTip,
} from "@ui/solid";

export default function TooltipArrowDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <Tooltip>
          <TooltipTrigger>With Arrow</TooltipTrigger>
          <TooltipPositioner>
            <TooltipContent>
              <TooltipArrow>
                <TooltipArrowTip />
              </TooltipArrow>
              Tooltip with arrow
            </TooltipContent>
          </TooltipPositioner>
        </Tooltip>
      </div>
    </div>
  );
}
