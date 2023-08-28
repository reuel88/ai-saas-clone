"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { courseSchema } from "@/validators/course";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SubscriptionAction } from "@/app/(dashboard)/(routes)/course/create/_components/subscription-action";

interface CreateCourseFormProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const CreateCourseForm = ({
  apiLimitCount = 0,
  isPro = false,
}: CreateCourseFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async (values: z.infer<typeof courseSchema>) => {
      const { title, units } = values;

      const { data } = await axios.post(`/api/v1/course/chapter`, {
        title,
        units,
      });

      return data;
    },
  });

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const handleSubmit = async (values: z.infer<typeof courseSchema>) => {
    if (values.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }

    createChapters(values, {
      onSuccess: ({ courseId }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/course/create/${courseId}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="mx-auto h-full max-w-3xl p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="col-span-2 w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">Learning Journey</h3>
              <p className="text-sm text-muted-foreground">
                Enter in a course title, or what you want to learn about. Then
                enter a list of units, which are the specifics you want to
                learn. And our AI will generate a course for you!
              </p>
            </div>

            <Separator className="bg-primary/10" />
          </div>

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Calculus"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the main topic of the course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full space-y-2">
            <div>
              <h3 className="text-lg font-medium">Course Units</h3>
              <p className="text-sm text-muted-foreground">
                Individual course units. The subtopic of the course.
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {form.watch("units").map((_, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      height: { duration: 0.2 },
                    }}
                  >
                    <FormField
                      control={form.control}
                      name={`units.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col items-start gap-x-2 space-y-2 sm:flex-row sm:space-y-0">
                          <FormLabel className="flex-1 leading-5 sm:leading-10">
                            Unit {index + 1}
                          </FormLabel>
                          <div className="flex w-full gap-2 sm:flex-[8]">
                            <div className="flex-1">
                              <FormControl>
                                <Input
                                  disabled={isLoading}
                                  placeholder="Enter subtopic of the course"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => {
                                form.watch("units").splice(index, 1);
                                form.setValue("units", form.watch("units"));
                              }}
                            >
                              <Trash className="text-red-500" />
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Separator className="flex-1 bg-primary/10" />
            <div className="mx-4 flex gap-2">
              <Button
                type="button"
                variant="secondary"
                className="flex gap-x-2"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit <Plus className="text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex gap-x-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit <Trash className="text-red-500" />
              </Button>
            </div>
            <Separator className="flex-1 bg-primary/10" />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full"
            size="lg"
          >
            Lets Go!
          </Button>
        </form>
      </Form>
      <SubscriptionAction apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};
