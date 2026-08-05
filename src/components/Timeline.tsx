import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen, Compass, Target, Zap } from 'lucide-react';
import { TIMELINE_DATA } from '../types';

const chapterAccents = ['#3CBAAE', '#F2C94C', '#EF7B3C', '#344E38', '#3CBAAE'];

const chapterMeta = [
  {
    label: 'Academic base',
    value: 'Parul University',
    note: 'B.Tech CSE at Parul Institute of Technology with a current CGPA of 7.07/10.',
    icon: <Compass className="h-5 w-5" />,
  },
  {
    label: 'Visual practice',
    value: 'Design systems',
    note: 'A full year of UI/UX practice in Figma, Adobe XD, and Canva before moving deeper into code.',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: 'First full-stack ship',
    value: 'Evento',
    note: 'Frontend Developer & UI Designer in a 4-person team under mentor Ms. Gayatri Naidu.',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    label: 'Solo platform',
    value: 'Hopin',
    note: 'Full-stack ride-sharing platform — route matching, fare splitting, real-time location — on Vercel.',
    icon: <Target className="h-5 w-5" />,
  },
  {
    label: 'Next chapter',
    value: 'Campus placements',
    note: 'Preparing for placements with advanced DSA practice and full-stack product growth.',
    icon: <ArrowRight className="h-5 w-5" />,
  },
];

export default function Timeline() {
  const [activeChapter, setActiveChapter] = useState(0);
  const activeMeta = chapterMeta[activeChapter] || chapterMeta[0];
  const activeAccent = chapterAccents[activeChapter % chapterAccents.length];

  return (
    <section id="timeline" className="bg-[#F2ECDE] px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 overflow-hidden bg-[#EDE5D6] lg:grid-cols-12">
        <div className="bg-[#EDE5D6] p-6 sm:p-10 lg:col-span-5 lg:p-14">
          <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#141310]">
            Timeline / Chapters
          </div>
          <h2 className="font-bangers text-[clamp(3.8rem,8vw,8rem)] uppercase leading-[0.94] tracking-[0.01em]">
            Story So Far
          </h2>

          <div className="mt-10 grid gap-3">
            {TIMELINE_DATA.map((item, index) => {
              const isActive = activeChapter === index;

              return (
                <button
                  key={`${item.year}-${item.title}`}
                  onClick={() => setActiveChapter(index)}
                  className={`grid w-full grid-cols-[72px_1fr_auto] items-center gap-4 border-2 border-[#141310] p-4 text-left transition-transform hover:translate-x-1 ${
                    isActive ? 'bg-[#141310] text-[#F2ECDE]' : 'bg-[#F2ECDE] text-[#141310]'
                  }`}
                >
                  <span
                    className="grid h-14 w-14 place-items-center border-2 border-[#141310] font-bangers text-3xl uppercase leading-none text-[#141310]"
                    style={{ backgroundColor: chapterAccents[index % chapterAccents.length] }}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider opacity-60">
                      {item.month} / {item.year}
                    </span>
                    <span className="mt-1 block font-elite text-sm font-bold leading-snug">
                      {item.title}
                    </span>
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${isActive ? 'rotate-45' : ''}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-[#141310] p-6 text-[#F2ECDE] sm:p-10 lg:col-span-7 lg:p-14">
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(242,236,222,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(242,236,222,0.6)_1px,transparent_1px)] [background-size:70px_70px]" />
          <div
            className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full border-[28px] opacity-70"
            style={{ borderColor: activeAccent }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex min-h-[420px] flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-2 border border-[#EDE5D6]/25 bg-[#141310] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#EDE5D6]">
                  {activeMeta.icon}
                  {activeMeta.label}
                </div>

                <h3 className="mt-9 max-w-[11ch] font-bangers text-[clamp(4rem,9vw,9rem)] uppercase leading-[0.94] tracking-[0.01em]">
                  {TIMELINE_DATA[activeChapter].title}
                </h3>

                <p className="mt-7 max-w-2xl border-l-2 pl-5 font-elite text-base font-medium leading-relaxed text-[#F2ECDE]/80">
                  {TIMELINE_DATA[activeChapter].detail}
                </p>
              </div>

              <div className="mt-10 grid gap-4 border-t border-[#EDE5D6]/20 pt-6 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#EDE5D6]/55">
                    Focus
                  </span>
                  <span className="mt-2 block font-bangers text-4xl uppercase leading-none">
                    {activeMeta.value}
                  </span>
                </div>
                <p className="font-mono text-[11px] font-bold uppercase leading-relaxed tracking-wider text-[#EDE5D6]/65">
                  {activeMeta.note}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
