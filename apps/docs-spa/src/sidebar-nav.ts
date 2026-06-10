export interface SidebarLink {
  href: string
  label: string
}

export interface SidebarCategory {
  category: string
  links: SidebarLink[]
}

export const sidebarNav: SidebarCategory[] = [
  {
    category: "Form & Input",
    links: [
      { href: "/components/button", label: "Button" },
      { href: "/components/checkbox", label: "Checkbox" },
      { href: "/components/combobox", label: "Combobox" },
      { href: "/components/date-picker", label: "Date Picker" },
      { href: "/components/input", label: "Input" },
      { href: "/components/listbox", label: "Listbox" },
      { href: "/components/number-input", label: "Number Input" },
      { href: "/components/password-input", label: "Password Input" },
      { href: "/components/pin-input", label: "Pin Input" },
      { href: "/components/radio-group", label: "Radio Group" },
      { href: "/components/rating-group", label: "Rating Group" },
      { href: "/components/segment-group", label: "Segment Group" },
      { href: "/components/select", label: "Select" },
      { href: "/components/slider", label: "Slider" },
      { href: "/components/switch", label: "Switch" },
      { href: "/components/tags-input", label: "Tags Input" },
      { href: "/components/textarea", label: "Textarea" },
      { href: "/components/toggle", label: "Toggle" },
      { href: "/components/toggle-group", label: "Toggle Group" },
    ],
  },
  {
    category: "Overlay",
    links: [
      { href: "/components/alert-dialog", label: "Alert Dialog" },
      { href: "/components/color-picker", label: "Color Picker" },
      { href: "/components/dialog", label: "Dialog" },
      { href: "/components/drawer", label: "Drawer" },
      { href: "/components/hover-card", label: "Hover Card" },
      { href: "/components/popover", label: "Popover" },
      { href: "/components/toast", label: "Toast" },
      { href: "/components/tooltip", label: "Tooltip" },
    ],
  },
  {
    category: "Navigation",
    links: [
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/breadcrumb", label: "Breadcrumb" },
      { href: "/components/collapsible", label: "Collapsible" },
      { href: "/components/menu", label: "Menu" },
      { href: "/components/pagination", label: "Pagination" },
      { href: "/components/tabs", label: "Tabs" },
    ],
  },
  {
    category: "Data Display",
    links: [
      { href: "/components/avatar", label: "Avatar" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/card", label: "Card" },
      { href: "/components/carousel", label: "Carousel" },
      { href: "/components/table", label: "Table" },
      { href: "/components/typography", label: "Typography" },
    ],
  },
  {
    category: "Feedback",
    links: [
      { href: "/components/alert", label: "Alert" },
      { href: "/components/progress", label: "Progress" },
      { href: "/components/skeleton", label: "Skeleton" },
      { href: "/components/spinner", label: "Spinner" },
    ],
  },
  {
    category: "Layout",
    links: [
      { href: "/components/aspect-ratio", label: "Aspect Ratio" },
      { href: "/components/scroll-area", label: "Scroll Area" },
      { href: "/components/separator", label: "Separator" },
    ],
  },
]
