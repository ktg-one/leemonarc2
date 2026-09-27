"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
import { heroMedia } from "@/content/hero-media";
import "./light-sections.css";

const CADENCE = 6000;
const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

const brandGridCards = [
  "Palantir", "Rippling", "Decagon", "Abridge", "Scale", "Retool", "Vercel",
  "Stripe", "Figma", "Notion", "Linear", "Ramp", "Brex", "Deel"
];

const features = [
  {
    label: "Accounting & tax", title: "Good decisions need accounts you can use.",
    text: "Reliable financial information helps you run your business with confidence. We support your bookkeeping, financial statements, tax returns and company compliance, while helping you plan ahead for tax.",
    serviceIndexes: [0, 1], cards: ["Your financial records", "Your reporting", "Your tax position"],
    caption: "A clear foundation", proof: "Accounting support", tone: "sage",
  },
  {
    label: "Cashflow & advisory", title: "Profit on paper won’t pay next month’s wages.",
    text: "Sales can grow while cash gets tighter. Money may be tied up in unpaid invoices, stock or the costs of expansion. We help you find what’s driving the gap and assess what your next commitment would mean.",
    serviceIndexes: [3], cards: ["Understand your cashflow", "Examine the assumptions", "Assess your next move"],
    caption: "See the decisions ahead", proof: "A cashflow decision", tone: "blue",
  },
  {
    label: "Major decisions", title: "Ask the questions before you sign.",
    text: "Buying a business, changing your structure or preparing to sell can shape your future for years to come. We help you consider the financial implications, identify questions that need answering and prepare for the outcome you want.",
    serviceIndexes: [2, 4, 5], cards: ["Review the information", "Question the assumptions", "Consider your options"],
    caption: "A considered next step", proof: "A purchase or transition", tone: "sand",
  },
  {
    label: "Ongoing support", title: "Your business deserves more than a once-a-year conversation.",
    text: "Lee Monarc Accounting & Advisory connects your accounts and tax with the decisions you make as an owner: where to invest, what you can afford and how to build a business that gives you options.",
    serviceIndexes: [3], cards: ["Your numbers", "Your business", "Your direction"],
    caption: "Bring the pieces together", proof: "Working together", tone: "rose",
  },
];

const questions = [
  { title: "If sales stopped growing, would cash still cover our commitments?", text: "Growth can disguise pressure. Look at the timing of receipts and payments, not just the sales total." },
  { title: "What would our next hire or investment do to cash over the coming months?", text: "The upfront cost is only part of the decision. A forecast helps you examine the ongoing commitments and the assumptions behind them." },
  { title: "Could the business run without me for a month?", text: "Your answer can highlight dependencies worth addressing, whether you want to grow, take time away or eventually sell." },
];

const stories = ["A cashflow decision", "Accounting support", "A purchase or transition"];

const beliefs = [
  {
    title: "Your accounts should help you make a decision.",
    description: "A report needs to do more than arrive in your inbox. It should help answer a question about the business: what’s working, where cash is going or what needs to change.",
  },
  {
    title: "Profit and cash need separate conversations.",
    description: "A profitable business can still struggle to meet its commitments. Looking at both gives you a more useful picture of what the business can afford.",
  },
  {
    title: "Advice is most useful while you still have options.",
    description: "Before you hire, buy, restructure or sell, there’s an opportunity to test the assumptions. After you’ve committed, some of those choices have already gone.",
  },
  {
    title: "A business should give its owner options.",
    description: "That might mean growing, reducing day-to-day involvement or preparing for a future sale. Those goals deserve attention long before you’re ready to step away.",
  },
];

export function LightSections() {
  const isHydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [active, setActive] = useState(0);
  const [revision, setRevision] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);

  const [story, setStory] = useState(0);
  const [activeBelief, setActiveBelief] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const featureRef = useRef<HTMLElement>(null);
  const enhanced = isHydrated && !reducedMotion;
  const playing = enhanced && !paused && !hovered && !focused && inView;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => setReducedMotion(query.matches);
    const updateVisibility = () => setInView(!document.hidden);
    updateCapability();
    updateVisibility();
    query.addEventListener("change", updateCapability);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (featureRef.current) observer.observe(featureRef.current);
    return () => {
      query.removeEventListener("change", updateCapability);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);


  const selectFeature = (index: number) => {
    setActive(index);
    setRevision((value) => value + 1);
  };

  const featureControls = <div className="lm-light-controls" aria-label="Service feature controls">
    <div className="lm-light-dots">
      {features.map((feature, index) => <button key={feature.label} type="button" onClick={() => selectFeature(index)} aria-label={`Show ${feature.label}`} aria-current={active === index ? "true" : undefined} aria-controls={`lm-light-feature-${index}`}><span /></button>)}
    </div>
    <button className="lm-light-pause" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume service rotation" : "Pause service rotation"} aria-pressed={paused}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
  </div>;

  return (
    <div className="lm-light" data-enhanced={enhanced}>
      <section className="lm-light-brand-grid section-shell" aria-label="Brand Grid and Strategic Editorial">
        <div className="lm-brand-card-wrap">
          <div className="lm-brand-card-grid" aria-hidden="true">
            {brandGridCards.map((brand, i) => (
              <div key={brand} className="lm-brand-card" style={{ animationDelay: `${i * 0.04}s` }}>
                <span className="lm-brand-card-symbol">{brand[0]}</span>
                <span className="lm-brand-card-name">{brand}</span>
              </div>
            ))}
          </div>
          <div className="lm-brand-fade-overlay" aria-hidden="true" />
        </div>

        <div className="lm-editorial-cascade">
          <div className="lm-editorial-badge">• STRATEGIC ADVISORY &amp; FAMILY OFFICES</div>
          <h2 className="lm-editorial-title">An advisory partner that understands exactly what you’re building.</h2>
          <p className="lm-editorial-body">
            Your accounts tell part of the story. Your plans, responsibilities and reasons for running a business tell the rest. At Lee Monarc, we bring those conversations together across corporate advisory, private client wealth, and strategic growth.
          </p>
          <div className="lm-trust-metrics">
            <div className="lm-trust-metric">
              <b>$14.2B</b>
              <span>AUM Advisory Scope</span>
            </div>
            <div className="lm-trust-metric-divider" aria-hidden="true" />
            <div className="lm-trust-metric">
              <b>Swiss Custody</b>
              <span>Institutional Grade</span>
            </div>
            <div className="lm-trust-metric-divider" aria-hidden="true" />
            <div className="lm-trust-metric">
              <b>24h SLA</b>
              <span>Direct Principal Line</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lm-light-intro section-shell home-section" aria-labelledby="lm-light-services-heading">
        <p className="home-kicker">Accounting & Advisory</p>
        <h2 className="home-heading" id="lm-light-services-heading">Keep the essentials in order.<br />Get help with the bigger calls.</h2>
        <p>Your tax return matters. So does the decision you need to make next month.<br className="lm-light-desktop-break" /> Find support for both.</p>
      </section>

      {/* 1/3 (stages nav) + 2/3 (animated slider with video media revealed under card) */}
      <section ref={featureRef} className="lm-light-features section-shell" aria-label="Explore four ways we can help">
        <div className="lm-feature-slider-layout">
          {/* Left Column (1/3): Strategic Stage Selector */}
          <div className="lm-feature-nav-col">
            <span className="home-kicker">02 · Strategic Capabilities</span>
            <h2 className="lm-feature-heading">Keep essentials in order. Get help with the bigger calls.</h2>
            <p className="lm-feature-subhead">Explore our core advisory pillars designed for growing private enterprises.</p>
            <div className="lm-feature-stage-list" role="tablist" aria-label="Service capabilities">
              {features.map((feature, idx) => (
                <button
                  key={feature.label}
                  type="button"
                  role="tab"
                  aria-selected={active === idx}
                  className={`lm-feature-tab-btn ${active === idx ? "lm-tab-active" : ""}`}
                  onClick={() => selectFeature(idx)}
                >
                  <span className="lm-feature-tab-num">0{idx + 1}</span>
                  <div className="lm-feature-tab-info">
                    <span className="lm-feature-tab-title">{feature.label}</span>
                    <span className="lm-feature-tab-sub">{feature.caption}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="lm-feature-controls-wrap">
              {featureControls}
            </div>
          </div>

          {/* Right Column (2/3): Animated Slider with Video Media Underneath */}
          <div className="lm-feature-stage-container">
            {/* Background Video Media (Revealed Under Card) */}
            <div className="lm-feature-video-underlay" aria-hidden="true">
              <video
                src={heroMedia.source || undefined}
                poster="/images/perspective.webp"
                autoPlay
                muted
                loop
                playsInline
                className="lm-feature-underlay-video"
              />
              <div className="lm-feature-video-badge">
                <span className="lm-video-dot" aria-hidden="true" />
                <span>Advisory Media · Perth WA</span>
              </div>
            </div>

            {/* Sliding Foreground Cards (GPU translateX) */}
            {features.map((feature, index) => (
              <article
                key={feature.label}
                id={`lm-light-feature-${index}`}
                data-active={active === index ? "true" : "false"}
                className={`lm-feature-sliding-card ${active === index ? "lm-card-active" : "lm-card-hidden"}`}
                style={{
                  transform: enhanced ? `translateX(${active % 2 === 0 ? "0%" : "10%"})` : undefined,
                }}
              >
                <div className="lm-card-top-row">
                  <span className="lm-feature-badge">{feature.label}</span>
                  <span className="lm-feature-step">0{index + 1} / 04</span>
                </div>

                <h3>{feature.title}</h3>
                <p className="lm-feature-body">{feature.text}</p>

                <div className="lm-feature-card-pills">
                  {feature.cards.map((c) => (
                    <span key={c} className="lm-card-pill">
                      <span className="lm-pill-check" aria-hidden="true">✓</span> {c}
                    </span>
                  ))}
                </div>

                <div className="lm-feature-card-footer">
                  <div className="lm-feature-service-links">
                    {feature.serviceIndexes.map((serviceIndex) => (
                      <Link href={services[serviceIndex].href} key={serviceIndex} className="lm-feature-link">
                        {services[serviceIndex].title} <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>

                  <div className="lm-slider-nav-arrows">
                    <button
                      type="button"
                      className="lm-arrow-btn"
                      aria-label="Previous capability"
                      onClick={() => selectFeature((active - 1 + features.length) % features.length)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="lm-arrow-btn"
                      aria-label="Next capability"
                      onClick={() => selectFeature((active + 1) % features.length)}
                    >
                      →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="owner-questions" className="lm-light-questions section-shell" aria-labelledby="lm-light-questions-heading">
        <h2 id="lm-light-questions-heading">Three questions worth asking about your business.</h2>
        <div className="lm-light-question-grid">{questions.map((question, index) => <details key={question.title}><summary><span>0{index + 1}</span>{question.title}<b aria-hidden="true">+</b></summary><p>{question.text}</p></details>)}</div>
        <Link href="/services/fractional-cfo-advisory">See how financial advisory can help <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="lm-light-beliefs section-shell home-section" aria-labelledby="lm-light-beliefs-heading"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="lm-beliefs-header">
          <p className="home-kicker">Core Principles</p>
          <h2 className="home-heading" id="lm-light-beliefs-heading">Four perspectives on building a business that gives you options.</h2>
        </div>
        <div className="lm-beliefs-carousel">
          <div
            className="lm-beliefs-track"
            style={
              enhanced
                ? {
                    transform: `translateX(calc(50% - var(--lm-belief-width) / 2 - ${activeBelief} * (var(--lm-belief-width) + var(--lm-belief-gap))))`,
                  }
                : undefined
            }
          >
            {beliefs.map((b, i) => (
              <button
                key={b.title}
                type="button"
                className="lm-belief-card"
                data-active={activeBelief === i}
                onClick={() => setActiveBelief(i)}
                aria-pressed={activeBelief === i}
                aria-label={`Principle ${i + 1}: ${b.title}`}
              >
                <span className="lm-belief-num">0{i + 1}</span>
                <span className="lm-belief-title">{b.title}</span>
                <p>{b.description}</p>
              </button>
            ))}
          </div>
          <div className="lm-beliefs-controls" aria-label="Belief statements controls">
            <button
              type="button"
              className="lm-beliefs-arrow"
              aria-label="Previous principle"
              onClick={() => setActiveBelief((i) => (i - 1 + beliefs.length) % beliefs.length)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <div className="lm-beliefs-dots">
              {beliefs.map((b, i) => (
                <button
                  key={b.title}
                  type="button"
                  aria-label={`View principle ${i + 1}: ${b.title}`}
                  aria-current={activeBelief === i ? "true" : undefined}
                  onClick={() => setActiveBelief(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="lm-beliefs-arrow"
              aria-label="Next principle"
              onClick={() => setActiveBelief((i) => (i + 1) % beliefs.length)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="lm-light-cta section-shell home-section" aria-labelledby="lm-light-cta-heading"><h2 id="lm-light-cta-heading" className="home-heading">Start with the question<br />you can’t answer yet.</h2><Link className="pill-link" href="/contact">Let’s start a conversation <span aria-hidden="true">↗</span></Link></section>

      <section className="lm-light-stories section-shell" aria-labelledby="lm-light-stories-heading"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="lm-light-stories-heading"><div><p className="home-kicker">The work, in perspective</p><h2 className="home-heading" id="lm-light-stories-heading">Every business has a story.</h2></div><span className="review-placeholder">Client stories awaiting approval</span></div>
        <div className="lm-light-story-grid">{stories.map((title, index) => <article className="lm-light-story" key={title} id={`lm-light-story-${index}`} data-selected={story === index}><div className="lm-light-story-art" aria-hidden="true"><span>0{index + 1}</span><div /><i /></div><div className="lm-light-story-content"><span className="review-placeholder">Story & media placeholder</span><h3>{title}</h3><p>{story === index || !enhanced ? "Approved client words, imagery and outcomes will appear here." : "Awaiting an approved client story."}</p></div></article>)}</div>
        <div className="lm-light-story-controls" aria-label="Client story selectors">{stories.map((title, index) => <button type="button" key={title} aria-label={`Select story placeholder ${index + 1}: ${title}`} aria-current={story === index ? "true" : undefined} aria-controls={`lm-light-story-${index}`} onClick={() => setStory(index)}><span aria-hidden="true">0{index + 1}</span><span className="sr-only">{title}</span></button>)}</div>
      </section>
    </div>
  );
}
