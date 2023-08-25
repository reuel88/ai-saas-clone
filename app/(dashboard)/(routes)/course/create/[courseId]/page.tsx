import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Info } from "lucide-react";

interface CourseIdPageProps {
  params: {
    courseId: string;
  };
}

export default async function CourseIdPage({ params }: CourseIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const { courseId } = params;

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  if (!course) {
    return redirect(`/course/create`);
  }

  return (
    <div className="mx-auto h-full max-w-3xl">
      <header className="my-8 px-4 lg:px-8">
        <h5 className="text-sm uppercase text-muted-foreground">Course Name</h5>
        <h1 className="text-5xl font-bold">{course.name}</h1>
      </header>
      <div className="px-4 lg:px-8">
        <div className="mt-5 flex border-none bg-secondary p-4">
          <Info className="mr-3 h-12 w-12 text-blue-400" />
          <div className="max-w-[50ch] ">
            We generated chapters for each of your units. Look over them and
            then click the Button to confirm and continue
          </div>
        </div>
      </div>
    </div>
  );
}
