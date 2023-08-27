import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
}

export const CourseSidebar = ({
  course,
  currentChapterId,
}: CourseSidebarProps) => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold">{course.name}</h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="space-y-2">
            <div>
              <h2 className="text-sm uppercase text-muted-foreground">
                Unit {unitIndex + 1}
              </h2>
              <h2 className="text-2xl font-bold">{unit.name}</h2>
            </div>

            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                    className={cn("text-muted-foreground", {
                      "font-bold text-green-500":
                        chapter.id === currentChapterId,
                    })}
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="flex-1 bg-primary/10" />
          </div>
        );
      })}
    </div>
  );
};
