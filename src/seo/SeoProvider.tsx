import React, { createContext, useContext } from "react";
import type { SeoConfig } from "../types";

const SeoContext = createContext<SeoConfig | null>(null);

export const SeoProvider: React.FC<{
  config: SeoConfig;
  children: React.ReactNode;
}> = ({ config, children }) => {
  return <SeoContext.Provider value={config}>{children}</SeoContext.Provider>;
};

/* ================================
   Internal Hook (Not Exported)
================================ */

export const useSeoConfig = (): SeoConfig => {
  const ctx = useContext(SeoContext);
  return ctx ?? {};
};
