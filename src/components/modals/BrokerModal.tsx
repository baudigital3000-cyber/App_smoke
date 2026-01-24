import { X, Star, CheckCircle, Gift, Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Broker } from '@/types';

interface Props {
  broker: Broker;
  onClose: () => void;
}

export function BrokerModal({ broker, onClose }: Props) {
  const copyPromo = () => {
    navigator.clipboard?.writeText(broker.promo);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="relative p-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${broker.color}50, ${broker.color}20)` }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl" style={{ background: broker.color + '30' }} />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold bg-white/10 backdrop-blur" style={{ color: broker.color }}>
              {broker.name.slice(0, 2)}
            </div>
            <div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/20">{broker.tag}</span>
              <h2 className="text-2xl font-bold mt-1">{broker.name}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <p className="text-slate-300">{broker.longDesc}</p>

          {/* Rating & Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{broker.rating}</span>
              </div>
              <p className="text-slate-500 text-xs">Rating</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="font-bold">{broker.users}</p>
              <p className="text-slate-500 text-xs">Nutzer</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="font-bold">{broker.fee}</p>
              <p className="text-slate-500 text-xs">Gebühren</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <div className="space-y-2">
              {broker.features.map((f, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-3 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Min. Einzahlung</p>
              <p className="font-semibold">{broker.min}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Auszahlung</p>
              <p className="font-semibold">{broker.withdrawalTime}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Support</p>
              <p className="font-semibold text-sm">{broker.customerSupport}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3">
              <p className="text-slate-400 text-xs mb-1">Sicherheit</p>
              <p className="font-semibold text-sm">{broker.securityFeatures.slice(0, 2).join(', ')}</p>
            </div>
          </div>

          {/* Promo */}
          <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Exklusiver Bonus</span>
            </div>
            <p className="font-bold text-lg mb-2">{broker.bonus}</p>
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-3">
              <code className="text-emerald-400 flex-1 font-mono text-lg">{broker.promo}</code>
              <button
                onClick={copyPromo}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                title="Code kopieren"
              >
                <Copy className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 border-t border-slate-800">
          <a
            href={broker.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-xl font-bold text-center text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ background: broker.color }}
          >
            Jetzt bei {broker.name} starten <ExternalLink className="w-5 h-5" />
          </a>
          <p className="text-center text-slate-500 text-xs mt-3">
            * Affiliate-Link. Wir erhalten eine Provision ohne Mehrkosten für dich.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
