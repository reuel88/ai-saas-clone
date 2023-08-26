"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { FC } from "react";

type CategoriesProps = {
  data: Category[];
};

export const Categories: FC<CategoriesProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const handleClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const classNames =
    "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md  bg-primary/10 hover:opacity-75 transition ";

  return (
    <div className="flex w-full space-x-2 overflow-x-auto p-1">
      <button
        type="button"
        onClick={() => handleClick(undefined)}
        className={cn(
          classNames,
          !categoryId ? "bg-primary/25" : "bg-primary/10",
        )}
      >
        Newest
      </button>
      {data.map((item) => (
        <button
          type="button"
          onClick={() => handleClick(item.id)}
          className={cn(
            classNames,
            item.id === categoryId ? "bg-primary/25" : "bg-primary/10",
          )}
          key={item.id}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
