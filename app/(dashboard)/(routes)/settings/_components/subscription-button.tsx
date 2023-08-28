"use client";

import axios from "axios";
import { FC, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/providers/SubscriptionProvider";

interface SubscriptionButtonProps {}

export const SubscriptionButton: FC<SubscriptionButtonProps> = ({}) => {
  const { isPro } = useSubscription();

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/v1/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isPro ? "default" : "premium"}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  );
};
