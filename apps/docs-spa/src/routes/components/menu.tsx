import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import MenuBasicDemo from "@demos/menu-demo/MenuBasicDemo.tsx";
import MenuNestedDemo from "@demos/menu-demo/MenuNestedDemo.tsx";

export const Route = createFileRoute("/components/menu")({ component: MenuPage });

function MenuPage() {
  return (
    <>
      <H1>Menu</H1>
      <P>Displays a list of options that appears when a user interacts with a trigger button.</P>
      <DocsLink href="https://ark-ui.com/docs/components/menu" />
      <H2>Basic Usage</H2>
      <MenuBasicDemo />
      <Pre lang="tsx">{`

import { For } from "solid-js";
import { MenuTrigger, MenuContent, MenuItem, Menu } from "@fan-ui/solid";

const menuItems = [
  { value: "edit", label: "Edit" },
  { value: "duplicate", label: "Duplicate" },
  { value: "delete", label: "Delete" },
];

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent>
        <For each={menuItems}>
          {(item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          )}
        </For>
      </MenuContent>
    </Menu>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add menu
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/menu.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from "tailwind-variants";

export const menuVariants = tv({
  slots: {
    root: "",
    indicator: "size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180",
    positioner: "z-50",
    content:
      "min-w-[10rem] p-2 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    arrow: "",
    arrowTip: "h-2 w-2 rotate-45 border-b border-l border-border bg-popover",
    item: "flex items-center justify-between gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer transition-colors duration-150 data-[highlighted]:bg-accent data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    itemText: "text-sm",
    itemIndicator: "size-4 shrink-0 hidden data-[state=checked]:block",
    separator: "-mx-1 my-2 h-px bg-border/50",
    contextTrigger:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer transition-colors duration-150 data-[highlighted]:bg-accent",
    triggerItem:
      "flex items-center justify-between gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer transition-colors duration-150 data-[highlighted]:bg-accent data-[state=open]:bg-accent",
    checkboxItem:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer transition-colors duration-150 data-[highlighted]:bg-accent data-[checked]:font-medium",
    radioItem:
      "flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-sm cursor-pointer transition-colors duration-150 data-[highlighted]:bg-accent data-[checked]:font-medium",
    itemGroup: "p-1",
    itemGroupLabel: "px-2 py-1.5 text-xs text-muted-foreground",
  },
});

export type MenuVariants = VariantProps<typeof menuVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the base component file at `src/components/menu/menu.base.tsx`:
        <Pre lang="tsx">{`import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { splitProps, type Component } from "solid-js";
import { menuVariants } from "../recipes/menu";
import { buttonVariants, type ButtonVariants } from './recipes/button'

const styles = menuVariants();

// Direct re-exports (no styling needed)
const Root = ArkMenu.Root;
const RootProvider = ArkMenu.RootProvider;
const Trigger: Component<ArkMenu.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ['class', 'variant', 'size'])
  return (
    <ArkMenu.Trigger
      class={buttonVariants({ variant: local.variant, size: local.size, class: local.class })}
      {...others}
    />
  )
}

const RadioItemGroup = ArkMenu.RadioItemGroup;

// Styled wrappers
const Indicator: Component<ArkMenu.IndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Indicator class={styles.indicator({ class: local.class })} {...others} />;
};

const Positioner: Component<ArkMenu.PositionerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Positioner class={styles.positioner({ class: local.class })} {...others} />;
};

const Arrow: Component<ArkMenu.ArrowProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Arrow class={styles.arrow({ class: local.class })} {...others} />;
};

const ArrowTip: Component<ArkMenu.ArrowTipProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ArrowTip class={styles.arrowTip({ class: local.class })} {...others} />;
};

const Separator: Component<ArkMenu.SeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Separator class={styles.separator({ class: local.class })} {...others} />;
};

const ContextTrigger: Component<ArkMenu.ContextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkMenu.ContextTrigger class={styles.contextTrigger({ class: local.class })} {...others} />
  );
};

const TriggerItem: Component<ArkMenu.TriggerItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.TriggerItem class={styles.triggerItem({ class: local.class })} {...others} />;
};

const Content: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Content class={styles.content({ class: local.class })} {...others} />;
};

const Item: Component<ArkMenu.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.Item class={styles.item({ class: local.class })} {...others} />;
};

const ItemText: Component<ArkMenu.ItemTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ItemText class={styles.itemText({ class: local.class })} {...others} />;
};

const ItemIndicator: Component<ArkMenu.ItemIndicatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkMenu.ItemIndicator class={styles.itemIndicator({ class: local.class })} {...others} />
  );
};

const CheckboxItem: Component<ArkMenu.CheckboxItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.CheckboxItem class={styles.checkboxItem({ class: local.class })} {...others} />;
};

const RadioItem: Component<ArkMenu.RadioItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.RadioItem class={styles.radioItem({ class: local.class })} {...others} />;
};

const ItemGroup: Component<ArkMenu.ItemGroupProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkMenu.ItemGroup class={styles.itemGroup({ class: local.class })} {...others} />;
};

const ItemGroupLabel: Component<ArkMenu.ItemGroupLabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkMenu.ItemGroupLabel class={styles.itemGroupLabel({ class: local.class })} {...others} />
  );
};

export const Menu = {
  Root, RootProvider, Trigger, RadioItemGroup,
  Indicator, Positioner, Arrow, ArrowTip, Separator,
  ContextTrigger, TriggerItem, Content, Item, ItemText, ItemIndicator,
  CheckboxItem, RadioItem, ItemGroup, ItemGroupLabel,
};`}</Pre>
      </div>
      <div class="space-y-3">
        Create the composite wrapper at `src/components/menu/index.tsx`:
        <Pre lang="tsx">{`import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { Portal } from "solid-js/web";
import { splitProps, type Component } from "solid-js";
import { Menu as MenuBase } from "./menu.base";
import { buttonVariants, type ButtonVariants } from "../recipes/button";

const MenuTrigger: Component<ArkMenu.TriggerProps & ButtonVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "size"]);
  return (
    <MenuBase.Trigger
      class={local.class}
      variant={local.variant || "outline"}
      size={local.size}
      {...others}
    >
      {props.children}
      <MenuBase.Indicator>
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </MenuBase.Indicator>
    </MenuBase.Trigger>
  );
};

const MenuContent: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <Portal>
      <MenuBase.Positioner>
        <MenuBase.Content class={local.class} {...others}>
          <MenuBase.Arrow />
          {local.children}
        </MenuBase.Content>
      </MenuBase.Positioner>
    </Portal>
  );
};



const MenuItem: Component<ArkMenu.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.Item class={local.class} {...others}>
      <MenuBase.ItemText>{local.children}</MenuBase.ItemText>
      <MenuBase.ItemIndicator>
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
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </MenuBase.ItemIndicator>
    </MenuBase.Item>
  );
};

const MenuTriggerItem: Component<ArkMenu.TriggerItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.TriggerItem class={local.class} {...others}>
      {local.children}
      <MenuBase.Indicator>
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
      </MenuBase.Indicator>
    </MenuBase.TriggerItem>
  );
};

const MenuSeparator: Component<ArkMenu.SeparatorProps> = (props) => {
  return <MenuBase.Separator {...props} />;
};

const NestedMenuContent: Component<ArkMenu.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <MenuBase.Positioner>
      <MenuBase.Content class={local.class} {...others}>
        {local.children}
      </MenuBase.Content>
    </MenuBase.Positioner>
  );
};




export { MenuTrigger, MenuContent, MenuItem, MenuTriggerItem, MenuSeparator, NestedMenuContent, MenuBase };
export { menuVariants, type MenuVariants } from "../recipes/menu";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--accent</InlineCode>, <InlineCode>--border</InlineCode>,{" "}
        <InlineCode>--popover</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import {
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "~/components/menu";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

import { For } from "solid-js";
import { MenuTrigger, MenuContent, MenuItem, Menu } from "~/components/menu";

<Menu>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuContent>
    <For each={items}>
      {(item) => (
        <MenuItem value={item.value}>{item.label}</MenuItem>
      )}
    </For>
  </MenuContent>
</Menu>
      `}</Pre>
      <P>Nested submenus:</P>
      <MenuNestedDemo />
      <Pre lang="tsx">{`

import { MenuTrigger, MenuContent, MenuTriggerItem, MenuItem, MenuSeparator, NestedMenuContent, Menu } from "~/components/menu";

<Menu>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuContent>
    <MenuItem value="new">New...</MenuItem>
    <Menu>
      <MenuTriggerItem>Share</MenuTriggerItem>
      <NestedMenuContent>
        <MenuItem value="email">Email</MenuItem>
      </NestedMenuContent>
    </Menu>
  </MenuContent>
</Menu>
      `}</Pre>
      <P>With separator:</P>
      <Pre lang="tsx">{`

<MenuItem value="edit">Edit</MenuItem>
<MenuSeparator />
<MenuItem value="delete">Delete</MenuItem>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/menu">Ark UI Menu</A> documentation.
      </P>
    </>
  );
}
