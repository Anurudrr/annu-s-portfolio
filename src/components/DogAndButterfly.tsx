import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useSpring, useMotionValue } from 'motion/react';

export default function DogAndButterfly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeight = useRef(400);

  // Target coordinates for butterfly
  const targetX = useMotionValue(200);
  const targetY = useMotionValue(200);

  // Physics Springs for Butterfly
  const bX = useSpring(targetX, { stiffness: 45, damping: 10, mass: 1 });
  const bY = useSpring(targetY, { stiffness: 45, damping: 10, mass: 1 });
  const bRot = useMotionValue(0);
  const bWingScale = useMotionValue(1);

  // Physics Springs for Dog
  const dogX = useSpring(bX, { stiffness: 10, damping: 25, mass: 3 });
  const dogYOffset = useSpring(0, { stiffness: 40, damping: 12, mass: 1.5 });
  const dogScaleX = useSpring(1, { stiffness: 100, damping: 25 });

  // Body parts motion values
  const headRot = useSpring(0, { stiffness: 80, damping: 15 });
  const tailRot = useSpring(0, { stiffness: 100, damping: 15 });
  const fLeg1 = useSpring(0, { stiffness: 150, damping: 20 });
  const fLeg2 = useSpring(0, { stiffness: 150, damping: 20 });
  const bLeg1 = useSpring(0, { stiffness: 150, damping: 20 });
  const bLeg2 = useSpring(0, { stiffness: 150, damping: 20 });
  const shadowScale = useSpring(1, { stiffness: 100, damping: 15 });

  const phase = useRef(0);
  const butterflyPhaseX = useRef(0);
  const butterflyPhaseY = useRef(0);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const updateHeight = () => {
      containerHeight.current = parent.clientHeight;
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        targetX.set(x);
        targetY.set(y);
      }
    };

    // Add event listener to window so it catches mouse even over pointer-events: none children
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateHeight);
    };
  }, [targetX, targetY]);

  useAnimationFrame((t, delta) => {
    // === Butterfly Physics ===
    // Organic erratic motion stacking sine waves
    butterflyPhaseX.current += delta * 0.003;
    butterflyPhaseY.current += delta * 0.002;

    const flutterOffsetX =
      Math.sin(butterflyPhaseX.current) * 30 + Math.cos(butterflyPhaseX.current * 1.5) * 15;
    const flutterOffsetY =
      Math.cos(butterflyPhaseY.current) * 25 + Math.sin(butterflyPhaseY.current * 2) * 15;

    bX.set(targetX.get() + flutterOffsetX);
    bY.set(targetY.get() + flutterOffsetY - 30);

    bRot.set(Math.sin(t / 50) * 20 + (targetX.get() - bX.get()) * 0.05);
    bWingScale.set(Math.abs(Math.sin(t / 35)) * 0.4 + 0.6);

    // === Dog Physics ===
    const b_x = bX.get();
    const b_y = bY.get();
    const d_x = dogX.get();

    // Direction (Dog faces right by default in SVG)
    if (b_x > d_x + 40) dogScaleX.set(1);
    else if (b_x < d_x - 40) dogScaleX.set(-1);

    const dx = Math.abs(b_x - d_x);
    // Is butterfly low enough to catch dog's attention for jumping?
    const isButterflyLow = b_y > containerHeight.current - 180;

    // Wag tail
    tailRot.set(Math.sin(t / 100) * 20 - 10);

    if (dx > 25) {
      // Running / Walking Mode
      const speed = Math.min(dx / 50, 2);
      phase.current += delta * speed * 0.005;

      const p = phase.current;
      fLeg1.set(Math.sin(p) * 25);
      fLeg2.set(Math.sin(p + Math.PI) * 25);
      bLeg1.set(Math.sin(p + Math.PI / 2) * 25);
      bLeg2.set(Math.sin(p + Math.PI * 1.5) * 25);

      dogYOffset.set(-Math.abs(Math.sin(p * 2) * 12 * speed));
      headRot.set(Math.sin(p * 2) * 6);
    } else {
      // Idle / Looking
      fLeg1.set(0);
      fLeg2.set(0);
      bLeg1.set(0);
      bLeg2.set(0);

      if (isButterflyLow) {
        // Jump mechanic
        const jumpCycle = t % 2500;
        if (jumpCycle < 400) {
          dogYOffset.set(-45); // Springs handle smooth transition
          headRot.set(-20);
          fLeg1.set(-30);
          fLeg2.set(-30);
          bLeg1.set(15);
          bLeg2.set(15);
        } else {
          dogYOffset.set(0);
          headRot.set(0);
        }
      } else {
        dogYOffset.set(0);
        headRot.set(-25); // Look up
      }
    }

    // Shadow scaling
    shadowScale.set(Math.max(0.3, 1 - Math.abs(dogYOffset.get()) / 50));
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[800] overflow-hidden hidden md:block"
    >
      {/* Dog */}
      <motion.div
        className="absolute origin-bottom"
        style={{
          x: dogX,
          bottom: '20px',
          scaleX: dogScaleX,
          y: dogYOffset,
          marginLeft: '-75px', // Center 150px wide SVG
          width: 150,
          height: 150,
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 120 120"
          className="overflow-visible drop-shadow-lg"
        >
          {/* Shadow */}
          <motion.ellipse
            cx="60"
            cy="112"
            rx="30"
            ry="5"
            fill="#141310"
            opacity={0.18}
            style={{ transformOrigin: '60px 112px', scaleX: shadowScale, scaleY: shadowScale }}
          />

          {/* Tail */}
          <motion.line
            x1="32"
            y1="65"
            x2="20"
            y2="45"
            stroke="#EF7D16"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ transformOrigin: '32px 65px', rotate: tailRot }}
          />

          {/* Far Back Leg */}
          <motion.line
            x1="50"
            y1="85"
            x2="50"
            y2="105"
            stroke="#D96A1B"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ transformOrigin: '50px 85px', rotate: bLeg2 }}
          />
          {/* Far Front Leg */}
          <motion.line
            x1="80"
            y1="85"
            x2="80"
            y2="105"
            stroke="#D96A1B"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ transformOrigin: '80px 85px', rotate: fLeg2 }}
          />

          {/* Body */}
          <rect x="30" y="60" width="55" height="30" rx="15" fill="#EF7D16" />

          {/* Head Group: pivots from chest */}
          <motion.g style={{ transformOrigin: '78px 65px', rotate: headRot }}>
            {/* Far Ear */}
            <rect x="75" y="32" width="10" height="15" rx="5" fill="#D96A1B" />

            {/* Neck */}
            <rect x="68" y="32" width="24" height="35" rx="8" fill="#EF7D16" />

            {/* Head / Snout */}
            <rect x="75" y="38" width="28" height="22" rx="10" fill="#EF7D16" />

            {/* Near Ear */}
            <rect x="66" y="27" width="10" height="18" rx="5" fill="#EF7D16" />

            {/* Eye (sleepy/closed) */}
            <path
              d="M 78 46 Q 82 51 86 46"
              stroke="#141310"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Nose */}
            <circle cx="102" cy="45" r="5" fill="#141310" />

            {/* Collar */}
            <rect x="67" y="60" width="26" height="8" rx="2" fill="#141310" />
            {/* Tag */}
            <circle cx="83" cy="70" r="4.5" fill="#3CBAAE" />
          </motion.g>

          {/* Near Back Leg */}
          <motion.line
            x1="38"
            y1="85"
            x2="38"
            y2="105"
            stroke="#EF7D16"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ transformOrigin: '38px 85px', rotate: bLeg1 }}
          />
          {/* Near Front Leg */}
          <motion.line
            x1="70"
            y1="85"
            x2="70"
            y2="105"
            stroke="#EF7D16"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ transformOrigin: '70px 85px', rotate: fLeg1 }}
          />
        </svg>
      </motion.div>

      {/* Butterfly */}
      <motion.div
        className="absolute origin-center"
        style={{
          x: bX,
          y: bY,
          rotate: bRot,
          marginLeft: '-30px', // Center 60px SVG
          marginTop: '-30px',
          width: 60,
          height: 60,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" className="overflow-visible drop-shadow-md">
          {/* Antennas */}
          <path
            d="M30 25 Q 20 10 15 15 M30 25 Q 40 10 45 15"
            stroke="#141310"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Wings */}
          <motion.g style={{ transformOrigin: '30px 30px', scaleX: bWingScale }}>
            {/* Left Wing */}
            <path
              d="M 28 25 C -5 5 -15 45 28 40 Z"
              fill="#EC4E7C"
              stroke="#141310"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="20" r="3" fill="#F2C94C" opacity={0.9} />
            <circle cx="20" cy="35" r="2.5" fill="#F2C94C" opacity={0.9} />

            {/* Right Wing */}
            <path
              d="M 32 25 C 65 5 75 45 32 40 Z"
              fill="#EC4E7C"
              stroke="#141310"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="45" cy="20" r="3" fill="#F2C94C" opacity={0.9} />
            <circle cx="40" cy="35" r="2.5" fill="#F2C94C" opacity={0.9} />
          </motion.g>

          {/* Body */}
          <rect x="28.5" y="20" width="3" height="24" rx="1.5" fill="#141310" />
        </svg>
      </motion.div>
    </div>
  );
}
