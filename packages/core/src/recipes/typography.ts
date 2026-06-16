import { tv, type VariantProps } from "tailwind-variants";

export const typographyVariants = tv({
  slots: {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
    code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    blockquote: "mt-6 border-l-2 border-border pl-6 italic text-muted-foreground",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;
