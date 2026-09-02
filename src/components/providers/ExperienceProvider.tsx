"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ExperienceContextValue = {
  loadingDone: boolean;
  experienceStarted: boolean;
  completeLoading: () => void;
  startExperience: () => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within provider");
  return ctx;
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [loadingDone, setLoadingDone] = useState(false);
  const [experienceStarted, setExperienceStarted] = useState(false);

  const completeLoading = useCallback(() => setLoadingDone(true), []);
  const startExperience = useCallback(() => setExperienceStarted(true), []);

  return (
    <ExperienceContext.Provider
      value={{
        loadingDone,
        experienceStarted,
        completeLoading,
        startExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}
