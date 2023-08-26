"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/useProModal";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const ConversationForm = () => {
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

      const { data } = await axios.post("/api/v1/conversation", {
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
        console.log(error);
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
                      placeholder="How do I calculate the radius of a circle?"
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
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
