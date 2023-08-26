"use client";

import axios from "axios";
import { Check, Zap } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tools } from "@/constants";
import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const ProModal: FC = () => {
  const { toast } = useToast();
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/v1/stripe");

      window.location.href = response.data.url;
    } catch (error: any) {
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
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 text-xl font-bold">
              Upgrade to Genius
              <Badge variant="premium" className="py-1 text-sm uppercase">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription
            asChild
            className="space-y-2 pt-2 text-center font-medium text-zinc-900"
          >
            <div>
              {tools.map((tool) => (
                <Card
                  key={tool.href}
                  className="flex items-center justify-between border-black/5 p-3"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                      <tool.icon className={cn("h-6 w-6", tool.color)} />
                    </div>
                    <div className="text-sm font-semibold">{tool.label}</div>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubscribe}
            disabled={isLoading}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
