## What to build

Configure Astro's built-in Shiki to output dual-theme CSS variables (for light and dark modes). Port the `ThemeToggle.tsx` component from the old site and hook it into the HTML root attribute so that standard MDX codeblocks switch between light and dark modes instantly without JavaScript re-renders. Verify theme toggling in E2E.

## Acceptance criteria

- [x] Astro Shiki is configured with dual themes (light and dark).
- [x] `ThemeToggle.tsx` is ported and functional.
- [x] Toggling the theme changes the root HTML attribute, causing Shiki codeblocks to swap colors via CSS variables.
- [x] E2E tests verify the theme toggling behavior on a page containing a codeblock.

## Blocked by

- Issue 02 (02-multi-framework-routing.md)
