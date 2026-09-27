"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
import "./light-sections.css";

const CADENCE = 6000;
const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

const brandGridCards16 = [
  "Palantir", "Rippling", "Decagon", "Abridge", "Scale", "Retool", "Vercel", "Stripe",
  "Figma", "Notion", "Linear", "Ramp", "Brex", "Deel", "OpenAI", "Anthropic"
];

const bannerCards = [
  { company: "Basis", quote: "Lee Monarc transformed our financial trajectory before our Series B round.", author: "Mitchell Watson, Founder" },
  { company: "Owner", quote: "Having Vivienne Lee in our corner gave us total clarity on cashflow.", author: "Sarah Lin, CEO" },
  { company: "Hightouch", quote: "The strategic advisory and forecasting allowed us to scale with confidence.", author: "David Chen, Managing Director" },
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

  const [scrubberVal, setScrubberVal] = useState(70);
  const [candidateTab, setCandidateTab] = useState("match");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [emailInput, setEmailInput] = useState("");

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

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % features.length), CADENCE);
    return () => window.clearInterval(timer);
  }, [playing, revision]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStory((index) => (index + 1) % stories.length), 5500);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActiveBelief((index) => (index + 1) % beliefs.length), 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

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
      {/* PAGE 1: BRAND GRID & EDITORIAL QUOTE */}
      <section className="lm-light-brand-grid section-shell" aria-label="Brand Grid and Editorial Quote">
        <div className="lm-brand-card-wrap">
          <div className="lm-brand-card-grid-2x8" aria-hidden="true">
            {brandGridCards16.map((brand, i) => (
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

      {/* PAGE 2: 1/3 TO 2/3 SPLIT & CAROUSEL FLOW */}
      <section className="lm-page2-split section-shell home-section" aria-label="Split Carousel Flow">
        <div className="lm-split-grid">
          <div className="lm-split-left">
            <span className="home-kicker">ADVISORY INTEL</span>
            <h2 className="home-heading">Custom AI agents that think like you</h2>
            <p className="lm-split-copy">
              Model scenarios instantly and assess candidate opportunities or financial hires with precision calibration.
            </p>
            <div className="lm-scrubber-box">
              <label htmlFor="scrubber">Conversion Calibration Rate: {scrubberVal}%</label>
              <input
                id="scrubber"
                type="range"
                min="30"
                max="95"
                value={scrubberVal}
                onChange={(e) => setScrubberVal(Number(e.target.value))}
                className="lm-range-slider"
              />
            </div>
            <div className="lm-big-stat-display">
              <span className="lm-stat-number">{scrubberVal}%</span>
              <span className="lm-stat-label">interview conversion rate</span>
            </div>
          </div>

          <div className="lm-split-right">
            <div className="lm-candidate-card-3stage">
              <div className="lm-candidate-header">
                <div className="lm-candidate-avatar">VL</div>
                <div>
                  <h3>Vivienne Lee</h3>
                  <p>Chartered Accountant &amp; Financial Advisor</p>
                </div>
                <span className="lm-stage-badge">Stage 3 / Vetted</span>
              </div>
              <div className="lm-candidate-tags">
                <span className="lm-tag">13+ Yrs Advisory</span>
                <span className="lm-tag">Perth &amp; AU-Wide</span>
                <span className="lm-tag">Swiss Custody Audit</span>
                <span className="lm-tag">CFO &amp; Cashflow</span>
              </div>
              <div className="lm-candidate-actions">
                <div className="lm-tab-buttons">
                  <button type="button" className={candidateTab === "match" ? "active" : ""} onClick={() => setCandidateTab("match")}>Match Criteria</button>
                  <button type="button" className={candidateTab === "actions" ? "active" : ""} onClick={() => setCandidateTab("actions")}>Tabbed Actions</button>
                </div>
                <div className="lm-tab-content">
                  {candidateTab === "match" ? (
                    <p>✓ 98% match for fractional CFO, tax planning &amp; business structuring advisory.</p>
                  ) : (
                    <p>⚡ Action: Request live forecast audit / Direct principal SLA line active.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lm-bottom-email-cta">
          <h3>See what your hiring partner can do for you</h3>
          <div className="lm-email-capture">
            <input
              type="email"
              placeholder="Enter your work email..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button type="button" className="pill-link">Get Started →</button>
          </div>
        </div>
      </section>

      {/* PAGE 4: BANNER CAROUSEL & DARK TRANSITION */}
      <section className="lm-banner-carousel-section section-shell home-section" aria-label="Banner Carousel">
        <div className="lm-horizontal-banner-carousel">
          {bannerCards.map((card, idx) => (
            <div
              key={card.company}
              className={`lm-banner-card ${idx === bannerIdx ? "lm-banner-active" : "lm-banner-dimmed"}`}
              onClick={() => setBannerIdx(idx)}
            >
              <span className="lm-banner-company">{card.company}</span>
              <p className="lm-banner-quote">“{card.quote}”</p>
              <span className="lm-banner-author">{card.author}</span>
            </div>
          ))}
        </div>

        <div className="lm-melt-to-darkmode">
          <div className="lm-melt-gradient" />
          <div className="lm-dark-melt-content">
            <h2 className="home-heading light-text">The proven stewards of enterprise wealth</h2>
            <div className="lm-3-pillar-cards">
              <div className="lm-pillar-card">
                <span className="lm-pillar-num">01</span>
                <h4>Precision Accounting</h4>
                <p>Reliable records, tax returns, and company compliance kept in order.</p>
              </div>
              <div className="lm-pillar-card">
                <span className="lm-pillar-num">02</span>
                <h4>CFO &amp; Cashflow Advisory</h4>
                <p>Real-time cash forecasting and commercial guidance before big hires.</p>
              </div>
              <div className="lm-pillar-card">
                <span className="lm-pillar-num">03</span>
                <h4>Structuring &amp; Exit</h4>
                <p>Prepare for acquisition, succession, or stepping back with clear terms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lm-light-intro section-shell home-section" aria-labelledby="lm-light-services-heading">
        <p className="home-kicker">Accounting & Advisory</p>
        <h2 className="home-heading" id="lm-light-services-heading">Keep the essentials in order.<br />Get help with the bigger calls.</h2>
        <p>Your tax return matters. So does the decision you need to make next month.<br className="lm-light-desktop-break" /> Find support for both.</p>
      </section>

      <section ref={featureRef} className="lm-light-features section-shell" aria-label="Explore four ways we can help" aria-roledescription="carousel" data-playing={playing}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {features.map((feature, index) => (
          <article key={feature.label} className="lm-light-feature" id={`lm-light-feature-${index}`} data-active={index === active} aria-label={`${index + 1} of 4: ${feature.label}`} aria-roledescription="slide">
            <div className="lm-light-feature-copy">
              <p className="lm-light-feature-label">{feature.label}</p>
              <h3>{feature.title}</h3>
              <p className="lm-light-feature-description">{feature.text}</p>
              {featureControls}
              <div className="lm-light-feature-index"><span aria-hidden="true">0{index + 1}</span><p>{feature.caption}</p></div>
              <div className="lm-light-service-links">{feature.serviceIndexes.map((serviceIndex) => <Link href={services[serviceIndex].href} key={serviceIndex}>{services[serviceIndex].title}<span aria-hidden="true">↗</span></Link>)}</div>
            </div>
            <div className={`lm-light-illustration lm-light-tone-${feature.tone}`}>
              <span className="lm-light-illustration-note">Illustrative service view</span>
              <div className="lm-light-illustration-orbit" aria-hidden="true" />
              <div className="lm-light-card-stack" aria-hidden="true">{feature.cards.map((card, cardIndex) => <div className={`lm-light-mini-card lm-light-mini-card-${cardIndex}`} key={card}><span className="lm-light-card-symbol">{["◷", "≡", "↗"][cardIndex]}</span><span>{card}<small>Lee Monarc · Advisory</small></span><span className="lm-light-card-dot" /></div>)}</div>
              <div className="lm-light-illustration-bottom"><span aria-hidden="true">0{index + 1}</span><p>{feature.caption}</p></div>
            </div>
            <aside className="lm-light-proof"><span className="review-placeholder">Client proof placeholder</span><div><span className="lm-light-proof-symbol" aria-hidden="true">↗</span><h4>{feature.proof}</h4><p>Space for an approved client story about the question, the work and what followed.</p></div><p className="lm-light-proof-note">Client name, story and permission to be supplied.</p></aside>
          </article>
        ))}
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
          <div className="lm-beliefs-track">
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
            {beliefs.map((b, i) => (
              <button key={b.title} type="button" aria-label={`View principle ${i + 1}: ${b.title}`} aria-current={activeBelief === i ? "true" : undefined} onClick={() => setActiveBelief(i)}>
                <span />
              </button>
            ))}
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
