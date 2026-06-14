import { For, Show, splitProps, type Component, type JSX } from "solid-js";
import { DatePicker as ArkDatePicker } from "@ark-ui/solid/date-picker";
import type { UseDatePickerContext } from "@ark-ui/solid/date-picker";
import type { DateValue } from "@internationalized/date";
import { Portal } from "solid-js/web";
import { buttonVariants, datePickerVariants } from "@fan-ui/core";
import { DatePickerBase } from "./date-picker.base";

const styles = datePickerVariants();

// ── SVG Icon Components ──────────────────────────────────────

const CalendarIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-4"
    {...props}
  >
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
    <path d="M11 15h1" />
    <path d="M12 15v3" />
    <title>Calendar</title>
  </svg>
);

const ChevronLeftIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-4"
    {...props}
  >
    <path d="M15 6l-6 6l6 6" />
    <title>Previous</title>
  </svg>
);

const ChevronRightIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-4"
    {...props}
  >
    <path d="M9 6l6 6l-6 6" />
    <title>Next</title>
  </svg>
);

const XIcon: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-3"
    {...props}
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
    <title>Remove</title>
  </svg>
);

// ── CalendarGridView (internal) ──────────────────────────────

const CalendarGridView: Component<{ view: "day" | "month" | "year" }> = (props) => (
  <DatePickerBase.View view={props.view}>
    <DatePickerBase.Context>
      {(ctx: UseDatePickerContext) => (
        <>
          <DatePickerBase.ViewControl>
            <DatePickerBase.PrevTrigger class={buttonVariants({ variant: "outline" })}>
              <ChevronLeftIcon />
            </DatePickerBase.PrevTrigger>
            <DatePickerBase.ViewTrigger class={buttonVariants({ variant: "ghost" })}>
              <DatePickerBase.RangeText />
            </DatePickerBase.ViewTrigger>
            <DatePickerBase.NextTrigger class={buttonVariants({ variant: "outline" })}>
              <ChevronRightIcon />
            </DatePickerBase.NextTrigger>
          </DatePickerBase.ViewControl>
          <DatePickerBase.Table>
            <Show when={props.view === "day"}>
              <DatePickerBase.TableHead>
                <DatePickerBase.TableRow>
                  {ctx().weekDays.map((weekDay: { short: string }) => (
                    <DatePickerBase.TableHeader>{weekDay.short}</DatePickerBase.TableHeader>
                  ))}
                </DatePickerBase.TableRow>
              </DatePickerBase.TableHead>
            </Show>
            <DatePickerBase.TableBody>
              <Show when={props.view === "day"}>
                {ctx().weeks.map((week: DateValue[]) => (
                  <DatePickerBase.TableRow>
                    {week.map((day: DateValue) => (
                      <DatePickerBase.TableCell value={day}>
                        <DatePickerBase.TableCellTrigger
                          class={buttonVariants({
                            variant: "ghost",
                            class: "aspect-square px-0",
                          })}
                        >
                          {day.day}
                        </DatePickerBase.TableCellTrigger>
                      </DatePickerBase.TableCell>
                    ))}
                  </DatePickerBase.TableRow>
                ))}
              </Show>
              <Show when={props.view === "month"}>
                {ctx()
                  .getMonthsGrid({ columns: 4, format: "short" })
                  .map((months: { value: number; label: string }[]) => (
                    <DatePickerBase.TableRow>
                      {months.map((month) => (
                        <DatePickerBase.TableCell value={month.value}>
                          <DatePickerBase.TableCellTrigger
                            class={buttonVariants({
                              variant: "ghost",
                            })}
                          >
                            {month.label}
                          </DatePickerBase.TableCellTrigger>
                        </DatePickerBase.TableCell>
                      ))}
                    </DatePickerBase.TableRow>
                  ))}
              </Show>
              <Show when={props.view === "year"}>
                {ctx()
                  .getYearsGrid({ columns: 4 })
                  .map((years: { value: number; label: string }[]) => (
                    <DatePickerBase.TableRow>
                      {years.map((year) => (
                        <DatePickerBase.TableCell value={year.value}>
                          <DatePickerBase.TableCellTrigger
                            class={buttonVariants({
                              variant: "ghost",
                            })}
                          >
                            {year.label}
                          </DatePickerBase.TableCellTrigger>
                        </DatePickerBase.TableCell>
                      ))}
                    </DatePickerBase.TableRow>
                  ))}
              </Show>
            </DatePickerBase.TableBody>
          </DatePickerBase.Table>
        </>
      )}
    </DatePickerBase.Context>
  </DatePickerBase.View>
);

// ── Internal: SingleControl ──────────────────────────────────

const SingleControl: Component<{
  placeholder?: string;
  clearLabel?: string | JSX.Element;
  error?: boolean;
}> = (props) => (
  <>
    <DatePickerBase.Input placeholder={props.placeholder} error={props.error} />
    <DatePickerBase.Trigger>
      <CalendarIcon />
    </DatePickerBase.Trigger>
    <DatePickerBase.ClearTrigger>{props.clearLabel ?? "Clear"}</DatePickerBase.ClearTrigger>
  </>
);

// ── Internal: RangeControl ───────────────────────────────────

const RangeControl: Component<{
  placeholder?: string;
  clearLabel?: string | JSX.Element;
  error?: boolean;
}> = (props) => (
  <>
    <DatePickerBase.Input placeholder={props.placeholder} error={props.error} index={0} />
    <span class="text-sm text-muted-foreground select-none">—</span>
    <DatePickerBase.Input placeholder={props.placeholder} error={props.error} index={1} />
    <DatePickerBase.Trigger>
      <CalendarIcon />
    </DatePickerBase.Trigger>
    <DatePickerBase.ClearTrigger>{props.clearLabel ?? "Clear"}</DatePickerBase.ClearTrigger>
  </>
);

// ── Internal: MultipleControl ────────────────────────────────

const MultipleControl: Component<{
  placeholder?: string;
  clearLabel?: string | JSX.Element;
  error?: boolean;
}> = (props) => (
  <DatePickerBase.Context>
    {(ctx: UseDatePickerContext) => (
      <>
        <div class={styles.selectedValue()}>
          <Show
            when={ctx().value.length > 0}
            fallback={
              <span class={styles.selectedValuePlaceholder()}>
                {props.placeholder || "Select dates..."}
              </span>
            }
          >
            <For each={ctx().value}>
              {(date: DateValue, index) => {
                const fmt = (d: DateValue) =>
                  d.toDate("UTC").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                return (
                  <span class={styles.selectedValueTag()}>
                    {fmt(date)}
                    <button
                      class={styles.selectedValueRemove()}
                      onClick={() => ctx().setValue(ctx().value.filter((_, i) => i !== index()))}
                      aria-label={`Remove ${fmt(date)}`}
                    >
                      <XIcon />
                    </button>
                  </span>
                );
              }}
            </For>
          </Show>
        </div>
        <DatePickerBase.Trigger>
          <CalendarIcon />
        </DatePickerBase.Trigger>
        <DatePickerBase.ClearTrigger>{props.clearLabel ?? "Clear"}</DatePickerBase.ClearTrigger>
      </>
    )}
  </DatePickerBase.Context>
);

// ── Composite: DatePicker ────────────────────────────────────

type DatePickerProps = ArkDatePicker.RootProps & {
  label?: string;
  placeholder?: string;
  clearLabel?: string | JSX.Element;
  error?: boolean;
};

const DatePicker: Component<DatePickerProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "label",
    "placeholder",
    "clearLabel",
    "error",
  ]);

  const selectionMode = () => props.selectionMode ?? "single";

  return (
    <DatePickerBase.Root class={local.class} {...others}>
      {local.label && (
        <DatePickerBase.Label error={local.error}>{local.label}</DatePickerBase.Label>
      )}
      <DatePickerBase.Control error={local.error}>
        <Show when={selectionMode() === "single" || selectionMode() === undefined}>
          <SingleControl
            placeholder={local.placeholder}
            clearLabel={local.clearLabel}
            error={local.error}
          />
        </Show>
        <Show when={selectionMode() === "range"}>
          <RangeControl
            placeholder={local.placeholder}
            clearLabel={local.clearLabel}
            error={local.error}
          />
        </Show>
        <Show when={selectionMode() === "multiple"}>
          <MultipleControl
            placeholder={local.placeholder}
            clearLabel={local.clearLabel}
            error={local.error}
          />
        </Show>
      </DatePickerBase.Control>
      <Portal>
        <DatePickerBase.Positioner>
          <DatePickerBase.Content>
            <CalendarGridView view="day" />
            <CalendarGridView view="month" />
            <CalendarGridView view="year" />
          </DatePickerBase.Content>
        </DatePickerBase.Positioner>
      </Portal>
    </DatePickerBase.Root>
  );
};

// ── Exports ──────────────────────────────────────────────────

export { DatePicker, DatePickerBase };

export { datePickerVariants, type DatePickerVariants } from "@fan-ui/core";
