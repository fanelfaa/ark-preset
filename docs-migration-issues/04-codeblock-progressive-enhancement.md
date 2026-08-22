## What to build

Create the `<custom-code-block>` vanilla JS Web Component to handle the "Show more" expand/collapse logic and the "Copy" button. Write a Rehype plugin to automatically wrap Astro's generated `<pre>` tags in this custom element. Apply the global CSS to prevent FOUC (`max-height: 200px; overflow: hidden`). Write E2E tests verifying the copy button and expand toggles work.

## Acceptance criteria

- [ ] A Vanilla JS `<custom-code-block>` component is implemented with Copy and Expand logic.
- [ ] A custom Rehype plugin wraps all Markdown `<pre>` blocks in `<custom-code-block>`.
- [ ] Global CSS ensures codeblocks are clamped to `200px` on initial server render (zero FOUC).
- [ ] E2E tests verify the "Show more" toggle and "Copy" functionality on standard markdown codeblocks.

## Blocked by

- Issue 03 (03-shiki-theming.md)
