import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, Craving, DailyCheckIn, Screen, TabId, Period, Currency } from '@/types';

interface AppState {
  // Navigation
  screen: Screen;
  tab: TabId;
  period: Period;

  // UI
  currency: Currency;
  onboardingStep: number;

  // User
  user: UserProfile;

  // Tracking
  quitTimestamp: number | null; // unix timestamp when user quit
  cravings: Craving[];
  checkIns: DailyCheckIn[];

  // Actions - Navigation
  setScreen: (screen: Screen) => void;
  setTab: (tab: TabId) => void;
  setPeriod: (period: Period) => void;
  setOnboardingStep: (step: number) => void;

  // Actions - User
  updateUser: (updates: Partial<UserProfile>) => void;
  setCurrency: (currency: Currency) => void;
  startQuit: () => void;

  // Actions - Tracking
  addCraving: (craving: Omit<Craving, 'id' | 'timestamp'>) => void;
  addCheckIn: (checkIn: DailyCheckIn) => void;
  unlockAchievement: (id: string) => void;

  // Computed helpers
  getElapsedSeconds: () => number;
  getDailyCost: () => number;
  getMonthlyCost: () => number;
  getYearlyCost: () => number;
  getSaved: () => number;
  getCigarettesAvoided: () => number;

  // Reset
  resetApp: () => void;
}

const defaultUser: UserProfile = {
  name: '',
  cost: 9,
  packs: 1,
  years: 20,
  cigarettesPerPack: 20,
  quitDate: new Date().toISOString().split('T')[0],
  goalAmount: 10000,
  goalDescription: 'Ferien in Thailand',
  preferredBroker: null,
  achievements: [],
  streakDays: 0,
  longestStreak: 0,
  totalSaved: 0,
  cravingsResisted: 0,
  notificationsEnabled: true,
  weeklyReportEnabled: true,
  milestoneAlertsEnabled: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      screen: 'splash',
      tab: 'home',
      period: '10y',
      currency: 'CHF',
      onboardingStep: 0,
      user: defaultUser,
      quitTimestamp: null,
      cravings: [],
      checkIns: [],

      // Navigation
      setScreen: (screen) => set({ screen }),
      setTab: (tab) => set({ tab }),
      setPeriod: (period) => set({ period }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),

      // User
      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates },
      })),
      setCurrency: (currency) => set({ currency }),
      startQuit: () => set({
        quitTimestamp: Date.now(),
        screen: 'main',
      }),

      // Tracking
      addCraving: (craving) => set((state) => ({
        cravings: [
          ...state.cravings,
          {
            ...craving,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
        user: {
          ...state.user,
          cravingsResisted: craving.overcame
            ? state.user.cravingsResisted + 1
            : state.user.cravingsResisted,
        },
      })),
      addCheckIn: (checkIn) => set((state) => ({
        checkIns: [...state.checkIns, checkIn],
      })),
      unlockAchievement: (id) => set((state) => ({
        user: {
          ...state.user,
          achievements: state.user.achievements.includes(id)
            ? state.user.achievements
            : [...state.user.achievements, id],
        },
      })),

      // Computed
      getElapsedSeconds: () => {
        const { quitTimestamp } = get();
        if (!quitTimestamp) return 0;
        return Math.floor((Date.now() - quitTimestamp) / 1000);
      },
      getDailyCost: () => {
        const { user } = get();
        return user.cost * user.packs;
      },
      getMonthlyCost: () => {
        const { user } = get();
        return user.cost * user.packs * 30;
      },
      getYearlyCost: () => {
        const { user } = get();
        return user.cost * user.packs * 365;
      },
      getSaved: () => {
        const seconds = get().getElapsedSeconds();
        const daily = get().getDailyCost();
        return (seconds / 86400) * daily;
      },
      getCigarettesAvoided: () => {
        const seconds = get().getElapsedSeconds();
        const { user } = get();
        return Math.floor((seconds / 86400) * user.packs * user.cigarettesPerPack);
      },

      // Reset
      resetApp: () => set({
        screen: 'splash',
        tab: 'home',
        period: '10y',
        onboardingStep: 0,
        user: defaultUser,
        quitTimestamp: null,
        cravings: [],
        checkIns: [],
      }),
    }),
    {
      name: 'quitrich-storage',
      partialize: (state) => ({
        user: state.user,
        quitTimestamp: state.quitTimestamp,
        cravings: state.cravings,
        checkIns: state.checkIns,
        currency: state.currency,
        period: state.period,
      }),
    }
  )
);
