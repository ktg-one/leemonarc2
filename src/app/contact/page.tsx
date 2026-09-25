import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { business } from "@/content/site";
import "./contact.css";

export const metadata: Metadata = {
  title: "Start a conversation — Lee Monarc",
};

export default function Contact() {
  return (
    <main id="main" className="contact-page section-shell">
      <Link href="/" className="return-link">
        <span aria-hidden="true">←</span> Back to home
      </Link>
      <div className="contact-layout">
        <section className="contact-intro" aria-labelledby="contact-heading">
          <p className="eyebrow">
            <span className="small-cross" aria-hidden="true">
              +
            </span>{" "}
            A conversation, not a commitment
          </p>
          <h1 id="contact-heading">
            What’s on
            <br /> <em>your mind?</em>
          </h1>
          <p className="contact-lead">
            A question about your numbers.
            <br />A decision about your future.
            <br />
            You don’t need to have it all worked out.
          </p>
          <div className="contact-details">
            <p className="eyebrow">Speak directly with Vivienne</p>
            <a href={`mailto:${business.email}`}>
              {business.email}
              <Arrow diagonal />
            </a>
            <a href={business.phoneHref}>
              {business.phone}
              <Arrow diagonal />
            </a>
            <p className="contact-location">{business.location}</p>
          </div>
        </section>
        <section
          className="conversation-panel"
          aria-labelledby="conversation-heading"
        >
          <p className="eyebrow">Start wherever you are</p>
          <h2 id="conversation-heading">
            A little context.
            <br />
            <em>A better conversation.</em>
          </h2>
          <p>
            Tell Vivienne what you’re working on, what’s changing, or where
            you’d like a clearer perspective.
          </p>
          <div className="conversation-notes">
            <p>
              <span>01</span> A little about your business
            </p>
            <p>
              <span>02</span> The decision or question on your mind
            </p>
            <p>
              <span>03</span> What you’d like to understand better
            </p>
          </div>
          <a
            href={`mailto:${business.email}?subject=Let%E2%80%99s%20talk%20about%20my%20business`}
            className="button button-dark"
          >
            Email Vivienne <Arrow diagonal />
          </a>
          <small>
            Opens your email app. Prefer a call? Use the number alongside.
          </small>
        </section>
      </div>
      <div className="contact-endnote">
        <span>Personal by design.</span>
        <span>Accounting · Advisory · e-CFO</span>
      </div>
    </main>
  );
}
