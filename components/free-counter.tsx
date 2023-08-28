"use client";

import { Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/useProModal";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { useApiLimit } from "@/providers/ApiLimitProvider";

type FreeCounterProps = {};

export const FreeCounter: FC<FreeCounterProps> = ({}) => {
  const { apiLimitCount } = useApiLimit();
  const { isPro } = useSubscription();

  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isPro) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="space-y-2 whitespace-nowrap text-sm text-secondary-foreground">
        <p id="progress-label">
          {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
        </p>
        <Progress
          aria-labelledby="progress-label"
          className="h-3"
          value={apiLimitCount ? (apiLimitCount / MAX_FREE_COUNTS) * 100 : 0}
        />
      </div>
      <Button onClick={proModal.onOpen} variant="premium" className="w-full">
        Upgrade
        <Zap className="ml-2 h-4 w-4 fill-white" />
      </Button>
    </div>
  );
};
