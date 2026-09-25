import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { services } from "@/content/site";
import "./business-acquisition.css";

export const metadata: Metadata = {
  title: "Business Acquisition and Due Diligence — Lee Monarc",
};

export default function BusinessAcquisition() {
  const businessStructing = services.find((s) => s.title === "Business structuring");
  const fractionalCfo = services.find((s) => s.title === "Fractional CFO and business advisory");

  return (
    <main id="main" className="svc-page section-shell">
      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="svc-title">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Business Acquisition and Due Diligence
        </p>
        <h1 id="svc-title">Buy the business behind the sales pitch.</h1>
        <p className="svc-lead">
          Understand the financial information behind a potential acquisition and
          identify the questions that need answering before you commit.
        </p>
        <Link href="/contact" className="button button-dark">
          Discuss a potential acquisition <Arrow diagonal />
        </Link>
      </section>

      {/* WHY IT MATTERS — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="matters-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">01 /</span> Why it matters
          </p>
          <h2 id="matters-heading">
            A good headline profit deserves a closer look.
          </h2>
        </div>
        <p className="svc-body">
          The headline figures are a starting point. You also need to understand how
          the business earns its income, what supports its performance and which
          assumptions sit behind the opportunity.
        </p>
        <p className="svc-body">
          We help you examine the available financial information and consider how the
          proposed purchase relates to your plans.
        </p>
      </section>

      {/* HOW WE CAN HELP — deck verbatim, list */}
      <section className="svc-section section-space" aria-labelledby="help-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">02 /</span> How we can help
          </p>
          <h2 id="help-heading">What we look at together.</h2>
        </div>
        <ul className="help-list">
          <li>
            <h3>Financial information review</h3>
            <p>
              Examine the accounts and supporting information made available in the
              review.
            </p>
          </li>
          <li>
            <h3>Performance analysis</h3>
            <p>
              Consider the drivers of revenue, costs and reported profitability,
              including matters that warrant further explanation.
            </p>
          </li>
          <li>
            <h3>Cashflow considerations</h3>
            <p>
              Explore the business’s cash requirements and what ownership could mean
              for your wider financial commitments.
            </p>
          </li>
          <li>
            <h3>Questions for the seller</h3>
            <p>
              Identify missing information, inconsistencies or assumptions that need
              to be clarified.
            </p>
          </li>
          <li>
            <h3>Acquisition planning</h3>
            <p>
              Discuss relevant accounting, structure and tax considerations
              alongside the findings of the review.
            </p>
          </li>
        </ul>
      </section>

      {/* OUR APPROACH — deck verbatim */}
      <section className="svc-section section-space svc-support" aria-labelledby="approach-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">03 /</span> Our approach
          </p>
          <h2 id="approach-heading">Define the questions before starting the review.</h2>
        </div>
        <p className="svc-body">
          We’ll discuss the opportunity, your proposed timeline and the information
          available. From there, we’ll agree on the scope and the areas requiring
          attention.
        </p>
        <p className="svc-body">
          The work provides financial insight for your decision. Legal, operational
          and other specialist due diligence may also be needed, depending on the
          transaction. The findings should be considered together before you proceed.
        </p>
      </section>

      {/* COMMON QUESTIONS — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="qa-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">04 /</span> Common questions
          </p>
          <h2 id="qa-heading">Questions we often hear.</h2>
        </div>
        <div className="qa-block">
          <h3>When should I involve an accountant?</h3>
          <p>
            Early in the process, before making binding commitments where possible.
            This gives you time to understand the information needed and coordinate
            the relevant advice.
          </p>
        </div>
        <div className="qa-block">
          <h3>Does due diligence guarantee a successful purchase?</h3>
          <p>
            No. It helps you investigate the information available and identify
            issues in the review. Commercial judgement and uncertainty remain part
            of any acquisition.
          </p>
        </div>
      </section>

      {/* BEFORE YOU BUY — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="before-buy-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">05 /</span> Before you buy
          </p>
          <h2 id="before-buy-heading">Five questions to take into your first review.</h2>
        </div>
        <ol className="buyer-checklist">
          <li>
            <strong>What explains the reported profit?</strong>
            <p>
              Ask about unusual income, one-off costs and expenses that may change
              under new ownership.
            </p>
          </li>
          <li>
            <strong>How does profit turn into cash?</strong>
            <p>
              Look at customer payment patterns, stock requirements and the cash needed
              to keep trading.
            </p>
          </li>
          <li>
            <strong>How much does the business depend on its owner?</strong>
            <p>
              Consider the relationships, knowledge and responsibilities that would need
              to transfer.
            </p>
          </li>
          <li>
            <strong>What commitments will continue after the purchase?</strong>
            <p>
              Identify obligations that need financial and legal review, rather than
              assuming they are reflected in the headline price.
            </p>
          </li>
          <li>
            <strong>What information is missing?</strong>
            <p>
              An unanswered question is a reason to investigate. It isn’t evidence
              that the answer will be favourable.
            </p>
          </li>
        </ol>
      </section>

      {/* CLOSING INVITATION — deck verbatim */}
      <section className="svc-closing section-space" aria-labelledby="closing-heading">
        <div className="closing-layout">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 id="closing-heading">Know which questions to ask next.</h2>
            <p className="closing-lead">
              Tell us about the business you’re considering and where you are in the
              process.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what’s on your mind <Arrow diagonal />
            </Link>
          </div>
          <aside className="closing-related" aria-label="Related services">
            <p className="related-label">Related services</p>
            {businessStructing && (
              <Link href={businessStructing.href} className="related-link">
                {businessStructing.title} <Arrow />
              </Link>
            )}
            {fractionalCfo && (
              <Link href={fractionalCfo.href} className="related-link">
                {fractionalCfo.title} <Arrow />
              </Link>
            )}
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