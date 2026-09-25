"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
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

export function DarkSections() {
  const enhanced = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [paused, setPaused] = useState(false);
  const [proof, setProof] = useState(0);
  const selected = services[proof];

  return (
    <>
      <div className="lm-dark">
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
                <span>{service.number}</span>
                {service.title}
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
