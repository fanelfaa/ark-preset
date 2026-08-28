import { Avatar, AvatarFallback, AvatarImage } from "@ark-preset/solid";

export default function AvatarBasicDemo() {
  return (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
      <AvatarImage src="https://i.pravatar.cc/150?u=john" alt="John Doe" />
    </Avatar>
  );
}
