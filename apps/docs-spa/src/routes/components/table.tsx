import { createFileRoute } from "@tanstack/solid-router";
import {
  H1,
  H2,
  H3,
  P,
  InlineCode,
  Table,
  Th,
  Td,
  Pre,
  THead,
  TBody,
  Tr,
} from "../../components/markdown";
import TableBasicDemo from "@demos/table-demo/TableBasicDemo.tsx";

export const Route = createFileRoute("/components/table")({ component: TablePage });

function TablePage() {
  return (
    <>
      <H1>Table</H1>
      <P>
        A responsive data table component with accessible markup. Built with native HTML{" "}
        <InlineCode>{`<table>`}</InlineCode> elements — no external dependencies.
      </P>
      <TableBasicDemo />
      <Pre lang="tsx">{`

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "~/components/table";

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell class="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell class="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell class="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
      `}</Pre>
      <H2>Installation</H2>
      <H3>CLI</H3>
      <P>Run the following command to add the component to your project:</P>
      <Pre lang="bash">{`

npx @fan-ui/cli@latest add table
      `}</Pre>
      <H3>Manual</H3>
      <div class="space-y-3">
        Create the recipe file at `src/components/recipes/table.ts`:
        <Pre lang="tsx">{`import { tv, type VariantProps } from 'tailwind-variants'

export const tableVariants = tv({
  slots: {
    table: "w-full caption-bottom text-sm",
    header: "[&_tr]:border-b",
    body: "[&_tr:last-child]:border-0",
    row: "border-b border-muted transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    head: "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    cell: "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
    caption: "mt-4 text-sm text-muted-foreground",
  },
})

export type TableVariants = VariantProps<typeof tableVariants>`}</Pre>
      </div>
      <div class="space-y-3">
        Create the component file at `src/components/table.tsx`:
        <Pre lang="tsx">{`import { splitProps, type Component } from 'solid-js'
import { tableVariants } from '../recipes/table'
import { ark, type HTMLArkProps } from '@ark-ui/solid/factory'

const styles = tableVariants()

const Table: Component<HTMLArkProps<"table">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.table class={styles.table({ class: local.class })} {...others} />
}

const TableHeader: Component<HTMLArkProps<"thead">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.thead class={styles.header({ class: local.class })} {...others} />
}

const TableBody: Component<HTMLArkProps<"tbody">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.tbody class={styles.body({ class: local.class })} {...others} />
}

const TableRow: Component<HTMLArkProps<"tr">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.tr class={styles.row({ class: local.class })} {...others} />
}

const TableHead: Component<HTMLArkProps<"th">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.th class={styles.head({ class: local.class })} {...others} />
}

const TableCell: Component<HTMLArkProps<"td">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.td class={styles.cell({ class: local.class })} {...others} />
}

const TableCaption: Component<HTMLArkProps<"caption">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <ark.caption class={styles.caption({ class: local.class })} {...others} />
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
}`}</Pre>
      </div>
      <H2>Usage</H2>
      <P>Import the components:</P>
      <Pre lang="tsx">{`

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@fan-ui/solid";
      `}</Pre>
      <P>Basic table:</P>
      <Pre lang="tsx">{`

<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell class="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell class="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell class="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
      `}</Pre>
      <P>
        Column alignment can be customized using the <InlineCode>class</InlineCode> prop:
      </P>
      <Pre lang="tsx">{`

<TableHead class="text-right">Amount</TableHead>
<TableCell class="text-right">$250.00</TableCell>
      `}</Pre>
      <H2>Anatomy</H2>
      <P>A table is composed of the following parts:</P>
      <Table>
        <THead>
          <Tr>
            <Th>Part</Th>
            <Th>Element</Th>
            <Th>Description</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <InlineCode>Table</InlineCode>
            </Td>
            <Td>
              <InlineCode>table</InlineCode>
            </Td>
            <Td>The root table element.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableHeader</InlineCode>
            </Td>
            <Td>
              <InlineCode>thead</InlineCode>
            </Td>
            <Td>The header row group.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableBody</InlineCode>
            </Td>
            <Td>
              <InlineCode>tbody</InlineCode>
            </Td>
            <Td>The body row group.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableRow</InlineCode>
            </Td>
            <Td>
              <InlineCode>tr</InlineCode>
            </Td>
            <Td>A table row.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableHead</InlineCode>
            </Td>
            <Td>
              <InlineCode>th</InlineCode>
            </Td>
            <Td>A header cell.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableCell</InlineCode>
            </Td>
            <Td>
              <InlineCode>td</InlineCode>
            </Td>
            <Td>A data cell.</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableCaption</InlineCode>
            </Td>
            <Td>
              <InlineCode>caption</InlineCode>
            </Td>
            <Td>A table caption.</Td>
          </Tr>
        </TBody>
      </Table>
      <H2>API Reference</H2>
      <Table>
        <THead>
          <Tr>
            <Th>Component</Th>
            <Th>Prop</Th>
            <Th>Type</Th>
            <Th>Default</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              <InlineCode>Table</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableHeader</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableBody</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableRow</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableHead</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableCell</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
          <Tr>
            <Td>
              <InlineCode>TableCaption</InlineCode>
            </Td>
            <Td>
              <InlineCode>class</InlineCode>
            </Td>
            <Td>
              <InlineCode>string</InlineCode>
            </Td>
            <Td>—</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  );
}
