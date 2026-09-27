"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services, business } from "@/content/site";
import "./dark-sections.css";

type TeamCard = {
  id: string;
  tag: string;
  title: string;
  href: string;
  linkLabel: string;
  quote?: string;
  text?: string;
  badges?: string[];
};

const teamCards: TeamCard[] = [
  {
    id: "founder",
    tag: "FOUNDER & PRINCIPAL · CHARTERED ACCOUNTANT",
    title: "Vivienne Lee",
    quote: "“I built Lee Monarc around the way I believe advice should work. Over 13 years in accounting and advisory, I’ve worked with business owners and family groups whose decisions reach well beyond a set of accounts.”",
    href: "/about",
    linkLabel: "About our advisory approach",
    badges: [
      "13+ Years Advisory",
      "Chartered Accountant",
      "Perth · Australia-Wide",
    ],
  },
  {
    id: "cashflow",
    tag: "PROFIT VS CASH",
    title: "Fractional CFO & Cashflow Timing",
    text: "Sales can grow while cash gets tighter. Money may be tied up in unpaid invoices, stock or expansion. We help you find what’s driving the gap and assess what your next commitment would mean.",
    href: "/services/fractional-cfo-advisory",
    linkLabel: "Explore advisory",
  },
  {
    id: "structuring",
    tag: "STRATEGIC TIMING",
    title: "Business Structuring & Pre-commitment",
    text: "Starting up, bringing in an owner or changing direction? Advice is most useful while you still have options. Test the assumptions before you lock in a commitment.",
    href: "/services/business-structuring",
    linkLabel: "Explore structuring",
  },
  {
    id: "acquisition",
    tag: "BUYER ADVISORY",
    title: "Acquisition Due Diligence",
    text: "Understand the financial opportunity and the questions to ask before buying a business. Look beyond reported profit to understand cash conversion and owner dependency.",
    href: "/services/business-acquisition",
    linkLabel: "Explore acquisition support",
  },
  {
    id: "succession",
    tag: "OWNER FREEDOM",
    title: "Succession & Exit Planning",
    text: "Build a business that gives you options: growing, reducing day-to-day involvement, or preparing for a future sale. Those goals deserve attention long before you’re ready to step away.",
    href: "/services/succession-exit",
    linkLabel: "Explore succession",
  },
];

const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

const beliefsContent = [
  {
    id: "decision",
    badge: "DECISION-DRIVEN REPORTING",
    title: "Your accounts should help you make a decision.",
    body: "A report needs to do more than arrive in your inbox. It should help answer a question about the business: what’s working, where cash is going or what needs to change.",
    highlight: "Real-time ledger auditing & decision support"
  },
  {
    id: "cashflow",
    badge: "PROFIT VS CASH",
    title: "Profit and cash need separate conversations.",
    body: "A profitable business can still struggle to meet its commitments. Looking at both gives you a more useful picture of what the business can afford.",
    highlight: "Cashflow forecasting & liquidity analysis"
  },
  {
    id: "timing",
    badge: "STRATEGIC TIMING",
    title: "Advice is most useful while you still have options.",
    body: "Before you buy, restructure or sell, there’s an opportunity to test the assumptions. After you’ve committed, some of those choices have already gone.",
    highlight: "Pre-commitment scenario modelling"
  },
  {
    id: "options",
    badge: "OWNER FREEDOM",
    title: "A business should give its owner options.",
    body: "That might mean growing, reducing day-to-day involvement or preparing for a future sale. Those goals deserve attention long before you’re ready to step away.",
    highlight: "Succession & exit readiness"
  }
];


const engagementStages = [
  {
    id: "stage-1",
    label: "1. First Conversation",
    stageName: "First Conversation · Bringing the Question",
    quote: "“Tell us where your business stands, what you want to achieve, and the financial decisions on your mind. You don’t need to speak accounting language.”",
    client: "Vivienne Lee · Chartered Accountant",
    role: "Founder & Principal",
    metrics: [
      { label: "Response", value: "Timing confirmed in engagement letter" },
      { label: "Preparation", value: "Bring your current question" },
      { label: "Scope", value: "Quoted before work begins" },
    ],
  },
  {
    id: "stage-2",
    label: "2. Diagnosis",
    stageName: "Diagnosis · Finding What Needs Attention",
    quote: "“We look beyond profit to examine cashflow timing, commitments, and structural dependencies before recommending the appropriate advisory scope.”",
    client: "Growing Business Owner",
    role: "Property & Healthcare Client",
    metrics: [
      { label: "Cashflow Review", value: "Receipts and commitments mapped" },
      { label: "Structure Review", value: "Risk and tax considered together" },
      { label: "Key Focus", value: "Working Capital" },
    ],
  },
  {
    id: "stage-3",
    label: "3. The Work",
    stageName: "The Work · Connecting Numbers to Decisions",
    quote: "“Whether testing hire assumptions, modeling acquisition scenarios, or setting up fractional CFO reporting, we put reliable accounts to work.”",
    client: "Professional Services Partner",
    role: "Fractional CFO & Advisory",
    metrics: [
      { label: "Reporting Frequency", value: "Tailored Monthly" },
      { label: "Decision Support", value: "Active Guidance" },
      { label: "Tax Integration", value: "Proactive Planning" },
    ],
  },
  {
    id: "stage-4",
    label: "4. The Outcome",
    stageName: "The Outcome · Know Your Numbers, Decide Next",
    quote: "“You gain full options and confidence: knowing what you can afford, where cash is tied up, and how your business supports your long-term goals.”",
    client: "Family Group & Enterprise Owner",
    role: "Succession & Exit Client",
    metrics: [
      { label: "Capital Protected", value: "Optimised Growth" },
      { label: "Owner Dependence", value: "Systematised" },
      { label: "Next Step", value: "Decisive Action" },
    ],
  },
];

export function DarkSections() {
  const [activeStage, setActiveStage] = useState(0);
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [paused, setPaused] = useState(false);
  const [proof, setProof] = useState(0);
  const [activeBentoTab, setActiveBentoTab] = useState(0);
  const selected = services[proof];

  const teamRef = useRef<HTMLElement>(null);
  const [teamPos, setTeamPos] = useState(teamCards.length);
  const [teamAnimate, setTeamAnimate] = useState(true);
  const [teamPaused, setTeamPaused] = useState(false);
  const [teamHovered, setTeamHovered] = useState(false);
  const [teamFocused, setTeamFocused] = useState(false);
  const [teamInView, setTeamInView] = useState(false);
  const [teamCapable, setTeamCapable] = useState(false);
  const [teamVisible, setTeamVisible] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const updateCapability = () => setTeamCapable(query.matches);
    const updateVisibility = () => setTeamVisible(!document.hidden);
    updateCapability();
    updateVisibility();
    query.addEventListener("change", updateCapability);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setTeamInView(entry.isIntersecting), { threshold: 0.15 });
    if (teamRef.current) observer.observe(teamRef.current);
    return () => {
      query.removeEventListener("change", updateCapability);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const teamPlaying = enhanced && teamCapable && teamInView && teamVisible && !teamPaused && !teamHovered && !teamFocused;
  const teamCount = teamCards.length;
  const teamIndex = ((teamPos % teamCount) + teamCount) % teamCount;

  const goToTeam = (index: number) => {
    let delta = (((index - teamIndex) % teamCount) + teamCount) % teamCount;
    if (delta > teamCount / 2) delta -= teamCount;
    if (delta !== 0) setTeamPos((position) => position + delta);
  };

  useEffect(() => {
    if (!teamPlaying) return;
    const timer = window.setInterval(() => setTeamPos((position) => position + 1), 6000);
    return () => window.clearInterval(timer);
  }, [teamPlaying]);

  useEffect(() => {
    const jump = window.setTimeout(() => {
      if (teamPos >= teamCount * 2) {
        setTeamAnimate(false);
        setTeamPos((position) => position - teamCount);
      } else if (teamPos < teamCount) {
        setTeamAnimate(false);
        setTeamPos((position) => position + teamCount);
      }
    }, 580);
    return () => window.clearTimeout(jump);
  }, [teamPos, teamCount]);

  useEffect(() => {
    if (!teamAnimate) {
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setTeamAnimate(true)));
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [teamAnimate]);

  return (
    <>
      <div className="lm-dark">
        {/* PAGE 5: MEET THE TEAM / FOUNDER 3D SHOWCASE CAROUSEL */}
        <section
          ref={teamRef}
          className="section-shell lm-dark-team"
          aria-labelledby="lm-dark-team-heading"
          aria-roledescription="carousel"
          aria-label="Founder and advisory focus"
          data-enhanced={enhanced}
          onMouseEnter={() => setTeamHovered(true)}
          onMouseLeave={() => setTeamHovered(false)}
          onFocusCapture={() => setTeamFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setTeamFocused(false);
          }}
        >
          <div className="lm-dark-team-header">
            <p className="home-kicker">04 · About Us</p>
            <h2 className="home-heading" id="lm-dark-team-heading">
              An accountant who wants to know what you’re building.
            </h2>
            <p className="lm-team-subhead">
              Your accounts tell part of the story. Your plans, responsibilities and reasons for running a business tell the rest. At Lee Monarc, we bring those conversations together.
            </p>
          </div>

          <div className="lm-team-stage">
            <div
              className="lm-team-track"
              style={
                enhanced
                  ? {
                      transform: `translateX(calc(50% - ${teamPos + 0.5} * var(--lm-team-basis)))`,
                      transition: teamAnimate ? undefined : "none",
                    }
                  : undefined
              }
            >
              {enhanced
                ? Array.from({ length: teamCount * 3 }, (_, position) => {
                    const index = ((position % teamCount) + teamCount) % teamCount;
                    const card = teamCards[index];
                    const offset = position - teamPos;
                    if (offset !== 0) {
                      return (
                        <button
                          key={position}
                          type="button"
                          tabIndex={-1}
                          className="lm-team-card lm-team-card-side"
                          data-offset={offset}
                          aria-hidden={Math.abs(offset) > 1 ? "true" : undefined}
                          aria-label={`Show slide ${index + 1} of ${teamCount}: ${card.title}`}
                          onClick={() => goToTeam(index)}
                        >
                          <span className="lm-team-tag">{card.tag}</span>
                          <span className="lm-team-side-title">{card.title}</span>
                          <span className="lm-team-side-cta">
                            View <span aria-hidden="true">↗</span>
                          </span>
                        </button>
                      );
                    }
                    return (
                      <article
                        key={position}
                        className="lm-team-card lm-team-card-center"
                        data-offset="0"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${teamCount}: ${card.title}`}
                      >
                        {card.id === "founder" ? (
                          <>
                            <div className="lm-team-photo-wrap">
                              <div className="lm-team-photo-placeholder" aria-hidden="true">
                                <span className="lm-team-photo-initials">VL</span>
                                <span className="review-placeholder">Founder portrait · client to supply</span>
                              </div>
                              <div className="lm-team-impact">
                                <span>Client capital protected &amp; unlocked</span>
                                <b>Impact figure pending client confirmation</b>
                              </div>
                              <div className="lm-team-photo-overlay" aria-hidden="true">
                                {card.badges?.map((badge) => (
                                  <div key={badge} className="lm-team-badge">
                                    {badge}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="lm-team-bio">
                              <span className="lm-team-tag">{card.tag}</span>
                              <h3>{card.title}</h3>
                              <p className="lm-team-quote">{card.quote}</p>
                              <Link href={card.href} className="lm-team-link">
                                {card.linkLabel} <span aria-hidden="true">↗</span>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="lm-team-focus">
                            <span className="lm-team-tag">{card.tag}</span>
                            <h3>{card.title}</h3>
                            <p>{card.text}</p>
                            <Link href={card.href} className="lm-team-link">
                              {card.linkLabel} <span aria-hidden="true">↗</span>
                            </Link>
                          </div>
                        )}
                      </article>
                    );
                  })
                : (
                    <article className="lm-team-card lm-team-card-center" data-offset="0">
                      <div className="lm-team-photo-wrap">
                        <div className="lm-team-photo-placeholder" aria-hidden="true">
                          <span className="lm-team-photo-initials">VL</span>
                          <span className="review-placeholder">Founder portrait · client to supply</span>
                        </div>
                        <div className="lm-team-photo-overlay" aria-hidden="true">
                          {teamCards[0].badges?.map((badge) => (
                            <div key={badge} className="lm-team-badge">
                              {badge}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lm-team-bio">
                        <span className="lm-team-tag">{teamCards[0].tag}</span>
                        <h3>{teamCards[0].title}</h3>
                        <p className="lm-team-quote">{teamCards[0].quote}</p>
                        <Link href={teamCards[0].href} className="lm-team-link">
                          {teamCards[0].linkLabel} <span aria-hidden="true">↗</span>
                        </Link>
                      </div>
                    </article>
                  )}
            </div>
          </div>

          {enhanced && (
            <div className="lm-team-controls" aria-label="Team carousel controls">
              <button
                type="button"
                className="lm-team-arrow"
                aria-label="Previous slide"
                onClick={() => setTeamPos((position) => position - 1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <div className="lm-team-dots">
                {teamCards.map((card, index) => (
                  <button
                    key={card.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}: ${card.title}`}
                    aria-current={teamIndex === index ? "true" : undefined}
                    onClick={() => goToTeam(index)}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="lm-team-arrow"
                aria-label="Next slide"
                onClick={() => setTeamPos((position) => position + 1)}
              >
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="lm-team-pause"
                onClick={() => setTeamPaused(!teamPaused)}
                aria-label={teamPaused ? "Resume team rotation" : "Pause team rotation"}
                aria-pressed={teamPaused}
              >
                <span aria-hidden="true">{teamPaused ? "▶" : "Ⅱ"}</span>
              </button>
            </div>
          )}
        </section>

        {/* PAGE 6: DARKMODE 4-CARD MATRIX BENTO (ANIMATED WITH VIVIENNE'S CONTEXT) */}
        <section className="section-shell lm-bento-section" aria-labelledby="lm-bento-heading">
          <div className="lm-bento-header">
            <p className="home-kicker">Core Philosophy</p>
            <h2 className="home-heading" id="lm-bento-heading">What I believe about your business &amp; money.</h2>
          </div>

          <div className="lm-bento-grid-4">
            {beliefsContent.map((card, idx) => (
              <article
                key={card.id}
                className={`lm-bento-card ${activeBentoTab === idx ? "lm-bento-active" : ""}`}
                onClick={() => setActiveBentoTab(idx)}
                onMouseEnter={() => setActiveBentoTab(idx)}
              >
                <div className="lm-bento-badge">{card.badge}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="lm-bento-footer">
                  <span className="lm-bento-highlight">✓ {card.highlight}</span>
                </div>
              </article>
            ))}
          </div>

          {/* WORKING TOGETHER & CLOSING INVITATION MODULE */}
          <div className="lm-working-together-card">
            <div className="lm-wt-left">
              <span className="home-kicker">Working Together</span>
              <h3>What working together should feel like</h3>
              <p className="lm-wt-lead">
                <strong>You can ask the question you think you should already know the answer to.</strong>
              </p>
              <p>
                You don’t need to speak accounting language. Tell me what’s happening in the business and what you’re trying to decide. We can work from there.
              </p>
              <p>
                I’ll explain the reasoning behind my advice, raise questions that need attention and tell you when we need more information or another specialist’s input.
              </p>
            </div>
            <div className="lm-wt-right">
              <div className="lm-closing-invitation-box">
                <span className="home-kicker">Closing Invitation</span>
                <h3>What are you building towards?</h3>
                <p>I’d like to hear about your business and the decisions ahead.</p>
                <Link href="/contact" className="lm-dark-pill">
                  Start a conversation with Vivienne <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-shell lm-dark-grid">
          <article className="lm-dark-tile lm-dark-story-tile">
            <div className="lm-dark-copy">
              <h2>Profit on paper won’t pay next month’s wages.</h2>
              <p>
                Sales can grow while cash gets tighter. Money may be tied up in unpaid invoices, stock or the costs of expansion. We help you find what’s driving the gap and assess what your next commitment would mean.
              </p>
              <Link href={services[3].href}>
                Explore business advisory <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
          <article className="lm-dark-tile lm-dark-visual-tile">
            <div className="lm-dark-visual" data-paused={paused || undefined}>
              <span className="review-placeholder">Illustrative view · not a client report</span>
              <div className="lm-dark-layers" aria-hidden="true">
                <div className="lm-dark-float lm-dark-float-a"><b>Cash timing</b><span>Receipts and payments</span></div>
                <div className="lm-dark-float lm-dark-float-b"><b>Next commitment</b><span>What it would change</span></div>
                <div className="lm-dark-float lm-dark-float-c"><b>The gap</b><span>Profit is not cash</span></div>
              </div>
              <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
                {paused ? "Resume illustration" : "Pause illustration"}
              </button>
            </div>
          </article>

          <article className="lm-dark-tile lm-dark-video-tile">
            <div className="lm-dark-video-wrap">
              <span className="review-placeholder">Video module · intro pending</span>
              <div className="lm-video-mockup">
                <button type="button" className="lm-video-play-btn" aria-label="Play introductory advisory video">
                  <span aria-hidden="true">▶</span>
                </button>
              </div>
            </div>
            <div className="lm-dark-video-copy">
              <h2>Your business deserves more than a once-a-year conversation.</h2>
              <p>Lee Monarc Accounting &amp; Advisory connects your accounts and tax with the decisions you make as an owner: where to invest, what you can afford and how to build a business that gives you options.</p>
              <Link href="/about">About us <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
          <article className="lm-dark-decisions">
            <div>
              <h2>Ask the questions before you sign.</h2>
              <p>Buying a business, changing your structure or preparing to sell can shape your future for years to come. We help you consider the financial implications before you decide.</p>
            </div>
            <div className="lm-dark-decision-links">
              {[services[2], services[4], services[5]].map((service) => (
                <Link key={service.href} href={service.href}>{service.title} <span aria-hidden="true">↗</span></Link>
              ))}
            </div>
          </article>
        </div>


        {/* PAGE 6.5: DARK BANNER BREAK & EMAIL CTA */}
        <section className="section-shell lm-dark-invite" aria-labelledby="lm-dark-invite-heading">
          <span className="home-kicker">Start the Conversation</span>
          <h2 id="lm-dark-invite-heading">Bring the question.</h2>
          <p>Share where your business stands, what you want to achieve and the questions on your mind.</p>
          <div className="lm-dark-invite-ctas">
            <Link className="lm-dark-pill" href="/contact">
              Tell us what’s on your mind <span aria-hidden="true">↗</span>
            </Link>
            <a href={`mailto:${business.email}`} className="lm-email-cta-link">
              Email Vivienne Direct → <span className="lm-email-addr">{business.email}</span>
            </a>
          </div>
        </section>

        {/* PAGE 7: PANORAMIC BACKDROP & INTERACTIVE TIMELINE QUOTES */}
        <section className="section-shell lm-timeline-section" aria-labelledby="lm-timeline-heading">
          <div className="lm-timeline-header">
            <span className="home-kicker">Engagement Journey</span>
            <h2 className="home-heading" id="lm-timeline-heading">How Lee Monarc puts your numbers to work.</h2>
            <p className="lm-timeline-subhead">Explore the 4 stages from initial diagnostic conversation to decisive financial strategy.</p>
          </div>

          <div className="lm-timeline-tabs" role="tablist" aria-label="Engagement stages timeline">
            {engagementStages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                role="tab"
                id={`lm-stage-tab-${index}`}
                aria-selected={activeStage === index}
                aria-controls="lm-stage-panel"
                onClick={() => setActiveStage(index)}
                className={`lm-timeline-tab-btn ${activeStage === index ? "lm-tab-active" : ""}`}
              >
                {stage.label}
              </button>
            ))}
          </div>

          <div className="lm-timeline-card" id="lm-stage-panel" role="tabpanel" aria-labelledby={`lm-stage-tab-${activeStage}`}>
            <span className="review-placeholder">Client engagement quote &amp; metrics · Illustrative preview</span>
            <div className="lm-stage-badge">{engagementStages[activeStage].stageName}</div>
            <blockquote className="lm-stage-quote">
              <p>{engagementStages[activeStage].quote}</p>
            </blockquote>
            <div className="lm-stage-author">
              <div className="lm-author-avatar">{engagementStages[activeStage].client.charAt(0)}</div>
              <div>
                <strong>{engagementStages[activeStage].client}</strong>
                <span>{engagementStages[activeStage].role}</span>
              </div>
            </div>

            <div className="lm-stage-metrics-strip">
              {engagementStages[activeStage].metrics.map((m, idx) => (
                <div key={idx} className="lm-metric-cell">
                  <div className="lm-metric-val">{m.value}</div>
                  <div className="lm-metric-lbl">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <section className="lm-proof section-shell" aria-labelledby="lm-proof-heading" data-enhanced={enhanced}>
        <p className="home-kicker">Services</p>
        <h2 className="home-heading" id="lm-proof-heading">Six ways to start. Proof comes later.</h2>
        <div className="lm-proof-layout">
          <div className="lm-proof-selectors" role="tablist" aria-label="Service areas">
            {services.map((service, index) => (
              <button
                key={service.href}
                type="button"
                role="tab"
                id={`lm-proof-tab-${index}`}
                aria-selected={proof === index}
                aria-controls="lm-proof-panel"
                onClick={() => setProof(index)}
              >
                <span>{service.number}</span> {service.title}
              </button>
            ))}
          </div>
          <div className="lm-proof-panel" id="lm-proof-panel" role="tabpanel" aria-labelledby={`lm-proof-tab-${proof}`}>
            <span className="review-placeholder">Client proof placeholder</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <p className="lm-proof-note">Approved client stories are not on this review build.</p>
            <Link href={selected.href}>Explore this service <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="lm-proof-static">
            {services.map((service) => (
              <article key={service.href}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href}>Explore this service <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* PAGE 8: PANORAMIC CASTLE LANDSCAPE & CINEMATIC CLOSE HERO */}
      <section className="lm-closing" aria-labelledby="lm-closing-heading">
        <div className="section-shell lm-closing-inner">
          <span className="review-placeholder">Panoramic Banner · Strategic Horizon</span>
          <h2 className="home-heading" id="lm-closing-heading">What’s the decision on your mind?</h2>
          <p>Tell us what’s happening. You don’t need to know which service to ask for.</p>
          <div className="lm-closing-ctas">
            <Link className="lm-dark-pill" href="/contact">
              Tell us what’s on your mind <span aria-hidden="true">↗</span>
            </Link>
            <a href={`mailto:${business.email}`} className="lm-closing-email-pill">
              {business.email} <span aria-hidden="true">✉</span>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
