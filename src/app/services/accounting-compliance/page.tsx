import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./accounting-compliance.css";

export const metadata: Metadata = {
  title: "Accounting and Compliance — Lee Monarc",
};

export default function AccountingCompliance() {
  return (
    <main id="main" className="svc-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Accounting &amp; Compliance
        </p>
        <h1 id="svc-title">
          Get your accounts into shape.
          <br />
          <em>Know where you stand.</em>
        </h1>
        <p className="svc-lead">
          Keep your financial records and obligations in view, with
          accounting and compliance support that helps you understand where
          your business stands.
        </p>
        <Link href="/contact" className="button button-dark">
          Discuss your accounting needs <Arrow diagonal />
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
            If the records are unreliable, so is the starting point.
          </h2>
        </div>
        <p className="svc-body">
          When your records are difficult to follow or your accounts don’t
          give you a useful picture, planning becomes harder. Knowing what the
          numbers say starts with having a sound basis to work from.
        </p>
        <p className="svc-body">
          We help with the accounting essentials and explain what they mean for
          your business, so you can identify questions and make more informed
          decisions.
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
            <h3>Bookkeeping</h3>
            <p>
              Support with maintaining your business records and organising the
              financial information your accounts rely on.
            </p>
          </li>
          <li>
            <h3>Financial statements</h3>
            <p>
              Preparation of financial statements to help you understand the
              business’s financial position and performance.
            </p>
          </li>
          <li>
            <h3>Income tax returns</h3>
            <p>
              Support with preparing business and relevant individual income tax
              returns as part of your engagement.
            </p>
          </li>
          <li>
            <h3>Company compliance</h3>
            <p>
              ASIC compliance and company secretarial support to help keep
              company records and relevant obligations in order.
            </p>
          </li>
          <li>
            <h3>Financial reporting</h3>
            <p>
              Reports that show revenue, costs and profit, giving you a
              starting point for questions about performance.
            </p>
          </li>
        </ul>
      </section>

      {/* WORKING TOGETHER — deck verbatim */}
      <section
        className="svc-section section-space svc-support"
        aria-labelledby="work-heading"
      >
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> Working together
          </p>
          <h2 id="work-heading">
            A clear scope from the start.
          </h2>
        </div>
        <p className="svc-body">
          We’ll discuss your current records, systems, entities and
          obligations, then agree on the support you need. We’ll also clarify
          the information required from you and how we’ll work together.
        </p>
        <p className="svc-body">
          If the accounts raise a question about tax, cashflow or structure,
          we’ll explain it and recommend the next step.
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
          <h3>Can you help if my records need attention?</h3>
          <p>
            Tell us what’s up to date and what needs work. We can assess the
            position and discuss the scope required before committing to the
            work.
          </p>
        </div>
        <div className="qa-block">
          <h3>Can I combine accounting with advisory support?</h3>
          <p>
            Yes. We can combine accounting and advisory support, with the work
            and fees explained upfront.
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
              Get the records working for you.
            </h2>
            <p className="closing-lead">
              Let’s talk about your records, your obligations and the
              accounting support your business needs.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related service">
            <p className="related-label">Related service</p>
            <Link href="/services/tax-planning" className="related-link">
              Tax Planning and Advice
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
