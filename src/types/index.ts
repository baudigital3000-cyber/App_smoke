export interface UserProfile {
  name: string;
  cost: number;
  packs: number;
  years: number;
  cigarettesPerPack: number;
  quitDate: string;
  goalAmount: number;
  goalDescription: string;
  preferredBroker: string | null;
  achievements: string[];
  streakDays: number;
  longestStreak: number;
  totalSaved: number;
  cravingsResisted: number;
  notificationsEnabled: boolean;
  weeklyReportEnabled: boolean;
  milestoneAlertsEnabled: boolean;
}

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  return: number;
  risk: RiskLevel;
  color: string;
  description: string;
  pros: string[];
  cons: string[];
  minInvest: number;
  historicReturns: Record<string, number>;
}

export interface Broker {
  id: string;
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  rating: number;
  users: string;
  fee: string;
  min: string;
  promo: string;
  bonus: string;
  color: string;
  url: string;
  features: string[];
  supported: string[];
  depositMethods: string[];
  withdrawalTime: string;
  customerSupport: string;
  securityFeatures: string[];
  affiliateCommission: string;
}

export interface Milestone {
  time: string;
  benefit: string;
  icon: string;
  secs: number;
  detail: string;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  requirement: number | string;
}

export interface Craving {
  id: string;
  timestamp: number;
  intensity: 1 | 2 | 3 | 4 | 5;
  trigger: string;
  overcame: boolean;
}

export interface AppNotification {
  id: number;
  type: 'achievement' | 'tip' | 'savings' | 'health';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface DailyCheckIn {
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  smoked: boolean;
  cravingCount: number;
  notes: string;
}

export type RiskLevel = 'Niedrig' | 'Mittel' | 'Hoch' | 'Sehr Hoch';
export type Period = '5y' | '10y' | '20y' | '30y';
export type TabId = 'home' | 'invest' | 'research' | 'progress';
export type Screen = 'splash' | 'onboarding' | 'main';
export type Currency = 'CHF' | 'EUR' | 'USD';
