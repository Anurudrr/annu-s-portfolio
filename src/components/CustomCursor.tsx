import { useState, useRef, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isBig, setIsBig] = useState(false);
  const [hideCursor, setHideCursor] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);

  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect mobile touch capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setCursorEnabled(false);
      return;
    }

    setHideCursor(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnterInteractive = () => setIsBig(true);
    const handleMouseLeaveInteractive = () => setIsBig(false);

    const attachListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], .cursor-pointer, input, select")
        .forEach((el) => {
          el.addEventListener('mouseenter', handleMouseEnterInteractive);
          el.addEventListener('mouseleave', handleMouseLeaveInteractive);
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    attachListeners();

    // Re-attach triggers because React pages re-render components inside state
    const mutationObserver = new MutationObserver(() => {
      attachListeners();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Custom tick animation loop for smooth ring lag physics
    const updateRingPosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      const currentX = ringRef.current.x;
      const currentY = ringRef.current.y;

      // Elastic coefficient easing (0.12 lag fraction)
      const nextX = currentX + (targetX - currentX) * 0.12;
      const nextY = currentY + (targetY - currentY) * 0.12;

      ringRef.current = { x: nextX, y: nextY };
      setRingPosition({ x: nextX, y: nextY });

      requestRef.current = requestAnimationFrame(updateRingPosition);
    };

    requestRef.current = requestAnimationFrame(updateRingPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      mutationObserver.disconnect();
    };
  }, []);

  if (!cursorEnabled || hideCursor) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed w-3.5 h-3.5 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Outer elastic Ring */}
      <div
        className="fixed rounded-full border-2 border-black pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          width: isBig ? '54px' : '36px',
          height: isBig ? '54px' : '36px',
        }}
      />

      {/* Manual toggle button in bottom left corner - Professional Touch */}
      <button
        onClick={() => setCursorEnabled(false)}
        className="fixed bottom-4 left-4 z-[5000] font-mono text-[8px] tracking-widest font-extrabold text-black/45 hover:text-black uppercase cursor-pointer"
        title="Disable Custom Cursor"
      >
        [System-Cursor]
      </button>
    </>
  );
}
