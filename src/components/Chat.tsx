import React, { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Mic, MicOff, Trash2, ArrowRight } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'as-dev.assistant.history.v1';

const QUICK_QUESTIONS = [
  "What is Anurudh's dev stack?",
  'Where is he studying?',
  'Are his projects open source?',
  'Is he looking for internships?',
];

function inline(content: string): React.ReactNode[] {
  const tokens = content.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((token, i) => {
    if (/^\*\*[^*]+\*\*$/.test(token)) {
      return (
        <strong key={i} style={{ fontWeight: 900, color: '#141310' }}>
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (/^`[^`]+`$/.test(token)) {
      return (
        <code
          key={i}
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
            fontSize: '0.85em',
            background: 'rgba(20, 19, 16, 0.08)',
            padding: '0.15em 0.4em',
            borderRadius: '6px',
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3CBAAE', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {link[1]}
        </a>
      );
    }
    return <React.Fragment key={i}>{token}</React.Fragment>;
  });
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === '') {
      i += 1;
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }
      const key = `ul-${blocks.length}`;
      blocks.push(
        <ul
          key={key}
          style={{
            margin: '0 0 8px',
            paddingLeft: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {items.map((item, itemI) => (
            <li key={itemI}>{inline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }
    blocks.push(
      <p key={`p-${blocks.length}`} style={{ margin: '0 0 8px' }}>
        {inline(line)}
      </p>
    );
    i += 1;
  }
  return blocks;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : [];
      return parsed.length > 0
        ? parsed
        : [
            {
              role: 'assistant',
              content:
                "I'm AS.AI — Anurudh's personal portfolio assistant. Ask about his skills, projects, education, or contact details.",
            },
          ];
    } catch {
      return [
        {
          role: 'assistant',
          content:
            "I'm AS.AI — Anurudh's personal portfolio assistant. Ask about his skills, projects, education, or contact details.",
        },
      ];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* storage full or unavailable */
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);
    setErrorDetails(null);

    try {
      const history = updatedMessages
        .slice(0, -1)
        .map((m) => ({ role: m.role, text: m.content.slice(0, 500) }))
        .slice(-10);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message.');

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.text || data.reply || 'No reply processed.' },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'The live assistant is offline right now. You can still reach Anurudh directly at sanurudh938@gmail.com or +91 73893 82433.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  const toggleVoice = () => {
    const w = window as unknown as {
      SpeechRecognition?: new () => RecognitionLike;
      webkitSpeechRecognition?: new () => RecognitionLike;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setErrorDetails('Voice input is not supported in this browser.');
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognition: RecognitionLike = new SR();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onresult = (event: RecognitionResultEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(' ');
      setInputValue(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <section
      id="assistant"
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '112px 32px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          marginBottom: '40px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            className="section-kicker section-kicker--light section-indexed"
            data-index="05"
            style={{ marginBottom: 0 }}
          >
            Assistant
          </span>
          <h2
            style={{
              margin: '16px 0 0',
              fontFamily:
                '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: '#F2ECDE',
              letterSpacing: '0',
            }}
          >
            ASK AS.AI
          </h2>
        </div>
        {messages.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setMessages([
                {
                  role: 'assistant',
                  content:
                    "Conversation cleared. Ask me anything about Anurudh's work, skills, or studies.",
                },
              ]);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'transparent',
              border: '1px solid rgba(242, 236, 222, 0.2)',
              borderRadius: '999px',
              color: 'rgba(242, 236, 222, 0.6)',
              fontSize: '11px',
              fontWeight: 800,
              fontFamily: '"General Sans", Inter, sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={13} strokeWidth={2} />
            Clear chat
          </button>
        )}
      </div>

      <div
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(242, 236, 222, 0.14)',
          background: '#EDE5D6',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            background: '#141310',
            borderBottom: '1px solid rgba(242, 236, 222, 0.14)',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '999px',
              background: '#69A65B',
              boxShadow: '0 0 0 3px rgba(105, 166, 91, 0.25)',
            }}
          />
          <span
            style={{
              color: '#F2ECDE',
              fontSize: '13px',
              fontWeight: 900,
              fontFamily: '"General Sans", Inter, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            as.ai — portfolio assistant
          </span>
          {errorDetails && (
            <span
              style={{
                marginLeft: 'auto',
                color: '#EF7B3C',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {errorDetails}
            </span>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            minHeight: '340px',
            maxHeight: '440px',
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={`${msg.role}-${idx}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <span
                  style={{
                    marginBottom: '4px',
                    fontSize: '10px',
                    fontWeight: 900,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(20, 19, 16, 0.45)',
                  }}
                >
                  {isUser ? 'You' : 'AS.AI'}
                </span>
                <div
                  style={{
                    maxWidth: '86%',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: isUser ? '#141310' : '#F2ECDE',
                    color: isUser ? '#F2ECDE' : 'rgba(20, 19, 16, 0.78)',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    border: '1px solid rgba(20, 19, 16, 0.08)',
                  }}
                >
                  {isUser ? msg.content : renderMarkdown(msg.content)}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span
                style={{
                  marginBottom: '4px',
                  fontSize: '10px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(20, 19, 16, 0.45)',
                }}
              >
                AS.AI typing
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: '#F4ECDE',
                  border: '1px solid rgba(20, 19, 16, 0.08)',
                }}
              >
                <span className="typing-dot" />
                <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            padding: '16px 24px 20px',
            borderTop: '1px solid rgba(20, 19, 16, 0.1)',
          }}
        >
          <span
            style={{
              display: 'block',
              marginBottom: '10px',
              color: 'rgba(20, 19, 16, 0.45)',
              fontSize: '10px',
              fontWeight: 900,
              fontFamily: '"General Sans", Inter, sans-serif',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Quick prompts
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSendMessage(question)}
                disabled={isTyping}
                style={{
                  padding: '8px 14px',
                  background: 'transparent',
                  border: '1px solid rgba(20, 19, 16, 0.2)',
                  borderRadius: '999px',
                  color: '#141310',
                  fontSize: '11px',
                  fontWeight: 800,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  opacity: isTyping ? 0.5 : 1,
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#141310';
                  e.currentTarget.style.color = '#F2ECDE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#141310';
                }}
              >
                {question}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              placeholder="Ask about skills, projects, or contact..."
              aria-label="Ask AS.AI a question"
              style={{
                flex: 1,
                minWidth: '0',
                padding: '14px 18px',
                background: '#F4ECDE',
                border: '1px solid rgba(20, 19, 16, 0.2)',
                borderRadius: '999px',
                color: '#141310',
                fontSize: '14px',
                fontFamily: '"General Sans", Inter, sans-serif',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={toggleVoice}
              aria-label={isListening ? 'Stop voice input' : 'Use voice input'}
              title="Voice input"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                flexShrink: 0,
                borderRadius: '999px',
                background: isListening ? '#EF7B3C' : '#141310',
                color: '#F2ECDE',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage(inputValue)}
              disabled={isTyping}
              aria-label="Send message"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: '46px',
                padding: '0 22px',
                flexShrink: 0,
                borderRadius: '999px',
                background: '#3CBAAE',
                color: '#141310',
                border: 'none',
                fontSize: '12px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                opacity: isTyping ? 0.5 : 1,
              }}
            >
              Ask
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal structural typing for the Web Speech API (not in DOM lib).
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop?: () => void;
}

interface RecognitionResultEvent {
  results: ArrayLike<{ 0: { transcript: string }; length: number }>;
}
