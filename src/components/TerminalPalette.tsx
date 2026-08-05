import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const TerminalPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = '';
    switch (cmd) {
      case 'help':
        output = 'Available commands: whoami, projects, contact, clear';
        break;
      case 'whoami':
        output = 'Anurudh Singh Rajawat — Product-minded Full-Stack Developer & Designer.';
        break;
      case 'projects':
        output = 'Navigate to /dev/work to see projects.';
        break;
      case 'contact':
        output = 'Email: sanurudh938@gmail.com | Phone: +91 73893 82433';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20,19,16,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '640px',
              height: '400px',
              backgroundColor: '#141310',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#9FD463', // hacker green
              fontFamily: 'monospace',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#1C1D1F' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56', cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F' }} />
              <div style={{ marginLeft: '16px', color: '#888', fontSize: '12px' }}>anurudh@portfolio ~ zsh</div>
            </div>

            <div ref={scrollRef} style={{ padding: '16px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: '#F2ECDE' }}>Welcome to Annu's interactive shell. Type 'help' to get started.</div>
              {history.map((h, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#3CBAAE' }}>➜</span>
                    <span style={{ color: '#F2ECDE' }}>~</span>
                    <span style={{ color: '#F2ECDE' }}>{h.command}</span>
                  </div>
                  <div style={{ color: '#9FD463', whiteSpace: 'pre-wrap' }}>{h.output}</div>
                </div>
              ))}
              <form onSubmit={handleCommand} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#3CBAAE' }}>➜</span>
                <span style={{ color: '#F2ECDE' }}>~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#F2ECDE',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }}
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
