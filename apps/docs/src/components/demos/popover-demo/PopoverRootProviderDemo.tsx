import { usePopover } from "@ark-ui/solid/popover";
import {
  PopoverContent,
  PopoverTrigger,
  PopoverTitle,
  PopoverDescription,
  PopoverBase,
} from "@ark-preset/solid";
export default function PopoverRootProviderDemo() {
  const popover = usePopover();

  return (
    <div class="rounded-lg border border-border p-6 space-y-4">
      <output class="block text-sm text-muted-foreground">
        Open: {JSON.stringify(popover().open)}
      </output>

      <PopoverBase.RootProvider value={popover}>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>
            This popover state is managed externally via <code>usePopover</code>.
          </PopoverDescription>
        </PopoverContent>
      </PopoverBase.RootProvider>
    </div>
  );
}
