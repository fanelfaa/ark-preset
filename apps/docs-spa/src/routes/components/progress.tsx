import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import ProgressBasicDemo from "@demos/progress-demo/ProgressBasicDemo.tsx";

export const Route = createFileRoute("/components/progress")({ component: ProgressPage });

function ProgressPage() {
  return (
    <>
      <H1>Progress</H1>
      <P>A progress bar used to show the completion status of an ongoing operation.</P>
      <DocsLink href="https://ark-ui.com/docs/components/progress" />
      <ProgressBasicDemo />
      <Pre>{`

import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressValueText,
} from "~/components/progress";

export function ProgressDemo() {
  return (
    <Progress value={65}  class="space-y-2">
      <ProgressLabel>Loading</ProgressLabel>
      <ProgressTrack />
      <ProgressValueText />
    </Progress>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add progress
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/progress.ts`:
        <Pre>{`import { tv, type VariantProps } from 'tailwind-variants'

export const progressVariants = tv({
  slots: {
    root: "relative w-full",
    label: "text-sm font-medium text-foreground",
    track: "h-2 w-full overflow-hidden rounded-full bg-muted",
    range: "h-full w-full flex-1 bg-primary transition-all data-[state=indeterminate]:animate-progress-indeterminate",
    valueText: "text-sm font-medium tabular-nums text-muted-foreground",
    view: "",
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/progress/progress.base.tsx`:
        <Pre>{`import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import { splitProps, type Component } from "solid-js";
import { progressVariants } from "../recipes/progress";

const styles = progressVariants();

const Root: Component<ArkProgress.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkProgress.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Label: Component<ArkProgress.LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Label class={styles.label({ class: local.class })} {...others} />;
};

const Track: Component<ArkProgress.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Track class={styles.track({ class: local.class })} {...others} />;
};

const Range: Component<ArkProgress.RangeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.Range class={styles.range({ class: local.class })} {...others} />;
};

const ValueText: Component<ArkProgress.ValueTextProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.ValueText class={styles.valueText({ class: local.class })} {...others} />;
};

const View: Component<ArkProgress.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkProgress.View class={styles.view({ class: local.class })} {...others} />;
};

export const Progress = { Root, RootProvider, Label, Track, Range, ValueText, View };`}</Pre>
        `src/components/progress/index.tsx`:
        <Pre>{`import { splitProps, type Component } from "solid-js";
import { Progress as ProgressBase } from "./progress.base";
import { Progress as ArkProgress } from "@ark-ui/solid/progress";

const Progress = ProgressBase.Root;
const ProgressRootProvider = ProgressBase.RootProvider;
const ProgressLabel = ProgressBase.Label;
const ProgressValueText = ProgressBase.ValueText;

// Composite wrappers — auto-include sub-parts
const ProgressTrack: Component<ArkProgress.TrackProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ProgressBase.Track {...others}>
      <ProgressBase.Range />
      {local.children}
    </ProgressBase.Track>
  );
};

export {
  Progress,
  ProgressRootProvider,
  ProgressLabel,
  ProgressTrack,
  ProgressValueText,
  ProgressBase,
};

export { progressVariants, type ProgressVariants } from "../recipes/progress";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up or
        override the utility classes to match your design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre>{`

import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressValueText,
} from "~/components/progress";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre>{`

<Progress value={65}  class="space-y-2">
  <ProgressLabel>Loading</ProgressLabel>
  <ProgressTrack />
  <ProgressValueText />
</Progress>
      `}</Pre>
      <H2>Indeterminate</H2>
      <P>
        Omit the <InlineCode>value</InlineCode> prop to render an indeterminate progress bar:
      </P>
      <Pre>{`

<Progress>
  <ProgressLabel>Loading...</ProgressLabel>
  <ProgressTrack />
</Progress>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/progress">Ark UI Progress</A>{" "}
        documentation.
      </P>
    </>
  );
}
