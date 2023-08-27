// api/v1/course/chapter/:chapterId

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { z, ZodError } from "zod";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { strict_output } from "@/lib/gpt";

const paramsSchema = z.object({
  chapterId: z.string(),
});

export async function POST(
  req: Request,
  { params }: { params: { chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { chapterId } = paramsSchema.parse(params);

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const videos = await searchYoutube(chapter.youtubeSearchQuery);

    let videoId = videos[0].id.videoId;
    let transcript = await getTranscript(videos[0].id.videoId);
    let maxLength = 1000;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary }: { summary: string } = await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" },
    );

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name,
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("[CHAPTER_ID_ERROR]", error);

    if (error instanceof ZodError) {
      return new NextResponse("Invalid", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}
