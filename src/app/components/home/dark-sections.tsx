"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { services, business } from "@/content/site";
import "./dark-sections.css";

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
    body: "Before you hire, buy, restructure or sell, there’s an opportunity to test the assumptions. After you’ve committed, some of those choices have already gone.",
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
      { label: "Initial SLA", value: "24h Response" },
      { label: "Preparation Required", value: "Zero Brief Needed" },
      { label: "Scope Alignment", value: "Clear Upfront Fees" },
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
      { label: "Cashflow Clarity", value: "100% Transparent" },
      { label: "Structure Review", value: "Risk & Tax Aligned" },
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

  return (
    <>
      <div className="lm-dark">
        {/* PAGE 5: MEET THE TEAM / FOUNDER SHOWCASE */}
        <section className="section-shell lm-team-section" aria-labelledby="lm-team-heading">
          <div className="lm-team-header">
            <p className="home-kicker">04 · About Us</p>
            <h2 className="home-heading" id="lm-team-heading">An accountant who wants to know what you’re building.</h2>
            <p className="lm-team-subhead">
              Your accounts tell part of the story. Your plans, responsibilities and reasons for running a business tell the rest. At Lee Monarc, we bring those conversations together.
            </p>
          </div>

          <div className="lm-founder-card-grid">
            <article className="lm-founder-main-card">
              <div className="lm-founder-photo-area">
                <div className="lm-founder-avatar">
                  <span>VL</span>
                </div>
                <div className="lm-founder-badge-list">
                  <span className="lm-fbadge">13+ Years Advisory</span>
                  <span className="lm-fbadge">Chartered Accountant</span>
                  <span className="lm-fbadge">Perth · Australia-Wide</span>
                </div>
              </div>
              <div className="lm-founder-bio-area">
                <span className="lm-founder-tag">FOUNDER &amp; PRINCIPAL</span>
                <h3>Vivienne Lee</h3>
                <p className="lm-founder-lead">
                  “I built Lee Monarc around the way I believe advice should work.”
                </p>
                <div className="lm-founder-story">
                  <p>
                    Over 13 years in accounting and advisory, I’ve worked with business owners and family groups whose decisions reach well beyond a set of accounts. A hire changes someone’s workload. An acquisition changes their exposure to risk. A succession plan affects their family and the future of something they’ve spent years building.
                  </p>
                  <p>
                    I began in a boutique firm, completed my CA while working full time and became a partner in my early 30s. After two years as a partner, I established Lee Monarc to build a firm around my own standards of advice, reliability and care.
                  </p>
                </div>
                <Link href="/contact" className="lm-dark-pill lm-founder-cta">
                  Tell us about your business <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>

            <div className="lm-clarity-bento-column">
              <div className="lm-clarity-card">
                <span className="lm-clarity-icon">⚡</span>
                <h4>Institutional Execution Speed</h4>
                <p>Direct principal access with 24-hour SLA response times on urgent financial advisory calls.</p>
              </div>
              <div className="lm-clarity-card">
                <span className="lm-clarity-icon">🔍</span>
                <h4>Real-time Ledger Auditing</h4>
                <p>Proactive cashflow and ledger reviews before major commitments, hires, or acquisitions.</p>
              </div>
            </div>
          </div>
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
          <article className="lm-dark-wide">
            <div className="lm-dark-copy">
              <h2>Profit on paper won’t pay next month’s wages.</h2>
              <p>
                Sales can grow while cash gets tighter. Money may be tied up in unpaid invoices, stock or the costs of expansion. We help you find what’s driving the gap and assess what your next commitment would mean.
              </p>
              <Link href={services[3].href}>
                Explore business advisory <span aria-hidden="true">↗</span>
              </Link>
            </div>
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
