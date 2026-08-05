import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Briefcase,
  User,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  FileText,
  CornerDownLeft,
  Search,
  Activity,
  Palette,
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  resumeUrl?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ resumeUrl = '/resume.html' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => {
      navigate(path);
      setOpen(false);
      setQuery('');
    };
    const external = (url: string) => () => {
      window.open(url, '_blank', 'noopener noreferrer');
      setOpen(false);
      setQuery('');
    };

    return [
      { id: 'home', label: 'Go to Home', hint: '/', icon: <Home size={16} />, action: go('/') },
      {
        id: 'dev',
        label: 'Dev Portfolio',
        hint: '/dev',
        icon: <Home size={16} />,
        action: go('/dev'),
      },
      {
        id: 'work',
        label: 'View Work',
        hint: '/dev/work',
        icon: <Briefcase size={16} />,
        action: go('/dev/work'),
      },
      {
        id: 'about',
        label: 'About Me',
        hint: '/dev/about',
        icon: <User size={16} />,
        action: go('/dev/about'),
      },
      {
        id: 'blog',
        label: 'Read Blog',
        hint: '/dev/blog',
        icon: <BookOpen size={16} />,
        action: go('/dev/blog'),
      },
      {
        id: 'contact',
        label: 'Contact',
        hint: '/dev/contact',
        icon: <Mail size={16} />,
        action: go('/dev/contact'),
      },
      {
        id: 'resume',
        label: 'Download CV',
        hint: 'resume.html',
        icon: <FileText size={16} />,
        action: external(resumeUrl),
      },
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'github.com',
        icon: <Github size={16} />,
        action: external('https://github.com/Anurudrr'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'linkedin.com',
        icon: <Linkedin size={16} />,
        action: external('https://www.linkedin.com/in/anurudh-singh-251067307/'),
      },
      {
        id: 'leetcode',
        label: 'Open LeetCode',
        hint: 'leetcode.com',
        icon: <Sparkles size={16} />,
        action: external('https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/'),
      },
      {
        id: 'email',
        label: 'Send Email',
        hint: 'mailto',
        icon: <Mail size={16} />,
        action: external('mailto:sanurudh938@gmail.com'),
      },
      {
        id: 'accent',
        label: 'Switch Accent',
        hint: 'theme',
        icon: <Palette size={16} />,
        action: () => {
          const ids = ['teal', 'solar', 'mint', 'rose', 'violet'];
          let current = 'teal';
          try {
            current = window.localStorage.getItem('as.accent') || 'teal';
          } catch {
            // storage unavailable
          }
          if (!ids.includes(current)) current = 'teal';
          const next = ids[(ids.indexOf(current) + 1) % ids.length];
          document.documentElement.setAttribute('data-accent', next);
          try {
            window.localStorage.setItem('as.accent', next);
          } catch {
            // storage unavailable
          }
          setOpen(false);
          setQuery('');
        },
      },
      {
        id: 'status',
        label: 'Systems Status',
        hint: '/dev/status',
        icon: <Activity size={16} />,
        action: go('/dev/status'),
      },
    ];
  }, [navigate, resumeUrl]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.action();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(20, 19, 16, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 'min(16vh, 120px) 16px 16px',
          }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              width: 'min(560px, 100%)',
              background: '#141310',
              border: '1px solid rgba(242, 236, 222, 0.16)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(4, 4, 3, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(242, 236, 222, 0.1)',
              }}
            >
              <Search size={18} strokeWidth={2} style={{ color: 'rgba(242, 236, 222, 0.5)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or page name…"
                aria-label="Search commands"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#F2ECDE',
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              />
              <kbd
                style={{
                  padding: '4px 8px',
                  border: '1px solid rgba(242, 236, 222, 0.2)',
                  borderRadius: '6px',
                  color: 'rgba(242, 236, 222, 0.5)',
                  fontSize: '10px',
                  fontWeight: 800,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                Esc
              </kbd>
            </div>

            <div style={{ maxHeight: 'min(360px, 55vh)', overflowY: 'auto', padding: '8px' }}>
              {filtered.length === 0 && (
                <p
                  style={{
                    padding: '28px 16px',
                    margin: 0,
                    textAlign: 'center',
                    color: 'rgba(242, 236, 222, 0.45)',
                    fontSize: '13px',
                    fontFamily: '"General Sans", Inter, sans-serif',
                  }}
                >
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((command, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={command.id}
                    type="button"
                    onClick={command.action}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: 'none',
                      background: active ? 'rgba(60, 186, 174, 0.12)' : 'transparent',
                      color: active ? '#3CBAAE' : '#F2ECDE',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ display: 'inline-flex', opacity: 0.7 }}>{command.icon}</span>
                    <span style={{ flex: 1 }}>{command.label}</span>
                    {active ? (
                      <CornerDownLeft size={14} strokeWidth={2} style={{ opacity: 0.7 }} />
                    ) : (
                      <span
                        style={{
                          color: 'rgba(242, 236, 222, 0.35)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {command.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
