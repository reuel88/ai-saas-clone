import Link from "next/link";
import { Bot, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading, HeadingContext } from "@/components/heading";
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
      <HeadingContext id="companion">
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "flex gap-x-2",
          })}
          href={`/companion/new`}
        >
          <p className="font-bold">Create New</p>
          <Plus />
        </Link>
      </HeadingContext>
      <div className="h-full space-y-2 p-4 lg:px-8">
        <SearchInput />
        <Categories data={categories} />
        <Companions data={data} />
      </div>
    </div>
  );
}
