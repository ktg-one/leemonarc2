"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/content/site";
import "./dark-sections.css";

const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

const tiles = [
  {
    title: "Good decisions need accounts you can use.",
    text: "Reliable financial information helps you run your business with confidence. We support your bookkeeping, financial statements, tax returns and company compliance.",
    href: services[0].href,
    label: "Explore accounting and compliance",
  },
  {
    title: "See tax coming.",
    text: "Plan ahead with advice that considers your business and personal goals.",
    href: services[1].href,
    label: "Plan ahead for tax",
  },
];

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
    id: "vivienne",
    tag: "Founder · Chartered Accountant",
    title: "Vivienne Lee",
    quote: "“I want to know what you’re building, not just what you earned last year. The numbers become useful when we connect them to the decisions you’re facing.”",
    href: "/about",
    linkLabel: "About our advisory approach",
    badges: [
      "13 years in accounting and advisory",
      "Chartered Accountant",
      "Became a partner in early 30s · Founded Lee Monarc",
    ],
  },
  {
    id: "structuring",
    tag: "Specialist focus",
    title: "Business structuring",
    text: "Before you commit to a new corporate or trust structure, examine the tax, asset protection and growth implications.",
    href: "/services/business-structuring",
    linkLabel: "Explore structuring",
  },
  {
    id: "succession",
    tag: "Transition advisory",
    title: "Succession and exit planning",
    text: "Build a business that gives you options: growing, reducing day-to-day involvement, or preparing for an orderly transition.",
    href: "/services/succession-exit",
    linkLabel: "Explore succession",
  },
  {
    id: "cfo",
    tag: "Ongoing guidance",
    title: "Fractional CFO advisory",
    text: "Senior financial guidance for the decisions in front of you: affordability, timing and what the numbers mean for your next move.",
    href: "/services/fractional-cfo-advisory",
    linkLabel: "Explore advisory",
  },
  {
    id: "accounting",
    tag: "Foundations",
    title: "Accounting & tax",
    text: "Bookkeeping, financial statements, tax returns and company compliance — records you can actually use to run the business.",
    href: "/services/accounting-compliance",
    linkLabel: "Explore accounting",
  },
];

export function DarkSections() {
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [paused, setPaused] = useState(false);
  const [proof, setProof] = useState(0);
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
  const teamPlaying = enhanced && teamCapable && teamInView && teamVisible && !teamPaused && !teamHovered && !teamFocused;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const updateCapability = () => setTeamCapable(query.matches);
    const updateVisibility = () => setTeamVisible(!document.hidden);
    updateCapability();
    updateVisibility();
    query.addEventListener("change", updateCapability);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setTeamInView(entry.isIntersecting), { threshold: 0.2 });
    if (teamRef.current) observer.observe(teamRef.current);
    return () => {
      query.removeEventListener("change", updateCapability);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

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
        <section
          ref={teamRef}
          className="section-shell lm-dark-team"
          aria-labelledby="lm-dark-team-heading"
          aria-roledescription="carousel"
          aria-label="Founder and advisory focus"
          onMouseEnter={() => setTeamHovered(true)}
          onMouseLeave={() => setTeamHovered(false)}
          onFocusCapture={() => setTeamFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setTeamFocused(false); }}
        >
          <div className="lm-dark-team-header">
            <p className="home-kicker">Leadership &amp; Advisory</p>
            <h2 className="home-heading" id="lm-dark-team-heading">Meet the Founder.</h2>
          </div>
          <div className="lm-team-stage">
            <div
              className="lm-team-track"
              style={{ transform: `translateX(calc(50% - ${teamPos + 0.5} * var(--lm-team-basis)))`, transition: teamAnimate ? undefined : "none" }}
            >
              {Array.from({ length: teamCount * 3 }, (_, position) => {
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
                      aria-label={`Show ${index + 1} of ${teamCount}: ${card.title}`}
                      onClick={() => goToTeam(index)}
                    >
                      <span className="lm-team-tag">{card.tag}</span>
                      <span className="lm-team-side-title">{card.title}</span>
                      <span className="lm-team-side-cta">View <span aria-hidden="true">↗</span></span>
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
                    {card.id === "vivienne" ? (
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
                            {card.badges?.map((badge) => <div key={badge} className="lm-team-badge">{badge}</div>)}
                          </div>
                        </div>
                        <div className="lm-team-bio">
                          <span className="lm-team-tag">{card.tag}</span>
                          <h3>{card.title}</h3>
                          <p className="lm-team-quote">{card.quote}</p>
                          <Link href={card.href} className="lm-team-link">{card.linkLabel} <span aria-hidden="true">↗</span></Link>
                        </div>
                      </>
                    ) : (
                      <div className="lm-team-focus">
                        <span className="lm-team-tag">{card.tag}</span>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                        <Link href={card.href} className="lm-team-link">{card.linkLabel} <span aria-hidden="true">↗</span></Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
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
          {tiles.map((tile, index) => (
            <article className={index === 0 ? "lm-dark-tile lm-dark-tile-muted" : "lm-dark-tile"} key={tile.href}>
              <h2>{tile.title}</h2>
              <p>{tile.text}</p>
              <Link href={tile.href}>{tile.label} <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
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
