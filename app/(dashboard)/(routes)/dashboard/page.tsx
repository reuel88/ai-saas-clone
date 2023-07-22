"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { NextPage } from "next";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import Link from "next/link";

const DashboardPage: NextPage = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          Explore the power of AI
        </h2>
        <p className="text-center text-sm font-light text-muted-foreground md:text-lg">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="flex flex-col gap-8 px-4 md:px-20 lg:px-32">
        {tools.map((tool) => (
          <Link href={tool.href} key={tool.href}>
            <Card className="flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md">
              <div className="flex items-center gap-x-4">
                <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                  <tool.icon className={cn("h-8 w-8", tool.color)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
