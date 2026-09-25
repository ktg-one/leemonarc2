import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./fractional-cfo-advisory.css";

export const metadata: Metadata = {
  title: "Fractional CFO and Business Advisory — Lee Monarc",
};

export default function FractionalCfoAdvisory() {
  return (
    <main id="main" className="svc-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Fractional CFO &amp; Business Advisory
        </p>
        <h1 id="svc-title">
          Can the business afford what you want to do next?
        </h1>
        <p className="svc-lead">
          Experienced financial guidance to help you understand cashflow,
          assess performance and consider the decisions ahead.
        </p>
        <Link href="/contact" className="button button-dark">
          Talk about your next move <Arrow diagonal />
        </Link>
      </section>

      {/* WHY IT MATTERS — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="matter-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">01 /</span> Why it matters
          </p>
          <h2 id="matter-heading">
            Revenue is a headline.
            <br />
            <em>Cashflow tells you what you can commit to.</em>
          </h2>
        </div>
        <p className="svc-body">
          Can the business afford another hire? Why is cash tight when sales
          are strong? What would an expansion mean for your commitments over
          the coming months?
        </p>
        <p className="svc-body">
          We help you investigate the questions behind your reports and connect
          the findings to practical decisions. Fractional CFO support gives you
          access to financial guidance without employing a full-time chief
          financial officer.
        </p>
      </section>

      {/* HOW WE CAN HELP — deck verbatim, list */}
      <section className="svc-section section-space" aria-labelledby="help-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">02 /</span> How we can help
          </p>
          <h2 id="help-heading">
            What we look at together.
          </h2>
        </div>
        <ul className="help-list">
          <li>
            <h3>Cashflow analysis and forecasting</h3>
            <p>
              Understand the timing of money coming in and going out, and
              explore how planned changes could affect the position.
            </p>
          </li>
          <li>
            <h3>Business performance reviews</h3>
            <p>
              Look at revenue, costs and profitability to identify what
              deserves closer attention.
            </p>
          </li>
          <li>
            <h3>Management reporting</h3>
            <p>
              Develop a more useful view of performance, with reporting shaped
              around the questions you need to answer.
            </p>
          </li>
          <li>
            <h3>Budgeting and decision support</h3>
            <p>
              Assess plans and assumptions so you can consider the financial
              implications of a hire, investment or change in operations.
            </p>
          </li>
          <li>
            <h3>Financial systems</h3>
            <p>
              Review how information is gathered and reported, with attention to
              whether it supports useful and timely decisions.
            </p>
          </li>
        </ul>
      </section>

      {/* HOW SUPPORT WORKS — deck verbatim */}
      <section className="svc-section section-space svc-support" aria-labelledby="support-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> How support works
          </p>
          <h2 id="support-heading">
            Start with the decision.
            <br />
            <em>Build the reporting around it.</em>
          </h2>
        </div>
        <p className="svc-body">
          We start with the question you need answered and the financial
          information you already have. From there, we identify what to
          analyse, which assumptions to test and what reporting will help you
          act on the findings.
        </p>
        <p className="svc-body">
          Before ongoing support begins, we agree on the reports, meeting
          frequency and responsibilities. You should know what you’ll receive
          and how it will be used.
        </p>
        <p className="svc-body">
          Forecasts depend on assumptions. We help you understand those
          assumptions and consider how different outcomes could affect your
          plans.
        </p>
      </section>

      {/* COMMON QUESTIONS — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="qa-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">04 /</span> Common questions
          </p>
          <h2 id="qa-heading">
            Questions we often hear.
          </h2>
        </div>
        <div className="qa-block">
          <h3>Do I need a large business to benefit?</h3>
          <p>
            The need depends on the complexity of your decisions and the
            support already available to you. We can discuss whether advisory
            or fractional CFO support is appropriate for your situation.
          </p>
        </div>
        <div className="qa-block">
          <h3>Can you help with one specific decision?</h3>
          <p>
            Yes. Start with the decision and we’ll identify the information and
            analysis needed to help you assess it.
          </p>
        </div>
      </section>

      {/* CLOSING INVITATION — deck verbatim */}
      <section className="svc-closing section-space" aria-labelledby="closing-heading">
        <div className="closing-layout">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 id="closing-heading">
              What would you like your numbers to explain?
            </h2>
            <p className="closing-lead">
              Bring the question you’ve been trying to answer. We’ll discuss how
              we can help.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related service">
            <p className="related-label">Related service</p>
            <Link href="/services/accounting-compliance" className="related-link">
              Accounting and Compliance
              <Arrow />
            </Link>
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
