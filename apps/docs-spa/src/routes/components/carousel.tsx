import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import CarouselBasicDemo from "@demos/carousel-demo/CarouselBasicDemo.tsx";

export const Route = createFileRoute("/components/carousel")({ component: CarouselPage });

function CarouselPage() {
  return (
    <>
      <H1>Carousel</H1>
      <P>
        An interactive image carousel component that allows users to cycle through a collection of
        content.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/carousel" />
      <CarouselBasicDemo />
      <Pre lang="tsx">{`

import {
  Carousel,
  CarouselControl,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
} from "@fan-ui/solid";

const images = [
  { src: "https://picsum.photos/seed/carousel-1/600/400", alt: "Mountain landscape" },
  { src: "https://picsum.photos/seed/carousel-2/600/400", alt: "Ocean view" },
  { src: "https://picsum.photos/seed/carousel-3/600/400", alt: "Forest trail" },
  { src: "https://picsum.photos/seed/carousel-4/600/400", alt: "Cityscape" },
  { src: "https://picsum.photos/seed/carousel-5/600/400", alt: "Desert dunes" },
];

export function CarouselDemo() {
  return (
    <Carousel slideCount={images.length}>
      <CarouselControl>
        <CarouselPrevTrigger>Prev</CarouselPrevTrigger>
        <CarouselItemGroup>
          {images.map((image, index) => (
            <CarouselItem index={index}>
              <img src={image.src} alt={image.alt} />
            </CarouselItem>
          ))}
        </CarouselItemGroup>
        <CarouselNextTrigger>Next</CarouselNextTrigger>
      </CarouselControl>
      <CarouselIndicatorGroup>
        {images.map((_, index) => (
          <CarouselIndicator index={index} />
        ))}
      </CarouselIndicatorGroup>
    </Carousel>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add carousel
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/carousel.ts`:
        <Pre lang="tsx">{`import { tv } from "tailwind-variants";

export const carouselVariants = tv({
  slots: {
    root: "flex flex-col relative w-full",
    control: "flex items-center justify-between gap-2",
    itemGroup: "flex flex-1 overflow-hidden rounded-lg",
    item: "flex-0 flex-shrink-0 min-w-0",
    prevTrigger:
      "inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent",
    nextTrigger:
      "inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent",
    indicatorGroup: "flex justify-center gap-2",
    indicator:
      "size-2.5 rounded-full bg-muted data-[current]:bg-foreground cursor-pointer transition-colors",
    autoplayTrigger:
      "inline-flex items-center justify-center size-8 rounded-full bg-background/80 hover:bg-accent",
    progressText: "text-sm font-medium font-variant-numeric tabular-nums",
  },
});

export type CarouselVariants = ReturnType<typeof carouselVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/carousel.tsx`:
        <Pre lang="tsx">{`import { Carousel as ArkCarousel } from "@ark-ui/solid/carousel";
import { splitProps, type Component } from "solid-js";
import { carouselVariants } from "./recipes/carousel";

const styles = carouselVariants();

export const CarouselRoot: Component<ArkCarousel.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Root class={styles.root({ class: local.class })} {...others} />;
};

export const CarouselRootProvider: Component<ArkCarousel.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

export const CarouselControl: Component<ArkCarousel.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Control class={styles.control({ class: local.class })} {...others} />;
};

export const CarouselItemGroup: Component<ArkCarousel.ItemGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.ItemGroup class={styles.itemGroup({ class: local.class })} {...others} />;
};

export const CarouselItem: Component<ArkCarousel.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Item class={styles.item({ class: local.class })} {...others} />;
};

export const CarouselPrevTrigger: Component<ArkCarousel.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.PrevTrigger class={styles.prevTrigger({ class: local.class })} {...others} />;
};

export const CarouselNextTrigger: Component<ArkCarousel.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.NextTrigger class={styles.nextTrigger({ class: local.class })} {...others} />;
};

export const CarouselIndicatorGroup: Component<ArkCarousel.IndicatorGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.IndicatorGroup class={styles.indicatorGroup({ class: local.class })} {...others} />;
};

export const CarouselIndicator: Component<ArkCarousel.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

export const CarouselAutoplayTrigger: Component<ArkCarousel.AutoplayTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.AutoplayTrigger class={styles.autoplayTrigger({ class: local.class })} {...others} />;
};

export const CarouselProgressText: Component<ArkCarousel.ProgressTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.ProgressText class={styles.progressText({ class: local.class })} {...others} />;
};

export { CarouselRoot as Carousel, carouselVariants, type CarouselVariants };`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--input</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import {
  Carousel,
  CarouselControl,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
} from "~/components/carousel";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

const images = [
  { src: "/image1.jpg", alt: "Image 1" },
  { src: "/image2.jpg", alt: "Image 2" },
  { src: "/image3.jpg", alt: "Image 3" },
];

<Carousel slideCount={images.length}>
  <CarouselControl>
    <CarouselPrevTrigger>Prev</CarouselPrevTrigger>
    <CarouselItemGroup>
      {images.map((image, index) => (
        <CarouselItem index={index}>
          <img src={image.src} alt={image.alt} />
        </CarouselItem>
      ))}
    </CarouselItemGroup>
    <CarouselNextTrigger>Next</CarouselNextTrigger>
  </CarouselControl>
  <CarouselIndicatorGroup>
    {images.map((_, index) => (
      <CarouselIndicator index={index} />
    ))}
  </CarouselIndicatorGroup>
</Carousel>
      `}</Pre>
      <H2>With Loop</H2>
      <P>Enable looping to allow the carousel to wrap around:</P>
      <Pre lang="tsx">{`

<Carousel slideCount={images.length} loop>
  {/* ... */}
</Carousel>
      `}</Pre>
      <H2>With Autoplay</H2>
      <P>Enable automatic scrolling:</P>
      <Pre lang="tsx">{`

<Carousel slideCount={images.length} autoplay>
  {/* ... */}
</Carousel>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/carousel">Ark UI Carousel</A>{" "}
        documentation.
      </P>
    </>
  );
}
