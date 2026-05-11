import { children, Show, splitProps } from 'solid-js'
import { createMemo } from 'solid-js'
import { DatePicker as DatePickerPrimitive } from '@ark-ui/solid/date-picker'
import type { Component } from 'solid-js'
import { datePickerVariants, buttonVariants } from '@ui/core'

const DatePicker = DatePickerPrimitive.Root
const DatePickerLabel = DatePickerPrimitive.Label
const DatePickerContext = DatePickerPrimitive.Context
const DatePickerYearSelect = DatePickerPrimitive.YearSelect
const DatePickerMonthSelect = DatePickerPrimitive.MonthSelect
const DatePickerPositioner = DatePickerPrimitive.Positioner
const DatePickerTable = DatePickerPrimitive.Table
const DatePickerTableHead = DatePickerPrimitive.TableHead
const DatePickerTableBody = DatePickerPrimitive.TableBody
const DatePickerTableRow = DatePickerPrimitive.TableRow
const DatePickerTableHeader = DatePickerPrimitive.TableHeader
const DatePickerTableCellTrigger = DatePickerPrimitive.TableCellTrigger

type DatePickerControlProps = DatePickerPrimitive.ControlProps & { error?: boolean }

const DatePickerControl: Component<DatePickerControlProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'error'])
  const styles = createMemo(() => datePickerVariants({ error: !!local.error }))
  const controlClass = createMemo(() => styles().control({ class: local.class }))
  return (
    <DatePickerPrimitive.Control class={controlClass()} {...others} />
  )
}

type DatePickerInputProps = DatePickerPrimitive.InputProps & { error?: boolean }

const DatePickerInput: Component<DatePickerInputProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'error'])
  const styles = createMemo(() => datePickerVariants({ error: !!local.error }))
  const inputClass = createMemo(() => styles().input({ class: local.class }))
  return (
    <DatePickerPrimitive.Input class={inputClass()} {...others} />
  )
}

const DatePickerTrigger: Component<DatePickerPrimitive.TriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  const styles = datePickerVariants()
  const triggerClass = createMemo(() => styles.trigger({ class: local.class }))

  const resolvedChildren = children(() => props.children)
  const hasChildren = () => resolvedChildren.toArray().length !== 0

  return (
    <DatePickerPrimitive.Trigger class={triggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <path d="M16 3v4"/>
          <path d="M8 3v4"/>
          <path d="M3 11h16"/>
          <path d="M11 15h1"/>
          <path d="M12 15v3"/>
        </svg>
      </Show>
    </DatePickerPrimitive.Trigger>
  )
}

const DatePickerContent: Component<DatePickerPrimitive.ContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  const styles = datePickerVariants()
  const contentClass = createMemo(() => styles.content({ class: local.class }))
  return (
    <DatePickerPrimitive.Content class={contentClass()} {...others} />
  )
}

const DatePickerView: Component<DatePickerPrimitive.ViewProps> = (props) => {
  const [local, others] = splitProps(props, ['view', 'class'])
  const styles = datePickerVariants()
  const viewClass = createMemo(() => styles.view({ class: local.class }))
  return (
    <DatePickerPrimitive.View view={local.view} class={viewClass()} {...others} />
  )
}

const DatePickerViewControl: Component<DatePickerPrimitive.ViewControlProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  const styles = datePickerVariants()
  const viewControlClass = createMemo(() => styles.viewControl({ class: local.class }))
  return (
    <DatePickerPrimitive.ViewControl class={viewControlClass()} {...others} />
  )
}

const DatePickerPrevTrigger: Component<DatePickerPrimitive.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  const styles = datePickerVariants()
  const prevTriggerClass = createMemo(() =>
    buttonVariants({ variant: 'outline', size: 'icon', class: styles.prevTrigger({ class: local.class }) })
  )

  const resolvedChildren = children(() => props.children)
  const hasChildren = () => resolvedChildren.toArray().length !== 0

  return (
    <DatePickerPrimitive.PrevTrigger class={prevTriggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </Show>
    </DatePickerPrimitive.PrevTrigger>
  )
}

const DatePickerNextTrigger: Component<DatePickerPrimitive.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children'])
  const styles = datePickerVariants()
  const nextTriggerClass = createMemo(() =>
    buttonVariants({ variant: 'outline', size: 'icon', class: styles.nextTrigger({ class: local.class }) })
  )

  const resolvedChildren = children(() => props.children)
  const hasChildren = () => resolvedChildren.toArray().length !== 0

  return (
    <DatePickerPrimitive.NextTrigger class={nextTriggerClass()} {...others}>
      <Show when={!hasChildren()} fallback={resolvedChildren()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </Show>
    </DatePickerPrimitive.NextTrigger>
  )
}

const DatePickerViewTrigger: Component<DatePickerPrimitive.ViewTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  const styles = datePickerVariants()
  const viewTriggerClass = createMemo(() => styles.viewTrigger({ class: local.class }))
  return (
    <DatePickerPrimitive.ViewTrigger class={viewTriggerClass()} {...others} />
  )
}

const DatePickerRangeText: Component<DatePickerPrimitive.RangeTextProps> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  const styles = datePickerVariants()
  const rangeTextClass = createMemo(() => styles.rangeText({ class: local.class }))
  return (
    <DatePickerPrimitive.RangeText class={rangeTextClass()} {...others} />
  )
}

const DatePickerTableCell: Component<DatePickerPrimitive.TableCellProps> = (props) => {
  const [local, others] = splitProps(props, ['value', 'class'])
  const styles = datePickerVariants()
  const tableCellClass = createMemo(() => styles.tableCell({ class: local.class }))
  return (
    <DatePickerPrimitive.TableCell value={local.value} class={tableCellClass()} {...others} />
  )
}

export {
  DatePicker,
  DatePickerLabel,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerView,
  DatePickerViewControl,
  DatePickerPrevTrigger,
  DatePickerNextTrigger,
  DatePickerViewTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableHead,
  DatePickerTableBody,
  DatePickerTableRow,
  DatePickerTableHeader,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerYearSelect,
  DatePickerMonthSelect,
  DatePickerPositioner,
  datePickerVariants,
}