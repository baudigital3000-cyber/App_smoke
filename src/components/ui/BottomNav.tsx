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
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 z-40">
      <div className="flex justify-around py-2 max-w-lg mx-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
              tab === t.id
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <t.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
