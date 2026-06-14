import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import SliderBasicDemo from "@demos/slider-demo/SliderBasicDemo.tsx";
import SliderRootProviderDemo from "@demos/slider-demo/SliderRootProviderDemo.tsx";

export const Route = createFileRoute("/components/slider")({ component: SliderPage });

function SliderPage() {
  return (
    <>
      <H1>Slider</H1>
      <P>
        A range input component that allows users to select a value from a predefined range by
        dragging a thumb.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/slider" />
      <SliderBasicDemo />
      <Pre>{`

import {
  Slider,
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
} from "~/components/slider";

export function SliderDemo() {
  return (
    <Slider defaultValue={[50]} min={0} max={100}>
      <div class="flex items-center justify-between gap-4">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderThumb index={0} />
      </SliderControl>
    </Slider>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add slider
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/slider.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const sliderVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full",
    label: "text-sm font-medium text-foreground",
    valueText: "text-sm font-medium",
    control: "relative flex items-center w-full h-5",
    track: "h-1.5 w-full rounded-full bg-muted overflow-hidden",
    range: "h-full rounded-full bg-primary",
    thumb:
      "size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    draggingIndicator: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    markerGroup: "flex justify-between w-full px-0.5",
    marker: "text-xs text-muted-foreground",
    hiddenInput: "sr-only",
  },
  variants: {
    disabled: {
      true: {
        thumb: "disabled:pointer-events-none disabled:opacity-50",
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/slider/slider.base.tsx`:
        <Pre>{`import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { splitProps, type Component } from "solid-js";
import { sliderVariants } from "@fan-ui/core";

const styles = sliderVariants();

const Root: Component<ArkSlider.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkSlider.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkSlider.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Label class={styles.label({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkSlider.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const Control: Component<ArkSlider.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Control class={styles.control({ class: local.class })} {...others} />;
};

const Track: Component<ArkSlider.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Track class={styles.track({ class: local.class })} {...others} />;
};

const Range: Component<ArkSlider.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.Range class={styles.range({ class: local.class })} {...others} />;
};

const Thumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"]);
  return (
    <ArkSlider.Thumb class={styles.thumb({ class: local.class })} index={local.index} {...others} />
  );
};

const HiddenInput: Component<ArkSlider.HiddenInputProps> = (props) => {
  return <ArkSlider.HiddenInput {...props} />;
};

const DraggingIndicator: Component<ArkSlider.DraggingIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSlider.DraggingIndicator
      class={styles.draggingIndicator({ class: local.class })}
      {...others}
    />
  );
};

const MarkerGroup: Component<ArkSlider.MarkerGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSlider.MarkerGroup class={styles.markerGroup({ class: local.class })} {...others} />;
};

const Marker: Component<ArkSlider.MarkerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "value"]);
  return (
    <ArkSlider.Marker
      class={styles.marker({ class: local.class })}
      value={local.value}
      {...others}
    />
  );
};

export const Slider = { Root, RootProvider, Label, ValueText, Control, Track, Range, Thumb, HiddenInput, DraggingIndicator, MarkerGroup, Marker };`}</Pre>
        `src/components/slider/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { Slider as SliderBase } from "./slider.base";
import { Slider as ArkSlider } from "@ark-ui/solid/slider";

// Root aliases (backward compat)
const Slider = SliderBase.Root;
const SliderRootProvider = SliderBase.RootProvider;
const SliderLabel = SliderBase.Label;
const SliderValueText = SliderBase.ValueText;

// Composite wrappers — auto-include sub-parts
const SliderControl: Component<ArkSlider.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <SliderBase.Control {...others}>
      <SliderBase.Track>
        <SliderBase.Range />
      </SliderBase.Track>
      {local.children}
    </SliderBase.Control>
  );
};

const SliderThumb: Component<ArkSlider.ThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["children", "index"]);
  return (
    <SliderBase.Thumb index={local.index} {...others}>
      {local.children}
      <SliderBase.HiddenInput />
    </SliderBase.Thumb>
  );
};

// Raw parts exported for advanced use
const SliderMarker = SliderBase.Marker;
const SliderMarkerGroup = SliderBase.MarkerGroup;
const SliderDraggingIndicator = SliderBase.DraggingIndicator;

export {
  Slider,
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
  SliderMarker,
  SliderMarkerGroup,
  SliderDraggingIndicator,
  SliderBase,
};

export { sliderVariants, type SliderVariants } from "@fan-ui/core";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--primary</InlineCode>, <InlineCode>--ring</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Slider,
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
} from "~/components/slider";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Slider defaultValue={[50]} min={0} max={100}>
  <div class="flex items-center justify-between gap-4">
    <SliderLabel>Volume</SliderLabel>
    <SliderValueText />
  </div>
  <SliderControl>
    <SliderThumb index={0} />
  </SliderControl>
</Slider>
      `}</Pre>
      <H2>Root Provider</H2>
      <P>
        Use <InlineCode>SliderRootProvider</InlineCode> when you need to access the slider state
        outside of the component tree. This pattern uses the <InlineCode>useSlider</InlineCode> hook
        from Ark UI to create a shared context that both the slider and external elements can
        reference.
      </P>
      <SliderRootProviderDemo />
      <Pre>{`

import { useSlider } from "@ark-ui/solid/slider";
import {
  SliderRootProvider,
  SliderLabel,
  SliderValueText,
  SliderControl,
  SliderThumb,
} from "~/components/slider";

export function SliderWithExternalControl() {
  const slider = useSlider({ defaultValue: [50], min: 0, max: 100 });

  return (
    <div>
      {/* Access slider state outside the tree */}
      <output>Value: {JSON.stringify(slider().value)}</output>

      <SliderRootProvider value={slider}>
        <div class="flex items-center justify-between gap-4">
          <SliderLabel>Volume</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderThumb index={0} />
        </SliderControl>
      </SliderRootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>Slider</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained sliders.
        </li>
        <li>
          <strong>
            <InlineCode>SliderRootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created slider context via <InlineCode>useSlider</InlineCode>. Use when
          you need to read or control the slider state from outside the component tree.
        </li>
      </List>
      <H2>Disabled</H2>
      <P>
        Use the <InlineCode>disabled</InlineCode> prop to disable the slider.
      </P>
      <Pre>{`

<Slider defaultValue={[50]} disabled>
  <SliderLabel>Disabled Slider</SliderLabel>
  <SliderControl>
    <SliderThumb index={0} />
  </SliderControl>
</Slider>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/slider">Ark UI Slider</A> documentation.
      </P>
    </>
  );
}
