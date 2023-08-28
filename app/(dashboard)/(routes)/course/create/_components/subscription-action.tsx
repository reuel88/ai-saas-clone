import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/useProModal";

interface SubscriptionActionProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const SubscriptionAction = ({
  apiLimitCount,
  isPro,
}: SubscriptionActionProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isPro) return null;

  return (
    <div className="mx-auto mt-4 flex w-1/2 flex-col items-center rounded-md bg-secondary p-4">
      {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
      <Progress
        className="mt-2"
        value={apiLimitCount ? (apiLimitCount / MAX_FREE_COUNTS) * 100 : 0}
      />
      <Button onClick={proModal.onOpen} variant="premium" className="w-full">
        Upgrade
        <Zap className="ml-2 h-4 w-4 fill-white" />
      </Button>
    </div>
  );
};
