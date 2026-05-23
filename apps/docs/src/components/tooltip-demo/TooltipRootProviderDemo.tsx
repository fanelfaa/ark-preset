import { useTooltip } from "@ark-ui/solid/tooltip";
import {
  TooltipRootProvider,
  TooltipTrigger,
  TooltipPositioner,
  TooltipContent,
  TooltipArrow,
  TooltipArrowTip,
} from "@ui/solid";

export default function TooltipRootProviderDemo() {
  const tooltip = useTooltip({ defaultOpen: true });

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(tooltip().open)}
      </output>

      <div class="flex justify-center">
        <TooltipRootProvider value={tooltip}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipPositioner>
            <TooltipContent>
              <TooltipArrow>
                <TooltipArrowTip />
              </TooltipArrow>
              External state via useTooltip
            </TooltipContent>
          </TooltipPositioner>
        </TooltipRootProvider>
      </div>
    </div>
  );
}
