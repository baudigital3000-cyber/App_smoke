import { useState } from 'react';
import { Bell, Settings, X, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { user, resetApp } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="px-4 py-3 flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-lg">🚭</span>
            </div>
            <div>
              <span className="font-bold text-lg">
                Quit<span className="text-emerald-400">Rich</span>
              </span>
              {user.name && (
                <p className="text-xs text-slate-500 -mt-0.5">Hallo, {user.name}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center relative hover:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                2
              </span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold">Einstellungen</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Profil</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name</span>
                    <span>{user.name || 'Nicht gesetzt'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kosten/Tag</span>
                    <span>{user.cost * user.packs} CHF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Packungen/Tag</span>
                    <span>{user.packs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jahre geraucht</span>
                    <span>{user.years}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="font-semibold mb-3">App</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Version</span>
                    <span>2.0.0 Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Datenspeicherung</span>
                    <span className="text-emerald-400">Lokal (Gerät)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm('Wirklich alle Daten zurücksetzen?')) {
                    resetApp();
                    setShowSettings(false);
                  }
                }}
                className="w-full py-3 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                App zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
