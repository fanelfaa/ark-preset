import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ToastBasicDemo from "@demos/toast-demo/ToastBasicDemo.tsx";

export const Route = createFileRoute("/components/toast")({ component: ToastPage });

function ToastPage() {
  return (
    <>
      <H1>Toast</H1>
      <P>A notification component for displaying transient messages with multiple variants.</P>
      <DocsLink href="https://ark-ui.com/docs/components/toast" />
      <ToastBasicDemo />
      <Pre lang="tsx">{`

import { createToaster, Toaster } from "~/components/toast";

const toaster = createToaster({
  placement: "bottom-end",
  timeout: 5000,
});

export function ToastDemo() {
  return (
    <div class="flex flex-col gap-4">
      <button
        class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
        onClick={() => toaster.create({ title: "Hello", description: "World" })}
      >
        Show Toast
      </button>
      <Toaster toaster={toaster} />
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add toast
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/toast.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const toastVariants = tv({
  slots: {
    root: "group pointer-events-auto relative flex w-full min-w-sm max-w-sm items-center justify-between space-x-4 overflow-hidden rounded-md border border-border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
    title: "text-sm font-semibold",
    description: "text-sm opacity-90",
    closeTrigger:
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:outline-none focus:ring-2",
    actionTrigger:
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring",
  },
  variants: {
    variant: {
      default: { root: "bg-background border-border" },
      loading: { root: "bg-background border-border" },
      error: { root: "border-red-500 bg-red-50 text-red-950" },
      success: { root: "border-green-500 bg-green-50 text-green-950" },
      info: { root: "border-blue-500 bg-blue-50 text-blue-950" },
      warning: { root: "border-yellow-500 bg-yellow-50 text-yellow-950" },
    },
  },
  defaultVariants: { variant: "default" },
});

export type ToastVariants = VariantProps<typeof toastVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory at `src/components/toast/`: `toast.base.tsx`:
        <Pre lang="tsx">{`import { Toast as ArkToast } from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { toastVariants } from "../recipes/toast";

const styles = toastVariants();

const Root: Component<ArkToast.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Root class={styles.root({ class: local.class })} {...others} />;
};

const Title: Component<ArkToast.TitleProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Title class={styles.title({ class: local.class })} {...others} />;
};

const Description: Component<ArkToast.DescriptionProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.Description class={styles.description({ class: local.class })} {...others} />;
};

const CloseTrigger: Component<ArkToast.CloseTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.CloseTrigger class={styles.closeTrigger({ class: local.class })} {...others} />;
};

const ActionTrigger: Component<ArkToast.ActionTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkToast.ActionTrigger class={styles.actionTrigger({ class: local.class })} {...others} />;
};

export const Toast = { Root, Title, Description, CloseTrigger, ActionTrigger };`}</Pre>
        `index.tsx`:
        <Pre lang="tsx">{`import { Toaster as ArkToaster, createToaster, type CreateToasterReturn } from "@ark-ui/solid/toast";
import { splitProps, type Component } from "solid-js";
import { Toast as ToastBase } from "./toast.base";
import { toastVariants, type ToastVariants } from "../recipes/toast";

type ToasterProps = {
  toaster: CreateToasterReturn;
  class?: string;
};

const Toaster: Component<ToasterProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ArkToaster class={local.class} {...others}>
      {(toast) => {
        const variant = (toast().type as ToastVariants["variant"]) || "default";
        const styles = toastVariants({ variant });
        return (
          <ToastBase.Root class={styles.root()}>
            <div class="grid gap-1">
              {toast().title && <ToastBase.Title class={styles.title()}>{toast().title}</ToastBase.Title>}
              {toast().description && (
                <ToastBase.Description class={styles.description()}>{toast().description}</ToastBase.Description>
              )}
            </div>
            <ToastBase.CloseTrigger class={styles.closeTrigger()}>✕</ToastBase.CloseTrigger>
            {toast().action && (
              <ToastBase.ActionTrigger class={styles.actionTrigger()}>{toast().action?.label}</ToastBase.ActionTrigger>
            )}
          </ToastBase.Root>
        );
      }}
    </ArkToaster>
  );
};

export { Toaster, createToaster, ToastBase };
export { toastVariants, type ToastVariants } from "../recipes/toast";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up (
        <InlineCode>--primary</InlineCode>, <InlineCode>--ring</InlineCode>,{" "}
        <InlineCode>--border</InlineCode>, etc.) or override the utility classes to match your
        design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import { createToaster, Toaster } from "~/components/toast";
      `}</Pre>
      <P>Basic toast:</P>
      <Pre lang="tsx">{`

const toaster = createToaster({
  placement: "bottom-end",
  timeout: 5000,
})

<button onClick={() => toaster.create({ title: 'Hello', description: 'World' })}>
  Show Toast
</button>

<Toaster toaster={toaster} />
      `}</Pre>
      <P>With action:</P>
      <Pre lang="tsx">{`

toaster.create({
  title: "File deleted",
  description: "Your file has been removed.",
  action: { label: "Undo", onClick: () => console.log("undo") },
});
      `}</Pre>
      <H2>Variants</H2>
      <P>
        Use the <InlineCode>type</InlineCode> property to change the visual style.
      </P>
      <Pre lang="tsx">{`

toaster.create({ title: "Default toast", description: "This is a default message" });
toaster.create({ title: "Info toast", type: "info" });
toaster.create({ title: "Success toast", type: "success" });
toaster.create({ title: "Warning toast", type: "warning" });
toaster.create({ title: "Error toast", type: "error" });
      `}</Pre>
      <H2>Advanced Usage</H2>
      <P>When you need more control, import raw primitive parts directly from the base file:</P>
      <Pre lang="tsx">{`

import { Toast } from "~/components/toast/toast.base";
      `}</Pre>
      <P>
        Or import <InlineCode>ToastBase</InlineCode> (the raw parts namespace) from the composite
        entry point:
      </P>
      <Pre lang="tsx">{`

import { ToastBase } from "~/components/toast";
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/toast">Ark UI Toast</A> documentation.
      </P>
    </>
  );
}
