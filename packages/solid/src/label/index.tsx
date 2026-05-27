import { splitProps, type Component } from "solid-js";
import { labelVariants, type LabelVariants } from "@ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

type LabelProps = HTMLArkProps<"label"> & LabelVariants;

const Label: Component<LabelProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.label class={labelVariants({ class: local.class })} {...others} />;
};

export { Label, labelVariants };
