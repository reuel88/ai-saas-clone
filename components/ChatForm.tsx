"use client";

import { ChangeEvent, FC, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

type ChatFormProps = {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  isLoading: boolean;
};

const ChatForm: FC<ChatFormProps> = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-x-2 border-t border-primary/10 py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button type="button" disabled={isLoading} variant="ghost">
        <SendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
