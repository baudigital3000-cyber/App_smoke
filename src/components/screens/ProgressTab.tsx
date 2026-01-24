import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Wallet, Cigarette, Heart, CheckCircle, Zap, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useTimer } from '@/hooks/useTimer';
import { fmt, fmtTime } from '@/utils/calculations';
import { milestones, achievements } from '@/data/milestones';

export function ProgressTab() {
  const { user, addCraving } = useAppStore();
  const seconds = useTimer();
  const [showCravingModal, setShowCravingModal] = useState(false);
  const [cravingIntensity, setCravingIntensity] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [cravingTrigger, setCravingTrigger] = useState('');

  const daily = user.cost * user.packs;
  const saved = (seconds / 86400) * daily;
  const cigarettesAv = Math.floor((seconds / 86400) * user.packs * user.cigarettesPerPack);
  const lifeMinutes = cigarettesAv * 11;

  const handleCravingSubmit = (overcame: boolean) => {
    addCraving({
      intensity: cravingIntensity,
      trigger: cravingTrigger,
      overcame,
    });
    setShowCravingModal(false);
    setCravingTrigger('');
    setCravingIntensity(3);
  };

  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-1">Dein Fortschritt</h1>
        <p className="text-slate-400">Gesundheit & Erfolge</p>
      </div>

      {/* Craving Button */}
      <div className="px-4">
        <button
          onClick={() => setShowCravingModal(true)}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-4 text-left hover:opacity-90 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">Craving jetzt?</p>
              <p className="text-orange-100 text-sm">Tippe hier und wir helfen dir durch</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-800/50 rounded-2xl p-4"
        >
          <Clock className="w-6 h-6 text-emerald-400 mb-2" />
          <p className="text-3xl font-bold">{Math.floor(seconds / 86400)}</p>
          <p className="text-slate-400 text-sm">Tage rauchfrei</p>
          <p className="text-slate-500 text-xs mt-1">{fmtTime(seconds)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-amber-800/50 rounded-2xl p-4"
        >
          <Wallet className="w-6 h-6 text-amber-400 mb-2" />
          <p className="text-3xl font-bold">{fmt(Math.floor(saved))}</p>
          <p className="text-slate-400 text-sm">CHF gespart</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-900/50 to-rose-900/50 border border-red-800/50 rounded-2xl p-4"
        >
          <Cigarette className="w-6 h-6 text-red-400 mb-2" />
          <p className="text-3xl font-bold">{fmt(cigarettesAv)}</p>
          <p className="text-slate-400 text-sm">Nicht geraucht</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-pink-900/50 to-rose-900/50 border border-pink-800/50 rounded-2xl p-4"
        >
          <Heart className="w-6 h-6 text-pink-400 mb-2" />
          <p className="text-3xl font-bold">+{fmt(Math.floor(lifeMinutes / 60))}</p>
          <p className="text-slate-400 text-sm">Stunden Leben</p>
        </motion.div>
      </div>

      {/* Craving Stats */}
      {user.cravingsResisted > 0 && (
        <div className="px-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl">
              🥊
            </div>
            <div>
              <p className="font-bold">{user.cravingsResisted} Cravings besiegt</p>
              <p className="text-slate-400 text-sm">Du wirst immer stärker!</p>
            </div>
          </div>
        </div>
      )}

      {/* Health Milestones */}
      <div className="px-4">
        <h2 className="font-bold text-lg mb-3">Gesundheits-Meilensteine</h2>
        <div className="space-y-3">
          {milestones.slice(0, 8).map((m, i) => {
            const done = seconds >= m.secs;
            const prog = Math.min((seconds / m.secs) * 100, 100);
            const isNext = !done && (i === 0 || seconds >= milestones[i - 1].secs);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl p-4 transition-all ${
                  done
                    ? 'bg-emerald-900/30 border border-emerald-800/50'
                    : isNext
                      ? 'bg-slate-800/80 border border-emerald-500/30'
                      : 'bg-slate-800/30 border border-slate-700/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    done ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                  }`}>
                    {m.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold text-sm ${done ? 'text-emerald-400' : ''}`}>
                        {m.benefit}
                      </p>
                      {done && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    </div>
                    <p className="text-slate-500 text-sm">{m.time}</p>
                    {done && <p className="text-slate-400 text-xs mt-1">{m.detail}</p>}

                    {!done && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${prog}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{prog.toFixed(1)}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4">
        <h2 className="font-bold text-lg mb-3">Erfolge</h2>
        <div className="grid grid-cols-4 gap-2">
          {achievements.slice(0, 12).map((a, i) => {
            const unlocked = typeof a.requirement === 'number' ? seconds >= a.requirement : false;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-xl p-3 text-center ${
                  unlocked
                    ? 'bg-amber-500/20 border border-amber-500/30'
                    : 'bg-slate-800/30 border border-slate-700/30'
                }`}
              >
                <div className={`text-2xl mb-1 ${!unlocked ? 'grayscale opacity-50' : ''}`}>
                  {a.icon}
                </div>
                <p className={`text-xs font-medium ${unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  {a.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Craving Modal */}
      {showCravingModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Craving-Tracker</h2>
              <button onClick={() => setShowCravingModal(false)} className="p-2 bg-slate-800 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Intensity */}
              <div>
                <label className="text-slate-400 text-sm mb-3 block">Wie stark ist das Craving? (1-5)</label>
                <div className="grid grid-cols-5 gap-2">
                  {([1, 2, 3, 4, 5] as const).map((n) => (
                    <button
                      key={n}
                      onClick={() => setCravingIntensity(n)}
                      className={`py-3 rounded-xl font-bold text-lg transition-all ${
                        cravingIntensity === n
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Leicht</span>
                  <span>Sehr stark</span>
                </div>
              </div>

              {/* Trigger */}
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Was hat es ausgelöst?</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['Stress', 'Langeweile', 'Alkohol', 'Essen', 'Kaffee', 'Gewohnheit'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setCravingTrigger(t)}
                      className={`py-2 rounded-lg text-sm transition-all ${
                        cravingTrigger === t
                          ? 'bg-orange-500/30 text-orange-400 border border-orange-500/50'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-xl p-4">
                <p className="text-emerald-400 font-medium mb-2">💡 Tipps gegen Cravings:</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Trinke ein grosses Glas Wasser</li>
                  <li>• Atme 4 Sekunden ein, 7 halten, 8 aus</li>
                  <li>• Geh 5 Minuten an die frische Luft</li>
                  <li>• Das Craving dauert nur 3-5 Minuten!</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleCravingSubmit(true)}
                  className="py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold hover:opacity-90 transition-all"
                >
                  ✅ Überstanden!
                </button>
                <button
                  onClick={() => handleCravingSubmit(false)}
                  className="py-4 rounded-xl bg-slate-800 font-bold hover:bg-slate-700 transition-all text-slate-300"
                >
                  😔 Geraucht
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
