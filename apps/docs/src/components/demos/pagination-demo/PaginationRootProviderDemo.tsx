import { For } from "solid-js";
import { usePagination } from "@ark-ui/solid/pagination";
import { PaginationBase } from "@ark-preset/solid";

export default function PaginationRootProviderDemo() {
  const pagination = usePagination({ count: 100, pageSize: 10 });

  return (
    <div class="rounded-lg border border-border p-6">
      <div>
        <p class="text-sm text-muted-foreground mb-3">RootProvider pattern</p>
        <PaginationBase.RootProvider value={pagination} class="gap-1">
          <PaginationBase.FirstTrigger>
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
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </PaginationBase.FirstTrigger>
          <PaginationBase.PrevTrigger>
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </PaginationBase.PrevTrigger>
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
          <PaginationBase.NextTrigger>
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </PaginationBase.NextTrigger>
          <PaginationBase.LastTrigger>
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
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </PaginationBase.LastTrigger>
        </PaginationBase.RootProvider>
      </div>
    </div>
  );
}
