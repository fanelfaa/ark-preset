import { createFileRoute } from '@tanstack/solid-router'
import { Component, createSignal, Index } from 'solid-js'
import { Portal } from 'solid-js/web'
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  Button,
  Checkbox,
  CheckboxLabel,
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
  createListCollection,
  createToaster,
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  Input,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
  NumberInput,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  SelectContent,
  SelectControl,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValueText,
  Switch,
  SwitchLabel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@ui/solid'

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
  ],
})

const App: Component = () => {
  const [dialogOpen, setDialogOpen] = createSignal(false)
  const [selectedValue, setSelectedValue] = createSignal<string[]>([])
  const [sliderValue, setSliderValue] = createSignal<number[]>([50])
  const [collapsibleOpen, setCollapsibleOpen] = createSignal(false)
  const [drawerOpen, setDrawerOpen] = createSignal(false)
  const [popoverOpen, setPopoverOpen] = createSignal(false)
  const toaster = createToaster({ placement: 'bottom-end' })

  return (
    <div class="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header class="border-b border-border bg-background">
        <div class="mx-auto max-w-5xl px-6 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold">Solid UI</h1>
              <p class="mt-1.5 text-muted-foreground">
                Component demos for <code class="text-sm bg-muted px-1.5 py-0.5 rounded">@ui/solid</code>
              </p>
            </div>
            <nav class="flex items-center gap-4 text-sm">
              <a href="/docs" class="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="mx-auto max-w-5xl px-6 py-12 space-y-24">

        {/* ════════════════════ Button ════════════════════ */}
        <section id="button">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Button</h2>
            <p class="mt-1 text-muted-foreground">
              All 6 variants across sizes, plus disabled state.
            </p>
          </div>

          <div class="space-y-10">
            {/* Variants */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Variants
              </h3>
              <div class="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Sizes (sm, md, lg, icon)
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Add">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <div class="flex flex-wrap gap-3">
                <Button disabled variant="default">Default</Button>
                <Button disabled variant="destructive">Destructive</Button>
                <Button disabled variant="outline">Outline</Button>
                <Button disabled variant="secondary">Secondary</Button>
                <Button disabled variant="ghost">Ghost</Button>
                <Button disabled variant="link">Link</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ Input ════════════════════ */}
        <section id="input">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Input</h2>
            <p class="mt-1 text-muted-foreground">
              Form field with label, description, and error state.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <Input placeholder="Basic input" />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              description="We'll never share your email."
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error="Password must be at least 8 characters."
            />
            <Input label="Full Name" placeholder="John Doe" disabled />
          </div>
        </section>

        {/* ════════════════════ Dialog ════════════════════ */}
        <section id="dialog">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Dialog</h2>
            <p class="mt-1 text-muted-foreground">
              Modal dialog with backdrop, header, body, and footer.
            </p>
          </div>

          <DialogRoot
            open={dialogOpen()}
            onOpenChange={({ open }) => setDialogOpen(open)}
          >
            <DialogTrigger>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>
                  Are you sure you want to proceed? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div class="py-4 text-sm text-foreground">
                <p>
                  This is the dialog body. You can place any content here —
                  form fields, additional info, or custom layouts.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </section>

        {/* ════════════════════ Select ════════════════════ */}
        <section id="select">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Select</h2>
            <p class="mt-1 text-muted-foreground">
              Dropdown select with collection API — pick a framework.
            </p>
          </div>

          <div class="max-w-xs">
            <SelectRoot
              collection={frameworks}
              value={selectedValue()}
              onValueChange={(details) => setSelectedValue(details.value)}
            >
              <SelectLabel>Framework</SelectLabel>
              <SelectControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a framework" />
                </SelectTrigger>
              </SelectControl>
              <SelectContent items={frameworks.items} />
            </SelectRoot>
            {selectedValue().length > 0 && (
              <p class="mt-2 text-xs text-muted-foreground">
                Selected: <span class="font-medium text-foreground">{selectedValue()[0]}</span>
              </p>
            )}
          </div>
        </section>

        {/* ════════════════════ Toast ════════════════════ */}
        <section id="toast">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Toast</h2>
            <p class="mt-1 text-muted-foreground">
              Click a button to trigger a notification.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <Button
              onClick={() =>
                toaster.create({
                  title: 'Notification',
                  description: 'This is a default toast.',
                })
              }
            >
              Default
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toaster.create({
                  title: 'Error',
                  description: 'Something went wrong!',
                  type: 'error',
                })
              }
            >
              Destructive
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toaster.create({
                  title: 'Success',
                  description: 'Operation completed successfully.',
                  type: 'success',
                })
              }
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toaster.create({
                  title: 'Warning',
                  description: 'Please check your input.',
                  type: 'warning',
                })
              }
            >
              Warning
            </Button>
          </div>
          <Toaster toaster={toaster} />
        </section>

        {/* ════════════════════ Switch ════════════════════ */}
        <section id="switch">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Switch</h2>
            <p class="mt-1 text-muted-foreground">
              Toggle control with label and disabled state.
            </p>
          </div>

          <div class="space-y-6">
            {/* Basic */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Basic
              </h3>
              <Switch />
            </div>

            {/* With Label */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                With Label
              </h3>
              <Switch>
                <SwitchLabel>Airplane Mode</SwitchLabel>
              </Switch>
            </div>

            {/* Default Checked */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Default Checked
              </h3>
              <Switch defaultChecked>
                <SwitchLabel>Notifications</SwitchLabel>
              </Switch>
            </div>

            {/* Disabled */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <div class="flex items-start gap-6">
                <Switch disabled>
                  <SwitchLabel>Disabled</SwitchLabel>
                </Switch>
                <Switch disabled defaultChecked>
                  <SwitchLabel>Disabled (On)</SwitchLabel>
                </Switch>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ Checkbox ════════════════════ */}
        <section id="checkbox">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Checkbox</h2>
            <p class="mt-1 text-muted-foreground">
              Checkbox with label, disabled, and indeterminate state.
            </p>
          </div>

          <div class="space-y-6">
            {/* Basic */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Basic
              </h3>
              <Checkbox />
            </div>

            {/* With Label */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                With Label
              </h3>
              <Checkbox>
                <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
              </Checkbox>
            </div>

            {/* Default Checked */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Default Checked
              </h3>
              <Checkbox defaultChecked>
                <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
              </Checkbox>
            </div>

            {/* Disabled */}
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <div class="flex items-start gap-6">
                <Checkbox disabled>
                  <CheckboxLabel>Disabled</CheckboxLabel>
                </Checkbox>
                <Checkbox disabled defaultChecked>
                  <CheckboxLabel>Disabled (Checked)</CheckboxLabel>
                </Checkbox>
              </div>
            </div>
          </div>
        </section>

          {/* ════════════════════ Tabs ════════════════════ */}
        <section id="tabs">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Tabs</h2>
            <p class="mt-1 text-muted-foreground">
              Tabbed interface with animated indicator.
            </p>
          </div>

          <div class="max-w-xl">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div class="rounded-lg border border-border p-6">
                  <h3 class="text-lg font-medium mb-2">Overview</h3>
                  <p class="text-sm text-muted-foreground">
                    This is the overview tab content. It contains a brief introduction to the product.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features">
                <div class="rounded-lg border border-border p-6">
                  <h3 class="text-lg font-medium mb-2">Features</h3>
                  <p class="text-sm text-muted-foreground">
                    This is the features tab content. It highlights the key capabilities of the product.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                <div class="rounded-lg border border-border p-6">
                  <h3 class="text-lg font-medium mb-2">Pricing</h3>
                  <p class="text-sm text-muted-foreground">
                    This is the pricing tab content. It shows the available plans and pricing options.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="faq">
                <div class="rounded-lg border border-border p-6">
                  <h3 class="text-lg font-medium mb-2">FAQ</h3>
                  <p class="text-sm text-muted-foreground">
                    This is the FAQ tab content. It answers common questions about the product.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* ════════════════════ Accordion ════════════════════ */}
        <section id="accordion">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Accordion</h2>
            <p class="mt-1 text-muted-foreground">
              Expandable sections with animated open/close.
            </p>
          </div>

          <div class="max-w-lg">
            <Accordion defaultValue={['what-is-ark-ui']}>
              <AccordionItem value="what-is-ark-ui">
                <AccordionItemTrigger>
                  What is Ark UI?
                  <AccordionItemIndicator>
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </AccordionItemIndicator>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <div class="pb-4 text-sm text-foreground">
                    Ark UI is a headless component library for building accessible web apps with any framework.
                  </div>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem value="how-to-get-started">
                <AccordionItemTrigger>
                  How to get started?
                  <AccordionItemIndicator>
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </AccordionItemIndicator>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <div class="pb-4 text-sm text-foreground">
                    Install the package and import the components you need. No additional setup required.
                  </div>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem value="who-maintains">
                <AccordionItemTrigger>
                  Who maintains this project?
                  <AccordionItemIndicator>
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </AccordionItemIndicator>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <div class="pb-4 text-sm text-foreground">
                    Ark UI is maintained by the Chakra UI team and a growing community of contributors.
                  </div>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem value="disabled-item" disabled>
                <AccordionItemTrigger>
                  Disabled Item
                  <AccordionItemIndicator>
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </AccordionItemIndicator>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <div class="pb-4 text-sm text-foreground">
                    This content is not accessible.
                  </div>
                </AccordionItemContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ════════════════════ RadioGroup ════════════════════ */}
        <section id="radio-group">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">RadioGroup</h2>
            <p class="mt-1 text-muted-foreground">
              Radio button group for single selection.
            </p>
          </div>

          <div class="space-y-8">
            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Basic
              </h3>
              <RadioGroup defaultValue="react">
                <RadioGroupLabel>Framework</RadioGroupLabel>
                <RadioGroupItem value="react">
                  <RadioGroupItemControl />
                  <RadioGroupItemText>React</RadioGroupItemText>
                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
                <RadioGroupItem value="solid">
                  <RadioGroupItemControl />
                  <RadioGroupItemText>Solid</RadioGroupItemText>
                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
                <RadioGroupItem value="vue">
                  <RadioGroupItemControl />
                  <RadioGroupItemText>Vue</RadioGroupItemText>
                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
              </RadioGroup>
            </div>

            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <RadioGroup defaultValue="react" disabled>
                <RadioGroupLabel>Framework (Disabled)</RadioGroupLabel>
                <RadioGroupItem value="react">
                  <RadioGroupItemControl />
                  <RadioGroupItemText>React</RadioGroupItemText>
                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
                <RadioGroupItem value="solid">
                  <RadioGroupItemControl />
                  <RadioGroupItemText>Solid</RadioGroupItemText>
                  <RadioGroupItemHiddenInput />
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* ════════════════════ Tooltip ════════════════════ */}
        <section id="tooltip">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Tooltip</h2>
            <p class="mt-1 text-muted-foreground">
              Floating content on hover with positioning.
            </p>
          </div>

          <div class="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger class="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Hover Me
              </TooltipTrigger>
              <Portal>
                <TooltipPositioner>
                  <TooltipContent class="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
                    Simple tooltip
                  </TooltipContent>
                </TooltipPositioner>
              </Portal>
            </Tooltip>

            <Tooltip positioning={{ placement: 'top' }}>
              <TooltipTrigger class="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Top Tooltip
              </TooltipTrigger>
              <Portal>
                <TooltipPositioner>
                  <TooltipContent class="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
                    Tooltip on top
                  </TooltipContent>
                </TooltipPositioner>
              </Portal>
            </Tooltip>

            <Tooltip closeDelay={0} openDelay={0}>
              <TooltipTrigger class="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                Fast Tooltip
              </TooltipTrigger>
              <Portal>
                <TooltipPositioner>
                  <TooltipContent class="z-50 overflow-hidden rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
                    No delay
                  </TooltipContent>
                </TooltipPositioner>
              </Portal>
            </Tooltip>
          </div>
        </section>

        {/* ════════════════════ DatePicker ════════════════════ */}
        <section id="date-picker">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">DatePicker</h2>
            <p class="mt-1 text-muted-foreground">
              Calendar date picker with day, month, and year views.
            </p>
          </div>

          <div class="max-w-xs">
    <DatePicker
      startOfWeek={1}
      format={(e) => {
        const parsedDate = new Date(Date.parse(e.toString()))
 
        const normalizedDate = new Date(
          parsedDate.getUTCFullYear(),
          parsedDate.getUTCMonth(),
          parsedDate.getUTCDate()
        )
 
        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long"
        }).format(normalizedDate)
      }}
    >
      <DatePickerControl>
        <DatePickerInput placeholder="Pick a date" />
        <DatePickerTrigger />
      </DatePickerControl>
      <Portal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          <Index each={api().weekDays}>
                            {(weekDay) => (
                              <DatePickerTableHeader>{weekDay().short}</DatePickerTableHeader>
                            )}
                          </Index>
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        <Index each={api().weeks}>
                          {(week) => (
                            <DatePickerTableRow>
                              <Index each={week()}>
                                {(day) => (
                                  <DatePickerTableCell value={day()}>
                                    <DatePickerTableCellTrigger>
                                      {day().day}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="month">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index each={api().getMonthsGrid({ columns: 4, format: "short" })}>
                          {(months) => (
                            <DatePickerTableRow>
                              <Index each={months()}>
                                {(month) => (
                                  <DatePickerTableCell value={month().value}>
                                    <DatePickerTableCellTrigger>
                                      {month().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
            <DatePickerView view="year">
              <DatePickerContext>
                {(api) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger />
                      <DatePickerViewTrigger>
                        <DatePickerRangeText />
                      </DatePickerViewTrigger>
                      <DatePickerNextTrigger />
                    </DatePickerViewControl>
                    <DatePickerTable>
                      <DatePickerTableBody>
                        <Index each={api().getYearsGrid({ columns: 4 })}>
                          {(years) => (
                            <DatePickerTableRow>
                              <Index each={years()}>
                                {(year) => (
                                  <DatePickerTableCell value={year().value}>
                                    <DatePickerTableCellTrigger>
                                      {year().label}
                                    </DatePickerTableCellTrigger>
                                  </DatePickerTableCell>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          )}
                        </Index>
                      </DatePickerTableBody>
                    </DatePickerTable>
                  </>
                )}
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </Portal>
    </DatePicker>
          </div>
        </section>

        {/* ════════════════════ NumberInput ════════════════════ */}
        <section id="number-input">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Number Input</h2>
            <p class="mt-1 text-muted-foreground">
              Numeric input with increment and decrement controls.
            </p>
          </div>

          <div class="max-w-xs space-y-8">
<div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Basic
              </h3>
              <NumberInput label="Quantity" />
            </div>

            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                With Min/Max
              </h3>
              <NumberInput min={0} max={100} defaultValue="50" label="Age" />
            </div>

            <div>
              <h3 class="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-widest">
                Disabled
              </h3>
              <NumberInput disabled defaultValue="25" label="Amount" />
            </div>
          </div>
        </section>

        {/* ════════════════════ Popover ════════════════════ */}
        <section id="popover">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Popover</h2>
            <p class="mt-1 text-muted-foreground">
              Floating card on click with arrow.
            </p>
          </div>

          <PopoverRoot
            open={popoverOpen()}
            onOpenChange={({ open }) => setPopoverOpen(open)}
          >
            <PopoverTrigger>
              <Button>Open Popover</Button>
            </PopoverTrigger>
              <PopoverContent class="z-50 w-72 rounded-lg border border-border bg-popover p-4 shadow-md">
                <PopoverTitle class="text-sm font-semibold">Popover Title</PopoverTitle>
                <PopoverDescription class="mt-1 text-xs text-muted-foreground">
                  This is a popover with some useful information. Click the button to dismiss.
                </PopoverDescription>
                <PopoverCloseTrigger class="absolute right-2 top-2">
                  <Button size="icon" variant="ghost" class="h-6 w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </PopoverCloseTrigger>
              </PopoverContent>
          </PopoverRoot>
        </section>

{/* ════════════════════ Slider ════════════════════ */}
        <section id="slider">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Slider</h2>
            <p class="mt-1 text-muted-foreground">
              Range slider with label and value display.
            </p>
          </div>

          <div class="max-w-md">
            <SliderRoot
              value={sliderValue()}
              onValueChange={(details) => setSliderValue(details.value)}
            >
              <div class="flex justify-between items-center mb-3">
                <SliderLabel>Volume</SliderLabel>
                <SliderValueText>{sliderValue()[0]}</SliderValueText>
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb index={0} />
              </SliderControl>
            </SliderRoot>
          </div>
        </section>

        {/* ════════════════════ Collapsible ════════════════════ */}
        <section id="collapsible">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Collapsible</h2>
            <p class="mt-1 text-muted-foreground">
              Expandable section with animated open/close.
            </p>
          </div>

          <div class="max-w-lg">
            <Collapsible
              open={collapsibleOpen()}
              onOpenChange={(details) => setCollapsibleOpen(details.open)}
            >
              <CollapsibleTrigger class="flex items-center justify-between w-full px-4 py-3 text-left rounded-lg hover:bg-muted/80 transition-colors">
                <span class="font-medium">Click to expand</span>
                <CollapsibleIndicator class="text-muted-foreground">
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
                    class="transition-transform duration-200 data-enter:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </CollapsibleIndicator>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div class="mt-3 p-4 border border-border rounded-lg">
                  <p class="text-sm text-muted-foreground">
                    This is the collapsible content. It can contain any elements like text, images, or interactive components.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* ════════════════════ Menu ════════════════════ */}
        <section id="menu">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Menu</h2>
            <p class="mt-1 text-muted-foreground">
              Dropdown menu with items and separator.
            </p>
          </div>

          <div class="max-w-xs">
            <MenuRoot>
              <MenuTrigger>
                Actions
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="copy">
                  <MenuItemText>Copy</MenuItemText>
                </MenuItem>
                <MenuItem value="cut">
                  <MenuItemText>Cut</MenuItemText>
                </MenuItem>
                <MenuSeparator />
                <MenuItem value="paste">
                  <MenuItemText>Paste</MenuItemText>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </div>
        </section>

        {/* ════════════════════ Drawer ════════════════════ */}
        <section id="drawer">
          <div class="mb-8">
            <h2 class="text-2xl font-semibold">Drawer</h2>
            <p class="mt-1 text-muted-foreground">
              Slide-in panel from the bottom.
            </p>
          </div>

          <DrawerRoot
            open={drawerOpen()}
            onOpenChange={({ open }) => setDrawerOpen(open)}
          >
            <DrawerTrigger>
              <Button>Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent class="bg-background border-t border-border rounded-t-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
              <DrawerGrabber/>
              <div class="flex items-center justify-between px-6 py-4 border-b border-border">
                <DrawerTitle class="text-lg font-semibold">Drawer Title</DrawerTitle>
              </div>
              <DrawerDescription class="px-6 py-3 text-sm text-muted-foreground">
                This is a drawer panel that slides in from the bottom of the screen.
              </DrawerDescription>
              <div class="flex-1 overflow-y-auto px-6 py-4">
                <p class="text-sm text-foreground">
                  Drawer content goes here. You can place any content including forms, lists, or other components.
                </p>
              </div>
            </DrawerContent>
          </DrawerRoot>
        </section>

      </main>
    </div>
  )
}

export const Route = createFileRoute('/')({ component: App })
