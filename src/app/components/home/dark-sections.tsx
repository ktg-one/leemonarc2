"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
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

export function DarkSections() {
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [paused, setPaused] = useState(false);
  const [proof, setProof] = useState(0);
  const [activeBentoTab, setActiveBentoTab] = useState(0);
  const [bentoSearchQuery, setBentoSearchQuery] = useState("");
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

        {/* PAGE 6: DARKMODE 4-CARD MATRIX BENTO (PARAFORM CLONE MATCHING FILE 6.PNG) */}
        <section className="section-shell lm-bento-section" aria-labelledby="lm-bento-heading">
          <div className="lm-bento-header">
            <p className="home-kicker">Core Philosophy &amp; Platform</p>
            <h2 className="home-heading" id="lm-bento-heading">AI to supercharge you &amp; your business decisions.</h2>
          </div>

          <div className="lm-bento-matrix-4">
            {/* CARD 1: TOP WIDE CARD (2 COLUMNS) */}
            <article className="lm-bento-card lm-bento-wide-card">
              <div className="lm-bento-wide-left">
                <div className="lm-bento-badge">AI &amp; DECISION ADVISORY</div>
                <h3>AI to supercharge you</h3>
                <p>
                  Our AI agents do the heavy lifting - surfacing great-fit roles, getting hiring managers interested, and handling the busy work - so you can focus on what only you can do: building real relationships and placing great people.
                </p>
                <div className="lm-bento-footer">
                  <span className="lm-bento-highlight">✓ Real-time ledger auditing &amp; decision support</span>
                </div>
              </div>
              <div className="lm-bento-wide-right">
                <div className="lm-bento-video-call-mockup">
                  {/* Top Floating Badge */}
                  <div className="lm-vcall-chip lm-vcall-chip-top">
                    <span className="lm-vcall-icon">✨</span>
                    <div className="lm-vcall-chip-text">
                      <strong>5 opportunities matched</strong>
                      <span>Senior Full Stack · $100k - $240k</span>
                    </div>
                  </div>

                  {/* Main Video Call Window */}
                  <div className="lm-vcall-window">
                    <div className="lm-vcall-header">
                      <span className="lm-vcall-status-dot" />
                      <span>9:32 AM | Alex x Aiko</span>
                    </div>
                    <div className="lm-vcall-video-feed">
                      <div className="lm-vcall-avatar-wrap">
                        <div className="lm-vcall-avatar">AA</div>
                        <span className="lm-vcall-mic">🎤</span>
                      </div>
                      <div className="lm-vcall-tag">
                        <span>Aiko</span>
                        <small>Candidate</small>
                      </div>
                    </div>
                  </div>

                  {/* Right Floating Badge */}
                  <div className="lm-vcall-chip lm-vcall-chip-right">
                    <span className="lm-vcall-icon">⚙️</span>
                    <div className="lm-vcall-chip-text">
                      <strong>AI candidate calibration</strong>
                      <span>Experience in technical, customer facing roles</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 2: BOTTOM LEFT CARD (1 COLUMN) */}
            <article className="lm-bento-card lm-bento-reward-card">
              <div className="lm-bento-card-text">
                <h3>Say goodbye to business development</h3>
              </div>
              <div className="lm-reward-widget">
                <div className="lm-reward-header">
                  <div className="lm-reward-brand-icon">🌱</div>
                  <div className="lm-reward-header-info">
                    <h4>Software Engineer, SDK</h4>
                    <p>$200k - $230k • Brooklyn • Hiring 7</p>
                  </div>
                </div>
                <div className="lm-reward-tabs" role="tablist">
                  <button type="button" className="lm-reward-tab active" role="tab" aria-selected="true">Reward</button>
                  <button type="button" className="lm-reward-tab" role="tab">Role details</button>
                  <button type="button" className="lm-reward-tab" role="tab">About Fern</button>
                  <button type="button" className="lm-reward-tab" role="tab">Ideal companies</button>
                </div>
                <div className="lm-reward-breakdown">
                  <div className="lm-reward-row">
                    <span>Base hire reward</span>
                    <span>~ 40,250 x 7</span>
                  </div>
                  <div className="lm-reward-row">
                    <span>Bonus</span>
                    <span>$1,300</span>
                  </div>
                </div>
                <div className="lm-reward-total-wrap">
                  <span className="lm-reward-label">Total rewards</span>
                  <div className="lm-reward-total-amount">$283,050</div>
                </div>
                <button type="button" className="lm-reward-submit-btn">
                  Submit candidate
                </button>
              </div>
            </article>

            {/* CARD 3 & 4: BOTTOM RIGHT DUO CARD (1 COLUMN) */}
            <article className="lm-bento-card lm-bento-duo-card">
              {/* DUO TOP: ALL THE TOOLS */}
              <div className="lm-duo-top-section">
                <h3>All the tools to make recruiting easy</h3>
                <p>
                  Access an all-in-one AI toolkit with sourcing, candidate matching, CRM, notetaker, scheduler and more - completely free of charge.
                </p>

                <div className="lm-duo-search-container">
                  <div className="lm-duo-profiles-bg">
                    <div className="lm-profile-pill">
                      <span className="lm-prof-avatar">HK</span>
                      <div>
                        <strong>Haeni Kim</strong>
                        <small>iOS Developer</small>
                      </div>
                      <span className="lm-prof-icons">🔖 💬</span>
                    </div>
                    <div className="lm-profile-pill">
                      <span className="lm-prof-avatar">CR</span>
                      <div>
                        <strong>Chisom Robertson</strong>
                        <small>Frontend Developer</small>
                      </div>
                    </div>
                    <div className="lm-profile-pill">
                      <span className="lm-prof-avatar">MS</span>
                      <div>
                        <strong>Mike S...</strong>
                        <small>Chief Frontend Architect</small>
                      </div>
                    </div>
                  </div>

                  <div className="lm-duo-search-bar">
                    <input
                      type="text"
                      placeholder="Search across 2.7M profiles..."
                      value={bentoSearchQuery}
                      onChange={(e) => setBentoSearchQuery(e.target.value)}
                      aria-label="Search across profiles"
                    />
                    <button type="button" className="lm-duo-search-btn" aria-label="Submit search">
                      🔍
                    </button>
                  </div>
                </div>
              </div>

              {/* DUO BOTTOM: LEAVE FOLLOW-UPS */}
              <div className="lm-duo-bottom-section">
                <h3>Leave the follow-ups to us</h3>
                <p>
                  From client comms to feedback and payments, we manage the manual work so you can stay focused on recruiting.
                </p>
                <div className="lm-duo-submitted-tag">
                  <span className="lm-duo-check">✓</span>
                  <span>You submitted a candidate</span>
                </div>
              </div>
            </article>
          </div>

          {/* CORE BELIEFS CAROUSEL / BENTO */}
          <div className="lm-beliefs-grid">
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

        <section className="section-shell lm-dark-invite" aria-labelledby="lm-dark-invite-heading">
          <h2 id="lm-dark-invite-heading">Bring the question.</h2>
          <p>Share where your business stands, what you want to achieve and the questions on your mind.</p>
          <Link className="lm-dark-pill" href="/contact">Tell us what’s on your mind <span aria-hidden="true">↗</span></Link>
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

      <section className="lm-closing" aria-labelledby="lm-closing-heading">
        <div className="section-shell lm-closing-inner">
          <span className="review-placeholder">Mood image · not the office</span>
          <h2 className="home-heading" id="lm-closing-heading">What’s the decision on your mind?</h2>
          <p>Tell us what’s happening. You don’t need to know which service to ask for.</p>
          <Link className="lm-dark-pill" href="/contact">Tell us what’s on your mind <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
