import { Button } from "@fan-ui/solid";
import {
  createSignal,
  createMemo,
  type ParentProps,
  Show,
  onMount,
  onCleanup,
  splitProps,
  type JSX,
  children,
  createEffect,
} from "solid-js";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";

// Register languages at module scope so they're available when createEffect runs
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);

// Common language alias mappings
// Note: tsx uses javascript grammar because highlight.js typescript has no JSX support
const LANG_MAP: Record<string, string> = {
  ts: "typescript",
  tsx: "javascript",
  js: "javascript",
  jsx: "javascript",
  sh: "bash",
  shell: "bash",
  json: "javascript",
  yaml: "bash",
  md: "bash",
  zsh: "bash",
  fish: "bash",
};

const MAX_HEIGHT = 200;

/** Strip common leading whitespace from each line. */
function dedent(s: string): string {
  const lines = s.split("\n");
  const minIndent = lines
    .filter((l) => l.trim().length > 0)
    .reduce((min, l) => Math.min(min, l.length - l.trimStart().length), Infinity);
  if (!isFinite(minIndent) || minIndent === 0) return s;
  return lines.map((l) => l.slice(minIndent)).join("\n");
}

/** Normalize a code string: trim + dedent */
function normalize(code: string): string {
  return dedent(code.trim());
}

interface CodeBlockProps extends ParentProps<JSX.HTMLAttributes<HTMLPreElement>> {
  /** Language for syntax highlighting (required). */
  lang: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const [copied, setCopied] = createSignal(false);
  const [expanded, setExpanded] = createSignal(false);
  const [overflowing, setOverflowing] = createSignal(false);
  // oxlint-disable-next-line no-unassigned-vars
  let preRef: HTMLPreElement | undefined;
  // oxlint-disable-next-line no-unassigned-vars
  let codeRef: HTMLElement | undefined;

  const [local, rest] = splitProps(props, ["class", "style", "classList", "children", "lang"]);

  // Reactive code content — tracks children reactively
  const code = createMemo(() => {
    const resolved = children(() => local.children)();
    if (typeof resolved !== "string") throw Error("the children of codeblocks should be a string");
    return normalize(resolved);
  });

  const checkOverflow = () => {
    if (preRef && preRef.scrollHeight > MAX_HEIGHT) {
      setOverflowing(true);
    }
  };

  // Track previous content to avoid redundant re-highlighting
  let prevCode: string | undefined;

  createEffect(() => {
    // Apply syntax highlighting
    if (codeRef) {
      const content = code();
      // Skip if content hasn't changed since last highlight
      if (content === prevCode) return;
      prevCode = content;

      const lang = LANG_MAP[local.lang] || local.lang;
      try {
        const result = hljs.highlight(content, { language: lang });
        codeRef.innerHTML = result.value;
      } catch {
        // Fallback to plain text if highlighting fails (e.g. unknown language)
        codeRef.textContent = content;
      }

      // Re-check overflow after highlighting changes DOM height
      requestAnimationFrame(checkOverflow);
    }
  });

  onMount(() => {
    // Defer overflow measurement until after highlighting is applied
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(checkOverflow);
    });

    // Watch for content changes
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
        class={`whitespace-pre-wrap ${local.class ? ` ${local.class}` : ""}`}
        classList={{
          "cursor-pointer": overflowing() && !expanded(),
          "overflow-hidden": overflowing() && !expanded(),
        }}
        style={{
          ...(local.style as any),
          ...(overflowing() && !expanded()
            ? { "max-height": `${MAX_HEIGHT}px`, "overflow-y": "hidden" }
            : {}),
          "word-break": "break-word",
          transition: "max-height 0.3s ease",
        }}
        {...rest}
      >
        <code ref={codeRef}>{code()}</code>
      </pre>
      <Show when={overflowing()}>
        <Show when={!expanded()}>
          <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/80 dark:from-black/40 to-transparent" />
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
        class="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 dark:hover:text-foreground transition-colors"
        onClick={() => {
          const resolved = code();
          navigator.clipboard.writeText(resolved);
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
