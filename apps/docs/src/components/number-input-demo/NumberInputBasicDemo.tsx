import {
  NumberInput,
  NumberInputControl,
  NumberInputIncrementTrigger,
  NumberInputDecrementTrigger,
} from "@ui/solid";

export default function NumberInputBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <NumberInput defaultValue={50} min={0} max={100}>
        <NumberInputControl>
          <NumberInputDecrementTrigger>
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
              <path d="m6 9 6 6 6-6" />
            </svg>
          </NumberInputDecrementTrigger>
          <NumberInputIncrementTrigger>
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </NumberInputIncrementTrigger>
        </NumberInputControl>
      </NumberInput>
    </div>
  );
}
