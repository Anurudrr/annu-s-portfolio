import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

const loaderSteps = [
  'loading design system',
  'setting typography',
  'mounting portfolio sections',
  'calibrating interactions',
  'ready',
];

export default function Loader({ onComplete }: LoaderProps) {
  const [percent, setPercent] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const intervalTime = 30;
    const increments = duration / intervalTime;
    let currentStep = 0;
    let autoTimeout: number | undefined;

    const interval = window.setInterval(() => {
      currentStep++;
      const currentPercent = Math.min(Math.floor((currentStep / increments) * 100), 100);
      setPercent(currentPercent);

      if (currentPercent >= 100) {
        window.clearInterval(interval);
        setCanSkip(true);
        autoTimeout = window.setTimeout(onComplete, 520);
      }
    }, intervalTime);

    return () => {
      window.clearInterval(interval);
      if (autoTimeout) window.clearTimeout(autoTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, y: -14, transition: { duration: 0.45 } }}
      onClick={onComplete}
      className="fixed inset-0 z-[10000] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#f4eee8] p-6 text-[#fffaf4]"
      id="loader"
    >
      <div className="absolute inset-6 border border-[#fffaf4]/20" />
      <div className="absolute left-6 top-6 font-mono text-[10px] font-bold uppercase tracking-wider text-[#fffaf4]/55 sm:left-10 sm:top-10">
        Portfolio
        <br />
        Exploration
      </div>
      <div className="absolute bottom-6 right-6 text-right font-mono text-[10px] font-bold uppercase tracking-wider text-[#fffaf4]/55 sm:bottom-10 sm:right-10">
        React + Java
        <br />
        2026
      </div>

      <div className="relative w-full max-w-5xl bg-[#050505] px-6 py-12 text-center sm:px-12 sm:py-16">
        <motion.h1
          className="font-bangers text-[clamp(5rem,17vw,13rem)] uppercase leading-[0.94] tracking-[0.01em] text-[#f1d8ca]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          AS.DEV
        </motion.h1>

        <div className="mx-auto mt-8 h-[4px] w-full max-w-md bg-[#f1d8ca]/20">
          <motion.div
            className="h-full bg-[#8bd450]"
            style={{ width: `${percent}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/70">
          {percent}% loaded
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={Math.min(Math.floor(percent / 20), 4)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-8 min-h-[18px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/70"
          >
            {canSkip
              ? 'click anywhere to enter'
              : loaderSteps[Math.min(Math.floor(percent / 20), 4)]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
