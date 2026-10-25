import { buttonVariants } from "@ark-preset/solid";

export default function ButtonLinkDemo() {
  return (
    <div class="flex flex-wrap gap-4">
      <a class={buttonVariants({ variant: "link" })} href="#">
        Click here
      </a>
    </div>
  );
}
