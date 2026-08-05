import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../types';

const accentClasses = [
  'border-t-[#3CBAAE]',
  'border-t-[#9FD463]',
  'border-t-[#EF7B3C]',
  'border-t-[#344E38]',
  'border-t-[#3CBAAE]',
  'border-t-[#9FD463]',
];

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchedSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchedSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="bg-[#F2ECDE] px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1680px] overflow-hidden bg-[#EDE5D6]">
        <div className="grid gap-8 border-b-2 border-[#141310] bg-[#141310] p-6 text-[#F2ECDE] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#F2ECDE]/75">
              Capabilities / Stack
            </div>
            <h2 className="max-w-[10ch] font-bangers text-[clamp(4rem,8vw,8.5rem)] uppercase leading-[0.94] tracking-[0.01em]">
              Skills For Frontend Work
            </h2>
          </div>

          <div className="w-full max-w-sm">
            <label
              htmlFor="skill-search"
              className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              Search stack
            </label>
            <div className="relative">
              <input
                id="skill-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="React, Java, Figma..."
                className="w-full border border-[#EDE5D6]/35 bg-[#F2ECDE] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#141310] outline-none placeholder:text-[#141310]/35 focus:bg-[#EDE5D6]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear skill search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-[#EF7B3C]"
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              whileHover={{ y: -2 }}
              className={`min-h-[260px] border-b-2 border-t-[10px] border-b-[#141310] bg-[#EDE5D6] p-5 md:border-r-2 md:border-r-[#141310] sm:p-8 xl:[&:nth-child(3n)]:border-r-0 ${
                accentClasses[catIdx % accentClasses.length]
              }`}
            >
              <div className="mb-7">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider opacity-70">
                  Skill group 0{catIdx + 1}
                </span>
                <h3 className="mt-2 font-bangers text-4xl uppercase leading-none tracking-[0.02em]">
                  {category.title}
                </h3>
              </div>

              <div className="grid gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={skill.name}
                    className="flex items-center justify-between border-b border-[#141310]/18 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#141310]"
                  >
                    {skill.name}
                    <span
                      className={`h-2 rounded-full ${
                        idx % 3 === 0
                          ? 'bg-[#9FD463]'
                          : idx % 3 === 1
                            ? 'bg-[#EF7B3C]'
                            : 'bg-[#344E38]'
                      }`}
                      style={{ width: `${Math.max(34, skill.rating)}px` }}
                      aria-label={`${skill.name} rating ${skill.rating}`}
                    />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="bg-[#EDE5D6] p-16 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#141310]/70">
            No matching skills for "{searchQuery}". Try React, Java, or Figma.
          </div>
        )}
      </div>
    </section>
  );
}
