import { X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { fmtCurrency, calcYearlyValue, getRiskColor } from '@/utils/calculations';
import type { Investment } from '@/types';

interface Props {
  investment: Investment;
  periodYears: number;
  yearly: number;
  onClose: () => void;
}

export function InvestmentModal({ investment, periodYears, yearly, onClose }: Props) {
  const currency = useAppStore((s) => s.currency);
  const invested = yearly * periodYears;
  const value = calcYearlyValue(yearly, periodYears, investment.return);
  const gain = value - invested;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
                style={{ background: investment.color + '30', color: investment.color }}
              >
                {investment.symbol.slice(0, 2)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{investment.name}</h2>
                <p className="text-slate-400">{investment.symbol}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <p className="text-slate-300">{investment.description}</p>

          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(investment.risk)}`}>
            <AlertCircle className="w-4 h-4" />
            Risiko: {investment.risk}
          </div>

          {/* Projection */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Projektion ({periodYears} Jahre)</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Investiert</span>
                <span className="font-medium">{fmtCurrency(invested, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Geschätzter Wert</span>
                <span className="font-bold text-emerald-400">{fmtCurrency(value, currency)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400">Gewinn</span>
                <span className="font-bold text-emerald-400">
                  +{fmtCurrency(gain, currency)} ({((gain / invested) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">Vorteile</h4>
              <div className="space-y-1">
                {investment.pros.map((p, i) => (
                  <p key={i} className="text-sm text-slate-300">+ {p}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Risiken</h4>
              <div className="space-y-1">
                {investment.cons.map((c, i) => (
                  <p key={i} className="text-sm text-slate-300">- {c}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Historic Returns */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Historische Rendite</h4>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(investment.historicReturns).map(([period, ret]) => (
                <div key={period} className="text-center">
                  <p className="text-emerald-400 font-bold text-lg">+{ret}%</p>
                  <p className="text-slate-500 text-xs">{period}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs mt-3">
              * Vergangene Performance ist keine Garantie für zukünftige Ergebnisse
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
