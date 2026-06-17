import { type Component } from "solid-js";
import { Collapsible as CollapsibleBase } from "./collapsible.base";
import { Collapsible as ArkCollapsible } from "@ark-ui/solid/collapsible";

const Collapsible = CollapsibleBase.Root;

const CollapsibleIndicator: Component<ArkCollapsible.IndicatorProps> = (props) => {
  return (
    <CollapsibleBase.Indicator {...props}>
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
    </CollapsibleBase.Indicator>
  );
};

const CollapsibleTrigger = CollapsibleBase.Trigger;
const CollapsibleContent = CollapsibleBase.Content;

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
  CollapsibleBase,
};

export { collapsibleVariants, type CollapsibleVariants } from "@ark-preset/core";
