import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ark-preset/solid";

export default function CardNotificationsDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">Card Content</p>
      </CardContent>
      <CardFooter>
        <a href="#" class="text-sm text-primary underline underline-offset-4">
          View all
        </a>
      </CardFooter>
    </Card>
  );
}
