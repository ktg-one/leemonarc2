import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/chrome";
import { services } from "@/content/site";
import "./services.css";

export const metadata: Metadata = {
  title: "Services — Lee Monarc",
};

export default function ServicesHub() {
  return (
    <main id="main" className="svc-page section-shell">
      {/* HERO — deck verbatim */}
      <section className="svc-hero" aria-labelledby="hero-heading">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">+</span>
          Services
        </p>
        <h1 id="hero-heading">
          What does your business need help with right now?
        </h1>
        <p className="svc-lead">
          Perhaps your accounts need attention. Perhaps sales are growing but
          cash is tight. Or perhaps you{"'"}re about to make a decision you
          want a second pair of eyes on. Start with the problem; we{"'"}ll help
          you identify the support.
        </p>
        <Link href="/contact" className="button button-dark">
          Find the right support <Arrow diagonal />
        </Link>
      </section>

      {/* SERVICE CARDS — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="services-heading">
        <div className="section-heading">
          <h2 id="services-heading">Service cards</h2>
        </div>
        <ul className="svc-cards">
          {services.map((service) => (
            <li key={service.href} className="svc-card">
              <h3>{service.title}</h3>
              <p className="svc-card-desc">{service.description}</p>
              <Link href={service.href} className="svc-card-link">
                Explore {service.title} <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CHOOSING YOUR SUPPORT — deck verbatim */}
      <section className="svc-section section-space" aria-labelledby="choose-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">01 /</span> Choosing your support
          </p>
          <h2 id="choose-heading">
            Start with the question on your mind.
          </h2>
        </div>
        <p className="svc-body">
          You don{"'"}t need to know which service to ask for. Perhaps cash feels
          tight despite strong sales. Perhaps you{"'"}re considering a purchase,
          planning to hire or wondering whether your current structure still fits.
        </p>
        <p className="svc-body">
          Tell us what{"'"}s happening. We{"'"}ll help identify the priorities and
          discuss a scope of work that makes sense for your business.
        </p>
      </section>

      {/* WORKING TOGETHER — deck verbatim */}
      <section className="svc-section section-space svc-support" aria-labelledby="together-heading">
        <div className="section-heading">
          <p className="eyebrow">
            <span className="section-number">02 /</span> Working together
          </p>
          <h2 id="together-heading">
            Your accounts, tax and plans belong in the same conversation.
          </h2>
        </div>
        <p className="svc-body">
          Your accounts, tax position and business plans influence one another. We
          consider the wider picture so that advice on one decision takes the
          others into account.
        </p>
        <p className="svc-body">
          We{"'"}ll agree on the work, responsibilities and fees before getting
          started. As your needs change, we can discuss whether the scope should
          change too.
        </p>
      </section>

      {/* CLOSING INVITATION — deck verbatim */}
      <section className="svc-closing section-space" aria-labelledby="closing-heading">
        <div className="closing-layout">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 id="closing-heading">
              Let{"'"}s work out what your business needs next.
            </h2>
            <p className="closing-lead">
              Bring your questions. We{"'"}ll start with a conversation about where
              you are and where you want to go.
            </p>
            <Link href="/contact" className="button button-dark">
              Tell us what{"'"}s on your mind <Arrow diagonal />
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