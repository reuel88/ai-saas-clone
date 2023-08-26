import Link from "next/link";
import { Bot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { prisma } from "@/lib/db";

import { Categories } from "./_components/categories";
import { Companions } from "./_components/companions";
import { SearchInput } from "./_components/search-input";

interface CompanionPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

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
      >
        <Button asChild variant="secondary" className="flex gap-x-2">
          <Link href={`/companion/new`}>
            <p className="font-bold">Create New</p>
            <Plus />
          </Link>
        </Button>
      </Heading>
      <div className="h-full space-y-2 p-4 lg:px-8">
        <SearchInput />
        <Categories data={categories} />
        <Companions data={data} />
      </div>
    </div>
  );
}
