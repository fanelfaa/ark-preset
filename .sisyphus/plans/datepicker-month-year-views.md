# DatePicker: Add Month & Year View Grids

## TL;DR

> Move the shared `ViewControl` (prev/next, view trigger, range text) outside all `DatePickerView` blocks in the demo's `DatePickerContent`, then add `<DatePickerView view="month">` and `<DatePickerView view="year">` with their respective table grids. One file change in App.tsx.

---

## Context

We have a DatePicker demo in `apps/docs/src/App.tsx` that only renders the **day** view grid. The `DatePickerViewTrigger` _can_ cycle through views (day → month → year), but the month/year view blocks don't exist yet.

**Current structure** (wrong - ViewControl hidden on view switch):

```
DatePickerContent
  └─ DatePickerView view="day"
       ├─ ViewControl  ← hidden when month/year active!
       └─ day table grid
```

**Target structure**:

```
DatePickerContent
  ├─ ViewControl  ← always visible, works with any active view
  ├─ DatePickerView view="day"   → day grid (weekDays, weeks)
  ├─ DatePickerView view="month" → months grid (getMonthsGrid)
  └─ DatePickerView view="year"  → years grid (getYearsGrid)
```

---

## Work Objective

**Add month and year view picker grids** to the DatePicker demo so users can cycle day → month → year → day via the `ViewTrigger` button.

### Deliverables

- `apps/docs/src/App.tsx` — updated DatePickerContent with all three views

### Must Have

- ViewControl (prev/next, view trigger, range text) is visible in all views
- Month grid uses `getMonthsGrid({ columns: 4, format: 'short' })`
- Year grid uses `getYearsGrid({ columns: 4 })`
- Day grid works identically to before (no regression)

### Must NOT Have

- No duplicated ViewControl blocks
- No CSS changes (our existing `tableCellTrigger` recipe with square aspect-ratio already covers all views)
- No changes outside `apps/docs/src/App.tsx`

---

## Verification Strategy

1. Run `bun dev` in `apps/docs/`
2. Open browser, click the date input to open the popover
3. Click the "May 2026" view trigger button — view should switch to month grid (Jan-Dec, 4 columns)
4. Click again — view should switch to year grid (4 columns of years)
5. Click again — returns to day grid
6. Prev/Next should navigate correctly in each view
7. Clicking a month should go back to day view for that month
8. Clicking a year should go back to day view for that year

---

## Execution Strategy

Single task — one file edit.

---

## TODOs

- [x] 1. Update DatePickerContent with shared ViewControl + 3 view blocks

  **What to do**:
  In `apps/docs/src/App.tsx`, replace the existing `<DatePickerContent>` block (lines ~708-748) with:
  1. Move `<DatePickerViewControl>...</DatePickerViewControl>` **before** all `<DatePickerView>` blocks (so it's always rendered regardless of active view)
  2. Update existing `<DatePickerView view="day">` — remove the `<>...</>` fragment wrapper (no longer needed since ViewControl moved out), keep only the `<DatePickerTable>...</DatePickerTable>`
  3. Add `<DatePickerView view="month">` block with:
     - `<DatePickerContext>` render prop `{(api) => (...)}`
     - `<DatePickerTable>` → `<DatePickerTableBody>` → `<Index each={api().getMonthsGrid({ columns: 4, format: 'short' })}>` → rows with cells using `month().value` and `month().label`
  4. Add `<DatePickerView view="year">` block with:
     - Same structure, using `api().getYearsGrid({ columns: 4 })`
     - Each item: `year().value` / `year().label`

  **Must NOT do**:
  - Touch any other file

  **QA Scenarios**:

  ```
  Scenario: View cycles through day → month → year → day
    Tool: Playwright (browser interaction)
    Preconditions: DatePicker popover is open (click date input)
    Steps:
      1. Click the view trigger button (contains "May 2026" or similar date text)
      2. Observe month grid visible with 12 months (Jan, Feb, Mar, Apr...)
      3. Click view trigger again
      4. Observe year grid visible with multiple years
      5. Click view trigger again
      6. Observe day grid is visible again
    Expected Result: Each view shows the correct grid layout
    Evidence: .sisyphus/evidence/datepicker-view-cycle.png

  Scenario: Selecting a month/year navigates back to day view
    Tool: Playwright
    Preconditions: DatePicker popover open on day view
    Steps:
      1. Click view trigger to switch to month view
      2. Click a month cell (e.g. "Jun")
      3. Observe view switches back to day grid for June 2026
    Expected Result: Month selection navigates to day view of selected month
    Evidence: .sisyphus/evidence/datepicker-select-month.png
  ```

---

## Commit Strategy

- **1**: `feat(docs): add month and year view pickers to DatePicker demo`
  - Files: `apps/docs/src/App.tsx`
