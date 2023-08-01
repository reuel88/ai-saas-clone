"use client";

import { Menu } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";

type MobileSidebarProps = {
  apiLimitCount: number;
  isPro: boolean;
};

const MobileSidebar: FC<MobileSidebarProps> = ({
  apiLimitCount = 0,
  isPro = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-32 bg-secondary p-0 pt-10">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
