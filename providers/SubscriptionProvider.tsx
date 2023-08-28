"use client";

import { createContext, ReactNode, useContext } from "react";

export const SubscriptionContext = createContext({ isPro: false });

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

interface SubscriptionProviderProps {
  value: { isPro: boolean };
  children: ReactNode;
}

export const SubscriptionProvider = ({
  value,
  children,
}: SubscriptionProviderProps) => {
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
