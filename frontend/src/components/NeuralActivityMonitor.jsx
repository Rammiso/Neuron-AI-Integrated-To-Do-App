import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Zap, Wifi } from 'lucide-react';

/**
 * NeuralActivityMonitor
 * A compact real-time signal visualizer used in the Topbar.
 * Shows animated "EEG-style" bars, latency, and uptime metrics.
 */
export const NeuralActivityMonitor = memo(() => {
  const [bars, setBars] = useState(() => Array.from({ length: 20 }, () => Math.random()));
  const [latency, setLatency] = useState(12);
  const [uptime, setUptime] = useState(99.9);
  const rafRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame++;
      if (frame % 4 === 0) {
        setBars(prev => {
          const next = [...prev];
          // Shift left + add new bar on right
          next.shift();
          next.push(Math.random() * 0.7 + 0.1);
          return next;
        });
      }
      if (frame % 60 === 0) {
        setLatency(Math.floor(Math.random() * 8 + 8));
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 bg-gray-900/60 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
      {/* Signal bars */}
      <div className="flex items-end gap-0.5 h-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-75"
            style={{
              height: `${h * 100}%`,
              background: h > 0.6
                ? `rgba(16, 185, 129, ${0.5 + h * 0.5})`
                : h > 0.3
                  ? `rgba(6, 182, 212, ${0.4 + h * 0.5})`
                  : `rgba(99, 102, 241, ${0.3 + h * 0.4})`,
              boxShadow: h > 0.7 ? `0 0 4px rgba(16,185,129,0.6)` : 'none',
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-emerald-500/20" />

      {/* Latency */}
      <div className="flex items-center gap-1.5">
        <Wifi className="w-3 h-3 text-emerald-400" />
        <span className="text-xs font-mono text-emerald-400">{latency}ms</span>
      </div>

      {/* Uptime */}
      <div className="flex items-center gap-1.5">
        <Activity className="w-3 h-3 text-cyan-400" />
        <span className="text-xs font-mono text-cyan-400">{uptime}%</span>
      </div>

      {/* Neural badge */}
      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
        <motion.div
          className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs font-mono text-emerald-400 tracking-wider">LIVE</span>
      </div>
    </div>
  );
});

NeuralActivityMonitor.displayName = 'NeuralActivityMonitor';


/**
 * MiniSparkline — An inline mini chart for stat cards.
 * @param {number[]} data - Array of 0–1 values
 * @param {string} color - Tailwind-compatible hex/rgba color
 */
export const MiniSparkline = memo(({ data = [], color = '#10b981', height = 32 }) => {
  const svgRef = useRef(null);
  const width = 80;

  if (!data.length) return null;

  const max = Math.max(...data, 0.01);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sparkGrad-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={areaPoints}
        fill={`url(#sparkGrad-${color.replace(/[^a-z0-9]/gi, '')})`}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
      {/* Last point dot */}
      {data.length > 0 && (() => {
        const lastX = width;
        const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
        return (
          <circle
            cx={lastX}
            cy={lastY}
            r="2.5"
            fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        );
      })()}
    </svg>
  );
});

MiniSparkline.displayName = 'MiniSparkline';
