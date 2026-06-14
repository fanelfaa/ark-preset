import { Carousel as CarouselBase } from "./carousel.base";

const Carousel = CarouselBase.Root;
const CarouselControl = CarouselBase.Control;
const CarouselItemGroup = CarouselBase.ItemGroup;
const CarouselItem = CarouselBase.Item;
const CarouselPrevTrigger = CarouselBase.PrevTrigger;
const CarouselNextTrigger = CarouselBase.NextTrigger;
const CarouselIndicatorGroup = CarouselBase.IndicatorGroup;
const CarouselIndicator = CarouselBase.Indicator;
const CarouselAutoplayTrigger = CarouselBase.AutoplayTrigger;
const CarouselProgressText = CarouselBase.ProgressText;

export {
  Carousel,
  CarouselControl,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
  CarouselAutoplayTrigger,
  CarouselProgressText,
  CarouselBase,
};

export { carouselVariants, type CarouselVariants } from "@fan-ui/core";
