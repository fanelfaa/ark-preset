# Solid UI Components Status

## Legend

- **No marker** = Ark UI component (wraps `@ark-ui/solid/*`)
- **`(shadcn)`** = Pure HTML/CSS component for shadcn parity (no Ark UI equivalent)

## Implemented (31/88)

| Component          | Status  |
| ------------------ | ------- |
| [x] accordion      | ✅ Done |
| [x] alert          | ✅ Done |
| [x] alert-dialog   | ✅ Done |
| [x] aspect-ratio   | ✅ Done |
| [x] button         | ✅ Done |
| [x] carousel       | ✅ Done |
| [x] checkbox       | ✅ Done |
| [x] collapsible    | ✅ Done |
| [x] combobox       | ✅ Done |
| [x] date-picker    | ✅ Done |
| [x] dialog         | ✅ Done |
| [x] drawer         | ✅ Done |
| [x] input          | ✅ Done |
| [x] menu           | ✅ Done |
| [x] number-input   | ✅ Done |
| [x] password-input | ✅ Done |
| [x] pin-input      | ✅ Done |
| [x] popover        | ✅ Done |
| [x] radio-group    | ✅ Done |
| [x] select         | ✅ Done |
| [x] slider         | ✅ Done |
| [x] switch         | ✅ Done |
| [x] tabs           | ✅ Done |
| [x] toast          | ✅ Done |
| [x] toggle         | ✅ Done |
| [x] toggle-group   | ✅ Done |
| [x] tooltip        | ✅ Done |

## Not Implemented (62) — 20 Ark UI + 42 shadcn parity

### High Priority

| Component             | Status  |
| --------------------- | ------- |
| [x] Badge (shadcn)    | ✅ Done |
| [x] Card (shadcn)     | ✅ Done |
| [x] Skeleton (shadcn) | ✅ Done |

### Medium Priority

| Component                 | Status         |
| ------------------------- | -------------- |
| [x] avatar                | ✅ Done        |
| [x] Alert (shadcn)        | ✅ Done        |
| [x] Alert Dialog (shadcn) | ✅ Done        |
| [x] Aspect Ratio (shadcn) | ✅ Done        |
| [ ] Breadcrumb (shadcn)   | ⬜ Not started |
| [ ] Button Group (shadcn) | ⬜ Not started |
| [ ] Empty (shadcn)        | ⬜ Not started |
| [ ] field                 | ⬜ Not started |
| [ ] fieldset              | ⬜ Not started |
| [x] hover-card            | ✅ Done        |
| [ ] Input Group (shadcn)  | ⬜ Not started |
| [ ] Kbd (shadcn)          | ⬜ Not started |
| [ ] Label (shadcn)        | ⬜ Not started |
| [x] listbox               | ✅ Done        |
| [x] progress              | ✅ Done        |
| [x] separator             | ✅ Done        |
| [x] spinner               | ✅ Done        |
| [x] rating-group          | ✅ Done        |
| [x] scroll-area           | ✅ Done        |
| [x] segment-group         | ✅ Done        |
| [x] Separator (shadcn)    | ✅ Done        |
| [x] Spinner (shadcn)      | ✅ Done        |
| [ ] Table (shadcn)        | ⬜ Not started |
| [x] tags-input            | ✅ Done        |
| [x] textarea              | ✅ Done        |
| [x] typography            | ✅ Done        |

### Low Priority

| Component                  | Status         |
| -------------------------- | -------------- |
| [ ] angle-slider           | ⬜ Not started |
| [ ] clipboard              | ⬜ Not started |
| [ ] color-picker           | ⬜ Not started |
| [ ] Command (shadcn)       | ⬜ Not started |
| [ ] Context Menu (shadcn)  | ⬜ Not started |
| [ ] download-trigger       | ⬜ Not started |
| [ ] editable               | ⬜ Not started |
| [ ] file-upload            | ⬜ Not started |
| [ ] highlight              | ⬜ Not started |
| [ ] image-cropper          | ⬜ Not started |
| [ ] json-tree-view         | ⬜ Not started |
| [ ] marquee                | ⬜ Not started |
| [ ] Menubar (shadcn)       | ⬜ Not started |
| [ ] Native Select (shadcn) | ⬜ Not started |
| [ ] navigation-menu        | ⬜ Not started |
| [ ] pagination             | ⬜ Not started |
| [ ] qr-code                | ⬜ Not started |
| [ ] Resizable (shadcn)     | ⬜ Not started |
| [ ] signature-pad          | ⬜ Not started |
| [ ] Sidebar (shadcn)       | ⬜ Not started |
| [ ] splitter               | ⬜ Not started |
| [ ] steps                  | ⬜ Not started |
| [ ] swap                   | ⬜ Not started |
| [ ] time-picker            | ⬜ Not started |
| [ ] timer                  | ⬜ Not started |
| [ ] tour                   | ⬜ Not started |
| [ ] tree-view              | ⬜ Not started |

### Utilities (May not need implementation)

| Component          | Status         |
| ------------------ | -------------- |
| [ ] client-only    | ⬜ Not started |
| [ ] collection     | ⬜ Not started |
| [ ] environment    | ⬜ Not started |
| [ ] floating-panel | ⬜ Not started |
| [ ] focus-trap     | ⬜ Not started |
| [ ] format         | ⬜ Not started |
| [ ] frame          | ⬜ Not started |
| [ ] locale         | ⬜ Not started |
| [ ] presence       | ⬜ Not started |
| [ ] portal         | ⬜ Not started |

### Out of Scope (for reference)

| Component             | Reason                 |
| --------------------- | ---------------------- |
| Chart (shadcn)        | Needs Recharts dep     |
| Data Table (shadcn)   | Needs TanStack dep     |
| Calendar (standalone) | Covered by date-picker |
| Sonner (shadcn)       | Covered by toast       |
| Direction (shadcn)    | RTL utility            |
| Item (shadcn)         | Generic, no UI         |

---

**Progress: 40 of 88 tracked components implemented (45%)**
