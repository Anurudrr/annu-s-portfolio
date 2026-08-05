import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import hoverAvatar from '../assets/images/hover_avatar.png';

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

const skillStickers = [
  {
    label: 'Frontend',
    detail: 'React UI',
    className: 'bg-[#f7cab2] text-[#050505]',
  },
  {
    label: 'UI Design',
    detail: 'Figma + systems',
    className: 'bg-[#ef4b2d] text-[#fffaf4]',
  },
  {
    label: 'Full Stack',
    detail: 'api + db',
    className: 'bg-[#8bd450] text-[#050505]',
  },
  {
    label: 'Java',
    detail: 'oop + dsa',
    className: 'bg-[#214f31] text-[#fffaf4]',
  },
];

function SkillLabel({ label, detail, className }: (typeof skillStickers)[number]) {
  return (
    <div
      className={`rounded-[6px] border-2 border-[#050505] px-4 py-3 shadow-[4px_4px_0_#050505] ${className}`}
    >
      <span className="block font-bangers text-[1.85rem] uppercase leading-[0.95] tracking-[0.02em] sm:text-4xl">
        {label}
      </span>
      <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-wider">
        {detail}
      </span>
    </div>
  );
}

export default function Hero() {
  const [localTime, setLocalTime] = useState('');
  const yearsVal = useCountUp(3);
  const projectsVal = useCountUp(2);
  const toolsVal = useCountUp(12);

  useEffect(() => {
    const updateISTTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateISTTime();
    const interval = window.setInterval(updateISTTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-[#f4eee8] px-3 pb-5 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 hidden grid-cols-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]/55 md:grid">
          <span>
            Portfolio
            <br />
            UI Direction
          </span>
          <span className="text-center">Anurudh Singh</span>
          <span className="text-right">
            India
            <br />
            2026
          </span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="overflow-hidden bg-[#050505] text-[#fffaf4]"
        >
          <div className="px-5 pb-7 pt-6 sm:px-10 lg:px-16 lg:pb-11">
            <div className="mb-10 grid gap-5 border-b border-[#fffaf4]/18 pb-5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#fffaf4]/72 md:grid-cols-[1fr_auto_1fr]">
              <span>
                Frontend
                <br />
                UI Designer
              </span>
              <span className="hidden text-center md:block">Available for internships</span>
              <span className="md:text-right">
                Vadodara
                <br />
                India
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <h1 className="max-w-[11ch] font-bangers text-[clamp(4.25rem,12.2vw,13rem)] uppercase leading-[0.98] tracking-[0.01em] text-[#fffaf4]">
                Frontend UI Designer
              </h1>

              <div className="grid gap-5 lg:pb-3">
                <p className="font-elite text-base font-medium leading-relaxed text-[#fffaf4]/82">
                  I design clean interfaces and turn them into responsive React experiences with
                  solid frontend craft.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-fit border-b border-[#fffaf4] pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#fffaf4] transition-colors hover:border-[#8bd450] hover:text-[#8bd450]"
                >
                  Get in touch -&gt;
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#f1d8ca] text-[#050505]">
            <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(5,5,5,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(5,5,5,0.14)_1px,transparent_1px)] [background-size:76px_76px]" />
            <div className="absolute left-1/2 top-0 h-full w-[min(600px,78vw)] -translate-x-1/2 bg-[#cfae9c]/45" />
            <div className="absolute right-[-18%] top-0 hidden h-full w-[48%] rounded-bl-[220px] rounded-tl-[220px] bg-[#fffaf4] md:block" />

            <div className="relative z-10 grid gap-5 px-5 pt-8 md:grid-cols-[180px_minmax(300px,540px)_180px] md:items-end md:justify-center md:px-10 lg:grid-cols-[220px_minmax(360px,560px)_220px] lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.12 }}
                className="order-2 grid grid-cols-2 gap-3 md:order-none md:flex md:flex-col md:self-center md:pb-16"
              >
                {skillStickers.slice(0, 2).map((sticker) => (
                  <SkillLabel key={sticker.label} {...sticker} />
                ))}
              </motion.div>

              <div className="order-1 mx-auto h-[380px] w-[min(420px,86vw)] overflow-hidden md:order-none md:h-[560px] md:w-full">
                <img
                  src={hoverAvatar}
                  alt="Portrait of Anurudh Singh"
                  className="h-full w-full object-cover object-top grayscale contrast-110"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.22 }}
                className="order-3 grid grid-cols-2 gap-3 pb-6 md:flex md:flex-col md:self-center md:pb-16"
              >
                {skillStickers.slice(2).map((sticker) => (
                  <SkillLabel key={sticker.label} {...sticker} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.article>

        <div className="grid gap-4 bg-[#f4eee8] py-5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]/58 sm:grid-cols-4">
          <span>Digital brand + product interface</span>
          <span>{localTime || 'IST'} IST</span>
          <span>{yearsVal}rd year CSE</span>
          <span>
            {projectsVal} products / {toolsVal}+ tools
          </span>
        </div>
      </div>
    </section>
  );
}
