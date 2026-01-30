export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="chartGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* Background circles */}
      <circle cx="200" cy="150" r="120" fill="url(#glow1)" />
      <circle cx="280" cy="100" r="80" fill="url(#glow2)" />

      {/* Rising chart */}
      <path d="M60 220 L100 200 L140 210 L180 170 L220 150 L260 100 L300 60 L340 40"
            stroke="url(#chartGrad)" strokeWidth="4" strokeLinecap="round" fill="none">
        <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" fill="freeze" />
      </path>
      <path d="M60 220 L100 200 L140 210 L180 170 L220 150 L260 100 L300 60 L340 40 L340 240 L60 240 Z"
            fill="url(#chartGrad)" opacity="0.1" />

      {/* Coins */}
      <g>
        <circle cx="300" cy="55" r="18" fill="url(#coinGrad)" opacity="0.9" />
        <text x="300" y="60" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="bold">$</text>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="3s" repeatCount="indefinite" />
      </g>
      <g>
        <circle cx="260" cy="115" r="14" fill="url(#coinGrad)" opacity="0.7" />
        <text x="260" y="119" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">$</text>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="2.5s" repeatCount="indefinite" />
      </g>
      <g>
        <circle cx="330" cy="85" r="11" fill="url(#coinGrad)" opacity="0.5" />
        <text x="330" y="89" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold">$</text>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="2s" repeatCount="indefinite" />
      </g>

      {/* Heart */}
      <g transform="translate(80, 140) scale(0.6)">
        <path d="M25 45 C25 45, 5 30, 5 15 C5 5, 15 0, 25 10 C35 0, 45 5, 45 15 C45 30, 25 45, 25 45Z"
              fill="url(#heartGrad)" opacity="0.8" />
        <animateTransform attributeName="transform" type="scale" values="0.6;0.65;0.6" dur="1.5s" repeatCount="indefinite"
                          additive="sum" />
      </g>

      {/* Crossed cigarette */}
      <g transform="translate(120, 80)" opacity="0.6">
        <rect x="0" y="8" width="40" height="6" rx="3" fill="#94A3B8" />
        <rect x="32" y="8" width="8" height="6" rx="2" fill="#F59E0B" />
        <line x1="-5" y1="25" x2="45" y2="-3" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Sparkles */}
      <g opacity="0.6">
        <circle cx="150" cy="60" r="2" fill="#34D399">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="140" r="2" fill="#FBBF24">
          <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="90" cy="190" r="1.5" fill="#60A5FA">
          <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="240" cy="60" r="1.5" fill="#A78BFA">
          <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" begin="0.3s" />
        </circle>
      </g>
    </svg>
  );
}

export function OnboardingWelcomeIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ob-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="260" height="160" rx="20" fill="url(#ob-grad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.2" />
      {/* Phone mockup */}
      <rect x="110" y="30" width="80" height="140" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      <rect x="115" y="40" width="70" height="110" rx="4" fill="#0F172A" />
      {/* Chart in phone */}
      <path d="M125 120 L140 110 L155 115 L170 95 L175 85" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="175" cy="85" r="3" fill="#10B981" />
      {/* Dollar sign */}
      <text x="150" y="75" textAnchor="middle" fill="#10B981" fontSize="18" fontWeight="bold" opacity="0.8">CHF</text>
      {/* Floating elements */}
      <g transform="translate(50, 60)">
        <circle r="20" fill="#10B981" opacity="0.15" />
        <text y="6" textAnchor="middle" fontSize="20">💰</text>
        <animateTransform attributeName="transform" type="translate" values="50,60;50,55;50,60" dur="3s" repeatCount="indefinite" />
      </g>
      <g transform="translate(250, 70)">
        <circle r="18" fill="#F43F5E" opacity="0.15" />
        <text y="6" textAnchor="middle" fontSize="18">❤️</text>
        <animateTransform attributeName="transform" type="translate" values="250,70;250,65;250,70" dur="2.5s" repeatCount="indefinite" />
      </g>
      <g transform="translate(55, 140)">
        <circle r="16" fill="#6366F1" opacity="0.15" />
        <text y="5" textAnchor="middle" fontSize="16">📈</text>
        <animateTransform attributeName="transform" type="translate" values="55,140;55,135;55,140" dur="2.8s" repeatCount="indefinite" />
      </g>
      <g transform="translate(245, 140)">
        <circle r="16" fill="#F59E0B" opacity="0.15" />
        <text y="5" textAnchor="middle" fontSize="16">🏆</text>
        <animateTransform attributeName="transform" type="translate" values="245,140;245,135;245,140" dur="2.2s" repeatCount="indefinite" />
      </g>
    </svg>
  );
}

export function InvestIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="inv-bar1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="inv-bar2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="inv-bar3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      {/* Bar chart */}
      <rect x="30" y="70" width="25" height="40" rx="4" fill="url(#inv-bar1)" opacity="0.8">
        <animate attributeName="height" from="0" to="40" dur="0.8s" fill="freeze" />
        <animate attributeName="y" from="110" to="70" dur="0.8s" fill="freeze" />
      </rect>
      <rect x="65" y="45" width="25" height="65" rx="4" fill="url(#inv-bar2)" opacity="0.8">
        <animate attributeName="height" from="0" to="65" dur="0.8s" fill="freeze" begin="0.2s" />
        <animate attributeName="y" from="110" to="45" dur="0.8s" fill="freeze" begin="0.2s" />
      </rect>
      <rect x="100" y="25" width="25" height="85" rx="4" fill="url(#inv-bar3)" opacity="0.8">
        <animate attributeName="height" from="0" to="85" dur="0.8s" fill="freeze" begin="0.4s" />
        <animate attributeName="y" from="110" to="25" dur="0.8s" fill="freeze" begin="0.4s" />
      </rect>
      <rect x="135" y="10" width="25" height="100" rx="4" fill="url(#inv-bar1)" opacity="0.9">
        <animate attributeName="height" from="0" to="100" dur="0.8s" fill="freeze" begin="0.6s" />
        <animate attributeName="y" from="110" to="10" dur="0.8s" fill="freeze" begin="0.6s" />
      </rect>
      {/* Arrow */}
      <path d="M25 95 L165 15" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" opacity="0.5" />
      <polygon points="165,10 175,20 160,20" fill="#10B981" opacity="0.7">
        <animateTransform attributeName="transform" type="translate" values="0,0;2,-2;0,0" dur="1.5s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
}

export function HealthIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="health-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      {/* Heart */}
      <g transform="translate(100, 45) scale(1.8)">
        <path d="M0 15 C0 15, -20 0, -20 -10 C-20 -20, -10 -25, 0 -15 C10 -25, 20 -20, 20 -10 C20 0, 0 15, 0 15Z"
              fill="url(#health-grad)" opacity="0.9" />
        <animateTransform attributeName="transform" type="scale" values="1.8;1.9;1.8" dur="1s" repeatCount="indefinite"
                          additive="replace" />
      </g>
      {/* ECG line */}
      <path d="M10 60 L50 60 L60 40 L70 80 L80 50 L90 65 L100 60 L190 60"
            stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Pulse dots */}
      <circle cx="60" cy="40" r="3" fill="#F43F5E" opacity="0.5">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="80" r="3" fill="#F43F5E" opacity="0.5">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
    </svg>
  );
}

export function SavingsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="piggy-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="coin-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Piggy bank body */}
      <ellipse cx="100" cy="85" rx="55" ry="40" fill="url(#piggy-grad)" opacity="0.8" />
      {/* Legs */}
      <rect x="65" y="110" width="12" height="15" rx="4" fill="#059669" opacity="0.7" />
      <rect x="120" y="110" width="12" height="15" rx="4" fill="#059669" opacity="0.7" />
      {/* Snout */}
      <ellipse cx="150" cy="82" rx="14" ry="10" fill="#34D399" opacity="0.7" />
      <circle cx="147" cy="80" r="2" fill="#065F46" />
      <circle cx="153" cy="80" r="2" fill="#065F46" />
      {/* Eye */}
      <circle cx="130" cy="72" r="4" fill="white" opacity="0.9" />
      <circle cx="131" cy="72" r="2" fill="#065F46" />
      {/* Ear */}
      <ellipse cx="85" cy="55" rx="12" ry="15" fill="#059669" opacity="0.6" transform="rotate(-15 85 55)" />
      {/* Coin slot */}
      <rect x="90" y="48" width="20" height="4" rx="2" fill="#065F46" opacity="0.5" />
      {/* Falling coins */}
      <g>
        <circle cx="100" cy="20" r="10" fill="url(#coin-g)" opacity="0.9" />
        <text x="100" y="24" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">$</text>
        <animateTransform attributeName="transform" type="translate" values="0,-10;0,30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" dur="2s" repeatCount="indefinite" />
      </g>
      <g>
        <circle cx="115" cy="10" r="8" fill="url(#coin-g)" opacity="0.7" />
        <text x="115" y="13" textAnchor="middle" fill="#92400E" fontSize="8" fontWeight="bold">$</text>
        <animateTransform attributeName="transform" type="translate" values="0,-5;0,40" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
        <animate attributeName="opacity" values="1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
      </g>
    </svg>
  );
}

export function TrophyIllustration({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophy-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Trophy body */}
      <path d="M35 25 L85 25 L80 65 Q60 80 40 65 Z" fill="url(#trophy-grad)" opacity="0.9" />
      {/* Handles */}
      <path d="M35 30 Q15 30 15 50 Q15 65 35 60" stroke="#F59E0B" strokeWidth="4" fill="none" opacity="0.6" />
      <path d="M85 30 Q105 30 105 50 Q105 65 85 60" stroke="#F59E0B" strokeWidth="4" fill="none" opacity="0.6" />
      {/* Base */}
      <rect x="45" y="75" width="30" height="8" rx="2" fill="#D97706" opacity="0.7" />
      <rect x="38" y="83" width="44" height="10" rx="3" fill="#B45309" opacity="0.6" />
      {/* Star */}
      <polygon points="60,35 64,48 78,48 67,56 71,69 60,61 49,69 53,56 42,48 56,48" fill="white" opacity="0.5" />
      {/* Sparkles */}
      <circle cx="30" cy="20" r="2" fill="#FBBF24">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="15" r="2" fill="#FBBF24">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="105" cy="35" r="1.5" fill="#FDE68A">
        <animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite" begin="0.8s" />
      </circle>
    </svg>
  );
}
