"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroMedia } from "@/content/hero-media";
import { RectangleButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import "./hero.css";

const brandBadges = [
  { label: "Professional services", href: "/who-we-help", icon: "⚖" },
  { label: "Property and construction", href: "/who-we-help", icon: "🏛" },
  { label: "Healthcare", href: "/who-we-help", icon: "✦" },
  { label: "Technology", href: "/who-we-help", icon: "⚡" },
  { label: "Engineering and manufacturing", href: "/who-we-help", icon: "⚙" },
  { label: "Care services", href: "/who-we-help", icon: "♥" },
  { label: "Beauty and wellness", href: "/who-we-help", icon: "◈" },
  { label: "Hospitality", href: "/who-we-help", icon: "🍸" },
];

export function Hero() {
  const router = useRouter();
  const section = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const togglePlayback = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (card) {
            const scrollY = window.scrollY;
            const offsetY = Math.min(Math.max(scrollY * 0.12, -40), 60);
            card.style.setProperty("--lm-card-scroll-offset", `${offsetY}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const media = video.current;
    const element = section.current;
    if (!media || !element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let userPaused = false;
    let disposed = false;
    let request = 0;
    const sync = () => {
      const currentRequest = ++request;
      setReducedMotion(preference.matches);
      if (userPaused || !visible || document.hidden || preference.matches) {
        media.pause();
        return;
      }
      media.play().then(() => {
        if (disposed || currentRequest !== request) {
          if (disposed || userPaused || !visible || document.hidden || preference.matches) media.pause();
        }
      }).catch(() => {
        if (!disposed && currentRequest === request) setPlaying(false);
      });
    };
    const onPlaying = () => { setPlaying(true); setHasPlayed(true); };
    const onPause = () => setPlaying(false);
    const onError = () => { setFailed(true); setPlaying(false); };
    togglePlayback.current = () => {
      userPaused = !media.paused;
      sync();
    };
    media.addEventListener("playing", onPlaying);
    media.addEventListener("pause", onPause);
    media.addEventListener("error", onError);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0 });
    observer.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      request++;
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("playing", onPlaying);
      media.removeEventListener("pause", onPause);
      media.removeEventListener("error", onError);
      media.pause();
      togglePlayback.current = () => {};
    };
  }, []);

  return (
    <section ref={section} className="lm-hero" aria-labelledby="lm-hero-title" style={{
      "--lm-hero-poster": `url("${heroMedia.poster}")`,
      "--lm-hero-position": heroMedia.objectPosition,
    } as CSSProperties}>
      <div className="lm-hero-media" aria-hidden="true">
        {heroMedia.source && <video ref={video} src={heroMedia.source} poster={heroMedia.poster}
          muted playsInline loop preload="metadata" tabIndex={-1}
          data-visible={hasPlayed && !failed && !reducedMotion} />}
      </div>

      {/* 2-Column Editorial Overlay */}
      <div className="section-shell lm-hero-inner">
        <div className="lm-hero-copy">
          <p className="lm-hero-eyebrow">Accounting &amp; Advisory · Perth</p>
          <h1 id="lm-hero-title">Know what your next move means for your money.</h1>
          <p className="lm-hero-description">
            Can you afford another hire? Is growth putting pressure on cash? Is that business worth a closer look? Lee Monarc helps you work through the numbers behind decisions like these, alongside your accounting and tax.
          </p>

          <div className="lm-hero-cta-group">
            <div
              className="lm-hero-threeui-cta"
              role="link"
              tabIndex={0}
              onClick={() => router.push("/contact")}
              onKeyDown={(e) => { if (e.key === "Enter") router.push("/contact"); }}
              aria-label="Tell us what’s on your mind · See the work"
            >
              <RectangleButtons
                variant="halvorsen-arrow-pill"
                mode="light"
                hue={93}
                saturation={1.06}
                brightness={1.16}
              />
            </div>

            <a className="lm-hero-secondary" href="#owner-questions">
              Start with three questions <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Elevated Glass Advisory Preview Card */}
        <aside ref={cardRef} className="lm-hero-notification" aria-label="Illustrative advisory conversation">
          <div className="lm-hero-card-header">
            <span className="lm-hero-live-pill">
              <span className="lm-hero-live-dot" aria-hidden="true" /> Live Advisory Preview
            </span>
            <span className="lm-hero-notification-icon" aria-hidden="true">↗</span>
          </div>

          <div className="lm-hero-card-body">
            <span className="lm-hero-example">Illustrative conversation</span>
            <h2>Your advisor, in your corner</h2>
            <p className="lm-hero-notification-from">Vivienne Lee · Chartered Accountant · Founder</p>
            <p className="lm-hero-quote">
              “Good news! Your cashflow forecast shows room for your next hire. Let’s walk through the numbers before you commit.”
            </p>
          </div>

          <div className="lm-hero-card-footer">
            <span className="lm-hero-stat-pill">Topic: <b>Cashflow forecast</b></span>
            <span className="lm-hero-stat-pill">Fees: <b>Explained upfront</b></span>
          </div>
        </aside>
      </div>

      {/* Elevated Badges Brand Carousel */}
      <div className="lm-hero-brands-marquee" aria-label="Industry experience and advisory sectors">
        <p className="lm-hero-brands-label">Industry experience &amp; advisory sectors</p>
        <div className="lm-brand-marquee-track-container" tabIndex={0} aria-label="Continuous brand carousel">
          <div className="lm-brand-marquee-track">
            {[...brandBadges, ...brandBadges].map((badge, idx) => (
              <Link href={badge.href} key={`${badge.label}-${idx}`} className="lm-hero-badge-card">
                <span className="lm-hero-badge-icon" aria-hidden="true">{badge.icon}</span>
                <span className="lm-hero-badge-label">{badge.label}</span>
                <span className="lm-hero-badge-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="lm-hero-media-footer">
        {heroMedia.source && !failed && !reducedMotion && <button type="button"
          className="lm-hero-playback" onClick={() => togglePlayback.current()}
          aria-label={playing ? "Pause background video" : "Play background video"}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>}
        {heroMedia.placeholder && <span className="review-placeholder">Placeholder visual · client video pending</span>}
        {failed && <span className="lm-hero-media-status" role="status">Video unavailable. Showing still image.</span>}
      </div>
    </section>
  );
}
