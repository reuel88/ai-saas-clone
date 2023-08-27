"use client";
import { Chapter, Course, Unit } from "@prisma/client";
import { ChapterCard, ChapterCardHandler } from "./chapter-card";
import { useMemo, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ConfirmChaptersFormProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}
export const ConfirmChapters = ({ course }: ConfirmChaptersFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const chapterRefs = useRef<{ [key: string]: ChapterCardHandler }>({});

  const [completedChapters, setCompletedChapters] = useState<Set<String>>(
    new Set(),
  );

  const totalChaptersCount = useMemo(
    () => course.units.reduce((acc, unit) => acc + unit.chapters.length, 0),
    [course.units],
  );

  return (
    <div className="w-full space-y-6">
      {course.units.map((unit, unitIndex) => (
        <div key={unit.id}>
          <header>
            <h2 className="text-sm uppercase text-muted-foreground">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
          </header>
          <div className="space-y-2">
            {unit.chapters.map((chapter, chapterIndex) => (
              <ChapterCard
                ref={(ref) =>
                  (chapterRefs.current[chapter.id] = ref
                    ? ref
                    : ({} as ChapterCardHandler))
                }
                key={chapter.id}
                completedChapters={completedChapters}
                setCompletedChapters={setCompletedChapters}
                chapter={chapter}
                chapterIndex={chapterIndex}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 flex items-center justify-center">
        <Separator className="flex-1 bg-primary/10" />
        <div className="mx-4 flex gap-2">
          <Link
            href={`/course/create`}
            className={buttonVariants({
              variant: "secondary",
              className: "flex gap-x-2",
            })}
          >
            <ChevronLeft />
            Back
          </Link>

          {totalChaptersCount === completedChapters.size && (
            <Link
              href={`/course/${course.id}/0/0`}
              className={buttonVariants({
                className: "flex gap-x-2",
              })}
            >
              Save & Continue <ChevronRight />
            </Link>
          )}

          {totalChaptersCount !== completedChapters.size && (
            <Button
              type="button"
              className="flex gap-x-2"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                Object.values(chapterRefs.current).forEach((ref) =>
                  ref.triggerLoad(),
                );
              }}
            >
              Generate
              <ChevronRight />
            </Button>
          )}
        </div>
        <Separator className="flex-1 bg-primary/10" />
      </div>
    </div>
  );
};
