import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, StepForward, RefreshCcw, Pause } from 'lucide-react';

interface BinaryStep {
  left: number;
  right: number;
  mid: number;
  found: boolean;
  message: string;
}

const SORTED_ARRAY = [2, 5, 8, 12, 17, 21, 26, 31, 38, 44, 50, 57, 63];

function buildSteps(array: number[], target: number): BinaryStep[] {
  const steps: BinaryStep[] = [];
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = array[mid];
    if (value === target) {
      steps.push({
        left,
        right,
        mid,
        found: true,
        message: `Found ${target} at index ${mid}.`,
      });
      return steps;
    }
    steps.push({
      left,
      right,
      mid,
      found: false,
      message:
        value < target
          ? `${value} < ${target} — discard the left half.`
          : `${value} > ${target} — discard the right half.`,
    });
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  steps.push({
    left,
    right,
    mid: -1,
    found: false,
    message: `${target} is not in the array (search space exhausted).`,
  });
  return steps;
}

export default function AlgoPlayground() {
  const [target, setTarget] = useState(12);
  const [steps, setSteps] = useState<BinaryStep[]>(() => buildSteps(SORTED_ARRAY, 12));
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSteps(buildSteps(SORTED_ARRAY, target));
    setCurrent(0);
    setPlaying(false);
  }, [target]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setCurrent((c) => {
        if (c >= steps.length - 1) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 1100);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, steps.length]);

  const step = steps[Math.min(current, steps.length - 1)];
  const activeBar = (index: number) => {
    if (index === step?.mid) return step.found ? '#9FD463' : '#F2C94C';
    if (index >= step?.left && index <= step?.right) return '#3CBAAE';
    return 'rgba(242, 236, 222, 0.18)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(242, 236, 222, 0.5)',
            fontFamily: '"General Sans", Inter, sans-serif',
          }}
        >
          Target
        </span>
        <select
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value, 10))}
          aria-label="Pick the number to search"
          style={{
            padding: '9px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(242, 236, 222, 0.25)',
            fontSize: '13px',
            fontWeight: 700,
            color: '#F2ECDE',
            background: '#fff',
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            cursor: 'pointer',
          }}
        >
          {SORTED_ARRAY.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value={99}>99 (absent)</option>
        </select>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          {[
            {
              label: 'play',
              icon: playing ? <Pause size={14} /> : <Play size={14} />,
              onClick: () => setPlaying((p) => !p),
            },
            {
              label: 'step',
              icon: <StepForward size={14} />,
              onClick: () => {
                setPlaying(false);
                setCurrent((c) => Math.min(c + 1, steps.length - 1));
              },
            },
            {
              label: 'reset',
              icon: <RefreshCcw size={14} />,
              onClick: () => {
                setPlaying(false);
                setCurrent(0);
              },
            },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              aria-label={btn.label}
              onClick={btn.onClick}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(242, 236, 222, 0.25)',
                background: '#F2ECDE',
                color: '#F2ECDE',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3CBAAE';
                e.currentTarget.style.color = '#F2ECDE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F2ECDE';
                e.currentTarget.style.color = '#F2ECDE';
              }}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '6px',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          minHeight: '76px',
        }}
      >
        {SORTED_ARRAY.map((value, index) => (
          <motion.div
            key={index}
            animate={{ height: 20 + value }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{
              width: '22px',
              height: 20 + value,
              borderRadius: '6px 6px 0 0',
              background: activeBar(index),
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '4px',
              fontSize: '10px',
              fontWeight: 800,
              color:
                activeBar(index) === 'rgba(242, 236, 222, 0.18)' ? 'rgba(20,19,16,0.55)' : '#F2ECDE',
              fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            {value}
          </motion.div>
        ))}
      </div>

      <div style={{ minHeight: '84px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                borderRadius: '12px',
                background: step?.found ? 'rgba(159, 212, 99, 0.18)' : 'rgba(60, 186, 174, 0.12)',
                border: `1px solid ${step?.found ? '#9FD463' : '#3CBAAE'}`,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: '#F2ECDE',
                  color: '#F2ECDE',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                {step ? `L${step.left}·R${step.right}` : '·'}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: 'rgba(242, 236, 222, 0.75)',
                  fontFamily: '"General Sans", Inter, sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {step?.message}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {steps.map((_, i) => (
            <span
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === current ? '#F2ECDE' : 'rgba(242, 236, 222, 0.2)',
                transition: 'background 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
