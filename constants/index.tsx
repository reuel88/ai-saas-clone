import {
  Bot,
  Code,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const routes = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-slate-500",
  },
  {
    id: "companion",
    label: "Companion",
    icon: Bot,
    href: "/companion",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    id: "conversation",
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    id: "music",
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "image",
    label: "image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    id: "video",
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    id: "code",
    label: "Code Generation",
    description: "Generate code using descriptive text.",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    id: "course",
    label: "Course Generation",
    description: "Generate courses using descriptive text.",
    icon: GraduationCap,
    href: "/course",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const tools = [...[...routes].splice(1, routes.length - 2)];
