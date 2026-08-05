import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { CommandPalette } from '../components/ui/CommandPalette';
import { BackToTop } from '../components/ui/BackToTop';
import SystemsHUD from '../components/SystemsHUD';
import CustomCursor from '../components/CustomCursor';

const G_MAP: Record<string, string> = {
  h: '/dev',
  w: '/dev/work',
  a: '/dev/about',
  b: '/dev/blog',
  c: '/dev/contact',
  s: '/dev/status',
};

function useAccentCycle() {
  return React.useCallback(() => {
    const ids = ['teal', 'solar', 'mint', 'rose', 'violet'];
    let current = 'teal';
    try {
      current = window.localStorage.getItem('as.accent') || 'teal';
    } catch {
      // storage unavailable
    }
    if (!ids.includes(current)) current = 'teal';
    const next = ids[(ids.indexOf(current) + 1) % ids.length];
    document.documentElement.setAttribute('data-accent', next);
    try {
      window.localStorage.setItem('as.accent', next);
    } catch {
      // storage unavailable
    }
  }, []);
}

function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const cycleAccent = useAccentCycle();
  const konamiSeq = React.useRef<string[]>([]);
  const [konamiActive, setKonamiActive] = React.useState(false);

  React.useEffect(() => {
    let gKey: string | null = null;
    let gTimer: number | null = null;
    let konamiTimer: number | null = null;

    const resetG = () => {
      if (gTimer) window.clearTimeout(gTimer);
      gKey = null;
      gTimer = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) return;

      const key = e.key;

      // j/k smooth scroll
      if (key === 'j' || key === 'k') {
        e.preventDefault();
        window.scrollBy({ top: key === 'j' ? 480 : -480, behavior: 'smooth' });
        return;
      }

      // accent cycle
      if (key === 'x' || key === 'X') {
        cycleAccent();
        return;
      }

      // `g`-prefix navigation
      if (key === 'g') {
        gKey = 'g';
        if (gTimer) window.clearTimeout(gTimer);
        gTimer = window.setTimeout(resetG, 800);
        return;
      }
      if (gKey && key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        resetG();
        const path = G_MAP[key.toLowerCase()];
        if (path) {
          e.preventDefault();
          navigate(path);
        }
        return;
      }

      // Konami sequence
      const konami = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
      ];
      const seq = konamiSeq.current;
      const expect = konami[seq.length];
      const mapped = key.toLowerCase();
      const matches = key === expect || mapped === expect;
      if (matches) {
        konamiSeq.current = seq.concat(expect);
        if (konamiTimer) window.clearTimeout(konamiTimer);
        konamiTimer = window.setTimeout(() => {
          konamiSeq.current = [];
        }, 1800);
        if (konamiSeq.current.length === konami.length) {
          konamiSeq.current = [];
          setKonamiActive(true);
        }
      } else if (mapped !== 'a' && mapped !== 'b' && !mapped.startsWith('arrow')) {
        konamiSeq.current = [];
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      resetG();
      if (konamiTimer) window.clearTimeout(konamiTimer);
    };
  }, [navigate, cycleAccent]);

  const dismissKonami = React.useCallback(() => setKonamiActive(false), []);

  return { konamiActive, dismissKonami };
}

function KeyboardShortcutLayer() {
  const { konamiActive, dismissKonami } = useKeyboardShortcuts();

  return (
    <AnimatePresence>
      {konamiActive && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          onClick={dismissKonami}
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 28,
            transform: 'translateX(-50%)',
            zIndex: 99999,
            background: '#141310',
            color: '#F2ECDE',
            border: '1px solid var(--as-accent, #3cbaae)',
            borderRadius: '999px',
            padding: '10px 20px',
            fontSize: '12px',
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            letterSpacing: '0.12em',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            cursor: 'pointer',
          }}
        >
          KONAMI MODE :: 30 LIVES ADDED
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DevLayout(): React.ReactElement {
  return (
    <div className="theme-dev">
      <ScrollProgress />
      <Outlet />
      <CommandPalette />
      <KeyboardShortcutLayer />
      <CustomCursor />
      <BackToTop />
      <SystemsHUD />
    </div>
  );
}
