import { FC } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ className = "" }) => {
  const { user } = useUser();

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
