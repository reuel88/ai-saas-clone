import { prisma } from "@/lib/db";

import CompanionForm from "./components/CompanionForm";
import { checkSubscription } from "@/lib/subscription";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

export default async function CompanionIdPage({
  params,
}: CompanionIdPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  // const validSubscription = await checkSubscription();
  //
  // if (!validSubscription) {
  //   return redirect("/");
  // }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prisma.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
}
