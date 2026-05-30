import { Tooltip, TooltipBase } from "@ui/solid";

export default function TooltipManualArrowDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <div class="flex justify-center">
        <Tooltip>
          <TooltipBase.Trigger>Manual Arrow</TooltipBase.Trigger>
          <TooltipBase.Positioner>
            <TooltipBase.Content>
              <TooltipBase.Arrow class="[--arrow-size:14px]">
                <TooltipBase.ArrowTip />
              </TooltipBase.Arrow>
              Custom arrow size
            </TooltipBase.Content>
          </TooltipBase.Positioner>
        </Tooltip>
      </div>
    </div>
  );
}
