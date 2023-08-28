"use client";

import { createContext, ReactNode, useContext } from "react";

export const ApiLimitContext = createContext({ apiLimitCount: 0 });

export const useApiLimit = () => {
  return useContext(ApiLimitContext);
};

interface ApiLimitProviderProps {
  value: { apiLimitCount: number };
  children: ReactNode;
}

export const ApiLimitProvider = ({
  value,
  children,
}: ApiLimitProviderProps) => {
  return (
    <ApiLimitContext.Provider value={value}>
      {children}
    </ApiLimitContext.Provider>
  );
};
