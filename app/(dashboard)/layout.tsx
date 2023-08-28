import { ReactNode, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionProvider } from "@/providers/SubscriptionProvider";
import { ApiLimitProvider } from "@/providers/ApiLimitProvider";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const apiLimitCount = await getApiLimitCount("DashboardLayout ApiLimit")();
  const isPro = await checkSubscription("DashboardLayout Subscription")();

  return (
    <ApiLimitProvider value={{ apiLimitCount }}>
      <SubscriptionProvider value={{ isPro }}>
        <div className="min-h-full">
          <Navbar />
          <div className="fixed inset-y-0 mt-16 hidden h-full w-28 flex-col md:flex">
            <Sidebar />
          </div>
          <main className="min-h-full pt-16 md:pl-28">
            <Suspense fallback={<div>...Loading</div>}>{children}</Suspense>
          </main>
        </div>
      </SubscriptionProvider>
    </ApiLimitProvider>
  );
}
