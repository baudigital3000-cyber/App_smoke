import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, X, RotateCcw, User, Cigarette, Calendar, Wallet, Shield, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { user, resetApp } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="px-4 py-3 flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-lg">🚭</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">
                Quit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Rich</span>
              </span>
              {user.name && (
                <p className="text-xs text-slate-500 -mt-0.5">Hallo, {user.name}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full flex items-center justify-center relative hover:bg-white/[0.1] transition-colors">
              <Bell className="w-[18px] h-[18px] text-slate-300" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-500 rounded-full text-[10px] flex items-center justify-center font-bold shadow-lg shadow-red-500/30">
                2
              </span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full flex items-center justify-center hover:bg-white/[0.1] transition-colors"
            >
              <Settings className="w-[18px] h-[18px] text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col border border-white/[0.06]"
          >
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Einstellungen</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 bg-white/[0.06] rounded-full hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Profile Card */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{user.name ? user.name.charAt(0).toUpperCase() : '👤'}</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.name || 'Nicht gesetzt'}</p>
                    <p className="text-slate-500 text-sm">QuitRich Mitglied</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Wallet, label: 'Kosten/Tag', value: `${user.cost * user.packs} CHF`, color: 'text-amber-400' },
                    { icon: Cigarette, label: 'Packungen/Tag', value: `${user.packs}`, color: 'text-red-400' },
                    { icon: Calendar, label: 'Jahre geraucht', value: `${user.years}`, color: 'text-orange-400' },
                    { icon: User, label: 'Zig./Packung', value: `${user.cigarettesPerPack}`, color: 'text-slate-400' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/[0.04] rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                        <span className="text-slate-500 text-xs">{item.label}</span>
                      </div>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* App Info */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden">
                {[
                  { label: 'Version', value: '2.0.0 Pro', icon: '🏷️' },
                  { label: 'Datenspeicherung', value: 'Lokal (Gerät)', icon: '🔒' },
                  { label: 'Framework', value: 'React + TypeScript', icon: '⚛️' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span className="text-slate-400 text-sm">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Privacy */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-medium text-sm">Deine Daten sind sicher</p>
                  <p className="text-slate-400 text-xs mt-1">Alle Daten werden ausschliesslich lokal auf deinem Gerät gespeichert. Nichts wird an Server gesendet.</p>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  if (confirm('Wirklich alle Daten zurücksetzen? Dies kann nicht rückgängig gemacht werden.')) {
                    resetApp();
                    setShowSettings(false);
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                App zurücksetzen
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
