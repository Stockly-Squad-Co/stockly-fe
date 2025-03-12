import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingStoreState {
  data?: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
    nextStep?: string;
  };
}

interface OnboardingStoreAction {
  setOnboardingData: (data: OnboardingStoreState) => void;
  clearOnboardingData: () => void;
}

type OnboardingStore = OnboardingStoreState & OnboardingStoreAction;

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      setOnboardingData(data) {
        set(data);
      },
      clearOnboardingData() {
        set({ data: undefined });
      },
    }),
    { name: "onboarding-store" }
  )
);
