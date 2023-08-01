import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { cn } from "../lib/utils";

type BotAvatarProps  ={
  src?: string;
  className?: string
}

const BotAvatar: FC<BotAvatarProps> = ({className = '', src = '/images/logo.png'}) => {
  return (
    <Avatar className={cn('h-8 w-8', className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
