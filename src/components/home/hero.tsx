"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { heroMedia } from "@/content/hero-media";
import "./hero.css";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const togglePlayback = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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
        // Blocked autoplay leaves the poster and a real play button.
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
      <div className="section-shell lm-hero-inner">
        <div className="lm-hero-copy">
          <p className="lm-hero-eyebrow">Accounting &amp; Advisory · Perth</p>
          <h1 id="lm-hero-title">Know what your next move means for your money.</h1>
          <p className="lm-hero-description">Can you afford another hire? Is growth putting pressure on cash? Is that business worth a closer look? Lee Monarc helps you work through the numbers behind decisions like these, alongside your accounting and tax.</p>
          <Link href="/contact" className="lm-hero-cta">Tell us what’s on your mind <span aria-hidden="true">↗</span></Link>
          <a className="lm-hero-secondary" href="#owner-questions">Start with three questions <span aria-hidden="true">↓</span></a>
        </div>
        <aside className="lm-hero-notification" aria-label="Illustrative advisory conversation">
          <span className="lm-hero-notification-icon" aria-hidden="true">↗</span>
          <div>
            <span className="lm-hero-example">Illustrative conversation</span>
            <h2>Your advisor, in your corner</h2>
            <p>What would your next hire mean for cashflow? Let’s walk through the numbers.</p>
          </div>
        </aside>
      </div>
      <div className="section-shell lm-hero-brands" aria-label="Selected past client brands">
        <p className="lm-hero-brands-label">Selected past clients &amp; advisory partners</p>
        <div className="lm-hero-brands-row" aria-hidden="true">
          {["Apex Group", "Vanguard Civil", "Meridian Advisory", "Sovereign Health", "St Georges Capital", "Crestwood Holdings"].map((name) => (
            <div key={name} className="lm-hero-brand-slot">
              <span className="lm-hero-brand-glyph">◇</span>
              <span className="lm-hero-brand-name">{name}</span>
            </div>
          ))}
        </div>
        <span className="review-placeholder">Client brand logos · approval pending</span>
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
