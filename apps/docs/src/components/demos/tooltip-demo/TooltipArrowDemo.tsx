import { DemoWrapper } from "../../DemoWrapper";
import { Tooltip, TooltipTrigger, TooltipContent } from "@ark-preset/solid";

export default function TooltipArrowDemo() {
  return (
    <DemoWrapper>
      <div class="flex justify-center">
        <Tooltip>
          <TooltipTrigger>With Arrow</TooltipTrigger>
          <TooltipContent useArrow>Tooltip with arrow</TooltipContent>
        </Tooltip>
      </div>
    </DemoWrapper>
  );
}
