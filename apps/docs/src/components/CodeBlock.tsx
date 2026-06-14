import { Button } from "@fan-ui/solid";
import {
  children,
  createSignal,
  type ParentProps,
  Show,
  onMount,
  onCleanup,
  splitProps,
} from "solid-js";

const MAX_HEIGHT = 200;

export default function CodeBlock(
  props: ParentProps<Pick<HTMLPreElement, "className" | "classList" | "style">>,
) {
  const [copied, setCopied] = createSignal(false);
  const [expanded, setExpanded] = createSignal(false);
  const [overflowing, setOverflowing] = createSignal(false);
  let preRef: HTMLPreElement | undefined;

  const resolvedChildren = children(() => props.children);
  const [local, rest] = splitProps(props, ["className", "style", "classList"]);

  const checkOverflow = () => {
    if (preRef && preRef.scrollHeight > MAX_HEIGHT) {
      setOverflowing(true);
    }
  };

  onMount(() => {
    // Defer measurement until after paint + syntax highlighting
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(checkOverflow);
    });

    // Watch for content changes (e.g. syntax highlighting applied async)
    const observer = new ResizeObserver(checkOverflow);
    if (preRef) observer.observe(preRef);

    onCleanup(() => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    });
  });

  return (
    <div class="relative isolate">
      <pre
        ref={preRef}
        classList={{ "cursor-pointer": overflowing() && !expanded() }}
        style={{
          ...(local.style as any),
          "max-height": expanded() ? "10000px" : `${MAX_HEIGHT}px`,
          "overflow-y": expanded() ? "auto" : "hidden",
          "overflow-x": "hidden",
          "white-space": "pre-wrap",
          "word-break": "break-word",
          transition: "max-height 0.3s ease",
        }}
        {...rest}
      />
      <Show when={overflowing()}>
        <Show when={!expanded()}>
          <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/80 to-transparent" />
        </Show>
        <Button
          variant="outline"
          class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
          onClick={() => setExpanded(!expanded())}
          aria-label={expanded() ? "Collapse code" : "Expand code"}
        >
          {expanded() ? "Show less" : "Show more"}
        </Button>
      </Show>
      <button
        class="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:text-white hover:bg-muted-foreground/10 transition-colors"
        on:click={() => {
          const text = (resolvedChildren() as HTMLElement)?.innerText || "";
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        aria-label="Copy code"
      >
        {copied() ? (
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
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
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
    </div>
  );
}
