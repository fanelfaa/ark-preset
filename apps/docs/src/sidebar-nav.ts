export interface SidebarLink {
  href: string;
  label: string;
}

export interface SidebarCategory {
  category: string;
  links: SidebarLink[];
}

export const sidebarNav: SidebarCategory[] = [
  {
    category: "Form & Input",
    links: [
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/checkbox", label: "Checkbox" },
      { href: "/docs/components/combobox", label: "Combobox" },
      { href: "/docs/components/date-picker", label: "Date Picker" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/listbox", label: "Listbox" },
      { href: "/docs/components/number-input", label: "Number Input" },
      { href: "/docs/components/password-input", label: "Password Input" },
      { href: "/docs/components/pin-input", label: "Pin Input" },
      { href: "/docs/components/radio-group", label: "Radio Group" },
      { href: "/docs/components/rating-group", label: "Rating Group" },
      { href: "/docs/components/segment-group", label: "Segment Group" },
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/slider", label: "Slider" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/tags-input", label: "Tags Input" },
      { href: "/docs/components/textarea", label: "Textarea" },
      { href: "/docs/components/toggle", label: "Toggle" },
      { href: "/docs/components/toggle-group", label: "Toggle Group" },
    ],
  },
  {
    category: "Overlay",
    links: [
      { href: "/docs/components/alert-dialog", label: "Alert Dialog" },
      { href: "/docs/components/color-picker", label: "Color Picker" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/drawer", label: "Drawer" },
      { href: "/docs/components/hover-card", label: "Hover Card" },
      { href: "/docs/components/popover", label: "Popover" },
      { href: "/docs/components/toast", label: "Toast" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
    ],
  },
  {
    category: "Navigation",
    links: [
      { href: "/docs/components/accordion", label: "Accordion" },
      { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
      { href: "/docs/components/collapsible", label: "Collapsible" },
      { href: "/docs/components/menu", label: "Menu" },
      { href: "/docs/components/pagination", label: "Pagination" },
      { href: "/docs/components/tabs", label: "Tabs" },
    ],
  },
  {
    category: "Data Display",
    links: [
      { href: "/docs/components/avatar", label: "Avatar" },
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/carousel", label: "Carousel" },
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components/typography", label: "Typography" },
    ],
  },
  {
    category: "Feedback",
    links: [
      { href: "/docs/components/alert", label: "Alert" },
      { href: "/docs/components/progress", label: "Progress" },
      { href: "/docs/components/skeleton", label: "Skeleton" },
      { href: "/docs/components/spinner", label: "Spinner" },
    ],
  },
  {
    category: "Layout",
    links: [
      { href: "/docs/components/aspect-ratio", label: "Aspect Ratio" },
      { href: "/docs/components/scroll-area", label: "Scroll Area" },
      { href: "/docs/components/separator", label: "Separator" },
    ],
  },
];
