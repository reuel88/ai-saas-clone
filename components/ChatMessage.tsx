"use client";
import { Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { FC } from "react";
import { BeatLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BotAvatar from "@/components/BotAvatar";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

const ChatMessage: FC<ChatMessageProps> = ({
  role,
  content,
  isLoading,
  src,
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
      duration: 3000,
    });
  };

  const isUser = role === "user";

  return (
    <div
      className={cn(
        "group flex w-full items-start gap-x-3 py-4",
        isUser && "justify-end",
      )}
    >
      {!isUser && src && <BotAvatar src={src} className="h-12 w-12" />}
      <div className="max-w-sm rounded-md bg-primary/10 px-4 py-2 text-sm">
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          content
        )}
      </div>
      {isUser && <UserAvatar className="h-12 w-12" />}
      {!isUser && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 transition group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
