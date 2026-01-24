import { useState } from 'react';
import { Star, Gift, ChevronRight, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { fmtCurrency } from '@/utils/calculations';
import { brokers } from '@/data/brokers';
import { BrokerModal } from '@/components/modals/BrokerModal';
import type { Broker } from '@/types';

export function InvestTab() {
  const { user, currency } = useAppStore();
  const [showBroker, setShowBroker] = useState<Broker | null>(null);

  const daily = user.cost * user.packs;
  const monthly = daily * 30;
  const yearly = daily * 365;

  return (
    <>
      {showBroker && <BrokerModal broker={showBroker} onClose={() => setShowBroker(null)} />}

      <div className="px-4">
        <h1 className="text-2xl font-bold mb-1">Investieren</h1>
        <p className="text-slate-400">Wähle eine Plattform und starte</p>
      </div>

      {/* Available Amount */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6">
          <p className="text-emerald-100 text-sm">Verfügbar zum Investieren</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">{fmtCurrency(daily, currency)}</span>
            <span className="text-emerald-100">/Tag</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Woche', value: daily * 7 },
              { label: 'Monat', value: monthly },
              { label: 'Jahr', value: yearly },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="font-bold">{fmtCurrency(item.value, currency)}</p>
                <p className="text-emerald-100 text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Savings Plan Info */}
      <div className="px-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
          <h3 className="font-semibold mb-2">💡 Automatischer Sparplan</h3>
          <p className="text-slate-400 text-sm mb-3">
            Richte bei deinem Broker einen automatischen Sparplan ein. So investierst du jeden Monat
            {' '}{fmtCurrency(monthly, currency)} ohne daran denken zu müssen.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-700/50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-400">DCA (Dollar Cost Average)</p>
              <p className="text-sm font-medium text-emerald-400">Beste Strategie</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-400">Automatisch</p>
              <p className="text-sm font-medium text-emerald-400">Kein Aufwand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brokers */}
      <div className="px-4">
        <h2 className="font-bold text-lg mb-3">Empfohlene Plattformen</h2>
        <div className="space-y-3">
          {brokers.map((b) => (
            <button
              key={b.id}
              onClick={() => setShowBroker(b)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600 transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold shrink-0"
                  style={{ background: b.color + '25', color: b.color }}
                >
                  {b.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold">{b.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: b.color + '30', color: b.color }}
                    >
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2 line-clamp-1">{b.desc}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{b.rating}</span>
                    </div>
                    <span className="text-slate-500 text-sm">{b.users}</span>
                    <span className="text-slate-500 text-sm">{b.fee} Gebühren</span>
                  </div>
                  {b.bonus && (
                    <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                      <Gift className="w-4 h-4" />{b.bonus}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 shrink-0 mt-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4">
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-400">
            <p className="mb-1"><strong>Hinweis:</strong> Dies ist keine Anlageberatung.</p>
            <p>Investitionen sind mit Risiken verbunden. Vergangene Performance ist keine Garantie für zukünftige Ergebnisse. Investiere nur Geld, das du nicht kurzfristig benötigst.</p>
          </div>
        </div>
      </div>
    </>
  );
}
