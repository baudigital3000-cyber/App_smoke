import { motion } from 'framer-motion';
import { Home, TrendingUp, Newspaper, Trophy } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { TabId } from '@/types';

const tabs: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'invest', icon: TrendingUp, label: 'Investieren' },
  { id: 'research', icon: Newspaper, label: 'Research' },
  { id: 'progress', icon: Trophy, label: 'Fortschritt' },
];

export function BottomNav() {
  const { tab, setTab } = useAppStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Gradient fade */}
      <div className="h-6 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="bg-slate-950/80 backdrop-blur-2xl border-t border-white/[0.06]">
        <div className="flex justify-around py-1.5 max-w-lg mx-auto relative">
          {tabs.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex flex-col items-center gap-0.5 py-2 px-5 rounded-2xl transition-all relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <t.icon
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold relative z-10 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-1.5">
          <div className="w-32 h-1 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
