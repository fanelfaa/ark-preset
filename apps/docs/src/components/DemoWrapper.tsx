import { type JSX } from "solid-js";

export function DemoWrapper(props: { children?: JSX.Element; class?: string }) {
  return (
    <div
      class={`relative z-2 rounded-2xl md:rounded-3xl border border-border p-4 md:p-6 bg-background/70 backdrop-blur-3xl not-prose${props.class ? " " + props.class : ""}`}
    >
      {props.children}
    </div>
  );
}
