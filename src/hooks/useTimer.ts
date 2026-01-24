import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function useTimer() {
  const quitTimestamp = useAppStore((s) => s.quitTimestamp);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!quitTimestamp) return;

    const update = () => {
      setSeconds(Math.floor((Date.now() - quitTimestamp) / 1000));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [quitTimestamp]);

  return seconds;
}

export function usePulse(intervalMs: number = 5000, durationMs: number = 500) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), durationMs);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, durationMs]);

  return pulse;
}
