import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Target, ChevronRight, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppStore } from '@/store/useAppStore';
import { useTimer, usePulse } from '@/hooks/useTimer';
import { fmt, fmtCurrency, fmtK, fmtTime, calcYearlyValue, generateChartData, getRiskColor } from '@/utils/calculations';
import { investments } from '@/data/investments';
import { InvestmentModal } from '@/components/modals/InvestmentModal';
import type { Investment } from '@/types';

export function HomeTab() {
  const { user, period, setPeriod, setTab, currency } = useAppStore();
  const seconds = useTimer();
  const pulse = usePulse();
  const [animated, setAnimated] = useState(0);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  const daily = user.cost * user.packs;
  const monthly = daily * 30;
  const yearly = daily * 365;
  const total = yearly * user.years;
  const saved = (seconds / 86400) * daily;
  const cigarettesAvoided = Math.floor((seconds / 86400) * user.packs * user.cigarettesPerPack);
  const periodYears = { '5y': 5, '10y': 10, '20y': 20, '30y': 30 }[period] || 10;
  const chartData = generateChartData(monthly, periodYears);

  // Animate total burned counter
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += total / 60;
      if (v >= total) {
        setAnimated(total);
        clearInterval(t);
      } else {
        setAnimated(v);
      }
    }, 25);
    return () => clearInterval(t);
  }, [total]);

  return (
    <>
      {selectedInvestment && (
        <InvestmentModal
          investment={selectedInvestment}
          periodYears={periodYears}
          yearly={yearly}
          onClose={() => setSelectedInvestment(null)}
        />
      )}

      {/* Main Stats Card */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative">
            {/* Burned */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-red-500/20 rounded-lg">
                  <Flame className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-slate-400 text-sm">In {user.years} Jahren verbrannt</span>
              </div>
              <p className="text-4xl sm:text-5xl font-bold text-red-400">
                {fmtCurrency(Math.floor(animated), currency)}
              </p>
              <p className="text-slate-500 text-sm mt-1">
                {fmt(user.years * 365 * user.packs * user.cigarettesPerPack)} Zigaretten
              </p>
            </div>

            <div className="border-t border-slate-700/50 my-4" />

            {/* Live Savings */}
            <motion.div
              animate={pulse ? { scale: 1.02 } : { scale: 1 }}
              className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-800/30 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Live-Ersparnis</span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                {saved.toFixed(4)} CHF
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                <span>🚬 {fmt(cigarettesAvoided)} vermieden</span>
                <span>⏱️ {fmtTime(seconds)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      {user.goalAmount > 0 && (
        <div className="px-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <span className="font-medium text-sm">{user.goalDescription}</span>
              </div>
              <span className="text-sm text-slate-400">
                {((saved / user.goalAmount) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((saved / user.goalAmount) * 100, 100)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-400">{fmtCurrency(saved, currency)}</span>
              <span className="text-slate-400">{fmtCurrency(user.goalAmount, currency)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="px-4 grid grid-cols-4 gap-2">
        {[
          { label: 'Tag', value: daily, icon: '📅' },
          { label: 'Woche', value: daily * 7, icon: '📆' },
          { label: 'Monat', value: monthly, icon: '🗓️' },
          { label: 'Jahr', value: yearly, icon: '📊' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center"
          >
            <div className="text-lg mb-0.5">{s.icon}</div>
            <p className="text-sm font-bold">{fmtK(s.value)}</p>
            <p className="text-slate-500 text-xs">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">Investment-Projektion</h2>
          <div className="flex bg-slate-800 rounded-xl p-1">
            {(['5y', '10y', '20y', '30y'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  period === p
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.replace('y', 'J')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="year"
                  stroke="#475569"
                  fontSize={11}
                  tickFormatter={(v) => `${Math.round(v)}J`}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={11}
                  tickFormatter={(v) => fmtK(v)}
                />
                <Tooltip
                  contentStyle={{
                    background: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(v) => [fmtCurrency(Number(v), currency), '']}
                  labelFormatter={(l) => `Jahr ${Math.round(Number(l))}`}
                />
                <Area type="monotone" dataKey="invested" stroke="#6366F1" fill="#6366F130" name="Eingezahlt" />
                <Area type="monotone" dataKey="moderate" stroke="#10B981" fill="url(#colorModerate)" name="8% p.a." />
                <Area type="monotone" dataKey="aggressive" stroke="#F59E0B" fill="url(#colorAggressive)" name="12% p.a." />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-slate-700/50 text-sm flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-full" />Eingezahlt
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full" />Konservativ (8%)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-500 rounded-full" />Aggressiv (12%)
            </span>
          </div>
        </div>
      </div>

      {/* Investments */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">Wäre dein Geld in...</h2>
          <button
            onClick={() => setTab('invest')}
            className="text-emerald-400 text-sm font-medium"
          >
            Alle →
          </button>
        </div>

        <div className="space-y-3">
          {investments.slice(0, 4).map((inv) => {
            const val = calcYearlyValue(yearly, periodYears, inv.return);
            const invested = yearly * periodYears;
            const multiplier = val / invested;

            return (
              <button
                key={inv.id}
                onClick={() => setSelectedInvestment(inv)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{ background: inv.color + '25', color: inv.color }}
                    >
                      {inv.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <p className="font-semibold">{inv.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm">{inv.symbol}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getRiskColor(inv.risk)}`}>
                          {inv.risk}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{fmtK(val)}</p>
                    <p className="text-emerald-400 text-sm flex items-center justify-end gap-1">
                      <ArrowUpRight className="w-3 h-3" />+{multiplier.toFixed(1)}x
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.min((invested / val) * 100, 100)}%`, background: inv.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h3 className="text-xl font-bold mb-2">Bereit zu investieren?</h3>
            <p className="text-emerald-100 mb-4">
              Starte mit {fmtCurrency(daily, currency)} täglich und baue Vermögen auf.
            </p>
            <button
              onClick={() => setTab('invest')}
              className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              Plattformen vergleichen <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
