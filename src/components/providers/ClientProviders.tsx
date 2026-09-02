"use client";

import type { ReactNode } from "react";
import { ExperienceProvider } from "./ExperienceProvider";
import { AudioProvider } from "./AudioProvider";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <AudioProvider>{children}</AudioProvider>
    </ExperienceProvider>
  );
}
