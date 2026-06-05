import { Avatar, AvatarFallback, AvatarImage } from "@ui/solid";

export default function AvatarBasicDemo() {
  return (
    <div class="flex items-center gap-4 rounded-lg border border-border p-6 not-prose">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/150?u=john" alt="John Doe" />
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/150?u=jane" alt="Alice Brown" />
      </Avatar>
      <Avatar>
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  );
}
