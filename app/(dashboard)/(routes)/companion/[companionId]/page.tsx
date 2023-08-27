import { prisma } from "@/lib/db";

import { CompanionForm } from "./_components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

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

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prisma.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
}
