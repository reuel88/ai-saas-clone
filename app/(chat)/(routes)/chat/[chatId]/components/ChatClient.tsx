"use client";

import { useCompletion } from "ai/react";
import { FC, FormEvent, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatForm from "@/components/ChatForm";
import { ChatMessageProps } from "@/components/ChatMessage";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages,
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/v1/chat/${companion.id}`,
      onFinish(_prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatClient;
