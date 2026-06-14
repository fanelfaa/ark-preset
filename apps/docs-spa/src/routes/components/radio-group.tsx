import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, List, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import RadioGroupBasicDemo from "@demos/radio-group-demo/RadioGroupBasicDemo.tsx";
import RadioGroupControlledDemo from "@demos/radio-group-demo/RadioGroupControlledDemo.tsx";
import RadioGroupDisabledDemo from "@demos/radio-group-demo/RadioGroupDisabledDemo.tsx";
import RadioGroupRootProviderDemo from "@demos/radio-group-demo/RadioGroupRootProviderDemo.tsx";

export const Route = createFileRoute("/components/radio-group")({ component: RadioGroupPage });

function RadioGroupPage() {
  return (
    <>
      <H1>Radio Group</H1>
      <P>
        A component that allows users to select a single option from a set of mutually exclusive
        options.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/radio-group" />
      <RadioGroupBasicDemo />
      <Pre>{`

import { RadioGroup, RadioGroupItem } from "~/components/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="1" orientation="horizontal">
      <RadioGroupItem value="1">Credit Card</RadioGroupItem>
      <RadioGroupItem value="2">Paypal</RadioGroupItem>
      <RadioGroupItem value="3">Debit</RadioGroupItem>
    </RadioGroup>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add radio-group
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/radio-group.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const radioGroupVariants = tv({
  slots: {
    root: "flex gap-2",
    label: "text-sm font-medium text-foreground",
    item: [
      "inline-flex items-center gap-2",
      "data-[disabled]:opacity-80 data-[disabled]:cursor-not-allowed",
    ],
    itemControl: [
      "peer size-5 shrink-0 rounded-full border border-input ring-offset-background transition-colors disabled:cursor-not-allowed disabled:opacity-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=checked]:border-primary data-[state=checked]:border-[6px] data-[state=checked]:text-primary-foreground",
    ],
    itemIndicator: "size-2 rounded-full hidden",
    itemText: "text-sm font-medium text-foreground data-[disabled]:opacity-50",
    itemHiddenInput: "absolute opacity-0 w-0 h-0 pointer-events-none",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "flex-row items-center gap-6",
      },
      vertical: {
        root: "flex-col gap-2",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroupVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/radio-group/radio-group.base.tsx`:
        <Pre>{`import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import { splitProps, type Component } from "solid-js";
import { radioGroupVariants } from "../recipes/radio-group";

const styles = radioGroupVariants();

const Root: Component<ArkRadioGroup.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    <ArkRadioGroup.Root
      class={styles.root({ class: local.class, orientation: local.orientation })}
      orientation={local.orientation}
      {...others}
    />
  );
};

const RootProvider: Component<ArkRadioGroup.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkRadioGroup.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Label class={styles.label({ class: local.class })} {...others} />;
};

const Item: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemControl: Component<ArkRadioGroup.ItemControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <>
      <ArkRadioGroup.ItemControl class={styles.itemControl({ class: local.class })} {...others} />
      <ArkRadioGroup.ItemHiddenInput />
    </>
  );
};

const ItemText: Component<ArkRadioGroup.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkRadioGroup.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemHiddenInput = ArkRadioGroup.ItemHiddenInput;

const Indicator: Component<ArkRadioGroup.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkRadioGroup.Indicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

const RadioGroup = {
  Root,
  RootProvider,
  Label,
  Item,
  ItemControl,
  ItemText,
  Indicator,
  ItemHiddenInput,
};

export { RadioGroup };
export { ItemHiddenInput };`}</Pre>
        `src/components/radio-group/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { RadioGroup as RadioGroupBase } from "./radio-group.base";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupVariants } from "../recipes/radio-group";

const RadioGroup: Component<ArkRadioGroup.RootProps & RadioGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["orientation", "children"]);
  return (
    <RadioGroupBase.Root orientation={local.orientation} {...others}>
      <RadioGroupBase.Indicator />
      {local.children}
    </RadioGroupBase.Root>
  );
};

export { RadioGroup, RadioGroupBase };

export const RadioGroupItem: Component<ArkRadioGroup.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <RadioGroupBase.Item {...others}>
      <RadioGroupBase.ItemText>{local.children}</RadioGroupBase.ItemText>
      <RadioGroupBase.ItemControl />
      <RadioGroupBase.ItemHiddenInput />
    </RadioGroupBase.Item>
  );
};

export { radioGroupVariants, type RadioGroupVariants } from "../recipes/radio-group";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--foreground</InlineCode>, <InlineCode>--input</InlineCode>,{" "}
        <InlineCode>--primary</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import { RadioGroup, RadioGroupItem } from "~/components/radio-group";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<RadioGroup defaultValue="1" orientation="horizontal">
  <RadioGroupItem value="1">Credit Card</RadioGroupItem>
  <RadioGroupItem value="2">Paypal</RadioGroupItem>
  <RadioGroupItem value="3">Debit</RadioGroupItem>
</RadioGroup>
      `}</Pre>
      <H2>With Label</H2>
      <P>Add a label to describe the radio group.</P>
      <Pre>{`

<RadioGroup defaultValue="1" orientation="horizontal">
  <RadioGroupItem value="1">Credit Card</RadioGroupItem>
  <RadioGroupItem value="2">Paypal</RadioGroupItem>
</RadioGroup>
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>RadioGroup</InlineCode> doesn't provide enough control,
        import the raw primitive parts from the base file directly:
      </P>
      <Pre>{`

import { RadioGroup } from "~/components/radio-group/radio-group.base";
      `}</Pre>
      <P>
        Or import <InlineCode>RadioGroupBase</InlineCode> (the raw parts namespace) from the
        composite entry point:
      </P>
      <Pre>{`

import { RadioGroupBase } from "~/components/radio-group";
      `}</Pre>
      <H3>Controlled Value</H3>
      <P>
        Use <InlineCode>value</InlineCode> and <InlineCode>onValueChange</InlineCode> to control the
        selection state externally:
      </P>
      <RadioGroupControlledDemo />
      <Pre>{`

import { Index, createSignal } from "solid-js";
import { RadioGroupBase } from "~/components/radio-group";

const frameworks = ["React", "Solid", "Vue"];

export function ControlledDemo() {
  const [value, setValue] = createSignal("Solid");

  return (
    <div>
      <p class="text-sm text-muted-foreground">Selected: {value()}</p>
      <RadioGroupBase.Root value={value()} onValueChange={(e) => setValue(e.value)} orientation="horizontal">
        <RadioGroupBase.Indicator />
        <Index each={frameworks}>
          {(framework) => (
            <RadioGroupBase.Item value={framework()}>
              <RadioGroupBase.ItemText>{framework()}</RadioGroupBase.ItemText>
              <RadioGroupBase.ItemControl />
            </RadioGroupBase.Item>
          )}
        </Index>
      </RadioGroupBase.Root>
    </div>
  );
}
      `}</Pre>
      <H3>Disabled Item</H3>
      <P>
        Individual items can be disabled using the <InlineCode>disabled</InlineCode> prop:
      </P>
      <RadioGroupDisabledDemo />
      <Pre>{`

import { RadioGroup } from "~/components/radio-group/radio-group.base";

export function DisabledDemo() {
  return (
    <RadioGroup.Root defaultValue="React" orientation="horizontal">
      <RadioGroup.Item value="React">React</RadioGroup.Item>
      <RadioGroup.Item value="Solid">Solid</RadioGroup.Item>
      <RadioGroup.Item value="Vue" disabled>Vue</RadioGroup.Item>
    </RadioGroup.Root>
  );
}
      `}</Pre>
      <H3>Root Provider</H3>
      <P>
        Use <InlineCode>RadioGroupBase.RootProvider</InlineCode> when you need to access the radio
        group state outside of the component tree. This pattern uses the{" "}
        <InlineCode>useRadioGroup</InlineCode> hook from Ark UI to create a shared context that both
        the radio group and external elements can reference.
      </P>
      <RadioGroupRootProviderDemo />
      <Pre>{`

import { Index, createMemo } from "solid-js";
import { RadioGroupBase, RadioGroupItem } from "~/components/radio-group";
import { useRadioGroup } from "@ark-ui/solid/radio-group";

const paymentMethods = [
  { value: "1", label: "Credit Card" },
  { value: "2", label: "Paypal" },
  { value: "3", label: "Debit" },
];

export function RadioGroupWithExternalControl() {
  const radioGroup = useRadioGroup({ defaultValue: "1" });
  const value = createMemo(() => radioGroup().value);

  return (
    <div>
      {/* Access radio group state outside the tree */}
      <output>Value: {JSON.stringify(value())}</output>

      <RadioGroupBase.RootProvider value={radioGroup} orientation="horizontal">
        <RadioGroupBase.Label>Payment Method</RadioGroupBase.Label>
        <Index each={paymentMethods}>
          {(method) => <RadioGroupItem value={method().value}>{method().label}</RadioGroupItem>}
        </Index>
      </RadioGroupBase.RootProvider>
    </div>
  );
}
      `}</Pre>
      <P>The key difference:</P>
      <List>
        <li>
          <strong>
            <InlineCode>RadioGroup</InlineCode> (Root)
          </strong>{" "}
          — manages its own state internally. Use for simple, self-contained radio groups.
        </li>
        <li>
          <strong>
            <InlineCode>RadioGroupBase.RootProvider</InlineCode>
          </strong>{" "}
          — accepts a pre-created radio group context via <InlineCode>useRadioGroup</InlineCode>.
          Use when you need to read or control the radio group state from outside the component
          tree.
        </li>
      </List>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/radio-group">Ark UI Radio Group</A>{" "}
        documentation.
      </P>
    </>
  );
}
