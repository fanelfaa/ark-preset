import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui/solid";

export default function TabsBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div class="text-sm text-foreground">
            Make changes to your account here. You can update your profile information.
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div class="text-sm text-foreground">
            Change your password here. After saving, you'll be logged out.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
