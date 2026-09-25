"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
import "./light-sections.css";

const CADENCE = 6000;
const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

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

export function LightSections() {
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const featureRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [revision, setRevision] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [capable, setCapable] = useState(false);
  const [visible, setVisible] = useState(true);
  const [story, setStory] = useState(0);
  const playing = enhanced && capable && inView && visible && !paused && !hovered && !focused;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const updateCapability = () => setCapable(query.matches);
    const updateVisibility = () => setVisible(!document.hidden);
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
      <section className="lm-light-logos section-shell" aria-label="Client logos awaiting approval">
        <p>For the people building something of their own.</p>
        <div className="lm-light-logo-row" aria-hidden="true">
          {["◇", "⊞", "◒", "⌁", "△"].map((mark, index) => <span key={index}><b>{mark}</b> Client logo</span>)}
        </div>
        <span className="review-placeholder">Client logo placeholders · approval pending</span>
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

      <section className="lm-light-cta section-shell home-section" aria-labelledby="lm-light-cta-heading"><h2 id="lm-light-cta-heading" className="home-heading">Start with the question<br />you can’t answer yet.</h2><Link className="pill-link" href="/contact">Let’s start a conversation <span aria-hidden="true">↗</span></Link></section>

      <section className="lm-light-stories section-shell" aria-labelledby="lm-light-stories-heading">
        <div className="lm-light-stories-heading"><div><p className="home-kicker">The work, in perspective</p><h2 className="home-heading" id="lm-light-stories-heading">Every business has a story.</h2></div><span className="review-placeholder">Client stories awaiting approval</span></div>
        <div className="lm-light-story-grid">{stories.map((title, index) => <article className="lm-light-story" key={title} id={`lm-light-story-${index}`} data-selected={story === index}><div className="lm-light-story-art" aria-hidden="true"><span>0{index + 1}</span><div /><i /></div><div className="lm-light-story-content"><span className="review-placeholder">Story & media placeholder</span><h3>{title}</h3><p>{story === index || !enhanced ? "Approved client words, imagery and outcomes will appear here." : "Awaiting an approved client story."}</p></div></article>)}</div>
        <div className="lm-light-story-controls" aria-label="Client story selectors">{stories.map((title, index) => <button type="button" key={title} aria-label={`Select story placeholder ${index + 1}: ${title}`} aria-current={story === index ? "true" : undefined} aria-controls={`lm-light-story-${index}`} onClick={() => setStory(index)}><span aria-hidden="true">0{index + 1}</span><span className="sr-only">{title}</span></button>)}</div>
      </section>
    </div>
  );
}
