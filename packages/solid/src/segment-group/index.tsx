import { splitProps, type Component } from "solid-js";
import { SegmentGroup as SegmentGroupBase } from "./segment-group.base";
import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import type { SegmentGroupVariants } from "@fan-ui/core";

const SegmentGroup: Component<ArkSegmentGroup.RootProps & SegmentGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["variant", "orientation", "children"]);
  return (
    <SegmentGroupBase.Root variant={local.variant} orientation={local.orientation} {...others}>
      <SegmentGroupBase.Indicator />
      {local.children}
    </SegmentGroupBase.Root>
  );
};

const SegmentGroupItem: Component<ArkSegmentGroup.ItemProps & SegmentGroupVariants> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <SegmentGroupBase.Item {...others}>
      <SegmentGroupBase.ItemText>{local.children}</SegmentGroupBase.ItemText>
      <SegmentGroupBase.ItemControl />
      <SegmentGroupBase.ItemHiddenInput />
    </SegmentGroupBase.Item>
  );
};

export { SegmentGroup, SegmentGroupItem, SegmentGroupBase };

export { segmentGroupVariants, type SegmentGroupVariants } from "@fan-ui/core";
