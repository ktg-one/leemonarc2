import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./succession-exit.css";

export const metadata: Metadata = {
  title: "Succession and Exit Planning — Lee Monarc",
};

export default function SuccessionExit() {
  return (
    <main id="main" className="svc-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Succession &amp; Exit Planning
        </p>
        <h1 id="svc-title">
          Build a business that can work without you.
        </h1>
        <p className="svc-lead">
          Whether you plan to sell, step back or pass on ownership, early
          preparation gives you time to understand your options and work
          towards them.
        </p>
        <Link href="/contact" className="button button-dark">
          Start planning your next chapter <Arrow diagonal />
        </Link>
      </section>

      {/* WHY IT MATTERS — deck verbatim */}
      <section
        className="svc-section section-space"
        aria-labelledby="matter-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">01 /</span> Why it matters
          </p>
          <h2 id="matter-heading">
            Your exit plan starts while you’re still running the business.
          </h2>
        </div>
        <p className="svc-body">
          Your business may rely heavily on your knowledge, relationships and
          daily involvement. Preparing for change means understanding those
          dependencies as well as the financial position.
        </p>
        <p className="svc-body">
          We help you consider what needs attention so that your plans for the
          business and your own future can move forward together.
        </p>
      </section>

      {/* HOW WE CAN HELP — deck verbatim, list */}
      <section
        className="svc-section section-space"
        aria-labelledby="help-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">02 /</span> How we can help
          </p>
          <h2 id="help-heading">
            What we cover.
          </h2>
        </div>
        <ul className="help-list">
          <li>
            <h3>Clarify your objectives</h3>
            <p>
              Discuss the outcome you want, who may be involved and the timing
              you have in mind.
            </p>
          </li>
          <li>
            <h3>Review financial readiness</h3>
            <p>
              Look at financial records, reporting and performance to identify
              areas that need attention ahead of a transition.
            </p>
          </li>
          <li>
            <h3>Consider owner dependence</h3>
            <p>
              Explore where the business relies on you and how that affects its
              ability to operate through change.
            </p>
          </li>
          <li>
            <h3>Plan around ownership and tax</h3>
            <p>
              Consider relevant structuring and tax questions before
              arrangements are finalised, alongside other professional advice
              where required.
            </p>
          </li>
          <li>
            <h3>Identify practical next steps</h3>
            <p>
              Translate the review into priorities that can be addressed over
              time as the business prepares.
            </p>
          </li>
        </ul>
      </section>

      {/* OUR APPROACH — deck verbatim */}
      <section
        className="svc-section section-space svc-support"
        aria-labelledby="approach-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> Our approach
          </p>
          <h2 id="approach-heading">
            Saleability is something you build over time.
          </h2>
        </div>
        <p className="svc-body">
          You don’t need a buyer or a fixed retirement date to start the
          conversation. Understanding the current position can help you see
          which changes would support a future transition.
        </p>
        <p className="svc-body">
          We’ll discuss your goals, review the relevant financial information
          and agree on the advice you need. Where legal, valuation or other
          specialist work is required, it should form part of the wider plan.
        </p>
      </section>

      {/* COMMON QUESTIONS — deck verbatim */}
      <section
        className="svc-section section-space"
        aria-labelledby="qa-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">04 /</span> Common questions
          </p>
          <h2 id="qa-heading">
            Questions we often hear.
          </h2>
        </div>
        <div className="qa-block">
          <h3>What if I’m several years away from stepping back?</h3>
          <p>
            That can be a useful time to begin. Some improvements and
            transitions take time, and an early review can help you
            prioritise.
          </p>
        </div>
        <div className="qa-block">
          <h3>Can this include a family succession?</h3>
          <p>
            Yes. We help assess the accounting, ownership and tax questions in
            a family transition, alongside any legal or other specialist advice
            needed.
          </p>
        </div>
      </section>

      {/* CLOSING INVITATION — deck verbatim */}
      <section
        className="svc-closing section-space"
        aria-labelledby="closing-heading"
      >
        <div className="closing-layout">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 id="closing-heading">
              What would you like your next chapter to look like?
            </h2>
            <p className="closing-lead">
              Let’s discuss the business you’ve built and the future you want
              to prepare for.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related services">
            <p className="related-label">Related services</p>
            <div className="related-links">
              <Link href="/services/business-structuring" className="related-link">
                Business Structuring
                <Arrow />
              </Link>
              <Link href="/services/tax-planning" className="related-link">
                Tax Planning and Advice
                <Arrow />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="page-endnote">
        <span>Personal by design.</span>
        <span>Accounting · Advisory · e-CFO</span>
      </div>
    </main>
  );
}
