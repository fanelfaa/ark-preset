import { splitProps, For, type Component } from "solid-js";
import { Pagination as PaginationBase } from "./pagination.base";
import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import type { PaginationVariants } from "@ark-preset/core";

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
              <PaginationBase.Ellipsis index={index()}>...</PaginationBase.Ellipsis>
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

export { paginationVariants, type PaginationVariants } from "@ark-preset/core";
