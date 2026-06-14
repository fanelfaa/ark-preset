import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@fan-ui/solid";
import { Button } from "@fan-ui/solid";

export default function CardBasicDemo() {
  return (
    <div class="not-prose rounded-lg border border-border p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            Your project will be deployed to a global network of servers and available within
            minutes.
          </p>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button>Deploy</Button>
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
