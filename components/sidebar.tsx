"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/providers/SubscriptionProvider";

type SidebarItemProps = {
  route: (typeof routes)[0];
  pathname: string;
  isPro: boolean;
};

const SidebarItem: FC<SidebarItemProps> = ({ route, pathname }) => {
  const classNames = cn(
    "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
    pathname === route.href && "bg-primary/10 text-primary",
  );

  return (
    <Link href={route.href} className={classNames}>
      <div className="flex flex-1 flex-col items-center gap-y-2 text-center">
        <route.icon className={cn("h-5 w-5", route.color)} />
        {route.label}
      </div>
    </Link>
  );
};

type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = () => {
  const { isPro } = useSubscription();
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary text-primary">
      <div className="flex flex-1 justify-center p-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              pathname={pathname}
              isPro={isPro}
              route={route}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
