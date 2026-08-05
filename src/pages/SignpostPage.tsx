import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function SignpostPage(): React.ReactElement {
  return (
    <div className="min-h-[100dvh] bg-[#FFD700] flex flex-col items-center justify-center overflow-hidden font-['General_Sans',_Inter,_sans-serif] relative z-0 py-4 md:py-6">
      
      {/* Background Typography & Splatter */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden pb-10">
        <div className="font-['Clash_Display',_'Anton',_Impact,_sans-serif] font-black text-[#121110] leading-[0.75] text-[min(38vw,480px)] tracking-tighter uppercase select-none relative opacity-90">
          <div className="relative z-10 text-center">AR</div>
          <div className="relative z-10 text-center">26</div>
          
          {/* Ink Splatter Overlay Mask (using an SVG splatter inline) */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-20 mix-blend-color-burn opacity-80"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M220,130 Q250,90 280,120 T350,140 Q390,160 380,210 T420,290 Q430,340 380,360 T310,410 Q260,430 220,390 T140,360 Q90,340 100,290 T70,200 Q90,150 140,160 T220,130 Z" fill="#121110" filter="url(#rough)" />
            <path d="M120,80 A10,10 0 1,1 140,90 A10,10 0 1,1 120,80 Z M380,90 A15,15 0 1,1 410,100 M430,200 A8,8 0 1,1 440,215 M90,380 A12,12 0 1,1 110,400 M350,440 A10,10 0 1,1 365,450" fill="#121110" />
            <path d="M180,180 l-20,-30 m40,10 l10,-20 m120,60 l30,-10 m-10,40 l20,10 m-180,120 l-20,20" stroke="#121110" strokeWidth="8" strokeLinecap="round" />
            <defs>
              <filter id="rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Center Pole */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none perspective-[1000px]">
        <div className="relative w-full h-[120%] max-w-[900px] mx-auto flex justify-center origin-bottom rotate-[2deg]">
          
          <div className="absolute top-[-10%] bottom-0 w-[45px] md:w-[65px] bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 border-x-4 border-[#121110] z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.15)] flex flex-col items-center">
            {/* Pole details / stickers */}
            <div className="w-full h-1 bg-[#121110] my-32" />
            
            {/* Code Sticker */}
            <div className="w-10 h-10 rounded-full bg-[#121110] border-2 border-[#F2ECDE] ml-4 mt-20 flex items-center justify-center -rotate-12 shadow-md z-30 hidden md:flex">
              <span className="text-[#69CBBF] font-bold text-xs font-mono">&lt;/&gt;</span>
            </div>
            
            <div className="w-[120%] h-4 bg-[#69CBBF] border-2 border-[#121110] rotate-12 -ml-2 mt-40" />
            <div className="w-[110%] h-6 bg-[#EC4E7C] border-2 border-[#121110] -rotate-6 ml-1 mt-10" />
            
            <div className="w-full h-1 bg-[#121110] mt-32" />

            {/* Brush Sticker */}
            <div className="w-10 h-10 rounded-full bg-[#e05c9a] border-2 border-[#121110] -ml-4 mt-16 flex items-center justify-center rotate-12 shadow-md z-30 hidden md:flex">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#121110" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3L7 14l-4 4a2 2 0 0 0 3 3l4-4h3a5 5 0 0 0 5-5v-3h2l2-2v-3z" />
              </svg>
            </div>

            {/* Torn paper */}
            <div className="w-[130%] h-12 bg-[#F1EBDF] border-2 border-[#121110] rotate-3 ml-2 mt-auto mb-[20vh] flex items-center justify-center overflow-hidden hidden md:flex">
               <div className="w-full h-[2px] bg-[#121110]" />
            </div>
          </div>

        </div>
      </div>

      {/* Top Name / Logomark */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 mb-4 md:mb-6 flex flex-col items-center gap-2 mt-2 pointer-events-auto"
      >
        {/* Pink Pennant Flag */}
        <div className="relative w-[100px] h-[75px] -rotate-12 ml-6">
          <svg width="100%" height="100%" viewBox="0 0 80 60" className="drop-shadow-[4px_4px_0_#121110]">
            <polygon points="80,0 0,30 80,60" fill="#EC4E7C" stroke="#121110" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="50" cy="30" r="8" fill="#8B5CF6" stroke="#121110" strokeWidth="3" />
          </svg>
        </div>
        <span
          className="text-[#121110] text-[13px] md:text-[15px] font-bold tracking-[0.18em] uppercase bg-[#FFD700] px-4 py-1.5 border-[3px] border-[#121110] shadow-[4px_4px_0_#121110] rounded-sm relative z-10"
        >
          Anurudh Singh Rajawat
        </span>
      </motion.div>

      {/* Two planks - Sign Plates */}
      <div className="relative z-30 flex flex-col md:flex-row gap-4 md:gap-24 w-full max-w-4xl justify-center items-center pointer-events-auto mt-0">
        
        {/* Development Plank (Green Arrow Sign) */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:mr-10 z-20 w-full max-w-[320px] md:max-w-none flex justify-center"
        >
          <Link to="/dev" className="block text-decoration-none">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.06, boxShadow: "0 12px 32px rgba(60, 186, 174, 0.6)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative flex flex-col items-start gap-2 pl-12 pr-6 py-6 bg-[#4ADE80] border-[5px] border-[#121110] cursor-pointer min-w-[280px] md:min-w-[320px] shadow-[8px_8px_0_#121110]"
              style={{ clipPath: "polygon(0% 50%, 12% 0%, 100% 0%, 100% 100%, 12% 100%)" }}
            >
              {/* Bracket */}
              <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-[24px] h-[40px] bg-gray-400 border-[4px] border-l-0 border-[#121110] rounded-r-md z-[-1] flex flex-col justify-between py-1.5 items-center hidden md:flex">
                 <div className="w-2 h-2 rounded-full bg-[#121110]" />
                 <div className="w-2 h-2 rounded-full bg-[#121110]" />
              </div>

              <span className="text-[#121110] text-[12px] font-bold tracking-[0.18em] uppercase font-mono ml-4">
                ← ENTER
              </span>
              <span className="text-[#121110] text-3xl md:text-4xl font-black tracking-tight leading-none font-['Clash_Display',_'Anton',_Impact,_sans-serif] uppercase ml-4">
                DEVELOPMENT
              </span>
              <span className="text-gray-800 text-sm font-['General_Sans',_Inter,_sans-serif] ml-4 font-bold">
                Full-stack · UI/UX · Systems
              </span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Design Plank (Blue Rectangular Sign) */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:ml-10 z-10 md:mt-12 w-full max-w-[320px] md:max-w-none flex justify-center"
        >
          <Link to="/design" className="block text-decoration-none">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.06, boxShadow: "0 12px 32px rgba(224, 92, 154, 0.6)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative flex flex-col items-end gap-2 px-8 py-6 bg-[#3B82F6] border-[5px] border-[#121110] cursor-pointer min-w-[280px] md:min-w-[320px] shadow-[8px_8px_0_#121110]"
            >
              {/* Bracket */}
              <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[24px] h-[40px] bg-gray-400 border-[4px] border-r-0 border-[#121110] rounded-l-md z-[-1] flex flex-col justify-between py-1.5 items-center hidden md:flex">
                 <div className="w-2 h-2 rounded-full bg-[#121110]" />
                 <div className="w-2 h-2 rounded-full bg-[#121110]" />
              </div>
              
              {/* White Circular Icon Accent */}
              <div className="absolute top-[-20px] right-[-16px] w-14 h-14 bg-white border-[4px] border-[#121110] rounded-full flex items-center justify-center shadow-[4px_4px_0_#121110]">
                 <div className="w-5 h-5 bg-[#e05c9a] rounded-full" />
              </div>

              <span className="text-[#121110] text-[12px] font-bold tracking-[0.18em] uppercase font-mono bg-[#FFD700] px-3 py-1 border-[3px] border-[#121110] mb-1">
                ENTER →
              </span>
              <span className="text-white text-3xl md:text-4xl font-black tracking-tight leading-none font-['Clash_Display',_'Anton',_Impact,_sans-serif] uppercase text-right drop-shadow-[2px_2px_0_#121110]">
                GRAPHICS &amp;<br />DESIGN
              </span>
              <span className="text-blue-100 text-sm font-['General_Sans',_Inter,_sans-serif] font-bold">
                Visual identity · Print · Motion
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Signal Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-30 mt-6 md:mt-10 pointer-events-none flex flex-col items-center"
      >
        <div className="relative">
           {/* Bracket arm to pole */}
           <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[70px] h-[30px] bg-gray-400 border-[4px] border-[#121110] z-[-1] hidden md:block" />
           <div className="absolute top-[-20px] left-[20px] w-[30px] h-[50px] bg-gray-400 border-[4px] border-[#121110] z-[-1] md:hidden" />
           
           <div className="bg-[#EF7D16] border-[5px] border-[#121110] shadow-[8px_8px_0_#121110] p-3 rounded-xl flex flex-col gap-3 relative">
             {/* White paint splatters overlay */}
             <div className="absolute inset-0 z-20 pointer-events-none opacity-50">
               <svg viewBox="0 0 100 200" width="100%" height="100%">
                 <circle cx="20" cy="30" r="4" fill="white" />
                 <circle cx="80" cy="50" r="2.5" fill="white" />
                 <circle cx="30" cy="120" r="5" fill="white" />
                 <circle cx="70" cy="180" r="3" fill="white" />
                 <path d="M40 80 Q50 70 60 90 T40 100" fill="white" />
                 <path d="M20 160 Q30 150 40 170" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
               </svg>
             </div>

             {/* Top Panel (Purple) */}
             <div className="bg-[#121110] p-1.5 rounded-lg z-10">
               <div className="bg-[#A855F7] w-[75px] h-[75px] rounded border-2 border-[#121110] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '8px 8px' }} />
                 <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#EC4E7C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[2px_2px_0_#121110]">
                   <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                   <circle cx="9" cy="7" r="4"></circle>
                   <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                   <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                 </svg>
               </div>
             </div>

             {/* Bottom Panel (Blue/Green) */}
             <div className="bg-[#121110] p-1.5 rounded-lg z-10">
               <div className="bg-[#4ADE80] w-[75px] h-[75px] rounded border-2 border-[#121110] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '8px 8px' }} />
                 <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[2px_2px_0_#121110]">
                   <path d="M13 4v16" />
                   <path d="M17 21l-4-5-4 5" />
                   <path d="M17 8l-4 5-4-5" />
                   <circle cx="13" cy="4" r="2" />
                 </svg>
               </div>
             </div>
           </div>
        </div>
      </motion.div>

      {/* Subtle hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-6 text-[#121110] text-[13px] tracking-[0.14em] uppercase font-mono font-bold relative z-30"
      >
        Choose your path
      </motion.p>
    </div>
  );
}

