import { motion } from 'motion/react';

export default function Contact() {
  const contactLinks = [
    {
      type: 'Email',
      value: 'sanurudh938@gmail.com',
      href: 'mailto:sanurudh938@gmail.com',
      external: false,
    },
    {
      type: 'Phone',
      value: '+91 73893 82433',
      href: 'tel:+917389382433',
      external: false,
    },
    {
      type: 'GitHub',
      value: 'github.com/Anurudrr',
      href: 'https://github.com/Anurudrr',
      external: true,
    },
    {
      type: 'LeetCode',
      value: 'ANURUDH_SINGH_RAJAWAT',
      href: 'https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/',
      external: true,
    },
  ];

  return (
    <section id="contact" className="bg-[#f4eee8] px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 overflow-hidden bg-[#050505] lg:grid-cols-12">
        <div className="bg-[#050505] p-6 text-[#fffaf4] sm:p-10 lg:col-span-7 lg:p-14">
          <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/70">
            Contact / Availability
          </div>
          <h2 className="font-bangers text-[clamp(4rem,9vw,9rem)] uppercase leading-[0.94] tracking-[0.01em]">
            Let's Build Something
          </h2>

          <div className="mt-10 border-t border-[#f1d8ca]/20">
            {contactLinks.map((link) => (
              <motion.a
                key={link.type}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.15 }}
                className="group grid grid-cols-[92px_1fr_auto] items-center gap-4 border-b border-[#f1d8ca]/20 py-5 text-[#fffaf4] transition-colors hover:text-[#8bd450]"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#f1d8ca]/45">
                  {link.type}
                </span>
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-elite text-sm font-semibold">
                  {link.value}
                </span>
                <span className="font-mono text-sm font-bold">-&gt;</span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#8bd450] p-6 text-[#050505] sm:p-10 lg:col-span-5 lg:p-14">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(4,4,3,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(4,4,3,0.35)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="relative z-10 flex min-h-[420px] flex-col justify-between">
            <div>
              <div className="mb-6 inline-block rotate-[-3deg] border-2 border-[#050505] bg-[#ef4b2d] px-5 py-4 text-[#fffaf4] shadow-[4px_4px_0_#050505]">
                <span className="block font-bangers text-4xl uppercase leading-none">Open to</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  internships + projects
                </span>
              </div>
              <p className="max-w-sm font-elite text-base font-semibold leading-relaxed">
                Available for full-stack applications, front-end implementation, UI/UX design, and
                collaboration with product-minded teams.
              </p>
            </div>

            <motion.a
              href="mailto:sanurudh938@gmail.com"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="w-fit bg-[#050505] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-wider text-[#fffaf4] shadow-[5px_5px_0_#fffaf4] transition-colors hover:bg-[#ef4b2d]"
            >
              Email directly -&gt;
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
