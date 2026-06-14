import {
  MenuTrigger,
  MenuContent,
  MenuTriggerItem,
  MenuItem,
  MenuSeparator,
  NestedMenuContent,
  Menu,
} from "@fan-ui/solid";

export default function MenuNestedDemo() {
  return (
    <div class="rounded-lg border border-border p-6">
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem value="new">New...</MenuItem>
          <MenuItem value="edit">Edit</MenuItem>
          <Menu>
            <MenuTriggerItem>Share</MenuTriggerItem>
            <NestedMenuContent>
              <MenuItem value="twitter">Twitter</MenuItem>
              <MenuItem value="facebook">Facebook</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </NestedMenuContent>
          </Menu>
          <MenuSeparator />
          <MenuItem value="delete">Delete</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
