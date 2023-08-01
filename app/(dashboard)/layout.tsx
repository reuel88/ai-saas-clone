import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full">
      <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="fixed inset-y-0 mt-16 hidden h-full w-28 flex-col md:flex">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="h-full pt-16 md:pl-28">{children}</main>
    </div>
  );
}
