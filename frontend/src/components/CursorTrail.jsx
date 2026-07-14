import { useEffect, useRef, useCallback } from 'react';

/**
 * CursorTrail — A futuristic neon cursor trail effect.
 * Renders a canvas overlay that draws glowing particles following the mouse.
 * Automatically disabled on mobile / touch devices.
 */
export const CursorTrail = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const isTouchRef = useRef(false);

  const createParticle = useCallback((x, y) => {
    const hues = [160, 180, 200]; // emerald → cyan → blue
    const hue = hues[Math.floor(Math.random() * hues.length)];
    return {
      x,
      y,
      size: Math.random() * 5 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.5,
      life: 1,
      decay: Math.random() * 0.04 + 0.025,
      hue,
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new particle at cursor
    if (mouseRef.current.x > 0) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
    }

    // Update & draw
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
    particlesRef.current.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.size *= 0.97;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life * p.opacity);
      ctx.shadowBlur = 12;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [createParticle]);

  useEffect(() => {
    // Disable on touch devices
    const checkTouch = () => { isTouchRef.current = true; };
    window.addEventListener('touchstart', checkTouch, { once: true });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      if (isTouchRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', checkTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
