import { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface GalleryCourseCardProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}
export const GalleryCourseCard: FC<GalleryCourseCardProps> = ({ course }) => {
  return (
    <>
      <div className="rounded-lg border border-secondary">
        <div className="relative">
          <Link
            href={`/course/${course.id}/0/0`}
            className="relative block w-full"
          >
            <Image
              src={course.image || ""}
              className="aspect-video w-full rounded-t-lg object-cover"
              width={300}
              height={300}
              alt="picture of the course"
            />
            <span className="absolute bottom-2 left-2 right-2 w-fit rounded-md bg-black/60 px-2 py-1 text-white">
              {course.name}
            </span>
          </Link>
        </div>

        <div className="p-4">
          <h4 className="text-sm text-secondary-foreground/60">Units</h4>
          <div className="space-y-1">
            {course.units.map((unit, unitIndex) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                  className="block w-fit underline"
                >
                  {unit.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
