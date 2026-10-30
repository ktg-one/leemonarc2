"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/chrome";

// Service slug mappings for section links
const serviceSlugs = {
  "Accounting and Compliance": "/services/accounting-compliance",
  "Tax Planning and Advice": "/services/tax-planning",
  "Business Structuring": "/services/business-structuring",
  "Fractional CFO and Business Advisory": "/services/fractional-cfo-advisory",
  "Business Acquisition and Due Diligence": "/services/business-acquisition",
  "Succession and Exit Planning": "/services/succession-exit",
};

/** Reusable section reveal component using IntersectionObserver */
function RevealSection({
  className,
  ariaLabelledby,
  children,
}: {
  className?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={className}
      aria-labelledby={ariaLabelledby}
      data-in-view={inView}
    >
      {children}
    </section>
  );
}

export function WhoWeHelpClient() {
  return (
    <main id="main" className="who-we-help-page section-stack">
      {/* HERO — deck verbatim */}
      <RevealSection className="who-hero" ariaLabelledby="hero-heading">
        <h1 id="hero-heading">For owners who want more from their numbers.</h1>
        <p className="who-lead">
          You’re building something that matters to you. We help you assess what
          it can afford, where it needs attention and how to prepare for the
          future you want.
        </p>
        <Link href="/contact" className="button button-dark">
          Tell us about your business <Arrow diagonal />
        </Link>
      </RevealSection>

      {/* STARTING AND ESTABLISHING — deck verbatim */}
      <RevealSection className="who-section" ariaLabelledby="starting-heading">
        <div className="section-heading">
          <h2 id="starting-heading">Starting and establishing</h2>
          <p className="section-subhead">Get the setup right before things get busy.</p>
        </div>
        <p className="who-body">
          The decisions you make early can shape how your business operates for
          years. We help you think through your structure, establish useful
          financial records and understand your accounting and tax obligations.
        </p>
        <p className="who-body">
          Start with a setup that reflects your circumstances, with room to review
          it as the business develops.
        </p>
        <div className="who-links">
          <Link href={serviceSlugs["Business Structuring"]}>
            Business Structuring <Arrow />
          </Link>
          <Link href={serviceSlugs["Accounting and Compliance"]}>
            Accounting and Compliance <Arrow />
          </Link>
        </div>
      </RevealSection>

      {/* GROWING BUSINESSES — deck verbatim */}
      <RevealSection className="who-section" ariaLabelledby="growing-heading">
        <div className="section-heading">
          <h2 id="growing-heading">Growing businesses</h2>
          <p className="section-subhead">More sales. More commitments. Enough cash?</p>
        </div>
        <p className="who-body">
          More revenue can bring more people, larger commitments and greater
          pressure on cash. We help you look beyond sales to understand
          profitability, working capital and the financial implications of expansion.
        </p>
        <p className="who-body">
          Whether you’re thinking about hiring, investing or changing how you
          operate, we can help you assess the numbers behind the decision.
        </p>
        <div className="who-links">
          <Link href={serviceSlugs["Fractional CFO and Business Advisory"]}>
            Fractional CFO and Business Advisory <Arrow />
          </Link>
        </div>
      </RevealSection>

      {/* BUYERS AND OWNERS PLANNING A TRANSITION — deck verbatim */}
      <RevealSection className="who-section" ariaLabelledby="transition-heading">
        <div className="section-heading">
          <h2 id="transition-heading">Buyers and owners planning a transition</h2>
          <p className="section-subhead">
            Know what you’re taking on. Plan what you’re leaving behind.
          </p>
        </div>
        <p className="who-body">
          Buying, selling or stepping back involves more than a single transaction.
          We help you examine the financial position, identify information gaps
          and prepare for the changes ahead.
        </p>
        <p className="who-body">
          Getting advice early gives you time to consider your options and address
          issues before they become urgent.
        </p>
        <div className="who-links">
          <Link href={serviceSlugs["Business Acquisition and Due Diligence"]}>
            Business Acquisition and Due Diligence <Arrow />
          </Link>
          <Link href={serviceSlugs["Succession and Exit Planning"]}>
            Succession and Exit Planning <Arrow />
          </Link>
        </div>
      </RevealSection>

      {/* INDIVIDUALS AND FAMILY GROUPS — deck verbatim */}
      <RevealSection className="who-section" ariaLabelledby="family-heading">
        <div className="section-heading">
          <h2 id="family-heading">Individuals and family groups</h2>
          <p className="section-subhead">Consider the connections across your financial affairs.</p>
        </div>
        <p className="who-body">
          For high-net-worth individuals and family groups, business interests,
          ownership arrangements and tax decisions are often closely connected.
          We help bring those accounting and tax considerations into view, with
          attention to your wider goals and the people involved. Where a matter
          needs legal or other specialist input, that advice can be considered
          alongside our work.
        </p>
        <div className="who-links">
          <Link href={serviceSlugs["Tax Planning and Advice"]}>
            Tax Planning and Advice <Arrow />
          </Link>
          <Link href={serviceSlugs["Business Structuring"]}>
            Business Structuring <Arrow />
          </Link>
        </div>
      </RevealSection>

      {/* INDUSTRY EXPERIENCE — deck verbatim */}
      <RevealSection className="who-section who-industry" ariaLabelledby="industry-heading">
        <div className="section-heading">
          <h2 id="industry-heading">Industry experience</h2>
        </div>
        <p className="who-body">
          Vivienne’s experience spans professional services, property and
          construction, healthcare, technology, engineering and manufacturing,
          care services, beauty and wellness, and hospitality.
        </p>
        <p className="who-body">
          Every business has its own pressures and priorities. We start by
          understanding how yours works, rather than assuming that an industry
          label tells the whole story.
        </p>
      </RevealSection>

      {/* THE RIGHT FIT — deck verbatim */}
      <RevealSection className="who-section who-fit" ariaLabelledby="fit-heading">
        <div className="section-heading">
          <h2 id="fit-heading">The right fit</h2>
        </div>
        <p className="who-body">
          You bring the ambition. Bring the difficult questions too. We work well
          with people who value clear advice, are willing to share the information
          behind their decisions and want to use their numbers to improve how
          they run their business.
        </p>
        <p className="who-body">
          You don’t need to have everything worked out. Being ready to ask
          questions is a good place to start.
        </p>
        <Link href="/contact" className="button button-dark">
          Let’s talk about your business <Arrow diagonal />
        </Link>
      </RevealSection>
    </main>
  );
}
