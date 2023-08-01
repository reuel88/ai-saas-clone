import SearchInput from "@/components/SearchInput";
import { prisma } from "@/lib/db";
import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import Heading from "@/components/Heading";
import { Bot, Settings } from "lucide-react";

type CompanionPageProps = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

export default async function CompanionPage({
  searchParams,
}: CompanionPageProps) {
  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div>
      <Heading
        title="Companion"
        description="Chat with someone"
        icon={Bot}
        iconColor="text-cyan-500"
        bgColor="bg-cyan-500/10"
      />
      <div className="h-full space-y-2 p-4">
        <SearchInput />
        <Categories data={categories} />
        <Companions data={data} />
      </div>
    </div>
  );
}
