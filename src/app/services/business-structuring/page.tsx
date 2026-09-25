import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./business-structuring.css";

export const metadata: Metadata = {
  title: "Business Structuring — Lee Monarc",
};

export default function BusinessStructuring() {
  return (
    <main id="main" className="svc-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Business Structuring
        </p>
        <h1 id="svc-title">
          Does your business still fit its structure?
        </h1>
        <p className="svc-lead">
          Consider how ownership, tax, business risk and future plans fit
          together when establishing or reviewing your business structure.
        </p>
        <Link href="/contact" className="button button-dark">
          Talk about your structure <Arrow diagonal />
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
            What worked at the start may not fit the next stage.
          </h2>
        </div>
        <p className="svc-body">
          The structure you started with may need another look as the business
          grows, new owners become involved or your priorities change.
        </p>
        <p className="svc-body">
          We help you assess your existing arrangements or consider a new
          structure in the context of your circumstances. A structure is a
          business decision, not a box to tick. We look at how it works in
          practice, as well as its accounting and tax implications.
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
            <h3>Establishing a business</h3>
            <p>
              Consider the accounting and tax implications of available entity
              and ownership arrangements.
            </p>
          </li>
          <li>
            <h3>Reviewing an existing structure</h3>
            <p>
              Assess how current arrangements relate to your operations,
              business interests and future plans.
            </p>
          </li>
          <li>
            <h3>Changes in ownership or activity</h3>
            <p>
              Explore the financial and tax considerations when bringing in an
              owner, adding a business activity or planning a transition.
            </p>
          </li>
          <li>
            <h3>Family and business interests</h3>
            <p>
              Consider how relevant entities and ownership arrangements connect
              across your business and family circumstances.
            </p>
          </li>
        </ul>
      </section>

      {/* WORKING THROUGH THE DECISION — deck verbatim */}
      <section
        className="svc-section section-space svc-support"
        aria-labelledby="decision-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> Working through the decision
          </p>
          <h2 id="decision-heading">
            Start with the purpose, then consider the options.
          </h2>
        </div>
        <p className="svc-body">
          We’ll discuss how the business operates, who is involved and what you
          want the structure to support. We’ll review the relevant information
          and explain the considerations, including potential costs and
          implications of change.
        </p>
        <p className="svc-body">
          Where the work involves legal documents or asset protection questions,
          legal advice is an important part of the process. We can work
          alongside your solicitor and other advisors in the review.
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
          <h3>Is there one best structure for every business?</h3>
          <p>
            No. An appropriate arrangement depends on the people involved, the
            business activities and the objectives. It also needs to be
            considered in light of relevant obligations and circumstances.
          </p>
        </div>
        <div className="qa-block">
          <h3>Should I review my structure before selling or buying a business?</h3>
          <p>
            It can be useful to seek advice early so that ownership and tax
            considerations are part of the planning, rather than an
            afterthought.
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
              Check the structure before you change the business.
            </h2>
            <p className="closing-lead">
              Let’s discuss what your structure needs to support.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related services">
            <p className="related-label">Related services</p>
            <div className="related-links">
              <Link href="/services/tax-planning" className="related-link">
                Tax Planning and Advice
                <Arrow />
              </Link>
              <Link href="/services/succession-exit" className="related-link">
                Succession and Exit Planning
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
