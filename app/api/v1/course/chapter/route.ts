import { auth } from "@clerk/nextjs";
import { courseSchema } from "@/validators/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

type outputUnits = {
  title: string;
  chapters: {
    youtube_search_query: string;
    chapter_title: string;
  }[];
}[];

/*
    /api/v1/course/chapter
 */
export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription('[CHAPTER_POST]')();
    //
    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired", { status: 403 });
    // }

    const body = await req.json();
    const { title, units } = courseSchema.parse(body);

    const outputUnits: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`,
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      },
    );

    const imageSearchTerm = await strict_output(
      "You are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
      {
        imageSearchTerm: "a good search term for the title of the course",
      },
    );

    const courseImage = await getUnsplashImage(imageSearchTerm.imageSearchTerm);

    const course = await prisma.course.create({
      data: {
        name: title,
        image: courseImage,
      },
    });

    for (const unit of outputUnits) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    return NextResponse.json({ courseId: course.id });
  } catch (error) {
    console.log("[CHAPTER_ERROR]", error);

    if (error instanceof ZodError) {
      return new NextResponse("Invalid body", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}
