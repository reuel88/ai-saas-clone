"use client";
import { FC } from "react";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { SubscriptionButton } from "./subscription-button";

interface CurrentSubscriptionProps {}
export const CurrentSubscription: FC<CurrentSubscriptionProps> = ({}) => {
  const { isPro } = useSubscription();

  return (
    <div className="space-y-4 ">
      <div className="text-sm text-muted-foreground">
        {isPro
          ? "You are currently on a Pro plan."
          : "You are currently on a free plan."}
      </div>
      <SubscriptionButton />
    </div>
  );
};
