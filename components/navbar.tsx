import { FC } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/mobile-sidebar";
import ModeToggle from "@/components/mode-toggle";
import FreeCounter from "@/components/FreeCounter";

const font = Poppins({ weight: "600", subsets: ["latin"] });

type NavbarProps = {
  apiLimitCount: number;
  isPro: boolean;
};

export const Navbar: FC<NavbarProps> = async ({
  apiLimitCount = 0,
  isPro = false,
}) => {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        <Link href="/">
          <h1
            className={cn(
              "hidden text-xl font-bold text-primary md:block md:text-3xl",
              font.className,
            )}
          >
            AI Journey
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        {!isPro && <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
