/**
 * FilterHeroCanvas — Full-screen canvas animation for the dark version hero.
 * Design: Paint overspray particles drift downward and coat a fiberglass filter texture.
 * Cycle: DIRTY phase (particles accumulate, filter gets coated) → CLEAN phase (particles fade, filter clears).
 * Seamlessly loops. Runs entirely on CPU canvas — no WebGL dependency needed.
 */

import { useEffect, useRef } from 'react';

// ── Tuneable constants ────────────────────────────────────────────────────────
const PARTICLE_COUNT = 500;        // active overspray particles at once
const FIBER_COUNT    = 220;        // fiberglass fiber strands drawn in background
const DIRTY_DURATION = 5000;       // ms in dirty phase (accumulating)
const CLEAN_DURATION = 2500;       // ms in clean phase (clearing)
const FADE_DURATION  = 2000;       // ms for phase transition fade
const TOTAL_CYCLE    = DIRTY_DURATION + CLEAN_DURATION + FADE_DURATION * 2;

// Overspray color palette — automotive paint mist colors
const SPRAY_COLORS = [
  'rgba(180,210,255,',   // metallic blue mist
  'rgba(255,220,160,',   // amber/gold overspray
  'rgba(200,230,200,',   // silver-green mist
  'rgba(255,255,255,',   // white clearcoat
  'rgba(160,200,255,',   // light blue metallic
  'rgba(240,200,140,',   // warm gold
];

// Fiberglass fiber colors
const FIBER_COLORS = [
  '#3a7a4a',  // green fiberglass
  '#4a8a5a',
  '#2d6a3a',
  '#5a9a6a',
  '#c8a84b',  // yellow fiberglass
  '#d4b455',
  '#b89a3a',
  '#e0c060',
  '#7ab8d4',  // blue fiberglass
  '#6aaac8',
  '#5a9ab8',
  '#8ac4e0',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  settled: boolean;
  settleY: number;
  blur: number;
}

interface Fiber {
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  width: number;
  alpha: number;
}

interface CoatLayer {
  x: number;
  y: number;
  r: number;
  color: string;
  alpha: number;
}

export default function FilterHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize handler ────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Seed fibers ───────────────────────────────────────────────────────────
    const fibers: Fiber[] = [];
    for (let i = 0; i < FIBER_COUNT; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI;
      const len   = 40 + Math.random() * 120;
      fibers.push({
        x1, y1,
        x2: x1 + Math.cos(angle) * len,
        y2: y1 + Math.sin(angle) * len,
        color: FIBER_COLORS[Math.floor(Math.random() * FIBER_COLORS.length)],
        width: 0.5 + Math.random() * 1.8,
        alpha: 0.15 + Math.random() * 0.35,
      });
    }

    // ── Seed particles ────────────────────────────────────────────────────────
    const particles: Particle[] = [];
    const spawnParticle = () => {
      const maxLife = 2000 + Math.random() * 3500;
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.6 + Math.random() * 1.8,
        r: 2 + Math.random() * 6,
        color: SPRAY_COLORS[Math.floor(Math.random() * SPRAY_COLORS.length)],
        alpha: 0.55 + Math.random() * 0.4,
        life: 0,
        maxLife,
        settled: false,
        settleY: canvas.height * (0.3 + Math.random() * 0.65),
        blur: Math.random() < 0.4 ? 1 + Math.random() * 3 : 0,
      });
    };

    // Pre-populate
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      spawnParticle();
      // Spread initial positions vertically
      particles[i].y = Math.random() * canvas.height;
      particles[i].life = Math.random() * particles[i].maxLife * 0.5;
    }

    // ── Coat layer (accumulated overspray on filter surface) ──────────────────
    const coatLayers: CoatLayer[] = [];
    const addCoat = (x: number, y: number, color: string) => {
      coatLayers.push({ x, y, r: 2 + Math.random() * 6, color, alpha: 0.12 + Math.random() * 0.18 });
      if (coatLayers.length > 600) coatLayers.shift();
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    let startTime = performance.now();
    let lastSpawn = 0;

    const draw = (now: number) => {
      animRef.current = requestAnimationFrame(draw);

      const elapsed = (now - startTime) % TOTAL_CYCLE;
      const W = canvas.width;
      const H = canvas.height;

      // Determine phase and coat opacity
      let coatOpacity = 0;
      let spawnRate = 0; // particles per ms

      if (elapsed < DIRTY_DURATION) {
        // Dirty phase — accumulating
        const t = elapsed / DIRTY_DURATION;
        coatOpacity = t;
        spawnRate = 0.12;
      } else if (elapsed < DIRTY_DURATION + FADE_DURATION) {
        // Transition: dirty → clean
        const t = (elapsed - DIRTY_DURATION) / FADE_DURATION;
        coatOpacity = 1 - t;
        spawnRate = 0.06 * (1 - t);
      } else if (elapsed < DIRTY_DURATION + FADE_DURATION + CLEAN_DURATION) {
        // Clean phase
        coatOpacity = 0;
        spawnRate = 0;
      } else {
        // Transition: clean → dirty
        const t = (elapsed - DIRTY_DURATION - FADE_DURATION - CLEAN_DURATION) / FADE_DURATION;
        coatOpacity = t * 0.3;
        spawnRate = 0.08 * t;
      }

      // ── Clear ──────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      // ── Background gradient ────────────────────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#050810');
      bg.addColorStop(0.5, '#080c18');
      bg.addColorStop(1, '#040608');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Ambient glow (blue, top-right) ─────────────────────────────────────
      const glow1 = ctx.createRadialGradient(W * 0.75, H * 0.2, 0, W * 0.75, H * 0.2, W * 0.55);
      glow1.addColorStop(0, 'rgba(30,80,200,0.18)');
      glow1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, W, H);

      // ── Ambient glow (teal, bottom-left) ───────────────────────────────────
      const glow2 = ctx.createRadialGradient(W * 0.15, H * 0.8, 0, W * 0.15, H * 0.8, W * 0.45);
      glow2.addColorStop(0, 'rgba(0,160,140,0.12)');
      glow2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, W, H);

      // ── Draw fibers ────────────────────────────────────────────────────────
      fibers.forEach(f => {
        ctx.beginPath();
        ctx.moveTo(f.x1, f.y1);
        ctx.lineTo(f.x2, f.y2);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = f.alpha * (0.55 + coatOpacity * 0.4);
        ctx.lineWidth = f.width;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // ── Draw coat layers ───────────────────────────────────────────────────
      if (coatOpacity > 0) {
        coatLayers.forEach(c => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.fillStyle = c.color + (c.alpha * coatOpacity).toFixed(3) + ')';
          ctx.fill();
        });
      }

      // ── Spawn new particles ────────────────────────────────────────────────
      if (spawnRate > 0 && now - lastSpawn > 1000 / (spawnRate * 80)) {
        spawnParticle();
        lastSpawn = now;
        // Keep count bounded
        if (particles.length > PARTICLE_COUNT * 1.5) particles.splice(0, 10);
      }

      // ── Update & draw particles ────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 16;

        if (!p.settled) {
          // Drift downward with slight turbulence
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vx *= 0.98;
          p.x += p.vx;
          p.y += p.vy;

          // Settle when reaching settle point
          if (p.y >= p.settleY) {
            p.settled = true;
            // Add to coat layer
            if (coatOpacity > 0.1) addCoat(p.x, p.y, p.color);
          }
        } else {
          // Settled — slowly drift and fade
          p.x += p.vx * 0.1;
          p.alpha -= 0.0008;
        }

        // Fade in/out based on life
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.alpha;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        // Apply phase opacity
        const phaseAlpha = spawnRate > 0 ? 1 : Math.max(0, 1 - (elapsed - DIRTY_DURATION) / FADE_DURATION);
        alpha *= phaseAlpha;

        if (alpha <= 0 || p.life > p.maxLife || p.y > H + 20 || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        if (p.blur > 0) {
          ctx.filter = `blur(${p.blur}px)`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha.toFixed(3) + ')';
        ctx.fill();
        if (p.blur > 0) ctx.filter = 'none';
      }

      // ── Vignette overlay ───────────────────────────────────────────────────
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      // ── "CLEAN" flash indicator (subtle) ──────────────────────────────────
      if (elapsed > DIRTY_DURATION + FADE_DURATION && elapsed < DIRTY_DURATION + FADE_DURATION + CLEAN_DURATION) {
        const t = Math.min(1, (elapsed - DIRTY_DURATION - FADE_DURATION) / 400);
        const t2 = Math.max(0, 1 - (elapsed - DIRTY_DURATION - FADE_DURATION - CLEAN_DURATION + 400) / 400);
        const pulse = Math.min(t, t2);
        // Subtle blue shimmer across the canvas
        const shimmer = ctx.createLinearGradient(0, 0, W, H);
        shimmer.addColorStop(0, `rgba(30,120,255,${(pulse * 0.06).toFixed(3)})`);
        shimmer.addColorStop(0.5, `rgba(80,200,255,${(pulse * 0.04).toFixed(3)})`);
        shimmer.addColorStop(1, `rgba(30,120,255,${(pulse * 0.06).toFixed(3)})`);
        ctx.fillStyle = shimmer;
        ctx.fillRect(0, 0, W, H);
      }
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
