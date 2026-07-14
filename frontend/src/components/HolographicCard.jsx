import { motion } from 'framer-motion';
import { useState, useCallback, useMemo, memo, useRef } from 'react';

// Memoized corner accents to prevent re-renders
const CornerAccents = memo(() => (
  <>
    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400/60" />
    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-400/60" />
    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-400/60" />
    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400/60" />
  </>
));

// Memoized scan lines with optimized animations
const ScanLines = memo(() => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-pulse" />
    {Array.from({ length: 3 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        style={{ top: `${25 + i * 25}%` }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
));

export const HolographicCard = memo(({ 
  children, 
  className = '', 
  glowColor = 'emerald',
  disableHover = false,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Memoized glow colors to prevent object recreation
  const glowColors = useMemo(() => ({
    emerald: 'rgba(16, 185, 129, 0.3)',
    cyan: 'rgba(6, 182, 212, 0.3)',
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(147, 51, 234, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
  }), []);

  // 3D Tilt + mouse glow handler
  const handleMouseMove = useCallback((e) => {
    if (disableHover || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition(prev => {
      if (Math.abs(prev.x - x) > 3 || Math.abs(prev.y - y) > 3) {
        return { x, y };
      }
      return prev;
    });

    // Compute 3D tilt — max ±8 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  }, [disableHover]);

  const handleMouseEnter = useCallback(() => {
    if (!disableHover) setIsHovered(true);
  }, [disableHover]);

  const handleMouseLeave = useCallback(() => {
    if (!disableHover) {
      setIsHovered(false);
      setTilt({ rotateX: 0, rotateY: 0 });
    }
  }, [disableHover]);

  // Memoized glow style
  const glowStyle = useMemo(() => ({
    width: '220px',
    height: '220px',
    left: mousePosition.x - 110,
    top: mousePosition.y - 110,
    background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
  }), [mousePosition.x, mousePosition.y, glowColors, glowColor]);

  const cardStyle = useMemo(() => ({
    transform: isHovered && !disableHover
      ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(4px)`
      : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)',
    transition: isHovered
      ? 'transform 0.1s ease-out'
      : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  }), [isHovered, tilt, disableHover]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl holo-shimmer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      {...props}
    >
      {/* Holographic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl" />
      
      {/* Border glow — pulses on hover */}
      <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
        isHovered
          ? 'border-emerald-400/50 shadow-[0_0_25px_rgba(0,255,136,0.2),inset_0_0_25px_rgba(0,255,136,0.04)]'
          : 'border-emerald-500/20 shadow-lg shadow-emerald-500/10'
      }`} />
      
      {/* Mouse follow glow */}
      {isHovered && !disableHover && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-2xl"
          style={glowStyle}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      )}
      
      {/* Scan lines */}
      <ScanLines />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      <CornerAccents />
    </div>
  );
});