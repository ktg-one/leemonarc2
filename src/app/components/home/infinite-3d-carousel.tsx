"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import "./infinite-3d-carousel.css";

export interface TeamPillar {
  id: string;
  badge: string;
  tag: string;
  title: string;
  role?: string;
  bio: string;
  href: string;
  linkLabel: string;
  highlights: string[];
  isFounder?: boolean;
  image?: string;
}

export const teamPillars: TeamPillar[] = [
  {
    id: "vivienne",
    badge: "Founder & Principal",
    tag: "Chartered Accountant",
    title: "Vivienne Lee",
    role: "CA ANZ · Registered Tax Agent",
    image: "/images/vivienne-profile.jpg",
    bio: "Over a decade advising private business owners, medical practitioners, and family enterprises across Western Australia on structural cashflow, proactive tax governance, and commercial strategy.",
    href: "/about",
    linkLabel: "Read Vivienne's background",
    highlights: ["Chartered Accountants ANZ", "Registered Tax Agent", "Perth WA"],
    isFounder: true,
  },
  {
    id: "fractional-cfo",
    badge: "Strategic Capability",
    tag: "Executive Finance",
    title: "Fractional CFO Advisory",
    bio: "Monthly decision-grade reporting, cashflow runways, working capital diagnostics, and hire affordability modelling without full-time executive overhead.",
    href: "/services/fractional-cfo-advisory",
    linkLabel: "Explore Fractional CFO",
    highlights: ["Cashflow Forecasting", "Scenario Modelling", "Direct Line"],
  },
  {
    id: "structuring",
    badge: "Capital Foundation",
    tag: "Asset Protection",
    title: "Business Structuring & Tax",
    bio: "Entity design, trust distributions, and proactive tax compliance structured to protect accumulated capital and give business owners commercial agility.",
    href: "/services/business-structuring-tax",
    linkLabel: "Explore Structuring",
    highlights: ["Entity Optimisation", "Risk Ringfencing", "Proactive Planning"],
  },
  {
    id: "due-diligence",
    badge: "Pre-Commitment",
    tag: "High Stakes",
    title: "Due Diligence & Scenario Modelling",
    bio: "Before you sign or commit, interrogate quality of earnings, verify balance sheets, and test whether an acquisition or lease truly stacks up.",
    href: "/services/due-diligence-scenario-modelling",
    linkLabel: "Explore Due Diligence",
    highlights: ["Quality of Earnings", "Assumption Testing", "Lease Review"],
  },
  {
    id: "succession",
    badge: "Long Horizon",
    tag: "Owner Freedom",
    title: "Succession & Exit Readiness",
    bio: "Building enterprise value that is not dependent on the founder. Preparing for transition, management buyout, or family succession years in advance.",
    href: "/services/succession-estate-planning",
    linkLabel: "Explore Succession",
    highlights: ["Founder De-risking", "Valuation Readiness", "Family Governance"],
  },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const subscribe = () => () => {};
const getClientHydrated = () => true;
const getServerHydrated = () => false;

export function Infinite3DCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLElement | null)[]>([]);

  const hydrated = useSyncExternalStore(subscribe, getClientHydrated, getServerHydrated);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Physics constants from Clément Grellier / Codrops engine
  const FRICTION = 0.90;
  const WHEEL_SENS = 0.45;
  const DRAG_SENS = 1.0;
  const MAX_ROTATION = 28; // deg
  const MAX_DEPTH = 140;   // px
  const MIN_SCALE = 0.92;
  const SCALE_RANGE = 0.10;
  const GAP = 36;          // 36px physical spacing guarantees zero overlap

  const stateRef = useRef({
    scrollX: 0,
    vx: 0,
    cardW: 320,
    step: 356,
    track: 356 * teamPillars.length,
    vwHalf: 600,
    lastTime: 0,
    dragging: false,
    lastX: 0,
    lastT: 0,
    lastDelta: 0,
    rafId: 0,
    bgRafId: 0,
    activeIndex: 0,
    targetScrollX: 0,
    isSnapping: false,
  });

  const updateCardTransforms = useCallback(() => {
    const s = stateRef.current;
    const cards = cardElementsRef.current;
    const count = teamPillars.length;
    if (!cards || cards.length === 0) return;

    const half = s.track / 2;
    let closestIdx = -1;
    let closestDist = Infinity;

    for (let i = 0; i < count; i++) {
      const el = cards[i];
      if (!el) continue;

      let pos = (i * s.step) - s.scrollX;
      if (pos < -half) pos += s.track;
      if (pos > half) pos -= s.track;

      const dist = Math.abs(pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }

      const norm = Math.max(-1, Math.min(1, pos / (s.vwHalf || 600)));
      const absNorm = Math.abs(norm);
      const invNorm = 1 - absNorm;

      const ry = -norm * MAX_ROTATION;
      const tz = invNorm * MAX_DEPTH;
      const scale = MIN_SCALE + invNorm * SCALE_RANGE;

      el.style.transform = `translate3d(${pos.toFixed(1)}px, -50%, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.zIndex = String(1000 + Math.round(tz));

      const isCore = dist < s.step * 1.4;
      const blur = isCore ? 0 : 2 * Math.pow(absNorm, 1.1);
      el.style.filter = `blur(${blur.toFixed(1)}px)`;
      el.setAttribute("data-active", dist < s.step * 0.5 ? "true" : "false");
    }

    if (closestIdx !== -1 && closestIdx !== s.activeIndex) {
      s.activeIndex = closestIdx;
      setActiveIndex(closestIdx);
    }
  }, [teamPillars.length, MAX_ROTATION, MAX_DEPTH, MIN_SCALE, SCALE_RANGE]);

  const snapTo = useCallback((index: number) => {
    const s = stateRef.current;
    const count = teamPillars.length;
    const targetIdx = mod(index, count);
    
    // Find closest scroll representation
    let delta = targetIdx - s.activeIndex;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;

    s.targetScrollX = mod(s.scrollX + delta * s.step, s.track);
    s.vx = delta * 400; // Impel towards direction
  }, [teamPillars.length]);

  // Main animation tick
  useEffect(() => {
    if (!hydrated) return;

    const measure = () => {
      const container = containerRef.current;
      const sample = cardElementsRef.current[0];
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const s = stateRef.current;
      s.vwHalf = rect.width * 0.5 || 600;
      if (sample) {
        const sampleRect = sample.getBoundingClientRect();
        if (sampleRect.width > 0) s.cardW = sampleRect.width;
      }
      s.step = s.cardW + GAP;
      s.track = teamPillars.length * s.step;
    };

    measure();
    window.addEventListener("resize", measure);

    // Initial positioning
    updateCardTransforms();

    let lastTime = performance.now();
    const s = stateRef.current;

    const loop = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.1) : 0;
      lastTime = now;

      if (!s.dragging) {
        // Slow auto rotation if not paused and not hovered
        if (!isPaused && !isHovered && Math.abs(s.vx) < 5) {
          s.vx = 22; // subtle continuous drift
        }

        s.scrollX = mod(s.scrollX + s.vx * dt, s.track);

        const decay = Math.pow(FRICTION, dt * 60);
        s.vx *= decay;
        if (Math.abs(s.vx) < 0.1) s.vx = 0;
      }

      updateCardTransforms();
      s.rafId = requestAnimationFrame(loop);
    };

    s.rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(s.rafId);
    };
  }, [hydrated, isPaused, isHovered, GAP, FRICTION, updateCardTransforms]);

  // Canvas ambient gradient background
  useEffect(() => {
    if (!hydrated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bgRaf: number;
    let angle = 0;

    const renderBg = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth || 800;
        canvas.height = canvas.clientHeight || 500;
      }

      const w = canvas.width;
      const h = canvas.height;
      angle += 0.003;

      const cx = w * 0.5 + Math.cos(angle) * (w * 0.15);
      const cy = h * 0.5 + Math.sin(angle * 0.8) * (h * 0.15);

      const grad = ctx.createRadialGradient(cx, cy, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.6);
      grad.addColorStop(0, "rgba(204, 168, 91, 0.12)"); // Subtle bronze glow
      grad.addColorStop(0.4, "rgba(24, 34, 55, 0.45)"); // Deep luxury navy
      grad.addColorStop(1, "rgba(8, 14, 22, 0.95)");   // Background darkness

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      bgRaf = requestAnimationFrame(renderBg);
    };

    bgRaf = requestAnimationFrame(renderBg);

    return () => {
      cancelAnimationFrame(bgRaf);
    };
  }, [hydrated]);

  // Pointer drag & mouse wheel events
  const handlePointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.lastDelta = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;

    const now = performance.now();
    const dx = e.clientX - s.lastX;
    const dt = Math.max(1, now - s.lastT) / 1000;

    s.scrollX = mod(s.scrollX - dx * DRAG_SENS, s.track);
    s.lastDelta = dx / dt;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    s.vx = -s.lastDelta * DRAG_SENS;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const s = stateRef.current;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    s.vx += delta * WHEEL_SENS * 12;
  };

  return (
    <div
      ref={containerRef}
      className="lm-carousel-stage"
      aria-label="Interactive 3D Team & Advisory Pillars Carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="lm-carousel-canvas" aria-hidden="true" />

      <div ref={cardsRef} className="lm-carousel-cards" role="region" aria-live="polite">
        {teamPillars.map((pillar, idx) => (
          <article
            key={pillar.id}
            ref={(el) => {
              cardElementsRef.current[idx] = el;
            }}
            className={`lm-carousel-card ${pillar.isFounder ? "lm-carousel-card-founder" : ""}`}
            onClick={() => snapTo(idx)}
            aria-label={`${idx + 1} of ${teamPillars.length}: ${pillar.title}`}
          >
            <div className="lm-carousel-card-inner">
              <div className="lm-carousel-card-top">
                <span className="lm-carousel-badge">{pillar.badge}</span>
                <span className="lm-carousel-tag">{pillar.tag}</span>
              </div>

              {pillar.isFounder ? (
                <div className="lm-founder-visual">
                  <div className="lm-founder-avatar-box">
                    {pillar.image ? (
                      <img src={pillar.image} alt={pillar.title} className="lm-founder-avatar-img" />
                    ) : (
                      <span className="lm-founder-monogram">VL</span>
                    )}
                  </div>
                  <div className="lm-founder-meta">
                    <h3 className="lm-carousel-title">{pillar.title}</h3>
                    {pillar.role && <p className="lm-founder-role">{pillar.role}</p>}
                  </div>
                </div>
              ) : (
                <div className="lm-pillar-visual">
                  <h3 className="lm-carousel-title">{pillar.title}</h3>
                </div>
              )}

              <p className="lm-carousel-bio">{pillar.bio}</p>

              <div className="lm-carousel-highlights">
                {pillar.highlights.map((h) => (
                  <span key={h} className="lm-carousel-pill">
                    <span className="lm-pill-dot" aria-hidden="true">✓</span> {h}
                  </span>
                ))}
              </div>

              <div className="lm-carousel-card-footer">
                <Link href={pillar.href} className="lm-carousel-link" onClick={(e) => e.stopPropagation()}>
                  {pillar.linkLabel} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Controls Dock */}
      <div className="lm-carousel-dock">
        <button
          type="button"
          className="lm-carousel-btn"
          aria-label="Previous card"
          onClick={() => snapTo(activeIndex - 1)}
        >
          ←
        </button>

        <div className="lm-carousel-dots" role="tablist" aria-label="Carousel pagination">
          {teamPillars.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Jump to ${p.title}`}
              className={`lm-carousel-dot ${activeIndex === i ? "lm-dot-active" : ""}`}
              onClick={() => snapTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="lm-carousel-btn"
          aria-label="Next card"
          onClick={() => snapTo(activeIndex + 1)}
        >
          →
        </button>

        <button
          type="button"
          className="lm-carousel-btn lm-carousel-pause"
          aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </div>
  );
}
