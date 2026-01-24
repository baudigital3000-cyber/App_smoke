import { useAppStore } from '@/store/useAppStore';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { Onboarding } from '@/components/screens/Onboarding';
import { HomeTab } from '@/components/screens/HomeTab';
import { InvestTab } from '@/components/screens/InvestTab';
import { ResearchTab } from '@/components/screens/ResearchTab';
import { ProgressTab } from '@/components/screens/ProgressTab';
import { Header } from '@/components/ui/Header';
import { BottomNav } from '@/components/ui/BottomNav';

function MainApp() {
  const tab = useAppStore((s) => s.tab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />
      <div className="pb-28 space-y-6 pt-4 max-w-lg mx-auto">
        {tab === 'home' && <HomeTab />}
        {tab === 'invest' && <InvestTab />}
        {tab === 'research' && <ResearchTab />}
        {tab === 'progress' && <ProgressTab />}
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  const screen = useAppStore((s) => s.screen);

  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'onboarding') return <Onboarding />;
  return <MainApp />;
}
