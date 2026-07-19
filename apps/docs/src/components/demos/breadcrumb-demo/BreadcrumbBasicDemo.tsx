import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@ark-preset/solid";
import { DemoWrapper } from "../../DemoWrapper";

export default function BreadcrumbBasicDemo() {
  return (
    <DemoWrapper class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-3">Basic Breadcrumb</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-3">Long Path with Ellipsis</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Menu>
                <MenuTrigger
                  hideIndicator
                  class="flex size-8 items-center justify-center rounded-lg"
                >
                  <BreadcrumbEllipsis />
                  <span class="sr-only">Toggle menu</span>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="docs">Documentation</MenuItem>
                  <MenuItem value="themes">Themes</MenuItem>
                  <MenuItem value="github">GitHub</MenuItem>
                </MenuContent>
              </Menu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </DemoWrapper>
  );
}
