import { splitProps, type Component } from "solid-js";
import { separatorVariants, type SeparatorVariants } from "@ark-preset/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

type SeparatorProps = HTMLArkProps<"div"> & SeparatorVariants;

const Separator: Component<SeparatorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);

  return (
    <ark.div
      class={separatorVariants({ orientation: local.orientation, class: local.class })}
      role="separator"
      aria-orientation={local.orientation ?? "horizontal"}
      {...others}
    />
  );
};

export { Separator, separatorVariants };
