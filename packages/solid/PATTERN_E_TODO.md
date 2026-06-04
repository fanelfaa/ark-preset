# Pattern E Refactoring Tracker

**Pattern**: Namespace base with separate entry points (see `packages/solid/src/AGENTS.md`)

**Reference implementations**: segment-group, radio-group, dialog, popover

**Total Ark UI wrapper components**: 29

| Status     | Count  |
| ---------- | ------ |
| ✅ Done    | 26     |
| 🔜 Pending | 3      |

---

## ✅ Already Pattern E (17)

| #   | Component     | Notes                                |
| --- | ------------- | ------------------------------------ |
| 1   | segment-group | Reference                            |
| 2   | radio-group   | Reference                            |
| 3   | dialog        | Reference (stashed)                  |
| 4   | popover       | Reference (stashed)                  |
| 5   | toggle-group  | Pure namespace, simple               |
| 6   | toast         | Pure namespace, simple               |
| 7   | tabs          | Pure namespace                       |
| 8   | combobox      | Pure namespace                       |
| 9   | select        | Pure namespace, complex              |
| 10  | tooltip       | Pure namespace                       |
| 11  | accordion     | Pattern A → E, composite ItemTrigger |
| 12  | avatar        | Pattern A → E, simple composites     |
| 13  | collapsible   | Pattern A → E, composite Indicator   |
| 14  | pin-input     | Pattern A → E, 5 parts               |
| 15  | progress      | Pattern A → E, 7 parts               |
| 16  | slider        | Pattern A → E, 11 parts              |
| 17  | toggle        | Pattern A → E, 2 parts               |

---

## 🔜 Pending: Ark UI Wrappers Needing Pattern E (15)

### Tier 1 — Low Complexity (easy wins)

Simple pass-throughs with few parts. Good candidates to start.

- [x] **accordion** — Pattern A → E. Composite ItemTrigger with auto Indicator.
- [x] **avatar** — Pattern A → E. Simple alias composites.
- [x] **collapsible** — Pattern A → E. CollapsibleIndicator composite with chevron.
- [x] **pin-input** — Pattern A → E. 5 base parts. No composite wrapping.
- [x] **progress** — Pattern A → E. 7 base parts. No composite wrapping.
- [x] **slider** — Pattern A → E. 11 base parts. No composite wrapping.
- [x] **toggle** — Pattern A → E. 2 base parts. Simple.

### Tier 2 — Medium Complexity

Components with InnerComponent (SVG icons) or Field wrapper pattern.

- [x] **input** — Pattern A → E. Wraps Ark Field. 5 base parts.
- [x] **textarea** — Pattern A → E. Wraps Ark Field. 5 base parts.
- [x] **switch** — Pattern B → E. Has InnerComponent with SVG. 5 base parts.
- [x] **checkbox** — Pattern B → E. Has InnerComponent with SVG. 6 base parts.
- [x] **number-input** — Pattern B → E. Has InnerComponent with SVG. 10 base parts.
- [x] **password-input** — Pattern B → E. Has InnerComponent with SVG. 7 base parts.

### Tier 3 — High Complexity

Components with Portal wrapping, many parts, or custom composite logic.

- [x] **carousel** — Pattern A → E. 11 base parts.
- [x] **alert-dialog** — Pattern C → E. Portal + composite content. 10 base parts.
- [x] **scroll-area** — Pattern D → E. Composite with auto parts. 7 base parts.

### Tier 4 — Very High Complexity

Large APIs, many composite sub-components, complex index logic.

- [ ] **menu** — Pattern A. 16 base parts + Portal + composite items.
- [ ] **date-picker** — Pattern A. 15 base parts + calendar views.
- [ ] **drawer** — Flat file. Needs directory creation + base.tsx + index.tsx. Portal + composite content.

---

## ◻️ Not Applicable (9)

Simple HTML wrappers using `ark.*` factory — not Ark UI compound components.

| Component    | Reason                                     |
| ------------ | ------------------------------------------ |
| alert        | Single `ark.div`, no compound parts        |
| aspect-ratio | Single `ark.div`, no compound parts        |
| badge        | Single `ark.span`, no compound parts       |
| button       | Single `ark.button`, no compound parts     |
| card         | Multiple `ark.*` but no Ark UI primitive   |
| separator    | Single `ark.div`, no compound parts        |
| skeleton     | Single `ark.div`, no compound parts        |
| spinner      | Single `ark.span`, no compound parts       |
| typography   | Multiple `ark.*` tags, not Ark UI compound |

---

## ⚠️ CRITICAL RULE: Basic Demo Import Constraint

**Basic demo MUST NOT import from `.base.tsx` or `<ComponentBase>`.**
It must only import **named composite exports** from `index.tsx`.

```
// ❌ WRONG — basic demo imports ComponentBase
import { Dialog, DialogContent, DialogBase } from "@ui/solid";
// then uses DialogBase.Trigger, DialogBase.Header, etc.

// ✅ CORRECT — basic demo imports named composites only
import { SegmentGroup, SegmentGroupItem } from "@ui/solid";
```

**How to satisfy this rule**: If the basic demo needs a part (e.g., Trigger, Header, Title, Description, Footer), `index.tsx` **must export a composite version** of that part — a named export that internally uses the base namespace. Never force the basic demo to reach for `ComponentBase.*`.

**Example** — segment-group pattern:

```tsx
// index.tsx — composite named exports for basic use
const SegmentGroup: Component<...> = (props) => (
  <SegmentGroupBase.Root ...>
    <SegmentGroupBase.Indicator />
    {local.children}
  </SegmentGroupBase.Root>
);

const SegmentGroupItem: Component<...> = (props) => (
  <SegmentGroupBase.Item {...others}>
    <SegmentGroupBase.ItemText>{local.children}</SegmentGroupBase.ItemText>
    <SegmentGroupBase.ItemControl />
    <SegmentGroupBase.ItemHiddenInput />
  </SegmentGroupBase.Item>
);

export { SegmentGroup, SegmentGroupItem };
export { SegmentGroupBase }; // Only exported for advanced use (RootProvider)
```

**When is `ComponentBase` allowed?**

- Only in **RootProvider demos** (advanced usage)
- Only for accessing base parts that don't have composite wrappers (rare)
- Never in basic demo code blocks in docs

---

## Refactoring Checklist (per component)

For each pending component, the refactoring involves:

### Phase A — Base file (`<component>.base.tsx`)

- [ ] Change `export const PartA`, `export const PartB` → local `const PartA`, `const PartB`
- [ ] Add single `export const ComponentName = { Root, PartA, PartB, ... }` at bottom

### Phase B — Index file (`index.tsx`)

- [ ] Import namespace with alias: `import { X as XBase } from "./<component>.base"`
- [ ] Remove `export * from "./<component>.base"`
- [ ] Build composite component(s) using `XBase.Root`, `XBase.PartA`, etc.
- [ ] For every part the basic demo needs → create a **named composite export** in `index.tsx`
- [ ] Export composite(s) + `XBase` namespace (for advanced use only) + recipes
- [ ] **Verify**: basic demo can be written without importing `XBase` or the `.base.tsx` file

### Phase C — Demos & Docs

- [ ] Basic demo: import ONLY named composite exports from `index.tsx` barrel
- [ ] RootProvider demo: `ComponentBase` IS allowed here (advanced use)
- [ ] Update docs code blocks: basic examples show no `ComponentBase` import

### Phase D — Verify

- [ ] Run `moon run docs:build` — must exit 0

---

## Convention Reference

```tsx
// <component>.base.tsx — Single namespace export
const Root: Component<ArkX.RootProps> = (props) => { ... };
const Label: Component<ArkX.LabelProps> = (props) => { ... };
const Item: Component<ArkX.ItemProps> = (props) => { ... };

export const ComponentName = { Root, RootProvider, Label, Item, ... };
```

```tsx
// index.tsx — No export * from base
import { X as XBase } from "./<component>.base";

// Composite named exports — what basic demo actually imports
// Each component decides what composites to expose based on its API surface
const X: Component<...> = (props) => (
  <XBase.Root ...>
    {local.children}
  </XBase.Root>
);

// Export whatever wrappers the basic demo needs — not limited to Item/Content
export { X /*, XTrigger, XControl, XLabel, etc. — as needed */ };
export { XBase }; // Only for advanced use (RootProvider, custom composition)
export { xVariants, type XVariants } from "@ui/core";
```

```tsx
// Basic demo — NO ComponentBase import
// Imports only named composite exports that index.tsx provides
import { X /*, XTrigger, XLabel, ... */ } from "~/components/x";
```

```tsx
// RootProvider demo — ComponentBase IS allowed
import { X /* composites */, XBase } from "~/components/x"; // XBase for RootProvider
```
