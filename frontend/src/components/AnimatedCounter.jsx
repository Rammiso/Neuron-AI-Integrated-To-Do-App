import { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedCounter — Counts up from 0 to `value` with an easing curve
 * when the element scrolls into view. Supports suffix (%, K+, etc).
 */
export const AnimatedCounter = memo(({ value, suffix = '', duration = 2000, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef(null);

  // Parse numeric value from strings like "10K+", "99.9%"
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ''));
  const strValue = String(value);

  useEffect(() => {
    if (!isInView) return;

    startRef.current = null;
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayed(eased * numericValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numericValue, duration]);

  // Format: keep original format for values like "10K+" or "99.9%"
  const formatDisplayed = () => {
    if (strValue.includes('K')) {
      return `${Math.floor(displayed)}K+`;
    }
    if (strValue.includes('.')) {
      return displayed.toFixed(1);
    }
    if (strValue.includes('s')) {
      return `${displayed.toFixed(1)}s`;
    }
    return Math.floor(displayed).toString();
  };

  return (
    <span ref={ref} className={className}>
      {formatDisplayed()}{suffix}
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';


/**
 * LiveTicker — A horizontally scrolling marquee of live "system" stats,
 * great for a futuristic dashboard feel.
 */
export const LiveTicker = memo(({ items = [] }) => {
  return (
    <div className="overflow-hidden border-y border-emerald-500/15 bg-black/20 backdrop-blur-sm py-2">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-mono text-emerald-400/70">
            <span className="text-emerald-400/40">◆</span>
            <span className="text-emerald-400/60">{item.label}:</span>
            <span className="text-emerald-300">{item.value}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
});

LiveTicker.displayName = 'LiveTicker';


/**
 * FloatingDataNode — A single floating card of data, used in the hero section
 * to show productivity stats floating around the orb.
 */
export const FloatingDataNode = memo(({ 
  icon: Icon, 
  label, 
  value, 
  color = 'emerald',
  style = {},
  delay = 0
}) => {
  const colorMap = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    cyan:    { border: 'border-cyan-500/30',    bg: 'bg-cyan-500/10',    text: 'text-cyan-400',    glow: 'shadow-cyan-500/20' },
    purple:  { border: 'border-purple-500/30',  bg: 'bg-purple-500/10',  text: 'text-purple-400',  glow: 'shadow-purple-500/20' },
    yellow:  { border: 'border-yellow-500/30',  bg: 'bg-yellow-500/10',  text: 'text-yellow-400',  glow: 'shadow-yellow-500/20' },
  };

  const c = colorMap[color] || colorMap.emerald;

  return (
    <motion.div
      className={`absolute glass ${c.border} rounded-xl px-4 py-3 backdrop-blur-xl shadow-lg ${c.glow} pointer-events-none`}
      style={style}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: { delay: delay + 0.6, duration: 3 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 ${c.bg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${c.text}`} />
        </div>
        <div>
          <div className={`text-xs font-mono font-bold ${c.text}`}>{value}</div>
          <div className="text-xs text-gray-500 font-mono">{label}</div>
        </div>
      </div>
    </motion.div>
  );
});

FloatingDataNode.displayName = 'FloatingDataNode';
