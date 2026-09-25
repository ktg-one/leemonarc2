import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./tax-planning.css";

export const metadata: Metadata = {
  title: "Tax Planning and Advice — Lee Monarc",
};

export default function TaxPlanning() {
  return (
    <main id="main" className="svc-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Tax Planning &amp; Advice
        </p>
        <h1 id="svc-title">
          Don’t let tax be the surprise in your plan.
        </h1>
        <p className="svc-lead">
          Understand your position and consider the tax implications of
          business decisions with time to assess your options.
        </p>
        <Link href="/contact" className="button button-dark">
          Discuss your tax planning <Arrow diagonal />
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
            The time to ask is before the decision is locked in.
          </h2>
        </div>
        <p className="svc-body">
          A planned investment, a change in ownership or a significant
          transaction can affect your tax position. Getting advice before you
          commit helps you understand those implications alongside your
          commercial goals.
        </p>
        <p className="svc-body">
          We look at your circumstances and explain the relevant
          considerations in plain language, helping you prepare for
          obligations and make informed decisions.
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
            <h3>Review your tax position</h3>
            <p>
              Consider the information available, your business activities and
              the changes that may affect your position.
            </p>
          </li>
          <li>
            <h3>Plan for upcoming obligations</h3>
            <p>
              Help you understand anticipated tax commitments and consider
              their place in your cashflow planning.
            </p>
          </li>
          <li>
            <h3>Assess proposed decisions</h3>
            <p>
              Explore the tax implications of a proposed transaction or change
              before arrangements are finalised.
            </p>
          </li>
          <li>
            <h3>Consider business and personal connections</h3>
            <p>
              Look at relevant relationships between your business interests,
              ownership arrangements and personal tax position.
            </p>
          </li>
          <li>
            <h3>Coordinate planning and compliance</h3>
            <p>
              Connect the advice with the accounting and tax return work
              included in your engagement.
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
            A tax saving is only useful if the decision makes sense.
          </h2>
        </div>
        <p className="svc-body">
          We begin with your situation and what you’re trying to achieve. We
          explain the considerations, identify the information needed and
          discuss the available next steps.
        </p>
        <p className="svc-body">
          Tax is one part of a business decision. We consider it alongside
          cashflow, commercial objectives and the way your business operates.
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
          <h3>When should I ask for advice?</h3>
          <p>
            Before a significant decision is committed to, where possible.
            Early conversations allow time to examine the implications and
            obtain any additional advice needed.
          </p>
        </div>
        <div className="qa-block">
          <h3>Is tax planning the same as preparing a return?</h3>
          <p>
            A return reports the relevant information for a tax period.
            Planning looks ahead at your position and proposed decisions. We
            can discuss both as part of your support.
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
              Give yourself time to plan.
            </h2>
            <p className="closing-lead">
              Tell us what’s changing and what you’re considering.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related services">
            <p className="related-label">Related services</p>
            <div className="related-links">
              <Link href="/services/accounting-compliance" className="related-link">
                Accounting and Compliance
                <Arrow />
              </Link>
              <Link href="/services/business-structuring" className="related-link">
                Business Structuring
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
