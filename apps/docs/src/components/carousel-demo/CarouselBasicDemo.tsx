import { Index } from "solid-js";
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

export default function CarouselBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Carousel slideCount={images.length} class="w-full max-w-lg mx-auto">
        <CarouselControl>
          <CarouselPrevTrigger class="inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </CarouselPrevTrigger>
          <CarouselItemGroup>
            <Index each={images}>
              {(image, index) => (
                <CarouselItem index={index} class="flex-0 flex-shrink-0 min-w-0 w-full">
                  <img
                    src={image().src}
                    alt={image().alt}
                    class="w-full h-48 object-cover rounded-lg"
                  />
                </CarouselItem>
              )}
            </Index>
          </CarouselItemGroup>
          <CarouselNextTrigger class="inline-flex items-center justify-center size-9 rounded-md border border-input bg-background hover:bg-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </CarouselNextTrigger>
        </CarouselControl>
        <CarouselIndicatorGroup class="flex justify-center gap-2 mt-4">
          <Index each={images}>
            {(_, index) => (
              <CarouselIndicator
                index={index}
                class="size-2.5 rounded-full bg-muted data-[current]:bg-foreground cursor-pointer transition-colors"
              />
            )}
          </Index>
        </CarouselIndicatorGroup>
      </Carousel>
    </div>
  );
}
