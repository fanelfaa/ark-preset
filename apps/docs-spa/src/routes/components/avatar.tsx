import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, Blockquote, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import AvatarBasicDemo from "@demos/avatar-demo/AvatarBasicDemo.tsx";

export const Route = createFileRoute("/components/avatar")({ component: AvatarPage });

function AvatarPage() {
  return (
    <>
      <H1>Avatar</H1>
      <P>An image element with a fallback for representing users or entities.</P>
      <DocsLink href="https://ark-ui.com/docs/components/avatar" />
      <AvatarBasicDemo />
      <Pre lang="tsx">{`

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/avatar";

export function AvatarDemo() {
  return (
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/150?u=john" alt="John Doe" />
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/150?u=jane" alt="Alice Brown" />
      </Avatar>
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add avatar
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/avatar.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const avatarVariants = tv({
  slots: {
    root: "relative flex shrink-0 overflow-hidden rounded-full size-10",
    fallback: "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
    image: "aspect-square size-full object-cover",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component directory and files: `src/components/avatar/avatar.base.tsx`:
        <Pre lang="tsx">{`import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { splitProps, type Component } from "solid-js";
import { avatarVariants } from "@fan-ui/core";

const styles = avatarVariants();

const Root: Component<ArkAvatar.RootProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Root class={styles.root({ class: local.class })} {...others} />;
};

const RootProvider: Component<ArkAvatar.RootProviderProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.RootProvider class={styles.root({ class: local.class })} {...others} />;
};

const Fallback: Component<ArkAvatar.FallbackProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Fallback class={styles.fallback({ class: local.class })} {...others} />;
};

const Image: Component<ArkAvatar.ImageProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkAvatar.Image class={styles.image({ class: local.class })} {...others} />;
};

export const Avatar = { Root, RootProvider, Fallback, Image };`}</Pre>
        `src/components/avatar/index.tsx`:
        <Pre lang="tsx">{`import { Avatar as AvatarBase } from "./avatar.base";

const Avatar = AvatarBase.Root;
const AvatarFallback = AvatarBase.Fallback;
const AvatarImage = AvatarBase.Image;

export { Avatar, AvatarFallback, AvatarImage, AvatarBase };

export { avatarVariants, type AvatarVariants } from "@fan-ui/core";`}</Pre>
      </div>
      <Blockquote>
        <strong>Note:</strong> Make sure your project has the Tailwind CSS theme variables set up or
        override the utility classes to match your design system.
      </Blockquote>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/avatar";
      `}</Pre>
      <P>Basic usage:</P>
      <Pre lang="tsx">{`

<Avatar>
  <AvatarFallback>JD</AvatarFallback>
  <AvatarImage src="https://i.pravatar.cc/150?u=john" alt="John Doe" />
</Avatar>
      `}</Pre>
      <H2>With Fallback Only</H2>
      <P>When no image is provided or the image fails to load, the fallback is shown:</P>
      <Pre lang="tsx">{`

<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
      `}</Pre>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/avatar">Ark UI Avatar</A> documentation.
      </P>
    </>
  );
}
