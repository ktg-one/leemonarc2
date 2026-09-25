"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { perspectives } from "@/content/site";
import { motion } from "@/lib/motion";
import { Arrow } from "./chrome";
import "./perspective.css";

export function Perspective() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const current = perspectives[active];

  useEffect(() => {
    const section = root.current?.closest<HTMLElement>(".perspective-section");
    const inner = section?.querySelector<HTMLElement>(".perspective-inner");
    if (!section || !inner) return;
    const query = window.matchMedia(motion.scrollSceneQuery);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!query.matches) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        manual.current = false;
        return;
      }
      if (manual.current) return;
      const travel = section.clientHeight - inner.clientHeight;
      if (travel <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      setActive(Math.min(2, Math.floor(progress * 3)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      if (query.matches) document.documentElement.dataset.scrollScene = "true";
      else delete document.documentElement.dataset.scrollScene;
      schedule();
    };
    configure();
    query.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.scrollScene;
      query.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={root} className="perspective-experience" data-step={active}>
      <div className="perspective-visual" aria-hidden="true">
        <div className="diagram-coordinate coordinate-top">
          LM / PERSPECTIVE STUDY
        </div>
        <div className="diagram-coordinate coordinate-side">
          A CONNECTED VIEW
        </div>
        <div className="perspective-grid" />
        <div className="diagram-axis axis-horizontal" />
        <div className="diagram-axis axis-vertical" />
        <div className="orbit orbit-one">
          <span className="orbit-dot" />
        </div>
        <div className="orbit orbit-two">
          <span className="orbit-dot" />
        </div>
        <div className="orbit orbit-three">
          <span className="orbit-dot" />
        </div>
        <div className="diagram-centre">
          <span>LEE MONARC</span>
          <strong>{current.focus}</strong>
          <em>in perspective.</em>
        </div>
        <span className="diagram-label label-numbers">01 / Numbers</span>
        <span className="diagram-label label-business">02 / Business</span>
        <span className="diagram-label label-direction">03 / Direction</span>
        <div className="diagram-caption">
          <span>{current.caption}</span>
          <span>0{active + 1} — 03</span>
        </div>
      </div>
      <div className="perspective-story">
        <div
          className="perspective-controls"
          role="group"
          aria-label="Explore your financial perspective"
        >
          {perspectives.map((stage, i) => (
            <button
              key={stage.name}
              type="button"
              aria-pressed={active === i}
              aria-controls="perspective-panel"
              onClick={() => {
                manual.current = true;
                setActive(i);
              }}
            >
              <span>0{i + 1}</span> {stage.name}
            </button>
          ))}
        </div>
        <div
          id="perspective-panel"
          className="perspective-panel"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="perspective-step" aria-hidden="true">
            0{active + 1}
          </span>
          <h3>{current.label}</h3>
          <p>{current.text}</p>
        </div>
        <Link href="/contact" className="text-link">
          Find your next step <Arrow diagonal />
        </Link>
        <p className="perspective-hint">
          Three ways of looking. One connected picture.
        </p>
        <noscript>
          <style>{".perspective-controls { display: none; }"}</style>
          <div className="perspective-noscript">
            {perspectives.slice(1).map((stage) => (
              <div key={stage.name}>
                <h3>{stage.label}</h3>
                <p>{stage.text}</p>
              </div>
            ))}
          </div>
        </noscript>
      </div>
    </div>
  );
}
