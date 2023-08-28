"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/useProModal";
import { formSchema } from "../constants";

export const MusicForm: FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();

  const { mutate: generateVideo, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      setMusic(undefined);

      const { data } = await axios.post("/api/v1/music", values);

      return data.audio;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    generateVideo(values, {
      onSuccess: (data) => {
        setMusic(data);
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
                      placeholder="Piano solo"
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
        {!music && !isLoading && <Empty label="No music generated." />}
        {music && (
          <audio controls className="mt-8 w-full">
            <source src={music} />
          </audio>
        )}
      </div>
    </>
  );
};
