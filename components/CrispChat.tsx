"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("79e2575b-7dc1-4c74-8e70-8b3b661d1f94");
  }, []);

  return null;
};
