# Plan: ColorPicker

**Pattern:** C (With Portal) — same as DatePicker
**Reference:** `packages/solid/src/date-picker/`
**Status:** Planning

## Component Overview

A color selection component with saturation/brightness area, channel sliders, format switching, and swatch presets. Supports controlled/uncontrolled modes, inline layout, and eye dropper. Built on Ark UI's `@ark-ui/solid/color-picker`.

### Ark UI Parts

| Part                   | Has tv() variants? | Notes                                        |
| ---------------------- | ------------------ | -------------------------------------------- |
| Root                   | Yes (size, inline) | `<div>` main container                       |
| RootProvider           | No                 | For `useColorPicker()` machine-controlled    |
| Label                  | Yes (class only)   | Label text                                   |
| Control                | Yes (class only)   | Trigger swatch + value text row              |
| Trigger                | Yes (class only)   | Button that opens the popover                |
| HiddenInput            | No                 | Hidden form input                            |
| Positioner             | No                 | Positioning wrapper (pass-through)           |
| Content                | Yes (class only)   | Popover panel                                |
| Area                   | Yes (class only)   | Saturation/brightness area                   |
| AreaBackground         | No                 | CSS gradient background                      |
| AreaThumb              | Yes (class only)   | Draggable thumb on area                      |
| ChannelSlider          | Yes (class only)   | Single channel slider track container        |
| ChannelSliderTrack     | Yes (class only)   | Track background                             |
| ChannelSliderThumb     | Yes (class only)   | Draggable thumb on slider                    |
| ChannelSliderLabel     | Yes (class only)   | Label for slider                             |
| ChannelSliderValueText | No                 | Value display for slider                     |
| ChannelInput           | Yes (class only)   | Numeric input for color channel              |
| ValueSwatch            | Yes (class only)   | Current color preview swatch                 |
| ValueText              | No                 | Color value string display                   |
| EyeDropperTrigger      | Yes (class only)   | Eye dropper button                           |
| FormatSelect           | Yes (class only)   | `<select>` for color format                  |
| FormatTrigger          | Yes (class only)   | Button to cycle format                       |
| SwatchGroup            | Yes (class only)   | Container for swatches                       |
| Swatch                 | Yes (class only)   | Individual preset swatch                     |
| SwatchIndicator        | No                 | Check icon on selected swatch                |
| SwatchTrigger          | Yes                | Clickable swatch with value (has value prop) |
| TransparencyGrid       | Yes (class only)   | Checkered background for alpha               |
| View                   | Yes (class only)   | Content view by format (rgba/hsla/hsba)      |

### Variants

- **size**: `"sm" | "md" | "lg"` (default: "md") — controls spacing and sizing
- **inline**: `{ true: { root: "relative" } }` — for inline rendering (no popover)

## Artifact Checklist

### 1. Recipe: `packages/core/src/recipes/color-picker.ts`

- [ ] Create tv() with slots for each stylable part:
  - **root**: `"flex flex-col gap-1.5"` — vertical layout
  - **label**: standard label styles (same as date-picker/time-picker)
  - **control**: `"flex items-center gap-2"` — swatch trigger + value row
  - **trigger**: `"inline-flex items-center justify-center rounded-md border border-input transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"` with size-aware:
    - `"h-8 w-8"` (sm), `"h-9 w-9"` (md), `"h-10 w-10"` (lg)
  - **content**: popover panel:
    - `"z-50 flex flex-col gap-3 rounded-lg border bg-popover p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out"`
  - **area**: `"relative h-40 w-56 overflow-hidden rounded-md"` — saturation/brightness area
  - **areaThumb**: `"absolute -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-md"` — draggable circle
  - **channelSlider**: `"relative h-3 w-full rounded-full"` — slider track
  - **channelSliderTrack**: `"h-full w-full rounded-full"` — track background
  - **channelSliderThumb**: `"absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white shadow-md top-1/2"` — slider thumb
  - **channelSliderLabel**: `"text-xs text-muted-foreground"` — slider label
  - **channelInput**: channel input field (compact):
    - `"flex h-7 w-12 rounded-md border border-input bg-transparent px-1 py-1 text-xs text-center shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"`
  - **valueSwatch**: `"h-6 w-6 overflow-hidden rounded-md border"` — preview swatch
  - **eyeDropperTrigger**: inlined control button:
    - `"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7"`
  - **formatSelect**: `"flex h-7 rounded-md border border-input bg-transparent px-1 py-1 text-xs shadow-sm"` — format dropdown
  - **formatTrigger**: inlined button (same as eyeDropperTrigger style)
  - **swatchGroup**: `"flex flex-wrap gap-1"` — swatch grid
  - **swatch**: `"h-6 w-6 overflow-hidden rounded-md border cursor-pointer"` — preset swatch
  - **transparencyGrid**: `"h-full w-full rounded-[inherit]"` — transparency checker
  - **view**: `"flex flex-col gap-3"` — content view wrapper
  - **valueText**: `"text-xs text-muted-foreground"` — color value string
  - **swatchIndicator**: `"absolute inset-0 flex items-center justify-center"` — check icon overlay

- [ ] Variants:
  - **size**: `"sm" | "md" | "lg"` (default: "md") — controls trigger size, area dimensions, spacing
  - **inline**: `{ true: { root: "relative" } }` — inline mode has no popover

- [ ] Module-level: `const styles = colorPickerVariants();`
- [ ] Export `colorPickerVariants` + type `ColorPickerVariants`

### 2. Core Index: `packages/core/src/index.ts`

- [ ] Add `export { colorPickerVariants } from "./recipes/color-picker"`
- [ ] Add `export type { ColorPickerVariants } from "./recipes/color-picker"`
- [ ] Insert in alphabetical order (after `collapsible`/`combobox`, before `date-picker`)

### 3. Tsup Entry: `packages/core/tsup.config.ts`

- [ ] Add `"src/recipes/color-picker.ts"` to entry list (alphabetical order)

### 4. Base File: `packages/solid/src/color-picker/color-picker.base.tsx`

- [ ] Import Ark UI parts from `@ark-ui/solid/color-picker`
  ```tsx
  import { ColorPicker as ArkColorPicker } from "@ark-ui/solid/color-picker";
  ```
- [ ] Import `colorPickerVariants` + type `ColorPickerVariants` from `@fan-ui/core`
- [ ] Module-level: `const styles = colorPickerVariants();`
- [ ] Create individual named exports (Pattern C, same as date-picker):
  - **Root**: `Component<ArkColorPicker.RootProps & ColorPickerVariants>` — split `["class", "size", "inline"]`, apply `styles.root({ class: local.class, size: local.size, inline: local.inline })`
  - **RootProvider**: Direct pass-through: `ArkColorPicker.RootProvider`
  - **Label**: `Component<ArkColorPicker.LabelProps>` — split `["class"]`, apply `styles.label({ class: local.class })`
  - **Control**: `Component<ArkColorPicker.ControlProps>` — split `["class"]`, apply `styles.control({ class: local.class })`
  - **Trigger**: `Component<ArkColorPicker.TriggerProps>` — split `["class"]`, apply `styles.trigger({ class: local.class })`
  - **HiddenInput**: Direct pass-through: `ArkColorPicker.HiddenInput`
  - **Positioner**: Direct pass-through: `ArkColorPicker.Positioner`
  - **Content**: `Component<ArkColorPicker.ContentProps>` — split `["class"]`, apply `styles.content({ class: local.class })`
  - **Area**: `Component<ArkColorPicker.AreaProps>` — split `["class"]`, apply `styles.area({ class: local.class })`
  - **AreaBackground**: Direct pass-through: `ArkColorPicker.AreaBackground`
  - **AreaThumb**: `Component<ArkColorPicker.AreaThumbProps>` — split `["class"]`, apply `styles.areaThumb({ class: local.class })`
  - **ChannelSlider**: `Component<ArkColorPicker.ChannelSliderProps>` — split `["class"]`, apply `styles.channelSlider({ class: local.class })`
  - **ChannelSliderTrack**: `Component<ArkColorPicker.ChannelSliderTrackProps>` — split `["class"]`, apply `styles.channelSliderTrack({ class: local.class })`
  - **ChannelSliderThumb**: `Component<ArkColorPicker.ChannelSliderThumbProps>` — split `["class"]`, apply `styles.channelSliderThumb({ class: local.class })`
  - **ChannelSliderLabel**: `Component<ArkColorPicker.ChannelSliderLabelProps>` — split `["class"]`, apply `styles.channelSliderLabel({ class: local.class })`
  - **ChannelSliderValueText**: Direct pass-through: `ArkColorPicker.ChannelSliderValueText`
  - **ChannelInput**: `Component<ArkColorPicker.ChannelInputProps>` — split `["class"]`, apply `styles.channelInput({ class: local.class })`
  - **ValueSwatch**: `Component<ArkColorPicker.ValueSwatchProps>` — split `["class"]`, apply `styles.valueSwatch({ class: local.class })`
  - **ValueText**: Direct pass-through: `ArkColorPicker.ValueText`
  - **EyeDropperTrigger**: `Component<ArkColorPicker.EyeDropperTriggerProps>` — split `["class"]`, apply `styles.eyeDropperTrigger({ class: local.class })`
  - **FormatSelect**: `Component<ArkColorPicker.FormatSelectProps>` — split `["class"]`, apply `styles.formatSelect({ class: local.class })`
  - **FormatTrigger**: `Component<ArkColorPicker.FormatTriggerProps>` — split `["class"]`, apply `styles.formatTrigger({ class: local.class })`
  - **SwatchGroup**: `Component<ArkColorPicker.SwatchGroupProps>` — split `["class"]`, apply `styles.swatchGroup({ class: local.class })`
  - **Swatch**: `Component<ArkColorPicker.SwatchProps>` — split `["class"]`, apply `styles.swatch({ class: local.class })`
  - **SwatchIndicator**: Direct pass-through: `ArkColorPicker.SwatchIndicator`
  - **SwatchTrigger**: `Component<ArkColorPicker.SwatchTriggerProps>` — split `["class"]`, apply `styles.swatchTrigger({ class: local.class })`
  - **TransparencyGrid**: `Component<ArkColorPicker.TransparencyGridProps>` — split `["class"]`, apply `styles.transparencyGrid({ class: local.class })`
  - **View**: `Component<ArkColorPicker.ViewProps>` — split `["class"]`, apply `styles.view({ class: local.class })`
  - **Context**: Direct pass-through: `ArkColorPicker.Context`
- [ ] Export all individually

### 5. Index File: `packages/solid/src/color-picker/index.tsx`

- [ ] Strategy: Follow date-picker composite pattern — composite `ColorPicker` that auto-renders:
  - Label (optional)
  - Control with ValueSwatch + ValueText + Trigger
  - Portal with Positioner → Content
  - Content contains:
    - Area (saturation/brightness) with TransparencyGrid
    - Channel sliders (hue, saturation, lightness, alpha etc.)
    - Channel inputs
    - Format switcher (FormatSelect or FormatTrigger)
    - Preset swatches
- [ ] Import base parts + `Portal` from `solid-js/web`
- [ ] Import `For, Show, splitProps, type Component` from "solid-js"
- [ ] Create color picker composite (simplified default layout):

  ```tsx
  type ColorPickerProps = ArkColorPicker.RootProps & {
    label?: string;
    presets?: string[];
    inline?: boolean;
  };

  const ColorPicker: Component<ColorPickerProps> = (props) => {
    const [local, others] = splitProps(props, ["class", "label", "presets", "inline", "children"]);

    const pickerContent = (
      <ColorPickerBase.Content>
        <ColorPickerBase.Area>
          <ColorPickerBase.AreaBackground />
          <ColorPickerBase.AreaThumb />
        </ColorPickerBase.Area>
        {/* Channel sliders */}
        <ColorPickerBase.ChannelSlider channel="hue">
          <ColorPickerBase.ChannelSliderTrack />
          <ColorPickerBase.ChannelSliderThumb />
        </ColorPickerBase.ChannelSlider>
        {/* Format selector */}
        <ColorPickerBase.FormatSelect />
        {/* Channel inputs */}
        <div class="flex gap-1">
          <ColorPickerBase.ChannelInput channel="hex" />
        </div>
        {/* Preset swatches */}
        <Show when={local.presets}>
          <ColorPickerBase.SwatchGroup>
            <For each={local.presets}>
              {(color) => (
                <ColorPickerBase.SwatchTrigger value={color}>
                  <ColorPickerBase.Swatch value={color} />
                </ColorPickerBase.SwatchTrigger>
              )}
            </For>
          </ColorPickerBase.SwatchGroup>
        </Show>
        {local.children}
      </ColorPickerBase.Content>
    );

    return (
      <ColorPickerBase.Root class={local.class} inline={local.inline} {...others}>
        <Show when={local.label}>
          <ColorPickerBase.Label>{local.label}</ColorPickerBase.Label>
        </Show>
        <ColorPickerBase.Control>
          <ColorPickerBase.ValueSwatch />
          <ColorPickerBase.Trigger>
            <ChevronDownIcon />
          </ColorPickerBase.Trigger>
        </ColorPickerBase.Control>
        <Show
          when={local.inline}
          fallback={
            <Portal>
              <ColorPickerBase.Positioner>{pickerContent}</ColorPickerBase.Positioner>
            </Portal>
          }
        >
          {pickerContent}
        </Show>
      </ColorPickerBase.Root>
    );
  };
  ```

- [ ] Create inline SVG icons: `ChevronDownIcon`, `CheckIcon` (for SwatchIndicator)
- [ ] Export composite `ColorPicker`
- [ ] Additional named exports for advanced composition:
  - **ColorPickerArea**, **ColorPickerChannelSlider**, **ColorPickerChannelInput**, **ColorPickerSwatchGroup**, **ColorPickerSwatch**, etc.
- [ ] Re-export base parts: `export * from "./color-picker.base"`
- [ ] Re-export variants: `export { colorPickerVariants, type ColorPickerVariants } from "@fan-ui/core"`

### 6. Solid Barrel: `packages/solid/src/index.ts`

- [ ] Add `export * from "./color-picker"` in alphabetical order (after `collapsible`/`combobox`, before `date-picker`)

### 7. Demo: `apps/docs/src/components/color-picker-demo/`

- [ ] Create `ColorPickerBasicDemo.tsx` — basic color picker with presets
  - Imports: `import { ColorPicker } from "@fan-ui/solid"`
  - Usage: `<ColorPicker label="Color" presets={["#ff0000", "#00ff00", "#0000ff"]} />`
- [ ] Create `ColorPickerInlineDemo.tsx` — inline layout (no popover)
- [ ] Create `ColorPickerControlledDemo.tsx` — controlled `value` + `onValueChange`
- [ ] Create `ColorPickerRootProviderDemo.tsx` — advanced machine-controlled
- [ ] All demos must only import named composites, never from `.base.tsx`

### 8. Docs: `apps/docs/src/content/docs/components/color-picker.mdx`

- [ ] Create MDX page with frontmatter:
  ```yaml
  title: Color Picker
  description: A color selection component with saturation/brightness area, channel sliders, and swatch presets.
  category: Overlay
  updatedDate: 2026-06-06
  ```
- [ ] Import ALL demo files, render BasicDemo first
- [ ] Link to Ark UI: `https://ark-ui.com/docs/components/color-picker`
- [ ] Add Installation section (CLI + Manual with recipe/code blocks)
- [ ] Add Usage section with:
  - Basic import + `<ColorPicker>` with presets
  - `### Inline` for inline rendering
  - `### Controlled` example
- [ ] Add Advanced Usage section (RootProvider, custom channel layout)
- [ ] Add API Reference section linking to Ark UI

## Pattern C Specifics (DatePicker Pattern)

- Base exports individual named parts
- Index.tsx re-exports base via `export * from "./color-picker.base"`
- Composite wraps content in `<Portal>` (with `inline` fallback)
- Composite handles Label, Control, and Portal content layout
- SVG icons inline (chevron, checkmark)
- Large number of parts → composite provides sensible defaults while exposing all parts for customization

## Reference: DatePicker Architecture

```
packages/solid/src/date-picker/
├── date-picker.base.tsx   # Individual exports per Ark UI part
└── index.tsx              # Composite DatePicker, CalendarGridView, SVG icons, Portal wrapping
```
