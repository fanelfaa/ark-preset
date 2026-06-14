import { splitProps, type Component, children } from "solid-js";
import { aspectRatioVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

type AspectRatioProps = HTMLArkProps<"div"> & {
  ratio?: number;
};

const AspectRatio: Component<AspectRatioProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "ratio", "children"]);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.div
      class={aspectRatioVariants({ class: local.class })}
      style={{ "padding-bottom": `${100 / (local.ratio ?? 16 / 9)}%` }}
      {...others}
    >
      <ark.div class="absolute inset-0" style={{ position: "absolute", inset: 0 }}>
        {resolvedChildren()}
      </ark.div>
    </ark.div>
  );
};

export { AspectRatio, aspectRatioVariants };
