import { auth, redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import ChatClient from "./components/ChatClient";
import { redirect } from "next/navigation";

type ChatIdPageProps = {
  params: {
    chatId: string;
  };
};

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
}
