import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ColorPickerBasicDemo from "@demos/color-picker-demo/ColorPickerBasicDemo.tsx";
import ColorPickerInlineDemo from "@demos/color-picker-demo/ColorPickerInlineDemo.tsx";
import ColorPickerControlledDemo from "@demos/color-picker-demo/ColorPickerControlledDemo.tsx";

export const Route = createFileRoute("/components/color-picker")({ component: ColorPickerPage });

function ColorPickerPage() {
  return (
    <>
      <H1>Color Picker</H1>
      <P>
        A color selection component that allows users to pick a color using a saturation/brightness
        area, channel sliders, and preset swatches.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/color-picker" />
      <ColorPickerBasicDemo />
      <Pre lang="tsx">{`

import { ColorPicker, ColorPickerBase } from "~/components/color-picker";

// Self-contained — label, control, area, sliders, and swatches all built in
<ColorPicker label="Color" presets={["#ff0000", "#00ff00", "#0000ff"]} />

// Inline layout (no popover)
<ColorPicker inline label="Color" presets={["#ff0000", "#00ff00", "#0000ff"]} />
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add color-picker
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/color-picker.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const colorPickerVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-foreground",
    control: "flex items-center gap-2",
    trigger: [
      "inline-flex items-center justify-center rounded-md border border-input transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    content: [
      "z-50 flex flex-col gap-3 rounded-lg border bg-popover p-4 shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
    ],
    area: "relative h-40 w-full overflow-hidden rounded-md",
    areaThumb:
      "absolute -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md",
    channelSlider: "relative h-3 w-full rounded-full",
    channelSliderTrack: "h-full w-full rounded-full",
    channelSliderThumb:
      "absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white shadow-md top-1/2",
    channelSliderLabel: "text-xs text-muted-foreground",
    channelInput: [
      "h-8 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm text-center ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    valueSwatch: "h-6 w-6 overflow-hidden rounded-md border",
    eyeDropperTrigger: [
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "hover:bg-accent hover:text-accent-foreground h-7 w-7",
    ],
    formatSelect:
      "flex h-7 rounded-md border border-input bg-transparent px-1 py-1 text-xs shadow-sm",
    swatchGroup: "flex flex-wrap gap-1",
    swatch: "h-6 w-6 overflow-hidden rounded-md border cursor-pointer",
    transparencyGrid: "h-full w-full rounded-[inherit]",
    view: "flex flex-col gap-3",
    valueText: "text-xs text-muted-foreground",
    swatchIndicator: "absolute inset-0 flex items-center justify-center",
  },
  variants: {
    size: {
      sm: { trigger: "h-8 w-8" },
      md: { trigger: "h-8 w-8" },
      lg: { trigger: "h-8 w-8" },
    },
    inline: {
      true: { root: "relative" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files. First, create
        `src/components/color-picker/color-picker.base.tsx`:
        <Pre lang="tsx">{`import { ColorPicker as ArkColorPicker } from "@ark-ui/solid/color-picker";
import { splitProps, type Component } from "solid-js";
import { colorPickerVariants } from "../../recipes/color-picker";

const styles = colorPickerVariants();

// ── Root ─────────────────────────────────────────────────────
const Root: Component<ArkColorPicker.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Root class={styles.root({ class: local.class })} {...others} />;
};
const RootProvider = ArkColorPicker.RootProvider;

// ── Label ────────────────────────────────────────────────────
const Label: Component<ArkColorPicker.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Label class={styles.label({ class: local.class })} {...others} />;
};

// ── Control ──────────────────────────────────────────────────
const Control: Component<ArkColorPicker.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Control class={styles.control({ class: local.class })} {...others} />;
};

// ── Trigger ──────────────────────────────────────────────────
const Trigger: Component<ArkColorPicker.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Trigger class={styles.trigger({ class: local.class })} {...others} />;
};

// ── Pass-through parts ───────────────────────────────────────
const HiddenInput = ArkColorPicker.HiddenInput;
const Positioner = ArkColorPicker.Positioner;
const AreaBackground = ArkColorPicker.AreaBackground;
const ChannelSliderValueText = ArkColorPicker.ChannelSliderValueText;
const ValueText = ArkColorPicker.ValueText;
const SwatchIndicator = ArkColorPicker.SwatchIndicator;
const Context = ArkColorPicker.Context;

// ── Content ──────────────────────────────────────────────────
const Content: Component<ArkColorPicker.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Content class={styles.content({ class: local.class })} {...others} />;
};

// ── Area ─────────────────────────────────────────────────────
const Area: Component<ArkColorPicker.AreaProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Area class={styles.area({ class: local.class })} {...others} />;
};

// ── Area Thumb ───────────────────────────────────────────────
const AreaThumb: Component<ArkColorPicker.AreaThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.AreaThumb class={styles.areaThumb({ class: local.class })} {...others} />;
};

// ── Channel Slider ───────────────────────────────────────────
const ChannelSlider: Component<ArkColorPicker.ChannelSliderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ChannelSlider class={styles.channelSlider({ class: local.class })} {...others} />;
};

// ── Channel Slider Track ─────────────────────────────────────
const ChannelSliderTrack: Component<ArkColorPicker.ChannelSliderTrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ChannelSliderTrack class={styles.channelSliderTrack({ class: local.class })} {...others} />;
};

// ── Channel Slider Thumb ─────────────────────────────────────
const ChannelSliderThumb: Component<ArkColorPicker.ChannelSliderThumbProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ChannelSliderThumb class={styles.channelSliderThumb({ class: local.class })} {...others} />;
};

// ── Channel Slider Label ─────────────────────────────────────
const ChannelSliderLabel: Component<ArkColorPicker.ChannelSliderLabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ChannelSliderLabel class={styles.channelSliderLabel({ class: local.class })} {...others} />;
};

// ── Channel Input ────────────────────────────────────────────
const ChannelInput: Component<ArkColorPicker.ChannelInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ChannelInput class={styles.channelInput({ class: local.class })} {...others} />;
};

// ── Value Swatch ─────────────────────────────────────────────
const ValueSwatch: Component<ArkColorPicker.ValueSwatchProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.ValueSwatch class={styles.valueSwatch({ class: local.class })} {...others} />;
};

// ── Eye Dropper Trigger ─────────────────────────────────────
const EyeDropperTrigger: Component<ArkColorPicker.EyeDropperTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.EyeDropperTrigger class={styles.eyeDropperTrigger({ class: local.class })} {...others} />;
};

// ── Format Select ────────────────────────────────────────────
const FormatSelect: Component<ArkColorPicker.FormatSelectProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.FormatSelect class={styles.formatSelect({ class: local.class })} {...others} />;
};

// ── Format Trigger ───────────────────────────────────────────
const FormatTrigger: Component<ArkColorPicker.FormatTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.FormatTrigger class={styles.formatTrigger({ class: local.class })} {...others} />;
};

// ── Swatch Group ─────────────────────────────────────────────
const SwatchGroup: Component<ArkColorPicker.SwatchGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.SwatchGroup class={styles.swatchGroup({ class: local.class })} {...others} />;
};

// ── Swatch ───────────────────────────────────────────────────
const Swatch: Component<ArkColorPicker.SwatchProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.Swatch class={styles.swatch({ class: local.class })} {...others} />;
};

// ── Swatch Trigger ───────────────────────────────────────────
const SwatchTrigger: Component<ArkColorPicker.SwatchTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.SwatchTrigger class={styles.swatch({ class: local.class })} {...others} />;
};

// ── Transparency Grid ────────────────────────────────────────
const TransparencyGrid: Component<ArkColorPicker.TransparencyGridProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.TransparencyGrid class={styles.transparencyGrid({ class: local.class })} {...others} />;
};

// ── View ─────────────────────────────────────────────────────
const View: Component<ArkColorPicker.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkColorPicker.View class={styles.view({ class: local.class })} {...others} />;
};

// ── Namespace Export ────────────────────────────────────────
export const ColorPickerBase = {
  Root, RootProvider, Label, Control, Trigger,
  HiddenInput, Positioner, Content,
  Area, AreaBackground, AreaThumb,
  ChannelSlider, ChannelSliderTrack, ChannelSliderThumb, ChannelSliderLabel, ChannelSliderValueText,
  ChannelInput,
  ValueSwatch, ValueText,
  EyeDropperTrigger, FormatSelect, FormatTrigger,
  SwatchGroup, Swatch, SwatchIndicator, SwatchTrigger,
  TransparencyGrid, View,
  Context,
};`}</Pre>
        Then create `src/components/color-picker/index.tsx`:
        <Pre lang="tsx">{`import { For, Show, splitProps, type Component, type JSX } from "solid-js";
import { ColorPicker as ArkColorPicker, parseColor } from "@ark-ui/solid/color-picker";
import { Portal } from "solid-js/web";
import { ColorPickerBase } from "./color-picker.base";

// ── SVG Icons ────────────────────────────────────────────────

const CheckIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4" {...props}>
    <path d="M20 6L9 17l-5-5" />
    <title>Check</title>
  </svg>
);

// ── Picker Content (extracted for reuse in both popover + inline) ─

const PickerContent: Component<{ presets?: string[]; children?: JSX.Element }> = (props) => {
  const presetColors = () => props.presets?.map((c) => parseColor(c));
  return (
    <ColorPickerBase.Content>
      <ColorPickerBase.Area>
        <ColorPickerBase.AreaBackground />
        <ColorPickerBase.AreaThumb />
      </ColorPickerBase.Area>
      <ColorPickerBase.ChannelSlider channel="hue">
        <ColorPickerBase.ChannelSliderTrack />
        <ColorPickerBase.ChannelSliderThumb />
      </ColorPickerBase.ChannelSlider>
      <ColorPickerBase.FormatSelect />
      <ColorPickerBase.ChannelInput channel="hex" />
      <Show when={presetColors()}>
        <ColorPickerBase.SwatchGroup>
          <For each={presetColors()}>
            {(color) => (
              <ColorPickerBase.SwatchTrigger value={color}>
                <ColorPickerBase.Swatch value={color}>
                  <ColorPickerBase.SwatchIndicator>
                    <CheckIcon />
                  </ColorPickerBase.SwatchIndicator>
                </ColorPickerBase.Swatch>
              </ColorPickerBase.SwatchTrigger>
            )}
          </For>
        </ColorPickerBase.SwatchGroup>
      </Show>
      {props.children}
    </ColorPickerBase.Content>
  );
};

// ── Composite: ColorPicker ───────────────────────────────────

type ColorPickerProps = ArkColorPicker.RootProps & {
  label?: string;
  presets?: string[];
  inline?: boolean;
};

const ColorPicker: Component<ColorPickerProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "label", "presets", "inline", "children"]);

  return (
    <ColorPickerBase.Root class={local.class} {...others}>
      <Show when={local.label}>
        <ColorPickerBase.Label>{local.label}</ColorPickerBase.Label>
      </Show>
      <ColorPickerBase.Control>
        <ColorPickerBase.ChannelInput channel="hex" />
        <ColorPickerBase.Trigger>
          <ColorPickerBase.TransparencyGrid />
          <ColorPickerBase.ValueSwatch />
        </ColorPickerBase.Trigger>
      </ColorPickerBase.Control>
      <Show
        when={local.inline}
        fallback={
          <Portal>
            <ColorPickerBase.Positioner>
              <PickerContent presets={local.presets}>{local.children}</PickerContent>
            </ColorPickerBase.Positioner>
          </Portal>
        }
      >
        <PickerContent presets={local.presets}>{local.children}</PickerContent>
      </Show>
      <ColorPickerBase.HiddenInput />
    </ColorPickerBase.Root>
  );
};

export { ColorPicker, ColorPickerBase };

export { colorPickerVariants, type ColorPickerVariants } from "../../recipes/color-picker";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--primary</InlineCode>, <InlineCode>--ring</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, <InlineCode>--background</InlineCode>,{" "}
        <InlineCode>--accent</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>
        Import <InlineCode>ColorPicker</InlineCode>:
      </P>
      <Pre lang="tsx">{`

import { ColorPicker, ColorPickerBase } from "~/components/color-picker";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

<ColorPicker label="Color" presets={["#ff0000", "#00ff00", "#0000ff"]} />
      `}</Pre>
      <H3>Inline</H3>
      <P>
        For inline rendering (no popover), use the <InlineCode>inline</InlineCode> prop:
      </P>
      <ColorPickerInlineDemo />
      <Pre lang="tsx">{`

import { parseColor } from "@ark-ui/solid/color-picker";

<ColorPicker
  inline
  label="Inline Color Picker"
  defaultValue={parseColor("#eb5e41")}
  presets={["#ff0000", "#00ff00", "#0000ff"]}
/>
      `}</Pre>
      <H3>Controlled</H3>
      <ColorPickerControlledDemo />
      <Pre lang="tsx">{`

import { createSignal } from "solid-js";
import { parseColor } from "@ark-ui/solid/color-picker";
import { ColorPicker } from "~/components/color-picker";

export function ColorPickerControlled() {
  const [color, setColor] = createSignal(parseColor("#eb5e41"));

  return (
    <div>
      <ColorPicker
        label="Color"
        value={color()}
        onValueChange={(e) => setColor(e.value)}
        presets={["#ff0000", "#00ff00", "#0000ff"]}
      />
      <p class="text-sm text-muted-foreground mt-3">
        Current color: <span class="font-mono">{color()}</span>
      </p>
    </div>
  );
}
      `}</Pre>
      <P>
        For fully controlled mode, use <InlineCode>value</InlineCode> and{" "}
        <InlineCode>onValueChange</InlineCode>:
      </P>
      <Pre lang="tsx">{`

import { createSignal } from "solid-js";
import { parseColor } from "@ark-ui/solid/color-picker";
import { ColorPicker } from "~/components/color-picker";

export function ColorPickerControlled() {
  const [value, setValue] = createSignal(parseColor("#eb5e41"));

  return (
    <ColorPicker
      label="Color"
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    />
  );
}
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        For advanced layouts with custom composition, import{" "}
        <InlineCode>ColorPickerBase</InlineCode> to access individual parts:
      </P>
      <Pre lang="tsx">{`

import { ColorPickerBase } from "~/components/color-picker";

<ColorPickerBase.Root>
  <ColorPickerBase.Label>Color</ColorPickerBase.Label>
  <ColorPickerBase.Control>
    <ColorPickerBase.ValueSwatch />
    <ColorPickerBase.Trigger>{/* custom trigger icon */}</ColorPickerBase.Trigger>
  </ColorPickerBase.Control>
  <ColorPickerBase.Positioner>
    <ColorPickerBase.Content>
      <ColorPickerBase.Area>
        <ColorPickerBase.AreaBackground />
        <ColorPickerBase.AreaThumb />
      </ColorPickerBase.Area>
      <ColorPickerBase.ChannelSlider channel="hue">
        <ColorPickerBase.ChannelSliderTrack />
        <ColorPickerBase.ChannelSliderThumb />
      </ColorPickerBase.ChannelSlider>
    </ColorPickerBase.Content>
  </ColorPickerBase.Positioner>
  <ColorPickerBase.HiddenInput />
</ColorPickerBase.Root>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/color-picker">Ark UI Color Picker</A>{" "}
        documentation.
      </P>
    </>
  );
}
