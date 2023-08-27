import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MainVideoSummary } from "./_components/main-video-summary";
import { CourseSidebar } from "./_components/course-sidebar";
import { QuizCards } from "./_components/quiz-cards";

interface CoursePageProps {
  params: {
    slug: string[];
  };
}
export default async function CoursePage({ params }: CoursePageProps) {
  const [courseId, unitIndexParam = "0", chapterIndexParam = "0"] = params.slug;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course?.units[unitIndex];
  const chapter = unit?.chapters[chapterIndex];

  const nextChapter = unit?.chapters[chapterIndex + 1];
  const prevChapter = unit?.chapters[chapterIndex - 1];

  if (!course || !unit || !chapter) {
    return redirect("/course");
  }

  return (
    <div className="flex">
      <div className="hidden max-w-[400px] lg:block">
        <CourseSidebar course={course} currentChapterId={chapter.id} />
      </div>
      <div className="w-full px-8">
        <div className="flex">
          {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="mr-auto mt-4 flex w-fit"
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">
                    Previous
                  </span>
                  <span className="text-xl font-bold">{prevChapter.name}</span>
                </div>
              </div>
            </Link>
          )}

          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="ml-auto mt-4 flex w-fit"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-secondary-foreground/60">
                    Next
                  </span>
                  <span className="text-xl font-bold">{nextChapter.name}</span>
                </div>
                <ChevronRight />
              </div>
            </Link>
          )}
        </div>
        <div className="gap-8 pt-16 md:flex md:flex-col 2xl:flex-row">
          <div className="flex-[3]">
            <MainVideoSummary
              chapter={chapter}
              chapterIndex={chapterIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
          </div>

          <div className="flex-1 2xl:mt-8 2xl:w-[400px]">
            <QuizCards chapter={chapter} />
          </div>
        </div>
      </div>
    </div>
  );
}
