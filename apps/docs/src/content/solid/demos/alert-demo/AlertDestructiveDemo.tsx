import { Alert, AlertTitle, AlertDescription } from "@ark-preset/solid";

export default function AlertDestructiveDemo() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>An error occurred while processing your request.</AlertDescription>
    </Alert>
  );
}
