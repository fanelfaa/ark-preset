## What to build

Create the `ComponentPreview.astro` component to render live demo islands in its slot while highlighting raw source code strings (imported via `?raw`) using the `astro:components` `<Code>` component. Wrap the highlighted output in the `<custom-code-block>` web component so it inherits the same interactivity as standard markdown blocks.

## Acceptance criteria

- [ ] `ComponentPreview.astro` is created and can render slot children (live demos).
- [ ] It takes a `code` string prop and highlights it using `astro:components` `<Code>`.
- [ ] The highlighted output is wrapped in `<custom-code-block>` for consistent interactivity.
- [ ] E2E tests verify a page using `ComponentPreview` renders both the live demo and interactive codeblock correctly.

## Blocked by

- Issue 04 (04-codeblock-progressive-enhancement.md)
