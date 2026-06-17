import { Carousel as ArkCarousel } from "@ark-ui/solid/carousel";
import { splitProps, type Component } from "solid-js";
import { carouselVariants } from "@ark-preset/core";

const styles = carouselVariants();

const Root: Component<ArkCarousel.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkCarousel.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Control: Component<ArkCarousel.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Control class={styles.control({ class: local.class })} {...others} />;
};

const ItemGroup: Component<ArkCarousel.ItemGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.ItemGroup class={styles.itemGroup({ class: local.class })} {...others} />;
};

const Item: Component<ArkCarousel.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Item class={styles.item({ class: local.class })} {...others} />;
};

const PrevTrigger: Component<ArkCarousel.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.PrevTrigger class={styles.prevTrigger({ class: local.class })} {...others} />;
};

const NextTrigger: Component<ArkCarousel.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.NextTrigger class={styles.nextTrigger({ class: local.class })} {...others} />;
};

const IndicatorGroup: Component<ArkCarousel.IndicatorGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCarousel.IndicatorGroup class={styles.indicatorGroup({ class: local.class })} {...others} />
  );
};

const Indicator: Component<ArkCarousel.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkCarousel.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const AutoplayTrigger: Component<ArkCarousel.AutoplayTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCarousel.AutoplayTrigger
      class={styles.autoplayTrigger({ class: local.class })}
      {...others}
    />
  );
};

const ProgressText: Component<ArkCarousel.ProgressTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkCarousel.ProgressText class={styles.progressText({ class: local.class })} {...others} />
  );
};

export const Carousel = {
  Root,
  RootProvider,
  Control,
  ItemGroup,
  Item,
  PrevTrigger,
  NextTrigger,
  IndicatorGroup,
  Indicator,
  AutoplayTrigger,
  ProgressText,
};
