import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Flame } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { fmt, fmtCurrency, calcYearlyValue } from '@/utils/calculations';

export function Onboarding() {
  const { user, updateUser, onboardingStep, setOnboardingStep, startQuit, currency } = useAppStore();

  const yearly = user.cost * user.packs * 365;

  const steps = [
    {
      title: 'Willkommen bei QuitRich! 🚭',
      subtitle: 'Dein Weg zu Gesundheit & Vermögen',
      content: (
        <div className="space-y-6 text-center">
          <p className="text-slate-300 leading-relaxed">
            Entdecke, wie viel Vermögen du aufbauen könntest, wenn du das Zigarettengeld investierst statt zu verbrennen.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '💰', label: 'Geld sparen', desc: 'Live-Tracking' },
              { icon: '📈', label: 'Investieren', desc: 'Vergleiche' },
              { icon: '❤️', label: 'Gesund werden', desc: 'Meilensteine' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-slate-500 text-xs">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Wie heisst du?',
      subtitle: 'Personalisiere deine Erfahrung',
      content: (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Dein Vorname"
              value={user.name}
              onChange={(e) => updateUser({ name: e.target.value })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-4 text-white text-xl focus:border-emerald-500 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              autoFocus
            />
          </div>
          {user.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-emerald-400 text-center"
            >
              Schön dich kennenzulernen, {user.name}! 👋
            </motion.p>
          )}
        </div>
      ),
    },
    {
      title: 'Deine Rauchgewohnheit',
      subtitle: 'Diese Daten bleiben privat auf deinem Gerät',
      content: (
        <div className="space-y-6">
          <div>
            <label className="text-slate-400 text-sm mb-3 block">Preis pro Packung (CHF)</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateUser({ cost: Math.max(1, user.cost - 1) })}
                className="w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-2xl text-2xl font-bold transition-colors active:scale-95"
              >
                -
              </button>
              <div className="flex-1 bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl py-4 text-center">
                <span className="text-4xl font-bold">{user.cost}</span>
                <span className="text-slate-400 ml-2 text-xl">CHF</span>
              </div>
              <button
                onClick={() => updateUser({ cost: user.cost + 1 })}
                className="w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-2xl text-2xl font-bold transition-colors active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-3 block">Packungen pro Tag</label>
            <div className="grid grid-cols-4 gap-2">
              {[0.5, 1, 1.5, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => updateUser({ packs: n })}
                  className={`py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                    user.packs === n
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 text-center">
            <p className="text-slate-400 text-sm">Das sind</p>
            <p className="text-2xl font-bold text-white">
              {fmt(yearly)} CHF <span className="text-slate-400 font-normal">pro Jahr</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Wie lange rauchst du schon?',
      subtitle: 'Wir zeigen dir, was du hättest sparen können',
      content: (
        <div className="space-y-6">
          <input
            type="range"
            min="1"
            max="50"
            value={user.years}
            onChange={(e) => updateUser({ years: +e.target.value })}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="text-center">
            <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              {user.years}
            </span>
            <span className="text-2xl text-slate-400 ml-3">Jahre</span>
          </div>

          <motion.div
            key={user.years}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-br from-red-950/50 to-red-900/30 border border-red-800/50 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">In Rauch aufgegangen</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {fmtCurrency(yearly * user.years, currency)}
            </p>
            <p className="text-red-400/70 text-sm">
              {fmt(user.years * 365 * user.packs * user.cigarettesPerPack)} Zigaretten 🚬
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Dein Sparziel',
      subtitle: 'Was möchtest du dir von dem gesparten Geld leisten?',
      content: (
        <div className="space-y-6">
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Zielbetrag</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">CHF</span>
              <input
                type="number"
                value={user.goalAmount}
                onChange={(e) => updateUser({ goalAmount: +e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-14 pr-4 py-4 text-white text-2xl font-bold focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Wofür sparst du?</label>
            <input
              type="text"
              placeholder="z.B. Ferien, neues Handy, Investment..."
              value={user.goalDescription}
              onChange={(e) => updateUser({ goalDescription: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-2xl p-4">
            <p className="text-emerald-400 text-sm mb-1">Zeit bis zum Ziel</p>
            <p className="text-2xl font-bold text-white">
              {Math.ceil(user.goalAmount / (user.cost * user.packs * 30))} Monate
            </p>
            <p className="text-slate-400 text-sm">
              bei {fmtCurrency(user.cost * user.packs * 30, currency)} monatlicher Ersparnis
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Bereit für den Wandel?',
      subtitle: 'Ab heute investierst du in dich selbst',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/30 border border-emerald-800/50 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-4">Dein Potenzial in 10 Jahren</h3>

            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center bg-slate-800/50 rounded-xl p-3">
                <span className="text-slate-400">💰 Gespart (ohne Zinsen)</span>
                <span className="font-bold">{fmtCurrency(yearly * 10, currency)}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 rounded-xl p-3">
                <span className="text-slate-400">📈 Im S&P 500 investiert</span>
                <span className="font-bold text-emerald-400">{fmtCurrency(calcYearlyValue(yearly, 10, 0.10), currency)}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 rounded-xl p-3">
                <span className="text-slate-400">🚀 In Bitcoin investiert</span>
                <span className="font-bold text-emerald-400">{fmtCurrency(calcYearlyValue(yearly, 10, 0.45), currency)}</span>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationsEnabled}
              onChange={(e) => updateUser({ notificationsEnabled: e.target.checked })}
              className="w-5 h-5 rounded accent-emerald-500"
            />
            <div>
              <p className="text-white font-medium">🔔 Motivations-Erinnerungen</p>
              <p className="text-slate-400 text-sm">Tägliche Updates zu deinem Fortschritt</p>
            </div>
          </label>
        </div>
      ),
    },
  ];

  const current = steps[onboardingStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col">
      {/* Progress */}
      <div className="p-4 pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-500 text-sm">Schritt {onboardingStep + 1} von {steps.length}</span>
          <span className="text-slate-500 text-sm">{Math.round(((onboardingStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                i <= onboardingStep ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{current.title}</h1>
              <p className="text-slate-400">{current.subtitle}</p>
            </div>
            <div className="flex-1">{current.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex gap-3">
        {onboardingStep > 0 && (
          <button
            onClick={() => setOnboardingStep(onboardingStep - 1)}
            className="flex-1 py-4 rounded-2xl bg-slate-800 font-semibold hover:bg-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Zurück
          </button>
        )}
        <button
          onClick={() => {
            if (onboardingStep < steps.length - 1) {
              setOnboardingStep(onboardingStep + 1);
            } else {
              startQuit();
            }
          }}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          {onboardingStep === steps.length - 1 ? (
            <>Los geht's! <Zap className="w-5 h-5" /></>
          ) : (
            <>Weiter <ChevronRight className="w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}
