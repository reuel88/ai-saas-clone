import { Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/useProModal";
import { useSubscription } from "@/providers/SubscriptionProvider";
import { useApiLimit } from "@/providers/ApiLimitProvider";

interface SubscriptionActionProps {}

export const SubscriptionAction: FC<SubscriptionActionProps> = ({}) => {
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
    <div className="mx-auto mt-4 flex w-1/2 flex-col items-center space-y-4 rounded-md bg-secondary p-4">
      <div>
        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
        <Progress
          className="mt-2"
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
