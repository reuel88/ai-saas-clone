// Gallery

import { Heading } from "@/components/heading";
import { Plus } from "lucide-react";
import { routes } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CoursePageProps {}

export default async function CoursePage({}: CoursePageProps) {
  const headingData: any = routes.find((route) => route.id === "course");

  return (
    <div>
      <Heading
        title={headingData.label}
        description={headingData.description}
        icon={headingData.icon}
        iconColor={headingData.color}
        bgColor={headingData.bgColor}
      >
        <Button asChild variant="secondary" className="flex gap-x-2">
          <Link href={`/course/create`}>
            <p className="font-bold">Generate New</p>
            <Plus />
          </Link>
        </Button>
      </Heading>
      <div className="px-4 lg:px-8"></div>
    </div>
  );
}
