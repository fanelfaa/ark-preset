import { Textarea } from "@ark-preset/solid";

export default function TextareaBasicDemo() {
  return (
    <div class="flex flex-col gap-4">
      <Textarea placeholder="Basic textarea" />
      <Textarea label="Bio" placeholder="Tell us about yourself" />
      <Textarea
        label="With Description"
        description="Write a short introduction."
        placeholder="Enter your bio"
      />
      <Textarea label="Error State" error="This field is required" placeholder="Enter value" />
    </div>
  );
}
