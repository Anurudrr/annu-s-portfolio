import { useState } from 'react';
import { motion } from 'motion/react';

interface BlockDetail {
  id: string;
  label: string;
  summary: string;
  details: string;
  accent: string;
}

const ABOUT_BLOCKS: BlockDetail[] = [
  {
    id: 'origin',
    label: 'Origin',
    summary: 'B.Tech Computer Science student at Parul Institute of Technology, Vadodara.',
    details:
      'Anurudh started with visual design and gradually moved that grid discipline into software. The result is a developer who thinks about hierarchy, rhythm, responsiveness, and code structure together.',
    accent: 'bg-[#8bd450]',
  },
  {
    id: 'craft',
    label: 'Craft',
    summary: 'React, Java, SQL, REST APIs, and high-fidelity UI implementation.',
    details:
      'He builds interfaces that are clear to scan, then connects them to practical application logic. The work spans front-end systems, backend routes, data modeling, and production polish.',
    accent: 'bg-[#ef4b2d] text-[#fffaf4]',
  },
  {
    id: 'direction',
    label: 'Direction',
    summary: 'Looking for internships, technical assignments, and product-minded teams.',
    details:
      'The next step is deeper engineering practice: stronger DSA, larger full-stack applications, tighter design systems, and collaboration with teams that care about shipped quality.',
    accent: 'bg-[#214f31] text-[#fffaf4]',
  },
];

export default function About() {
  const [expandedBlock, setExpandedBlock] = useState<string | null>('origin');

  return (
    <section id="about" className="bg-[#f4eee8] px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 overflow-hidden bg-[#050505] lg:grid-cols-12">
        <div className="col-span-1 flex min-h-[520px] flex-col justify-between bg-[#050505] p-6 text-[#fffaf4] sm:p-10 lg:col-span-5 lg:p-16">
          <div>
            <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/70">
              About / Profile
            </div>
            <h2 className="font-bangers text-[clamp(4rem,8vw,8.5rem)] uppercase leading-[0.94] tracking-[0.01em]">
              Designer Turned Developer
            </h2>
          </div>

          <p className="max-w-md border-t border-[#f1d8ca]/20 pt-6 font-elite text-sm font-medium leading-relaxed text-[#fffaf4]/78">
            The portfolio is built around a simple idea: strong visual taste should support real
            engineering, not sit apart from it.
          </p>
        </div>

        <div className="col-span-1 bg-[#f1d8ca] p-4 sm:p-8 lg:col-span-7 lg:p-12">
          <div className="grid gap-4">
            {ABOUT_BLOCKS.map((block, index) => {
              const isExpanded = expandedBlock === block.id;

              return (
                <motion.button
                  key={block.id}
                  onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                  whileHover={{ y: -3 }}
                  className="group grid w-full grid-cols-1 border-2 border-[#050505] bg-[#fffaf4] text-left transition-colors hover:bg-[#f7cab2]/45 md:grid-cols-[132px_1fr]"
                >
                  <div
                    className={`${block.accent} flex items-center justify-between border-b-2 border-[#050505] px-5 py-4 md:block md:border-b-0 md:border-r-2`}
                  >
                    <span className="font-bangers text-4xl uppercase leading-none tracking-[0.02em]">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider md:mt-4 md:block">
                      {block.label}
                    </span>
                  </div>

                  <div className="p-5 sm:p-7">
                    <p className="max-w-2xl font-elite text-lg font-semibold leading-snug text-[#050505]">
                      {block.summary}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? 18 : 0,
                      }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl border-l-2 border-[#050505] pl-4 font-mono text-xs font-bold uppercase leading-relaxed tracking-wider text-[#4a4b4f]">
                        {block.details}
                      </p>
                    </motion.div>

                    <span className="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]/45 group-hover:text-[#ef4b2d]">
                      {isExpanded ? 'Close profile note' : 'Read profile note'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
