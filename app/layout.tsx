import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/ModalProvider";
import { CrispProvider } from "@/providers/CrispProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ModeProvider } from "@/providers/ModeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Journey",
  description: "AI Learning Platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <CrispProvider />
        <body className={cn("bg-primary-foreground", inter.className)}>
          <ReactQueryProvider>
            <ModeProvider>
              <ModalProvider />
              {children}
              <Toaster />
            </ModeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
