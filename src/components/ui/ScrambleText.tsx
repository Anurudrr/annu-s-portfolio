import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  scrambleDuration?: number;
  delay?: number;
  charset?: string;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text = '',
  className = '',
  style = {},
  scrambleDuration = 1200,
  delay = 0,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
}) => {
  const [displayText, setDisplayText] = useState(text || '');
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!text) {
      setDisplayText('');
      return;
    }

    const startScramble = () => {
      startTimeRef.current = window.performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTimeRef.current!;
        const progress = Math.min(elapsed / scrambleDuration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const numCorrectChars = Math.floor(easedProgress * text.length);
        let result = '';

        for (let i = 0; i < text.length; i++) {
          if (i < numCorrectChars) {
            result += text[i];
          } else {
            const randomChar = charset[Math.floor(Math.random() * charset.length)];
            result += randomChar;
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, scrambleDuration, delay, charset]);

  return (
    <span className={className} style={style} aria-label={text}>
      {displayText}
    </span>
  );
};
