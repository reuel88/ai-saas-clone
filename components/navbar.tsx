import { UserButton } from "@clerk/nextjs";
import { FC } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FreeCounter } from "@/components/free-counter";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const font = Poppins({ weight: "600", subsets: ["latin"] });

type NavbarProps = {};

export const Navbar: FC<NavbarProps> = async ({}) => {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar />
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
        <FreeCounter />
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
