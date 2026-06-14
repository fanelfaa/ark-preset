import { splitProps, type Component } from "solid-js";
import { typographyVariants } from "@fan-ui/core";
import { ark, type HTMLArkProps } from "@ark-ui/solid/factory";

const styles = typographyVariants();

type H1Props = HTMLArkProps<"h1">;
type H2Props = HTMLArkProps<"h2">;
type H3Props = HTMLArkProps<"h3">;
type H4Props = HTMLArkProps<"h4">;
type PProps = HTMLArkProps<"p">;
type LeadProps = HTMLArkProps<"p">;
type LargeProps = HTMLArkProps<"div">;
type SmallProps = HTMLArkProps<"small">;
type MutedProps = HTMLArkProps<"p">;
type InlineCodeProps = HTMLArkProps<"code">;
type BlockquoteProps = HTMLArkProps<"blockquote">;
type ListProps = HTMLArkProps<"ul">;

const H1: Component<H1Props> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h1 class={styles.h1({ class: local.class })} {...others} />;
};

const H2: Component<H2Props> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h2 class={styles.h2({ class: local.class })} {...others} />;
};

const H3: Component<H3Props> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h3 class={styles.h3({ class: local.class })} {...others} />;
};

const H4: Component<H4Props> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.h4 class={styles.h4({ class: local.class })} {...others} />;
};

const P: Component<PProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.p({ class: local.class })} {...others} />;
};

const Lead: Component<LeadProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.lead({ class: local.class })} {...others} />;
};

const Large: Component<LargeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.div class={styles.large({ class: local.class })} {...others} />;
};

const Small: Component<SmallProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.small class={styles.small({ class: local.class })} {...others} />;
};

const Muted: Component<MutedProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.p class={styles.muted({ class: local.class })} {...others} />;
};

const InlineCode: Component<InlineCodeProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.code class={styles.code({ class: local.class })} {...others} />;
};

const Blockquote: Component<BlockquoteProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.blockquote class={styles.blockquote({ class: local.class })} {...others} />;
};

const List: Component<ListProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ark.ul class={styles.list({ class: local.class })} {...others} />;
};

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  List,
  typographyVariants,
};
