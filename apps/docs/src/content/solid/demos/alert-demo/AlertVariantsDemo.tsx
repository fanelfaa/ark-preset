import { Alert, AlertTitle, AlertDescription } from "@ark-preset/solid";

export default function AlertVariantsDemo() {
  return (
    <div class="space-y-4">
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is the destructive alert style.</AlertDescription>
      </Alert>
    </div>
  );
}
