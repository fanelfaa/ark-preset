import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  List,
} from "@ark-preset/solid";

export default function TypographyBasicDemo() {
  return (
    <div class="rounded-lg border border-border p-4 not-prose">
      <div class="space-y-4">
        <div>
          <H1>Heading 1</H1>
          <H2>Heading 2</H2>
          <H3>Heading 3</H3>
          <H4>Heading 4</H4>
        </div>
        <div>
          <Lead>Lead text — A larger, muted paragraph for introductions.</Lead>
        </div>
        <div>
          <P>
            Regular paragraph with default styling. This text demonstrates how a standard paragraph
            looks with the typography system.
          </P>
        </div>
        <div>
          <Large>Large text — slightly bigger and bold.</Large>
        </div>
        <div>
          <Small>Small text — fine print or captions.</Small>
        </div>
        <div>
          <Muted>Muted text — less prominent, for secondary info.</Muted>
        </div>
        <div>
          <P>
            You can also use <InlineCode>InlineCode</InlineCode> for inline code snippets.
          </P>
        </div>
        <Blockquote>"A blockquote for quoting content or emphasizing a statement."</Blockquote>
        <List>
          <li>Unordered list item one</li>
          <li>Unordered list item two</li>
          <li>Unordered list item three</li>
        </List>
      </div>
    </div>
  );
}
