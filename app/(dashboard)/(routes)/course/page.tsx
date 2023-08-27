// Gallery

import { HeadingContext } from "@/components/heading";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { GalleryCourseCard } from "./_components/gallery-course-card";

interface CoursePageProps {}

export default async function CoursePage({}: CoursePageProps) {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  return (
    <div>
      <HeadingContext id="course">
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "flex gap-x-2",
          })}
          href={`/course/create`}
        >
          <p className="font-bold">Generate New</p>
          <Plus />
        </Link>
      </HeadingContext>
      <div className=" px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {courses.map((course) => (
            <GalleryCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
