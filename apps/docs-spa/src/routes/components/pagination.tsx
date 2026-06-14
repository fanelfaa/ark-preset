import { createFileRoute } from "@tanstack/solid-router";
import { H1, H2, H3, P, A, InlineCode, Pre } from "../../components/markdown";
import { DocsLink } from "../../components/DocsLink";
import PaginationBasicDemo from "@demos/pagination-demo/PaginationBasicDemo.tsx";
import PaginationControlledDemo from "@demos/pagination-demo/PaginationControlledDemo.tsx";
import PaginationRootProviderDemo from "@demos/pagination-demo/PaginationRootProviderDemo.tsx";
import PaginationSizeDemo from "@demos/pagination-demo/PaginationSizeDemo.tsx";

export const Route = createFileRoute("/components/pagination")({ component: PaginationPage });

function PaginationPage() {
  return (
    <>
      <H1>Pagination</H1>
      <P>
        A navigation component for moving between pages of content. Built on Ark UI's Pagination —
        supports controlled/uncontrolled modes, custom page sizes, and link-based navigation.
      </P>
      <DocsLink href="https://ark-ui.com/docs/components/pagination" />
      <H2>Basic</H2>
      <PaginationBasicDemo />
      <Pre>{`

import { Pagination, PaginationPageList, PaginationFirstTrigger, PaginationPrevTrigger, PaginationNextTrigger, PaginationLastTrigger } from "~/components/pagination";

export function PaginationDemo() {
  return (
    <Pagination count={100} pageSize={10} class="gap-1">
      <PaginationFirstTrigger>{'<<'}</PaginationFirstTrigger>
      <PaginationPrevTrigger>{'<'}</PaginationPrevTrigger>
      <PaginationPageList />
      <PaginationNextTrigger>{'>'}</PaginationNextTrigger>
      <PaginationLastTrigger>{'>>'}</PaginationLastTrigger>
    </Pagination>
  );
}
      `}</Pre>
      <H2>Controlled Page</H2>
      <P>
        Use <InlineCode>page</InlineCode> and <InlineCode>onPageChange</InlineCode> to control the
        current page externally.
      </P>
      <PaginationControlledDemo />
      <Pre>{`

import { createSignal } from "solid-js";
import { Pagination, PaginationPageList, PaginationFirstTrigger, PaginationPrevTrigger, PaginationNextTrigger, PaginationLastTrigger } from "~/components/pagination";

export function ControlledDemo() {
  const [page, setPage] = createSignal(5);

  return (
    <div>
      <p class="text-sm text-muted-foreground mb-2">Current page: {page()}</p>
      <Pagination count={100} pageSize={10} page={page()} onPageChange={(e) => setPage(e.page)} class="gap-1">
        <PaginationFirstTrigger>{'<<'}</PaginationFirstTrigger>
        <PaginationPrevTrigger>{'<'}</PaginationPrevTrigger>
        <PaginationPageList />
        <PaginationNextTrigger>{'>'}</PaginationNextTrigger>
        <PaginationLastTrigger>{'>>'}</PaginationLastTrigger>
      </Pagination>
    </div>
  );
}
      `}</Pre>
      <H2>RootProvider Pattern</H2>
      <P>
        For full control over the pagination machine state, use{" "}
        <InlineCode>usePagination</InlineCode> with{" "}
        <InlineCode>PaginationBase.RootProvider</InlineCode>.
      </P>
      <PaginationRootProviderDemo />
      <Pre>{`

import { For } from "solid-js";
import { usePagination } from "@ark-ui/solid/pagination";
import { PaginationBase } from "~/components/pagination";

export function RootProviderDemo() {
  const pagination = usePagination({ count: 100, pageSize: 10 });

  return (
    <PaginationBase.RootProvider value={pagination} class="gap-1">
      <PaginationBase.FirstTrigger>{'<<'}</PaginationBase.FirstTrigger>
      <PaginationBase.PrevTrigger>{'<'}</PaginationBase.PrevTrigger>
      <For each={pagination().pages}>
        {(page, _index) =>
          page.type === "page" ? (
            <PaginationBase.Item type="page" value={page.value}>
              {page.value}
            </PaginationBase.Item>
          ) : (
            <PaginationBase.Ellipsis index={_index()}>...</PaginationBase.Ellipsis>
          )
        }
      </For>
      <PaginationBase.NextTrigger>{'>'}</PaginationBase.NextTrigger>
      <PaginationBase.LastTrigger>{'>>'}</PaginationBase.LastTrigger>
    </PaginationBase.RootProvider>
  );
}
      `}</Pre>
      <H2>Size Variants</H2>
      <P>
        Use the <InlineCode>size</InlineCode> prop to control button dimensions —{" "}
        <InlineCode>sm</InlineCode> (h-7 min-w-7), <InlineCode>md</InlineCode> (h-8 min-w-8),{" "}
        <InlineCode>lg</InlineCode> (h-9 min-w-9).
      </P>
      <PaginationSizeDemo />
      <Pre>{`

import { Pagination, PaginationPageList, PaginationFirstTrigger, PaginationPrevTrigger, PaginationNextTrigger, PaginationLastTrigger } from "~/components/pagination";

<Pagination count={100} pageSize={10} size="sm">
  {/* ... */}
</Pagination>

<Pagination count={100} pageSize={10} size="md">
  {/* ... */}
</Pagination>

<Pagination count={100} pageSize={10} size="lg">
  {/* ... */}
</Pagination>
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre>{`

npx @fan-ui/cli@latest add pagination
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/pagination.ts`:
        <Pre>{`import { tv, type VariantProps } from "tailwind-variants";

export const paginationVariants = tv({
  slots: {
    root: "mx-auto flex w-full justify-center",
    trigger:
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 min-w-8",
    item: [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
      "h-8 min-w-8",
      "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground",
    ],
    ellipsis: "flex h-8 min-w-8 items-center justify-center text-sm",
  },
  variants: {
    size: {
      sm: {
        item: "h-7 min-w-7",
        ellipsis: "h-7 min-w-7",
      },
      md: {
        item: "h-8 min-w-8",
        ellipsis: "h-8 min-w-8",
      },
      lg: {
        item: "h-9 min-w-9",
        ellipsis: "h-9 min-w-9",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PaginationVariants = VariantProps<typeof paginationVariants>;`}</Pre>
      </div>
      <div class="space-y-3">
        Create the base file at `src/components/pagination/pagination.base.tsx`:
        <Pre>{`import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import { createContext, useContext, splitProps, type Component } from "solid-js";
import { paginationVariants, type PaginationVariants } from "../recipes/pagination";

type PaginationVariantContextValue = Pick<PaginationVariants, "size">;

const PaginationVariantContext = createContext<PaginationVariantContextValue>();

const usePaginationVariant = () => useContext(PaginationVariantContext);

const styles = paginationVariants();

const Root: Component<ArkPagination.RootProps & PaginationVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <PaginationVariantContext.Provider value={{ size: local.size }}>
      <ArkPagination.Root
        class={styles.root({ class: local.class, size: local.size })}
        {...others}
      />
    </PaginationVariantContext.Provider>
  );
};

const RootProvider: Component<ArkPagination.RootProviderProps & PaginationVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <PaginationVariantContext.Provider value={{ size: local.size }}>
      <ArkPagination.RootProvider
        class={styles.root({ class: local.class, size: local.size })}
        {...others}
      />
    </PaginationVariantContext.Provider>
  );
};

const Ellipsis: Component<ArkPagination.EllipsisProps> = (props) => {
  return <ArkPagination.Ellipsis {...props} />;
};

const FirstTrigger: Component<ArkPagination.FirstTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.FirstTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const Item: Component<ArkPagination.ItemProps & PaginationVariants> = (props) => {
  const ctx = usePaginationVariant();
  const [local, others] = splitProps(props, ["class", "size"]);
  return (
    <ArkPagination.Item
      class={styles.item({
        class: local.class,
        size: local.size ?? ctx?.size,
      })}
      {...others}
    />
  );
};

const LastTrigger: Component<ArkPagination.LastTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.LastTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const NextTrigger: Component<ArkPagination.NextTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.NextTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

const PrevTrigger: Component<ArkPagination.PrevTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <ArkPagination.PrevTrigger class={styles.trigger({ class: local.class })} {...others} />;
};

export const Pagination = {
  Root,
  RootProvider,
  Ellipsis,
  FirstTrigger,
  Item,
  LastTrigger,
  NextTrigger,
  PrevTrigger,
};

export { PaginationVariantContext, usePaginationVariant };`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/pagination/index.tsx`:
        <Pre>{`import { splitProps, For, type Component } from "solid-js";
import { Pagination as PaginationBase } from "./pagination.base";
import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import type { PaginationVariants } from "@fan-ui/core";

const Pagination: Component<ArkPagination.RootProps & PaginationVariants> = (props) => {
  const [local, others] = splitProps(props, ["class", "size", "children"]);
  return (
    <PaginationBase.Root class={local.class} size={local.size} {...others}>
      {local.children}
    </PaginationBase.Root>
  );
};

const PaginationRoot = Pagination;

const PaginationItem: Component<ArkPagination.ItemProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <PaginationBase.Item class={local.class} {...others} />;
};

const PaginationPrevTrigger = PaginationBase.PrevTrigger;
const PaginationNextTrigger = PaginationBase.NextTrigger;
const PaginationFirstTrigger = PaginationBase.FirstTrigger;
const PaginationLastTrigger = PaginationBase.LastTrigger;
const PaginationEllipsis = PaginationBase.Ellipsis;

const PaginationPageList: Component = () => {
  return (
    <ArkPagination.Context>
      {(pagination) => (
        <For each={pagination().pages}>
          {(page, index) =>
            page.type === "page" ? (
              <PaginationBase.Item type="page" value={page.value}>
                {page.value}
              </PaginationBase.Item>
            ) : (
              <PaginationBase.Ellipsis index={index()}>
                ...
              </PaginationBase.Ellipsis>
            )
          }
        </For>
      )}
    </ArkPagination.Context>
  );
};

export {
  Pagination,
  PaginationRoot,
  PaginationItem,
  PaginationPrevTrigger,
  PaginationNextTrigger,
  PaginationFirstTrigger,
  PaginationLastTrigger,
  PaginationEllipsis,
  PaginationPageList,
  PaginationBase,
};

export { paginationVariants, type PaginationVariants } from "../recipes/pagination";`}</Pre>
      </div>
      <H2>API Reference</H2>
      <P>
        See the <A href="https://ark-ui.com/docs/components/pagination">Ark UI Pagination</A>{" "}
        documentation.
      </P>
    </>
  );
}
