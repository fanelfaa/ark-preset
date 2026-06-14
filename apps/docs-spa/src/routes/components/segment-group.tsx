import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import SegmentGroupBasicDemo from "@demos/segment-group-demo/SegmentGroupBasicDemo.tsx";
import SegmentGroupControlledDemo from "@demos/segment-group-demo/SegmentGroupControlledDemo.tsx";
import SegmentGroupDisabledDemo from "@demos/segment-group-demo/SegmentGroupDisabledDemo.tsx";
import SegmentGroupOutlineDemo from "@demos/segment-group-demo/SegmentGroupOutlineDemo.tsx";
import SegmentGroupRootProviderDemo from "@demos/segment-group-demo/SegmentGroupRootProviderDemo.tsx";

export const Route = createFileRoute("/components/segment-group")({ component: SegmentGroupPage });

function SegmentGroupPage() {
  return (
    <>
      <H1>Segment Group</H1>
      <P>
        A segmented control component for selecting one option from a set of mutually exclusive
        options.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/segment-group" />
      <SegmentGroupBasicDemo />
      <Pre lang="tsx">{`

import { SegmentGroup, SegmentGroupItem } from "~/components/segment-group";

export function SegmentGroupDemo() {
  return (
    <SegmentGroup defaultValue="React">
      <SegmentGroupItem value="React">React</SegmentGroupItem>
      <SegmentGroupItem value="Solid">Solid</SegmentGroupItem>
      <SegmentGroupItem value="Vue">Vue</SegmentGroupItem>
    </SegmentGroup>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add segment-group
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/segment-group.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from "tailwind-variants";

export const segmentGroupVariants = tv({
  slots: {
    root: "relative inline-flex items-center p-1 rounded-md bg-muted isolation-inline",
    label: "text-sm font-medium text-foreground",
    item: [
      "relative z-10 inline-flex items-center justify-center gap-2 px-3 py-1.5 h-full rounded-sm cursor-pointer select-none transition-colors duration-150 ease-out",
      "data-[state=checked]:text-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    ],
    itemText: "relative z-10 text-sm font-medium",
    itemControl: "hidden",
    indicator: "absolute z-0 rounded-sm bg-background shadow-sm transition-[left,top,width,height] duration-150 ease-out w-(--width) h-(--height) left-(--left)",
  },
  variants: {
    variant: {
      solid: {
        root: "bg-muted",
        item: "text-muted-foreground data-[state=checked]:text-foreground",
      },
      outline: {
        root: "bg-transparent border border-border",
        item: "text-muted-foreground data-[state=checked]:text-foreground",
        indicator: "border border-border shadow-none",
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col items-stretch",
        item: "w-full justify-center",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
  },
});

export type SegmentGroupVariants = VariantProps<typeof segmentGroupVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/segment-group/segment-group.base.tsx`:
        <Pre lang="tsx">{`import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { segmentGroupVariants, type SegmentGroupVariants } from "../recipes/segment-group";

type SegmentGroupVariantContextValue = Pick<SegmentGroupVariants, "variant" | "orientation">;

const SegmentGroupVariantContext = createContext<SegmentGroupVariantContextValue>();

const useSegmentGroupVariant = () => useContext(SegmentGroupVariantContext);

const styles = segmentGroupVariants();

const Root: Component<ArkSegmentGroup.RootProps & SegmentGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <SegmentGroupVariantContext.Provider value={{ variant: local.variant, orientation: local.orientation }}>
      <ArkSegmentGroup.Root
        class={styles.root({
          class: local.class,
          variant: local.variant,
          orientation: local.orientation,
        })}
        orientation={local.orientation}
        {...others}
      />
    </SegmentGroupVariantContext.Provider>
  );
};

const RootProvider: Component<ArkSegmentGroup.RootProviderProps & SegmentGroupVariants> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <SegmentGroupVariantContext.Provider value={{ variant: local.variant, orientation: local.orientation }}>
      <ArkSegmentGroup.RootProvider
        class={styles.root({
          class: local.class,
          variant: local.variant,
          orientation: local.orientation,
        })}
        {...others}
      />
    </SegmentGroupVariantContext.Provider>
  );
};

const Label: Component<ArkSegmentGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSegmentGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

const Item: Component<ArkSegmentGroup.ItemProps & SegmentGroupVariants> = (props) => {
  const ctx = useSegmentGroupVariant();
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <ArkSegmentGroup.Item
      class={styles.item({
        class: local.class,
        variant: local.variant ?? ctx?.variant,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const ItemText: Component<ArkSegmentGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkSegmentGroup.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemControl: Component<ArkSegmentGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkSegmentGroup.ItemControl class={styles.itemControl({ class: local.class })} {...others} />
  );
};

const ItemHiddenInput = ArkSegmentGroup.ItemHiddenInput;

const Indicator: Component<ArkSegmentGroup.IndicatorProps & SegmentGroupVariants> = (props) => {
  const ctx = useSegmentGroupVariant();
  const [local, others] = splitProps(props, ["class", "variant", "orientation"]);
  return (
    <ArkSegmentGroup.Indicator
      class={styles.indicator({
        class: local.class,
        variant: local.variant ?? ctx?.variant,
        orientation: local.orientation ?? ctx?.orientation,
      })}
      {...others}
    />
  );
};

const SegmentGroup = {
  Root,
  RootProvider,
  Label,
  Item,
  ItemText,
  ItemControl,
  ItemHiddenInput,
  Indicator,
};

export { SegmentGroup };
export { SegmentGroupVariantContext, useSegmentGroupVariant };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/segment-group/index.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from "solid-js";
import { SegmentGroup as SegmentGroupBase } from "./segment-group.base";
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import type { SegmentGroupVariants } from "../recipes/segment-group";

type SegmentGroupProps = ArkSegmentGroup.RootProps & SegmentGroupVariants;

const SegmentGroup: Component<SegmentGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["variant", "orientation", "children"]);
  return (
    <SegmentGroupBase.Root variant={local.variant} orientation={local.orientation} {...others}>
      <SegmentGroupBase.Indicator />
      {local.children}
    </SegmentGroupBase.Root>
  );
};

export { SegmentGroup, SegmentGroupBase };

export const SegmentGroupItem: Component<ArkSegmentGroup.ItemProps & SegmentGroupVariants> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <SegmentGroupBase.Item {...others}>
      <SegmentGroupBase.ItemText>{local.children}</SegmentGroupBase.ItemText>
      <SegmentGroupBase.ItemControl />
      <SegmentGroupBase.ItemHiddenInput />
    </SegmentGroupBase.Item>
  );
};

export { segmentGroupVariants, type SegmentGroupVariants } from "../recipes/segment-group";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component and use it inline:</P>
      <Pre lang="tsx">{`

import { SegmentGroup, SegmentGroupItem } from "~/components/segment-group";
      `}</Pre>
      <P>Basic horizontal segment group:</P>
      <Pre lang="tsx">{`

<SegmentGroup defaultValue="React">
  <SegmentGroupItem value="React">React</SegmentGroupItem>
  <SegmentGroupItem value="Solid">Solid</SegmentGroupItem>
  <SegmentGroupItem value="Vue">Vue</SegmentGroupItem>
</SegmentGroup>
      `}</Pre>
      <P>Vertical orientation:</P>
      <Pre lang="tsx">{`

<SegmentGroup defaultValue="Svelte" orientation="vertical">
  <SegmentGroupItem value="Svelte">Svelte</SegmentGroupItem>
  <SegmentGroupItem value="Vue">Vue</SegmentGroupItem>
</SegmentGroup>
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>SegmentGroup</InlineCode> doesn't provide enough control,
        import the raw primitive parts from the base file directly:
      </P>
      <Pre lang="tsx">{`

import { SegmentGroup, useSegmentGroupVariant } from "~/components/segment-group/segment-group.base";
      `}</Pre>
      <P>
        Or import <InlineCode>SegmentGroupBase</InlineCode> (the raw parts namespace) from the
        composite entry point:
      </P>
      <Pre lang="tsx">{`

import { SegmentGroupBase } from "~/components/segment-group";
      `}</Pre>
      <H3>Controlled Value</H3>
      <P>
        Use <InlineCode>value</InlineCode> and <InlineCode>onValueChange</InlineCode> to control the
        selection state externally:
      </P>
      <SegmentGroupControlledDemo />
      <Pre lang="tsx">{`

import { Index, createSignal } from "solid-js";
import { SegmentGroupBase } from "~/components/segment-group";

const frameworks = ["React", "Solid", "Vue"];

export function ControlledDemo() {
  const [value, setValue] = createSignal("Solid");
  return (
    <div>
      <p class="text-sm text-muted-foreground mb-2">Selected: {value()}</p>
      <SegmentGroupBase.Root value={value()} onValueChange={(e) => setValue(e.value)}>
        <SegmentGroupBase.Indicator />
        <Index each={frameworks}>
          {(framework) => (
            <SegmentGroupBase.Item value={framework()}>
              <SegmentGroupBase.ItemText>{framework()}</SegmentGroupBase.ItemText>
              <SegmentGroupBase.ItemControl />
              <SegmentGroupBase.ItemHiddenInput />
            </SegmentGroupBase.Item>
          )}
        </Index>
      </SegmentGroupBase.Root>
    </div>
  );
}
      `}</Pre>
      <H3>Disabled Item</H3>
      <P>
        Individual items can be disabled using the <InlineCode>disabled</InlineCode> prop:
      </P>
      <SegmentGroupDisabledDemo />
      <Pre lang="tsx">{`

import { SegmentGroup } from "~/components/segment-group/segment-group.base";

export function DisabledDemo() {
  return (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="React">React</SegmentGroup.Item>
      <SegmentGroup.Item value="Solid">Solid</SegmentGroup.Item>
      <SegmentGroup.Item value="Vue" disabled>Vue</SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}
      `}</Pre>
      <H3>Outline Variant</H3>
      <P>
        Use <InlineCode>{`variant="outline"`}</InlineCode> for a bordered style:
      </P>
      <SegmentGroupOutlineDemo />
      <Pre lang="tsx">{`

import { SegmentGroup } from "~/components/segment-group/segment-group.base";

export function OutlineDemo() {
  return (
    <SegmentGroup.Root defaultValue="React" variant="outline">
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="React">React</SegmentGroup.Item>
      <SegmentGroup.Item value="Solid">Solid</SegmentGroup.Item>
      <SegmentGroup.Item value="Vue">Vue</SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}
      `}</Pre>
      <H3>RootProvider Pattern</H3>
      <P>
        For full control over the segment group machine, use{" "}
        <InlineCode>useSegmentGroup</InlineCode> with{" "}
        <InlineCode>SegmentGroup.RootProvider</InlineCode>. This allows reading the internal state
        (e.g., selected value) outside the root:
      </P>
      <SegmentGroupRootProviderDemo />
      <Pre lang="tsx">{`

import { SegmentGroup } from "~/components/segment-group/segment-group.base";
import { useSegmentGroup } from "@ark-ui/solid/segment-group";

export function RootProviderDemo() {
  const segmentGroup = useSegmentGroup({ defaultValue: "React" });

  return (
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">Selected: {segmentGroup().value}</p>
      <SegmentGroup.RootProvider value={segmentGroup}>
        <SegmentGroup.Indicator />
        <SegmentGroup.Item value="React">React</SegmentGroup.Item>
        <SegmentGroup.Item value="Solid">Solid</SegmentGroup.Item>
        <SegmentGroup.Item value="Vue">Vue</SegmentGroup.Item>
      </SegmentGroup.RootProvider>
    </div>
  );
}
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/segment-group">Ark UI SegmentGroup</A>{" "}
        documentation.
      </P>
    </>
  );
}
