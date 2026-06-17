import { useState, useEffect, useRef, useCallback } from 'react';
import { FALLBACK_ITEMS } from './fallback';

export function useSession() {
  const [phase, setPhase] = useState('landing'); // landing | loading | drawing | summary
  const [settings, setSettings] = useState({ minutes: 3, count: 4, categoryMix: 'both' });
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = useCallback((secs) => {
    clearTimer();
    setSecondsLeft(secs);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  // Auto-advance when timer hits 0
  useEffect(() => {
    if (phase === 'drawing' && secondsLeft === 0 && !paused) {
      const timeout = setTimeout(() => advance(), 800);
      return () => clearTimeout(timeout);
    }
  }, [secondsLeft, phase, paused]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (phase !== 'drawing') return;
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePause();
      }
      if (e.code === 'ArrowRight') advance();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, paused, currentIndex, items.length]);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      if (p) {
        // Resume
        timerRef.current = setInterval(() => {
          setSecondsLeft((s) => {
            if (s <= 1) { clearInterval(timerRef.current); return 0; }
            return s - 1;
          });
        }, 1000);
      } else {
        clearTimer();
      }
      return !p;
    });
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((idx) => {
      const next = idx + 1;
      if (next >= items.length) {
        clearTimer();
        setPhase('summary');
        return idx;
      }
      startTimer(settings.minutes * 60);
      setPaused(false);
      return next;
    });
  }, [items.length, settings.minutes, startTimer]);

  const startSession = useCallback(async () => {
    setError(null);
    setPhase('loading');
    setCurrentIndex(0);
    setPaused(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryMix: settings.categoryMix,
          count: settings.count,
          minutes: settings.minutes,
        }),
      });

      let generated;
      if (!res.ok) {
        throw new Error(`API ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data.items) || data.items.length === 0) {
        throw new Error('Empty response');
      }
      generated = data.items.slice(0, settings.count);
      setItems(generated);
    } catch (err) {
      console.warn('Generation failed, using fallback:', err.message);
      setError('Could not reach the AI — using practice subjects instead.');
      setItems(FALLBACK_ITEMS.slice(0, settings.count));
    }

    setPhase('drawing');
    startTimer(settings.minutes * 60);
  }, [settings, startTimer]);

  useEffect(() => () => clearTimer(), []);

  return {
    phase, settings, setSettings,
    items, currentIndex,
    secondsLeft, paused,
    error,
    startSession, advance, togglePause,
  };
}
