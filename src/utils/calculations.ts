import type { Currency } from '@/types';

export function calcMonthlyDCA(monthly: number, years: number, annualReturn: number): number {
  let total = 0;
  const monthlyReturn = annualReturn / 12;
  for (let i = 0; i < years * 12; i++) {
    total = (total + monthly) * (1 + monthlyReturn);
  }
  return total;
}

export function calcYearlyValue(yearly: number, years: number, annualReturn: number): number {
  let total = 0;
  for (let i = 0; i < years; i++) {
    total = (total + yearly) * (1 + annualReturn);
  }
  return total;
}

export function generateChartData(monthly: number, periodYears: number) {
  return Array.from({ length: periodYears * 12 + 1 }, (_, i) => {
    const months = i;
    const years = months / 12;
    return {
      month: months,
      year: parseFloat(years.toFixed(1)),
      invested: monthly * months,
      conservative: calcMonthlyDCA(monthly, years, 0.05),
      moderate: calcMonthlyDCA(monthly, years, 0.08),
      aggressive: calcMonthlyDCA(monthly, years, 0.12),
    };
  }).filter((_, i) => i % 6 === 0);
}

export function fmt(n: number): string {
  return new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(n);
}

export function fmtCurrency(n: number, currency: Currency = 'CHF'): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return fmt(n);
}

export function fmtTime(secs: number): string {
  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function fmtDecimal(n: number, decimals: number = 4): string {
  return n.toFixed(decimals);
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'Niedrig': return 'text-green-400 bg-green-400/20';
    case 'Mittel': return 'text-yellow-400 bg-yellow-400/20';
    case 'Hoch': return 'text-orange-400 bg-orange-400/20';
    case 'Sehr Hoch': return 'text-red-400 bg-red-400/20';
    default: return 'text-slate-400 bg-slate-400/20';
  }
}

export function secondsToDays(secs: number): number {
  return Math.floor(secs / 86400);
}

export function cigarettesAvoided(seconds: number, packsPerDay: number, cigsPerPack: number): number {
  return Math.floor((seconds / 86400) * packsPerDay * cigsPerPack);
}

export function moneySaved(seconds: number, dailyCost: number): number {
  return (seconds / 86400) * dailyCost;
}

export function lifeRegainedMinutes(cigarettesAvoided: number): number {
  return cigarettesAvoided * 11; // 11 minutes per cigarette
}
