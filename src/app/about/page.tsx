import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import "./about.css";

export const metadata: Metadata = {
  title: "About — Lee Monarc",
};

export default function About() {
  return (
    <main id="main" className="about-page section-stack">
      {/* HERO — deck verbatim */}
      <section className="about-hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">An accountant who wants to know what you’re building.</h1>
        <p className="about-lead">
          Your accounts tell part of the story. Your plans, responsibilities and
          reasons for running a business tell the rest. At Lee Monarc, we bring
          those conversations together.
        </p>
        <p className="about-location">Based in Perth, working with business owners, high-net-worth individuals and family groups across Australia.</p>
        <Link href="/contact" className="button button-dark">
          Tell us about your business <Arrow diagonal />
        </Link>
      </section>

      {/* A NOTE FROM VIVIENNE — PROVISIONAL: awaiting client approval */}
      {/* PROVISIONAL-PENDING-VIVIENNE */}
      <section className="about-note" aria-labelledby="note-heading">
        <h2 id="note-heading">A note from Vivienne</h2>
        <p className="about-quote">
          I built Lee Monarc around the way I believe advice should work.
        </p>
        <p className="about-body">
          I’m Vivienne Lee, a Chartered Accountant and the founder of Lee Monarc
          Accounting &amp; Advisory.
        </p>
        <p className="about-body">
          Over 13 years in accounting and advisory, I’ve worked with business owners
          and family groups whose decisions reach well beyond a set of accounts. A
          hire changes someone’s workload. An acquisition changes their exposure to
          risk. A succession plan affects their family and the future of something
          they’ve spent years building.
        </p>
        <p className="about-body">
          I began in a boutique firm, completed my CA while working full time and
          became a partner in my early 30s. After two years as a partner, I
          established Lee Monarc to build a firm around my own standards of advice,
          reliability and care.
        </p>
        <p className="about-body">
          For me, that means asking what you want to achieve, explaining the numbers
          in language you can use and being honest when a question needs more work.
          It means looking ahead with you, as well as getting the reporting right.
        </p>
        {/* /PROVISIONAL-PENDING-VIVIENNE */}
      </section>

      {/* WHAT I BELIEVE — deck verbatim */}
      <section className="about-section about-believe" aria-labelledby="believe-heading">
        <div className="section-heading">
          <h2 id="believe-heading">What I believe</h2>
        </div>

        <div className="belief-block">
          <p className="belief-statement">
            <strong>Your accounts should help you make a decision.</strong>
          </p>
          <p className="about-body">
            A report needs to do more than arrive in your inbox. It should help
            answer a question about the business: what’s working, where cash is going
            or what needs to change.
          </p>
        </div>

        <div className="belief-block">
          <p className="belief-statement">
            <strong>Profit and cash need separate conversations.</strong>
          </p>
          <p className="about-body">
            A profitable business can still struggle to meet its commitments. Looking
            at both gives you a more useful picture of what the business can afford.
          </p>
        </div>

        <div className="belief-block">
          <p className="belief-statement">
            <strong>Advice is most useful while you still have options.</strong>
          </p>
          <p className="about-body">
            Before you hire, buy, restructure or sell, there’s an opportunity to test
            the assumptions. After you’ve committed, some of those choices have
            already gone.
          </p>
        </div>

        <div className="belief-block">
          <p className="belief-statement">
            <strong>A business should give its owner options.</strong>
          </p>
          <p className="about-body">
            That might mean growing, reducing day-to-day involvement or preparing for
            a future sale. Those goals deserve attention long before you’re ready to
            step away.
          </p>
        </div>
      </section>

      {/* WHAT WORKING TOGETHER SHOULD FEEL LIKE — deck verbatim */}
      <section className="about-section about-together" aria-labelledby="together-heading">
        <div className="section-heading">
          <h2 id="together-heading">What working together should feel like</h2>
        </div>

        <div className="together-block">
          <p className="about-body">
            <strong>You can ask the question you think you should already know the
            answer to.</strong>
          </p>
          <p className="about-body">
            You don’t need to speak accounting language. Tell me what’s happening in
            the business and what you’re trying to decide. We can work from there.
          </p>
          <p className="about-body">
            I’ll explain the reasoning behind my advice, raise questions that need
            attention and tell you when we need more information or another
            specialist’s input.
          </p>
        </div>
      </section>

      {/* CLOSING INVITATION — deck verbatim */}
      <section className="about-closing section-space" aria-labelledby="closing-heading">
        <div className="closing-layout">
          <div>
            <h2 id="closing-heading">What are you building towards?</h2>
            <p className="closing-lead">
              I’d like to hear about your business and the decisions ahead.
            </p>
            <Link href="/contact" className="button button-dark">
              Start a conversation with Vivienne <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>

      <div className="page-endnote">
        <span>Personal by design.</span>
        <span>Accounting · Advisory · e-CFO</span>
      </div>
    </main>
  );
}