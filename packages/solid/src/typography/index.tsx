import { splitProps, type Component } from "solid-js";
import { typographyVariants } from "@ark-preset/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = typographyVariants();

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingProps = HTMLArkProps<"h1"> & { level?: HeadingLevel };
type ParagraphProps = HTMLArkProps<"p">;
type TextLeadProps = HTMLArkProps<"p">;
type TextLargeProps = HTMLArkProps<"div">;
type TextSmallProps = HTMLArkProps<"small">;
type TextMutedProps = HTMLArkProps<"p">;
type TextInlineCodeProps = HTMLArkProps<"code">;
type TextBlockquoteProps = HTMLArkProps<"blockquote">;
type TextListProps = HTMLArkProps<"ul">;

const Heading: Component<HeadingProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "level"]);
  switch (local.level) {
    case 1:
      return <ark.h1 class={styles.h1({ class: local.class })} {...others} />;
    case 2:
      return <ark.h2 class={styles.h2({ class: local.class })} {...others} />;
    case 3:
      return <ark.h3 class={styles.h3({ class: local.class })} {...others} />;
    case 4:
      return <ark.h4 class={styles.h4({ class: local.class })} {...others} />;
    case 5:
      return <ark.h5 class={styles.h5({ class: local.class })} {...others} />;
    case 6:
      return <ark.h6 class={styles.h6({ class: local.class })} {...others} />;
    default:
      return <ark.h1 class={styles.h1({ class: local.class })} {...others} />;
  }
};

const Paragraph: Component<ParagraphProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.p({ class: local.class })} {...others} />;
};

const TextLead: Component<TextLeadProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.lead({ class: local.class })} {...others} />;
};

const TextLarge: Component<TextLargeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.large({ class: local.class })} {...others} />;
};

const TextSmall: Component<TextSmallProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.small class={styles.small({ class: local.class })} {...others} />;
};

const TextMuted: Component<TextMutedProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.muted({ class: local.class })} {...others} />;
};

const TextInlineCode: Component<TextInlineCodeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.code class={styles.code({ class: local.class })} {...others} />;
};

const TextBlockquote: Component<TextBlockquoteProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.blockquote class={styles.blockquote({ class: local.class })} {...others} />;
};

const TextList: Component<TextListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.ul class={styles.list({ class: local.class })} {...others} />;
};

export {
  Heading,
  Paragraph,
  TextLead,
  TextLarge,
  TextSmall,
  TextMuted,
  TextInlineCode,
  TextBlockquote,
  TextList,
  typographyVariants,
};
