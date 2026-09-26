"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "@/lib/motion";
import "./monogram-study.css";

const studySteps = ["Composition", "Construction", "Character"];

export function MonogramStudy() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = root.current;
    const section = art?.closest<HTMLElement>(".adviser-section");
    if (!art || !section) return;
    const query = window.matchMedia(motion.scrollSceneQuery);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!query.matches) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const travel = section.clientHeight - art.clientHeight;
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
    <div ref={root} className="adviser-art" data-step={active}>
      <span className="eyebrow">An independent perspective</span>
      <div className="monogram-frame">
        <Image
          src="/brand/logo-light.png"
          width={292}
          height={311}
          alt="Lee Monarc monogram"
        />
      </div>
      <div className="study-overlay" aria-hidden="true">
        <span className="study-bracket bracket-tl" />
        <span className="study-bracket bracket-tr" />
        <span className="study-bracket bracket-bl" />
        <span className="study-bracket bracket-br" />
        <span className="study-square" />
        <span className="study-diagonal" />
        <span className="study-cross cross-one" />
        <span className="study-cross cross-two" />
        <span className="study-ticks" />
        <span className="study-dot" />
      </div>
      <div className="adviser-art-caption">
        <span>Personal by design.</span>
        <span className="study-caption" aria-hidden="true">
          0{active + 1} / {studySteps[active]}
        </span>
        <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}
