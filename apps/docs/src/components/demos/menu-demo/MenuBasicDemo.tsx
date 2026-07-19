import { For } from "solid-js";
import { MenuTrigger, MenuContent, MenuItem, Menu } from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

const menuItems = [
  { value: "edit", label: "Edit" },
  { value: "duplicate", label: "Duplicate" },
  { value: "delete", label: "Delete" },
];

export default function MenuBasicDemo() {
  return (
    <DemoWrapper>
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <For each={menuItems}>
            {(item) => <MenuItem value={item.value}>{item.label}</MenuItem>}
          </For>
        </MenuContent>
      </Menu>
    </DemoWrapper>
  );
}
