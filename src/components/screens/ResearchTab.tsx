import { BookOpen, Users, CheckCircle, TrendingUp, Globe } from 'lucide-react';

const expertPicks = [
  {
    source: 'UBS Research',
    badge: '🏦',
    picks: ['Amazon +18%', 'Alphabet +22%', 'Rheinmetall +35%'],
    focus: 'Blue Chips & Verteidigung',
  },
  {
    source: 'BlackRock',
    badge: '🌍',
    picks: ['AI Infrastructure', 'S&P 500 +12%', 'Private Credit 8-12%'],
    focus: 'Globale Trends & KI',
  },
  {
    source: 'DZ Bank',
    badge: '🇩🇪',
    picks: ['Rheinmetall +57%', 'Deutsche Bank +30%', 'BMW +25%'],
    focus: 'Deutsche Aktien',
  },
  {
    source: 'Goldman Sachs',
    badge: '📊',
    picks: ['NVIDIA +25%', 'Microsoft +20%', 'Bitcoin $150K'],
    focus: 'Tech & Krypto',
  },
];

const influencers = [
  {
    name: 'Graham Stephan',
    followers: '4.5M YouTube',
    focus: 'Dividenden & Real Estate',
    pick: 'VOO, O, SCHD',
    style: 'Langfristig, Dividenden-fokussiert',
  },
  {
    name: 'Raoul Pal',
    followers: '1.2M X',
    focus: 'Macro & Crypto',
    pick: 'BTC, ETH, SOL',
    style: 'Macro-Investor, Krypto-Bull',
  },
  {
    name: 'Ben Felix',
    followers: '500K YouTube',
    focus: 'Evidence-Based Investing',
    pick: 'Total Market ETFs, Factor Investing',
    style: 'Wissenschaftlich, passiv',
  },
  {
    name: 'Finanzfluss',
    followers: '1.3M YouTube',
    focus: 'ETFs & Finanzen (DACH)',
    pick: 'MSCI World, All-World ETF',
    style: 'Einsteigerfreundlich, DACH-fokussiert',
  },
];

const trendingTopics = [
  { topic: 'KI & Machine Learning', trend: '+340%', desc: 'Stärkstes Wachstumssegment 2025/26' },
  { topic: 'Bitcoin Halving Zyklus', trend: '+120%', desc: 'Historisch bullish Post-Halving' },
  { topic: 'Rüstungsaktien Europa', trend: '+85%', desc: 'Geopolitische Aufrüstung' },
  { topic: 'DeFi & Staking', trend: '+60%', desc: 'Passives Einkommen mit Krypto' },
];

export function ResearchTab() {
  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl font-bold mb-1">Research</h1>
        <p className="text-slate-400">Marktanalysen & Experten-Meinungen</p>
      </div>

      {/* Trending Topics */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold">Trending 2026</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {trendingTopics.map((t, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-emerald-400 text-sm font-bold">{t.trend}</span>
              </div>
              <p className="font-medium text-sm mb-0.5">{t.topic}</p>
              <p className="text-slate-500 text-xs">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Picks */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold">Analysten-Picks 2026</h2>
        </div>

        <div className="space-y-3">
          {expertPicks.map((e, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{e.badge}</span>
                <h3 className="font-bold">{e.source}</h3>
                <span className="text-xs text-slate-500 ml-auto">{e.focus}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {e.picks.map((p, j) => (
                  <span key={j} className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Influencers */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-purple-400" />
          <h2 className="font-bold">Top Influencer</h2>
        </div>

        <div className="space-y-3">
          {influencers.map((inf, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{inf.name}</p>
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-slate-500 text-sm">{inf.followers}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm mb-1">{inf.style}</p>
                <p className="text-emerald-400 font-medium text-sm">Top Picks: {inf.pick}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold">Lernressourcen</h2>
        </div>

        <div className="space-y-2">
          {[
            { title: 'ETF-Grundlagen', desc: 'Was sind ETFs und wie funktionieren sie?', level: 'Anfänger' },
            { title: 'DCA-Strategie', desc: 'Dollar Cost Averaging erklärt', level: 'Anfänger' },
            { title: 'Portfolio-Theorie', desc: 'Diversifikation & Risikomanagement', level: 'Fortgeschritten' },
            { title: 'Krypto & DeFi', desc: 'Bitcoin, Ethereum und dezentrale Finanzen', level: 'Fortgeschritten' },
          ].map((r, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-lg">
                📚
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{r.title}</p>
                <p className="text-slate-500 text-xs">{r.desc}</p>
              </div>
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{r.level}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
