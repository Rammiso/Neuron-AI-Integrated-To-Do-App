import { useEffect, useRef, memo } from 'react';

/**
 * NeuralOrb — An interactive WebGL-like orb drawn on canvas that pulses,
 * rotates inner rings, and reacts to mouse position with a parallax offset.
 * Purely canvas—no WebGL dependency.
 */
export const NeuralOrb = memo(({ size = 400, className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    const draw = (ts) => {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, size, size);

      // Parallax offset from mouse
      const px = (mx - 0.5) * 20;
      const py = (my - 0.5) * 20;

      // ── Outer glow ──────────────────────────────────────────────
      const outerGlow = ctx.createRadialGradient(
        cx + px * 0.3, cy + py * 0.3, size * 0.15,
        cx + px * 0.3, cy + py * 0.3, size * 0.48
      );
      outerGlow.addColorStop(0, `rgba(0, 255, 136, ${0.08 + Math.sin(t * 0.8) * 0.03})`);
      outerGlow.addColorStop(0.5, `rgba(6, 182, 212, ${0.04 + Math.sin(t * 0.6) * 0.02})`);
      outerGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx + px * 0.3, cy + py * 0.3, size * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // ── Rotating rings ──────────────────────────────────────────
      const rings = [
        { r: size * 0.42, speed: 0.15, color: 'rgba(0,255,136,0.15)', dash: [6, 14], width: 1 },
        { r: size * 0.35, speed: -0.22, color: 'rgba(6,182,212,0.2)', dash: [4, 10], width: 1.5 },
        { r: size * 0.27, speed: 0.35, color: 'rgba(99,102,241,0.2)', dash: [3, 8], width: 1 },
        { r: size * 0.18, speed: -0.5, color: 'rgba(0,255,136,0.3)', dash: [2, 6], width: 2 },
      ];

      rings.forEach(({ r, speed, color, dash, width }) => {
        ctx.save();
        ctx.translate(cx + px * 0.15, cy + py * 0.15);
        ctx.rotate(t * speed);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ── Orbiting dots on rings ───────────────────────────────────
      const orbitDots = [
        { r: size * 0.42, speed: 0.3, dotR: 3, color: '#00ff88' },
        { r: size * 0.35, speed: -0.45, dotR: 2.5, color: '#06b6d4' },
        { r: size * 0.27, speed: 0.7, dotR: 2, color: '#818cf8' },
        { r: size * 0.42, speed: 0.3, dotR: 2, color: '#00ff88', offset: Math.PI },
        { r: size * 0.35, speed: -0.45, dotR: 2, color: '#06b6d4', offset: Math.PI * 0.7 },
      ];

      orbitDots.forEach(({ r, speed, dotR, color, offset = 0 }) => {
        const angle = t * speed + offset;
        const dx = cx + px * 0.15 + Math.cos(angle) * r;
        const dy = cy + py * 0.15 + Math.sin(angle) * r;

        // Glow
        const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, dotR * 4);
        glow.addColorStop(0, color.replace(')', ', 0.8)').replace('rgb', 'rgba').replace('#', 'rgba(').replace('rgba(', color.startsWith('#') ? 'rgba(' : 'rgba('));
        glow.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.save();
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(dx, dy, dotR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Core sphere ──────────────────────────────────────────────
      const pulse = 1 + Math.sin(t * 1.2) * 0.04;
      const coreR = size * 0.13 * pulse;

      const coreGrad = ctx.createRadialGradient(
        cx + px * 0.05 - coreR * 0.3, cy + py * 0.05 - coreR * 0.3, 0,
        cx + px * 0.05, cy + py * 0.05, coreR
      );
      coreGrad.addColorStop(0, 'rgba(200, 255, 240, 0.9)');
      coreGrad.addColorStop(0.3, 'rgba(0, 255, 136, 0.7)');
      coreGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.5)');
      coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0.2)');

      ctx.save();
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx + px * 0.05, cy + py * 0.05, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Core inner highlight ────────────────────────────────────
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.beginPath();
      ctx.arc(
        cx + px * 0.05 - coreR * 0.25,
        cy + py * 0.05 - coreR * 0.25,
        coreR * 0.25,
        0, Math.PI * 2
      );
      ctx.fill();
      ctx.restore();

      // ── Data stream lines radiating from core ────────────────────
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2 + t * 0.2;
        const startR = coreR * 1.1;
        const endR = size * 0.38 + Math.sin(t * 2 + i) * 10;
        const alpha = (Math.sin(t * 1.5 + i * 0.8) * 0.5 + 0.5) * 0.15;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(
          cx + px * 0.05 + Math.cos(angle) * startR,
          cy + py * 0.05 + Math.sin(angle) * startR
        );
        ctx.lineTo(
          cx + px * 0.15 + Math.cos(angle) * endR,
          cy + py * 0.15 + Math.sin(angle) * endR
        );
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
});

NeuralOrb.displayName = 'NeuralOrb';
