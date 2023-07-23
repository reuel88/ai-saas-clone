import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

const BotAvatar: FC = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/images/logo.png" />
    </Avatar>
  );
};

export default BotAvatar;
