import {
  Heading,
  Paragraph,
  TextLead,
  TextLarge,
  TextSmall,
  TextMuted,
  TextInlineCode,
  TextBlockquote,
  TextList,
} from "@ark-preset/solid";

export default function TypographyBasicDemo() {
  return (
    <div class="space-y-4">
      <div>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </div>
      <div>
        <TextLead>Lead text — A larger, muted paragraph for introductions.</TextLead>
      </div>
      <div>
        <Paragraph>
          Regular paragraph with default styling. This text demonstrates how a standard paragraph
          looks with the typography system.
        </Paragraph>
      </div>
      <div>
        <TextLarge>Large text — slightly bigger and bold.</TextLarge>
      </div>
      <div>
        <TextSmall>Small text — fine print or captions.</TextSmall>
      </div>
      <div>
        <TextMuted>Muted text — less prominent, for secondary info.</TextMuted>
      </div>
      <div>
        <Paragraph>
          You can also use <TextInlineCode>TextInlineCode</TextInlineCode> for inline code snippets.
        </Paragraph>
      </div>
      <TextBlockquote>
        "A blockquote for quoting content or emphasizing a statement."
      </TextBlockquote>
      <TextList>
        <li>Unordered list item one</li>
        <li>Unordered list item two</li>
        <li>Unordered list item three</li>
      </TextList>
    </div>
  );
}
