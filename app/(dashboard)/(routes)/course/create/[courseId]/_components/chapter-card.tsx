"use client";

import { Chapter } from "@prisma/client";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface ChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: Dispatch<SetStateAction<Set<String>>>;
}

export type ChapterCardHandler = {
  triggerLoad: () => void;
};
export const ChapterCard = forwardRef<ChapterCardHandler, ChapterCardProps>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    const { toast } = useToast();

    const [success, setSuccess] = useState<boolean | null>(null);

    const { mutate: createChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const { data } = await axios.post(
          `/api/v1/course/chapter/${chapter.id}`,
        );

        return data;
      },
    });

    const addChapterIdToSet = useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    const triggerLoad = async () => {
      if (chapter.videoId) {
        addChapterIdToSet();
        return;
      }

      createChapterInfo(undefined, {
        onSuccess: (data) => {
          console.log(data);
          setSuccess(true);
        },
        onError: (error) => {
          // TODO: handle refreshing in failed
          console.error(error);
          setSuccess(false);
          toast({
            title: "Error",
            description: "There was an error loading your chapter",
            variant: "destructive",
          });
        },
        onSettled: () => {
          addChapterIdToSet();
        },
      });
    };

    useImperativeHandle(ref, () => ({
      triggerLoad,
    }));

    return (
      <div className="mt-2 flex gap-2">
        <div
          key={chapter.id}
          className={cn("flex flex-1 justify-between rounded px-4 py-2", {
            "bg-secondary": success === null,
            "bg-red-500": success === false,
            "bg-green-500": success === true,
          })}
        >
          <h5>{chapter.name}</h5>
          {isLoading && <Loader2 className="animate-spin" />}
        </div>
        {!success && (
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={triggerLoad}
          >
            Generate
          </Button>
        )}
      </div>
    );
  },
);

ChapterCard.displayName = "ChapterCard";
