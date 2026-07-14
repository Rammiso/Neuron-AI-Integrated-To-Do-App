import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

/**
 * GlitchText — Renders text with a futuristic glitch + typewriter animation.
 * @param {string} text - The text to display
 * @param {string} className - Additional CSS classes
 * @param {boolean} enableGlitch - Whether to enable random glitch bursts
 * @param {number} typingSpeed - Typing speed in ms per character
 */
export const GlitchText = memo(({ 
  text, 
  className = '', 
  enableGlitch = true,
  typingSpeed = 60,
  as: Tag = 'span',
}) => {
  const [displayed, setDisplayed] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchChar, setGlitchChar] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const GLITCH_CHARS = '!@#$%^&*<>/?\\|{}[]01ΩΔΨ∇⊕⊗⊙';

  // Typewriter effect
  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timerRef.current = setTimeout(type, typingSpeed);
      }
    };

    timerRef.current = setTimeout(type, 300);
    return () => clearTimeout(timerRef.current);
  }, [text, typingSpeed]);

  // Random glitch bursts
  useEffect(() => {
    if (!enableGlitch) return;

    const scheduleGlitch = () => {
      const delay = Math.random() * 6000 + 3000;
      return setTimeout(() => {
        setIsGlitching(true);
        
        // Rapid glitch chars
        let count = 0;
        const glitchInterval = setInterval(() => {
          setGlitchChar(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
          count++;
          if (count > 8) {
            clearInterval(glitchInterval);
            setIsGlitching(false);
            setGlitchChar('');
          }
        }, 40);

        scheduleGlitch(); // Schedule next glitch
      }, delay);
    };

    const t = scheduleGlitch();
    return () => clearTimeout(t);
  }, [enableGlitch]);

  return (
    <Tag
      className={`relative inline-block ${className}`}
      data-text={text}
      aria-label={text}
    >
      {/* Main text */}
      <span className="relative z-10">
        {displayed}
        {/* Cursor blink */}
        {displayed.length < text.length && (
          <motion.span
            className="inline-block w-0.5 h-[0.85em] bg-emerald-400 ml-0.5 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        )}
        {/* Glitch char overlay */}
        {isGlitching && (
          <span className="absolute -right-2 top-0 text-cyan-300 font-mono opacity-80">
            {glitchChar}
          </span>
        )}
      </span>

      {/* Glitch layers — CSS-driven RGB shift */}
      {enableGlitch && displayed.length === text.length && (
        <>
          <span
            className="absolute inset-0 text-red-400/40 select-none pointer-events-none"
            style={{
              clipPath: isGlitching ? 'inset(30% 0 50% 0)' : 'inset(50% 0 50% 0)',
              transform: isGlitching ? 'translate(-2px, 0)' : 'none',
              transition: 'all 0.04s',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-cyan-400/40 select-none pointer-events-none"
            style={{
              clipPath: isGlitching ? 'inset(60% 0 20% 0)' : 'inset(50% 0 50% 0)',
              transform: isGlitching ? 'translate(2px, 0)' : 'none',
              transition: 'all 0.04s',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
});

GlitchText.displayName = 'GlitchText';


/**
 * TerminalText — Renders text as if being typed into a terminal.
 */
export const TerminalText = memo(({ 
  lines = [], 
  className = '',
  lineDelay = 800,
}) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    
    const line = lines[currentLine];
    
    if (currentChar <= line.text.length) {
      const t = setTimeout(() => {
        if (currentChar === 0) {
          setVisibleLines(prev => [...prev, { ...line, partial: '' }]);
        } else {
          setVisibleLines(prev => {
            const updated = [...prev];
            updated[currentLine] = { ...line, partial: line.text.slice(0, currentChar) };
            return updated;
          });
        }
        setCurrentChar(c => c + 1);
      }, currentChar === 0 ? lineDelay : 35);
      
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, lineDelay]);

  return (
    <div className={`font-mono text-sm space-y-1 ${className}`}>
      {visibleLines.map((line, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-emerald-400 flex-shrink-0">{line.prefix || '>'}</span>
          <span style={{ color: line.color || '#94a3b8' }}>
            {line.partial ?? line.text}
            {i === visibleLines.length - 1 && (currentLine < lines.length) && (
              <motion.span
                className="inline-block w-2 h-[1em] bg-emerald-400 ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  );
});

TerminalText.displayName = 'TerminalText';
