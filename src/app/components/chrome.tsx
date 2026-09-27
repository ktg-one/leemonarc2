import Image from "next/image";
import Link from "next/link";
import { business, services } from "@/content/site";
import { SiteHeader } from "./site-header";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg aria-hidden="true" className={`arrow ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Header() { return <SiteHeader />; }
export function Footer() {
  return (
    <footer className="lm-footer">
      <div className="section-shell">
        <div className="lm-footer-grid">
          {/* COLUMN 1: BRAND & LEGAL IDENTIFIER */}
          <div className="lm-footer-brand">
            <Link href="/" aria-label="Lee Monarc home">
              <Image src="/brand/logo-banner-light.png" alt="Lee Monarc Accounting & Advisory" width={812} height={149} />
            </Link>
            <p>Know your numbers.<br />Decide what comes next.</p>
            <div className="lm-footer-reg">
              <span>Chartered Accountant · Perth &amp; Australia Wide</span>
              <span className="review-placeholder">ABN / Registration details pending</span>
            </div>
          </div>

          {/* COLUMN 2: SERVICES (6 SERVICES) */}
          <div>
            <h2>Services</h2>
            <nav aria-label="Services navigation">
              {services.map((service) => (
                <Link key={service.href} href={service.href}>
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: ADVISORY & WHO WE HELP */}
          <div>
            <h2>Advisory &amp; Stages</h2>
            <nav aria-label="Advisory navigation">
              <Link href="/who-we-help">Who We Help</Link>
              <Link href="/services/fractional-cfo-advisory">Fractional CFO Support</Link>
              <Link href="/services/business-acquisition">Acquisition &amp; Due Diligence</Link>
              <Link href="/services/succession-exit">Succession &amp; Exit Planning</Link>
              <Link href="/services/business-structuring">Business Structuring</Link>
            </nav>
          </div>

          {/* COLUMN 4: COMPANY */}
          <div>
            <h2>Company</h2>
            <nav aria-label="Company navigation">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <a href={`mailto:${business.email}`}>Email Vivienne</a>
            </nav>
          </div>

          {/* COLUMN 5: INSIGHTS & SPECIALTIES */}
          <div>
            <h2>Insights</h2>
            <nav aria-label="Insights navigation">
              <span className="lm-footer-badge">Owner Questions</span>
              <span className="lm-footer-text">3 Decisions Worth Asking</span>
              <span className="lm-footer-badge">Client Portal</span>
              <span className="lm-footer-text">Coming Soon</span>
            </nav>
          </div>
        </div>

        <div className="lm-footer-bottom">
          <span>© 2026 Lee Monarc Accounting &amp; Advisory. All rights reserved.</span>
          <div className="lm-footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
