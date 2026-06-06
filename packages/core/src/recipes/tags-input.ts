import { tv, type VariantProps } from "tailwind-variants";

export const tagsInputVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full max-w-sm",
    label: "text-sm font-medium text-foreground select-none data-[disabled]:opacity-50",
    control: [
      "relative flex flex-wrap items-center gap-1 min-h-8 w-full rounded-md border border-input bg-background px-2.5 py-0.5 text-sm ring-offset-background",
      "has-[button]:pr-8",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
      "data-[disabled]:opacity-50",
      "data-[invalid]:border-destructive data-[invalid]:focus-within:ring-destructive",
    ],
    input: [
      "flex-1 min-w-16 h-auto px-1 text-sm bg-transparent border-none outline-none",
      "placeholder:text-muted-foreground text-foreground",
    ],
    clearTrigger: [
      "absolute top-1/2 right-2 -translate-y-1/2",
      "flex items-center justify-center p-1 rounded",
      "bg-transparent border-none cursor-pointer",
      "text-muted-foreground hover:text-foreground hover:bg-muted",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    ],
    item: "inline-flex items-center outline-none cursor-default",
    itemPreview: [
      "inline-flex items-center gap-1 py-0.5 pl-2 pr-1 rounded-sm h-6",
      "bg-muted text-sm text-foreground outline-none",
      "data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary",
    ],
    itemText: "font-medium text-sm",
    itemInput: [
      "min-w-16 px-2 py-0.5 text-sm bg-muted border border-border rounded",
      "outline-none text-foreground",
    ],
    itemDeleteTrigger: [
      "flex items-center justify-center p-0.5 rounded",
      "bg-transparent border-none cursor-pointer text-muted-foreground",
      "hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    ],
  },

});

export type TagsInputVariants = VariantProps<typeof tagsInputVariants>;
