import { Paragraph, TextLead, TextLarge, TextSmall, TextMuted } from "@ark-preset/solid";

export default function TypographyBodyDemo() {
  return (
    <div class="space-y-4">
      <Paragraph>Regular paragraph text with standard styling.</Paragraph>
      <TextLead>Lead paragraph for introducing content.</TextLead>
      <TextLarge>Large styled text.</TextLarge>
      <TextSmall>Small styled text.</TextSmall>
      <TextMuted>Muted secondary text.</TextMuted>
    </div>
  );
}
