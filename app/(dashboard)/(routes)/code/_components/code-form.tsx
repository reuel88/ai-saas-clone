"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BotAvatar } from "@/components/bot-avatar";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";
import { formSchema } from "../constants";

export const CodeForm: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const { mutate: askQuestion, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const { data } = await axios.post("/api/v1/code", {
        messages: newMessages,
      });

      return [userMessage, data] as ChatCompletionRequestMessage[];
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    askQuestion(values, {
      onSuccess: (data) => {
        setMessages((current) => [...current, ...data]);

        form.reset();
      },
      onError: (error: any) => {
        console.error(error);
        if (error?.response?.status === 403) {
          proModal.onOpen();
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong.",
            duration: 3000,
          });
        }
      },
      onSettled: () => {
        router.refresh();
      },
    });
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      type="text"
                      className="border-0 bg-transparent outline-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                      disabled={isLoading}
                      placeholder="Simple toggle button using react hooks."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 w-full lg:col-span-2"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="mt-4 space-y-4">
        {isLoading && (
          <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No conversation started." />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "flex w-full items-start gap-x-8 rounded-lg p-8",
                message.role === "user"
                  ? "border border-primary/10 bg-primary text-secondary"
                  : "bg-muted",
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 p-2">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="rounded-lg bg-black/10 p-1" {...props} />
                  ),
                }}
                className="overflow-hidden text-sm leading-7"
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
