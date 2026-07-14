import { useEffect, useRef, memo } from 'react';

/**
 * MatrixRain — A canvas-based falling-character rain effect.
 * Uses katakana, digits, and Latin chars. Very subtle opacity so it
 * feels like ambient atmosphere, not distraction.
 */
export const MatrixRain = memo(({ opacity = 0.12, speed = 1 }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const FONT_SIZE = 14;

    // Katakana + some Latin
    const CHARS =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    let cols, drops;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      drops = new Array(cols).fill(1);
    };

    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const draw = () => {
      frame++;
      // Only re-draw every N frames to control speed
      if (frame % Math.max(1, Math.round(3 / speed)) !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Fade out existing content
      ctx.fillStyle = `rgba(5, 10, 10, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Head char — bright
        if (drops[i] * FONT_SIZE < canvas.height * 0.1 + Math.random() * canvas.height * 0.9) {
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 2})`;
        } else {
          ctx.fillStyle = `rgba(0, 180, 100, ${opacity})`;
        }

        ctx.fillText(char, x, y);

        // Reset column when it goes off-screen (randomly)
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    />
  );
});

MatrixRain.displayName = 'MatrixRain';
