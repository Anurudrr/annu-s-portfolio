import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Audio utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create audio context', () => {
    const audioCtx = new AudioContext();
    expect(audioCtx).toBeDefined();
    expect(audioCtx.createOscillator).toBeDefined();
    expect(audioCtx.createGain).toBeDefined();
  });

  it('should create oscillator and gain node', () => {
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    expect(osc.connect).toBeDefined();
    expect(osc.start).toBeDefined();
    expect(osc.stop).toBeDefined();
    expect(gainNode.connect).toBeDefined();
    expect(gainNode.gain.setValueAtTime).toBeDefined();
  });
});

describe('Utility functions', () => {
  it('should format time correctly', () => {
    const formatTime = (ts: string) => {
      const date = new Date(parseInt(ts, 10) * 1000);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    // Test with a known timestamp (Jan 1, 2024 12:00:00 UTC)
    const result = formatTime('1704110400');
    expect(result).toContain('Jan');
    expect(result).toContain('1');
  });

  it('should calculate IST time offset correctly', () => {
    const utc = new Date('2024-01-01T12:00:00Z').getTime();
    const utcOffset = new Date().getTimezoneOffset() * 60000;
    const istTime = new Date(utc + utcOffset + 3600000 * 5.5);

    // IST is UTC+5:30
    expect(istTime.getHours()).toBe(17); // 12:00 UTC + 5:30 = 17:30 IST
    expect(istTime.getMinutes()).toBe(30);
  });
});

describe('Type definitions', () => {
  it('should have correct ProjectItem structure', () => {
    const project = {
      id: 'p1',
      pNo: '01',
      slug: 'test-project',
      year: '2024',
      category: 'Full Stack',
      title: 'Test Project',
      description: 'A test project',
      technologies: ['React', 'TypeScript'],
      githubUrl: 'https://github.com/test',
      demoUrl: 'https://demo.test',
    };

    expect(project.id).toBe('p1');
    expect(project.technologies).toContain('React');
    expect(project.githubUrl).toBeDefined();
  });

  it('should have correct BlogItem structure', () => {
    const blog = {
      id: 'b1',
      slug: 'test-post',
      title: 'Test Post',
      date: 'Jan 2024',
      author: 'Test Author',
      category: 'Engineering',
      tags: ['React', 'Testing'],
      readingTime: '5 min read',
      summary: 'Test summary',
      content: 'Test content',
    };

    expect(blog.slug).toBe('test-post');
    expect(blog.tags).toContain('React');
  });

  it('should have correct HobbyItem structure', () => {
    const hobby = {
      id: 'h1',
      icon: '🎨',
      title: 'Design',
      category: 'Creative',
      description: 'Design hobby',
      accent: 'bg-[#F5C800]',
      funFact: 'Fun fact',
    };

    expect(hobby.icon).toBe('🎨');
    expect(hobby.accent).toContain('bg-[#F5C800]');
  });
});
