import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import TagsInputBasicDemo from "@demos/tags-input-demo/TagsInputBasicDemo.tsx";
import TagsInputControlledDemo from "@demos/tags-input-demo/TagsInputControlledDemo.tsx";
import TagsInputDisabledDemo from "@demos/tags-input-demo/TagsInputDisabledDemo.tsx";
import TagsInputInvalidDemo from "@demos/tags-input-demo/TagsInputInvalidDemo.tsx";
import TagsInputRootProviderDemo from "@demos/tags-input-demo/TagsInputRootProviderDemo.tsx";

export const Route = createFileRoute("/components/tags-input")({ component: TagsInputPage });

function TagsInputPage() {
  return (
    <>
      <H1>Tags Input</H1>
      <P>Allows entering multiple tags/values in a text input field.</P>
      <DocsLink href="https://ark-ui.com/docs/components/tags-input" />
      <TagsInputBasicDemo />
      <Pre>{`

import { TagsInput } from "~/components/tags-input";

export default function TagsInputBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6 space-y-6">
      <div>
        <p class="text-sm text-muted-foreground mb-2">Basic tags input</p>
        <TagsInput defaultValue={["React", "Solid"]} label="Frameworks" />
      </div>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add tags-input
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/tags-input.ts`:
        <Pre>{`import { tv, type VariantProps } from "tailwind-variants";

export const tagsInputVariants = tv({
  slots: {
    root: "flex flex-col gap-1.5 w-full max-w-sm",
    label: "text-sm font-medium text-foreground select-none data-[disabled]:opacity-50",
    control: [
      "relative flex flex-wrap items-center gap-1 min-h-8 w-full rounded-md border border-input bg-background px-2.5 py-1 text-sm ring-offset-background",
      "has-[button]:pr-8",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
      "data-[disabled]:opacity-50",
      "data-[invalid]:border-destructive data-[invalid]:focus-within:ring-destructive",
    ],
    input: [
      "flex-1 min-w-16 h-auto px-1 text-sm bg-transparent border-none outline-none",
      "placeholder:text-muted-foreground text-foreground",
    ],
    clearTrigger: [
      "absolute top-1/2 right-2 -translate-y-1/2",
      "flex items-center justify-center p-1 rounded",
      "bg-transparent border-none cursor-pointer",
      "text-muted-foreground hover:text-foreground hover:bg-muted",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    ],
    item: "inline-flex items-center outline-none cursor-default",
    itemPreview: [
      "inline-flex items-center gap-1 py-0.5 pl-2 pr-1 rounded-sm h-6",
      "bg-muted text-sm text-foreground outline-none",
      "data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary",
    ],
    itemText: "font-medium text-sm",
    itemInput: [
      "min-w-16 px-2 py-0.5 text-sm bg-muted border border-border rounded",
      "outline-none text-foreground",
    ],
    itemDeleteTrigger: [
      "flex items-center justify-center p-0.5 rounded",
      "bg-transparent border-none cursor-pointer text-muted-foreground",
      "hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    ],
  },
});

export type TagsInputVariants = VariantProps<typeof tagsInputVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/tags-input/tags-input.base.tsx`:
        <Pre>{`import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { tagsInputVariants } from "../recipes/tags-input";

type TagsInputVariantContextValue = {
  disabled?: boolean;
};

const TagsInputVariantContext = createContext<TagsInputVariantContextValue>();

const useTagsInputVariant = () => useContext(TagsInputVariantContext);

const styles = tagsInputVariants();

const Root: Component<ArkTagsInput.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "disabled"]);
  return (
    <TagsInputVariantContext.Provider
      value={{ disabled: local.disabled }}
    >
      <ArkTagsInput.Root
        class={styles.root({ class: local.class })}
        disabled={local.disabled}
        {...others}
      />
    </TagsInputVariantContext.Provider>
  );
};

const RootProvider: Component<ArkTagsInput.RootProviderProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <TagsInputVariantContext.Provider value={{}}>
      <ArkTagsInput.RootProvider
        class={styles.root({ class: local.class })}
        {...others}
      />
    </TagsInputVariantContext.Provider>
  );
};

const Label: Component<ArkTagsInput.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.Label class={styles.label({ class: local.class })} {...others} />;
};

const Control: Component<ArkTagsInput.ControlProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.Control
      class={styles.control({ class: local.class })}
      {...others}
    />
  );
};

const Input: Component<ArkTagsInput.InputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.Input class={styles.input({ class: local.class })} {...others} />;
};

const ClearTrigger: Component<ArkTagsInput.ClearTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ClearTrigger class={styles.clearTrigger({ class: local.class })} {...others} />
  );
};

const Item: Component<ArkTagsInput.ItemProps> = (props) => {
  const ctx = useTagsInputVariant();
  const [local, others] = splitProps(props, ["class", "disabled"]);
  return (
    <ArkTagsInput.Item
      class={styles.item({ class: local.class })}
      disabled={local.disabled ?? ctx?.disabled}
      {...others}
    />
  );
};

const ItemPreview: Component<ArkTagsInput.ItemPreviewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ItemPreview class={styles.itemPreview({ class: local.class })} {...others} />
  );
};

const ItemText: Component<ArkTagsInput.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemInput: Component<ArkTagsInput.ItemInputProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkTagsInput.ItemInput class={styles.itemInput({ class: local.class })} {...others} />;
};

const ItemDeleteTrigger: Component<ArkTagsInput.ItemDeleteTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkTagsInput.ItemDeleteTrigger
      class={styles.itemDeleteTrigger({ class: local.class })}
      {...others}
    />
  );
};

const Context = ArkTagsInput.Context;
const HiddenInput = ArkTagsInput.HiddenInput;

const TagsInput = {
  Root,
  RootProvider,
  Label,
  Control,
  Input,
  ClearTrigger,
  Item,
  ItemPreview,
  ItemText,
  ItemInput,
  ItemDeleteTrigger,
  Context,
  HiddenInput,
};

export { TagsInput };
export { TagsInputVariantContext, useTagsInputVariant };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/tags-input/index.tsx`:
        <Pre>{`import { Index, splitProps, type Component } from "solid-js";
import { TagsInput as TagsInputBase } from "./tags-input.base";
import { TagsInput as ArkTagsInput } from "@ark-ui/solid/tags-input";
import type { TagsInputVariants } from "../recipes/tags-input";

type TagsInputProps = ArkTagsInput.RootProps &
  TagsInputVariants & {
    label?: string;
  };

const TagsInput: Component<TagsInputProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "children",
    "error",
    "disabled",
    "label",
  ]);
  return (
    <TagsInputBase.Root
      class={local.class}
      error={local.error}
      disabled={local.disabled}
      {...others}
    >
      <TagsInputBase.Context>
        {(api) => (
          <>
            {local.label && <TagsInputBase.Label>{local.label}</TagsInputBase.Label>}
            {local.children}
            <TagsInputBase.Control>
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInputBase.Item index={index} value={value()}>
                    <TagsInputBase.ItemPreview>
                      <TagsInputBase.ItemText>{value()}</TagsInputBase.ItemText>
                      <TagsInputBase.ItemDeleteTrigger>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </TagsInputBase.ItemDeleteTrigger>
                    </TagsInputBase.ItemPreview>
                    <TagsInputBase.ItemInput />
                  </TagsInputBase.Item>
                )}
              </Index>
              <TagsInputBase.Input />
            </TagsInputBase.Control>
          </>
        )}
      </TagsInputBase.Context>
      <TagsInputBase.HiddenInput />
    </TagsInputBase.Root>
  );
};

export { TagsInput, TagsInputBase };
export { tagsInputVariants, type TagsInputVariants } from "../recipes/tags-input";`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the component and use it inline:</P>
      <Pre>{`

import { TagsInput } from "~/components/tags-input";
      `}</Pre>
      <P>Basic tags input with a label:</P>
      <Pre>{`

<TagsInput defaultValue={["React", "Solid"]} label="Frameworks" />
      `}</Pre>
      <H3>Controlled Value</H3>
      <P>
        Use <InlineCode>value</InlineCode> and <InlineCode>onValueChange</InlineCode> to control the
        tag values externally:
      </P>
      <TagsInputControlledDemo />
      <Pre>{`

import { createSignal } from "solid-js";
import { TagsInput } from "~/components/tags-input";

export function ControlledDemo() {
  const [value, setValue] = createSignal(["Solid"]);
  return (
    <div>
      <p class="text-sm text-muted-foreground mb-2">Tags: {value().join(", ")}</p>
      <TagsInput
        value={value()}
        onValueChange={(e) => setValue(e.value)}
        label="Frameworks"
      />
    </div>
  );
}
      `}</Pre>
      <H3>Disabled</H3>
      <P>
        Use the <InlineCode>disabled</InlineCode> prop to disable the tags input:
      </P>
      <TagsInputDisabledDemo />
      <Pre>{`

import { TagsInput } from "~/components/tags-input";

export function DisabledDemo() {
  return (
    <TagsInput
      defaultValue={["React", "Solid"]}
      label="Frameworks"
      disabled
    />
  );
}
      `}</Pre>
      <H3>Invalid State</H3>
      <P>
        Use the <InlineCode>invalid</InlineCode> prop (from Ark UI) to mark the input as invalid:
      </P>
      <TagsInputInvalidDemo />
      <Pre>{`

import { TagsInput } from "~/components/tags-input";

export function InvalidDemo() {
  return (
    <TagsInput
      defaultValue={["React", "Solid"]}
      label="Frameworks"
      invalid
    />
  );
}
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>
        When the composite <InlineCode>TagsInput</InlineCode> doesn't provide enough control, import
        the raw primitive parts from the base file directly:
      </P>
      <Pre>{`

import { TagsInput } from "~/components/tags-input/tags-input.base";
      `}</Pre>
      <P>
        Or import <InlineCode>TagsInputBase</InlineCode> (the raw parts namespace) from the
        composite entry point:
      </P>
      <Pre>{`

import { TagsInputBase } from "~/components/tags-input";
      `}</Pre>
      <H3>RootProvider Pattern</H3>
      <P>
        For full control over the tags input machine, use <InlineCode>useTagsInput</InlineCode> with{" "}
        <InlineCode>TagsInputBase.RootProvider</InlineCode>:
      </P>
      <TagsInputRootProviderDemo />
      <Pre>{`

import { TagsInput } from "~/components/tags-input/tags-input.base";
import { useTagsInput } from "@ark-ui/solid/tags-input";

export function RootProviderDemo() {
  const tagsInput = useTagsInput({ defaultValue: ["React", "Solid"] });

  return (
    <div class="space-y-2">
      <p class="text-sm text-muted-foreground">Tags: {tagsInput().value.join(", ")}</p>
      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(api) => (
              <Index each={api().value}>
                {(value, index) => (
                  <TagsInput.Item index={index} value={value()}>
                    <TagsInput.ItemPreview>
                      <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                      <TagsInput.ItemDeleteTrigger>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </TagsInput.ItemDeleteTrigger>
                    </TagsInput.ItemPreview>
                    <TagsInput.ItemInput />
                  </TagsInput.Item>
                )}
              </Index>
            )}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add a tag..." />
          <TagsInput.ClearTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.RootProvider>
    </div>
  );
}
      `}</Pre>
      <H3>Custom Tag Rendering with TagsInputItem</H3>
      <P>
        For custom tag rendering (e.g., custom delete icon), use{" "}
        <InlineCode>TagsInputItem</InlineCode>:
      </P>
      <Pre>{`

import { Index } from "solid-js";
import { TagsInput, TagsInputItem } from "~/components/tags-input";

export function CustomItemDemo() {
  return (
    <TagsInput defaultValue={["React", "Solid"]}>
      <TagsInputBase.Label>Frameworks</TagsInputBase.Label>
      <TagsInputBase.Control>
        <Index each={api().value}>
          {(value, index) => (
            <TagsInputItem index={index} value={value()}>
              {value()}
            </TagsInputItem>
          )}
        </Index>
        <TagsInputBase.Input />
      </TagsInputBase.Control>
    </TagsInput>
  );
}
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/tags-input">Ark UI TagsInput</A>{" "}
        documentation.
      </P>
    </>
  );
}
