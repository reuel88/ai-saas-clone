import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Companion , Message} from "@prisma/client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import BotAvatar from "@/components/BotAvatar";

type ChatHeaderProps  ={
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatHeader:FC<ChatHeaderProps> = ({companion}) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const handleDelete = async() => {
    try {
      await axios.delete(`/api/v1/companion/${companion.id}`);
      toast({
        description: "Success."
      });
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong."
      })
    }
  }

  return(
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar className="w-12 h-12" src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export default ChatHeader;