import { createSignal } from "solid-js";
import {
  Pagination,
  PaginationPageList,
  PaginationFirstTrigger,
  PaginationPrevTrigger,
  PaginationNextTrigger,
  PaginationLastTrigger,
} from "@fan-ui/solid";

export default function PaginationControlledDemo() {
  const [page, setPage] = createSignal(5);

  return (
    <div class="rounded-lg border border-border p-6">
      <div>
        <p class="text-sm text-muted-foreground mb-3">
          Controlled page: <span class="font-medium text-foreground">{page()}</span>
        </p>
        <Pagination
          count={100}
          pageSize={10}
          page={page()}
          onPageChange={(e) => setPage(e.page)}
          class="gap-1"
        >
          <PaginationFirstTrigger>
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
          </PaginationFirstTrigger>
          <PaginationPrevTrigger>
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
          </PaginationPrevTrigger>
          <PaginationPageList />
          <PaginationNextTrigger>
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
          </PaginationNextTrigger>
          <PaginationLastTrigger>
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
          </PaginationLastTrigger>
        </Pagination>
      </div>
    </div>
  );
}
