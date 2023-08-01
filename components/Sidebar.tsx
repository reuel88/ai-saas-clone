"use client";

import {
  Bot,
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Companion",
    icon: Bot,
    href: "/companion",
    color: "text-cyan-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },

  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },

  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

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

type SidebarProps = {
  apiLimitCount: number;
  isPro: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isPro = false }) => {
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

export default Sidebar;
