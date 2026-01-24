import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function SplashScreen() {
  const setScreen = useAppStore((s) => s.setScreen);
  const quitTimestamp = useAppStore((s) => s.quitTimestamp);

  useEffect(() => {
    const timer = setTimeout(() => {
      // If user already has a quit timestamp, skip onboarding
      setScreen(quitTimestamp ? 'main' : 'onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setScreen, quitTimestamp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Logo */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute inset-1 bg-slate-950 rounded-3xl flex items-center justify-center">
            <span className="text-5xl">🚭</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white mb-3">
          Quit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Rich</span>
        </h1>
        <p className="text-slate-400 text-lg mb-2">Investiere statt zu rauchen</p>
        <p className="text-slate-600 text-sm mb-8">Version 2.0 Pro</p>

        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
