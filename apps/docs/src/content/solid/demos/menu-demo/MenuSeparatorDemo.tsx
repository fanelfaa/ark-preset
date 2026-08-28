import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator } from "@ark-preset/solid";

export default function MenuSeparatorDemo() {
  return (
    <div>
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuSeparator />
          <MenuItem value="delete">Delete</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
