"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
import "./dark-sections.css";

const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

const timelineTabs = ["Palantir", "Owner", "Basis", "Hightouch", "Pallet", "Decagon"];

const timelineQuotes: Record<string, { quote: string; metrics: string }> = {
  Palantir: { quote: "Partnering with Lee Monarc unlocked capital strategy and precision execution across complex portfolios.", metrics: "$84M Capital Protected • 24h Principal SLA • 100% Audit Precision" },
  Owner: { quote: "Their cashflow forecasting and advisory provided total clarity before every expansion phase.", metrics: "$42M Portfolio Scope • Weekly Cashflow Syncs • 0% Unplanned Deficits" },
  Basis: { quote: "The strategic due diligence saved us millions in unrecorded enterprise liabilities.", metrics: "$65M Transaction Scope • 14 Sector Coverage • 100% Due Diligence Depth" },
  Hightouch: { quote: "The fractional CFO advice helped us transition from rapid growth to high profit margins.", metrics: "$32M Annual Revenue • 3.2x Margin Expansion • 24h SLA Support" },
  Pallet: { quote: "Lee Monarc gives us institutional grade ledger auditing and clear owner options.", metrics: "$18M Capital Allocation • 100% Tax Alignment • Full Peace of Mind" },
  Decagon: { quote: "From business structuring to succession planning, Vivienne Lee is an irreplaceable advisor.", metrics: "$50M Wealth Scope • Family Group Structuring • Multi-Entity Governance" },
};

export function DarkSections() {
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [paused, setPaused] = useState(false);
  const [proof, setProof] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState("Palantir");
  const [darkEmailInput, setDarkEmailInput] = useState("");
  const [castleEmailInput, setCastleEmailInput] = useState("");
  const selected = services[proof];

  return (
    <>
      <div className="lm-dark">
        {/* PAGE 5: MEET THE TEAM 3D DEPTH CAROUSEL (DARKMODE) */}
        <section className="section-shell lm-team-section" aria-labelledby="lm-team-heading">
          <div className="lm-team-header">
            <p className="home-kicker">04 · About Us &amp; Team</p>
            <h2 className="home-heading" id="lm-team-heading">Meet the Advisory Leadership</h2>
          </div>

          <div className="lm-3d-team-showcase">
            <div className="lm-3d-card lm-3d-side-left">
              <div className="lm-3d-avatar">AD</div>
              <h4>Associate Director</h4>
              <p className="lm-3d-impact">$42,000,000 Client Capital Advised</p>
            </div>

            <div className="lm-3d-card lm-3d-centerpiece">
              <div className="lm-3d-avatar-main">VL</div>
              <span className="lm-founder-tag">FOUNDER &amp; CHARTERED ACCOUNTANT</span>
              <h3>Vivienne Lee</h3>
              <div className="lm-monetary-impact-overlay">
                <b>$84,000,000</b>
                <span>client capital protected &amp; unlocked</span>
              </div>
              <p className="lm-3d-bio">
                Over 13 years in accounting and advisory. Partner in her early 30s before founding Lee Monarc to bring direct principal support and commercial clarity to business owners.
              </p>
            </div>

            <div className="lm-3d-card lm-3d-side-right">
              <div className="lm-3d-avatar">SP</div>
              <h4>Senior Partner</h4>
              <p className="lm-3d-impact">$65,000,000 Transaction Advisory</p>
            </div>
          </div>

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
        </section>

        {/* PAGE 6: DARKMODE 4-CARD MATRIX BENTO */}
        <section className="section-shell lm-bento-section" aria-labelledby="lm-bento-heading">
          <div className="lm-bento-header">
            <p className="home-kicker">MATRIX ARCHITECTURE</p>
            <h2 className="home-heading" id="lm-bento-heading">Precision Advisory Matrix</h2>
          </div>

          <div className="lm-matrix-4grid">
            {/* Top Left */}
            <article className="lm-matrix-card lm-matrix-tl">
              <span className="lm-editorial-badge">• STRATEGIC ADVISORY</span>
              <h3>Decision-Driven Financial Reporting</h3>
              <p>
                Your accounts should help you make a decision. We connect your bookkeeping, financial statements, and tax returns directly with your strategic growth targets.
              </p>
            </article>

            {/* Top Right */}
            <article className="lm-matrix-card lm-matrix-tr">
              <div className="lm-video-call-mockup">
                <div className="lm-video-status-bar">
                  <span className="lm-dot-red" />
                  <span>CALIBRATION ACTIVE · ROLE MATCHED</span>
                </div>
                <div className="lm-video-screen">
                  <span className="lm-video-speaker">Vivienne Lee (Principal)</span>
                  <p>“Good news! Your cashflow forecast shows room for your next hire.”</p>
                </div>
              </div>
            </article>

            {/* Bottom Left */}
            <article className="lm-matrix-card lm-matrix-bl">
              <div className="lm-reward-breakdown">
                <span className="home-kicker">Live Candidate Reward &amp; Fee Calculation</span>
                <b className="lm-reward-figure">$283,050</b>
                <span className="lm-reward-sub">projected rewards &amp; capital tax savings</span>
              </div>
            </article>

            {/* Bottom Right */}
            <article className="lm-matrix-card lm-matrix-br">
              <div className="lm-duo-search-card">
                <h4>Candidate &amp; Advisor Search</h4>
                <div className="lm-search-bar-wrap">
                  <span className="lm-search-icon">🔍</span>
                  <input
                    type="text"
                    readOnly
                    value="Search across 2.7M profiles..."
                    className="lm-search-input"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* PAGE 6.5 & 7: TIMELINE SLIDER & DYNAMIC QUOTES */}
        <section className="section-shell lm-timeline-section" aria-label="Timeline Slider & Banner Break">
          {/* 6.5 Banner Break */}
          <div className="lm-banner-break-65">
            <h2 className="home-heading light-text">The fastest way to scale your recruiting business</h2>
            <div className="lm-email-capture">
              <input
                type="email"
                placeholder="Enter work email..."
                value={darkEmailInput}
                onChange={(e) => setDarkEmailInput(e.target.value)}
              />
              <button type="button" className="pill-link">Get Started →</button>
            </div>
          </div>

          {/* Page 7: Mountain Backdrop & Dynamic Quotes */}
          <div className="lm-mountain-backdrop-container">
            <div className="lm-mountain-overlay">
              <div className="lm-timeline-tabs" role="tablist">
                {timelineTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTimeline === tab}
                    className={`lm-timeline-tab ${activeTimeline === tab ? "active" : ""}`}
                    onClick={() => setActiveTimeline(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="lm-dynamic-quote-box">
                <p className="lm-dynamic-quote">“{timelineQuotes[activeTimeline].quote}”</p>
                <div className="lm-metrics-strip">
                  <span>{timelineQuotes[activeTimeline].metrics}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL PAGE: CASTLE HERO */}
        <section className="lm-castle-hero-section" aria-label="Castle Hero Banner">
          <div className="lm-castle-landscape-banner">
            <div className="lm-castle-overlay-content">
              <h2 className="home-heading light-text">Make hiring your competitive advantage</h2>
              <div className="lm-email-pill-cta">
                <input
                  type="email"
                  placeholder="Enter work email address..."
                  value={castleEmailInput}
                  onChange={(e) => setCastleEmailInput(e.target.value)}
                />
                <button type="button" className="pill-link">Tell us what's on your mind →</button>
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
