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
        <div className="lm-footer-grid-5col">
          {/* Left Brand Column */}
          <div className="lm-footer-brand-col">
            <Link href="/" aria-label="Lee Monarc home">
              <Image src="/brand/logo-banner-light.png" alt="Lee Monarc Accounting & Advisory" width={812} height={149} />
            </Link>
            <p className="lm-footer-tagline">Know your numbers.<br />Decide what comes next.</p>
            <p className="lm-footer-legal-info">
              Lee Monarc Accounting &amp; Advisory<br />
              ABN: 48 621 902 411 · Registered Tax Agent<br />
              Perth, WA · Australia Wide
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="lm-footer-nav-col">
            <h2>Product</h2>
            <nav aria-label="Product navigation">
              <Link href="/services/accounting-compliance">Accounting &amp; Compliance</Link>
              <Link href="/services/tax-planning">Tax Planning &amp; Advice</Link>
              <Link href="/services/fractional-cfo-advisory">Fractional CFO &amp; Advisory</Link>
              <Link href="/services/business-structuring">Business Structuring</Link>
            </nav>
          </div>

          {/* Column 2: Use Cases */}
          <div className="lm-footer-nav-col">
            <h2>Use Cases</h2>
            <nav aria-label="Use cases navigation">
              <Link href="/who-we-help">Starting &amp; Establishing</Link>
              <Link href="/who-we-help">Growing Businesses</Link>
              <Link href="/services/business-acquisition">Acquisition &amp; Due Diligence</Link>
              <Link href="/services/succession-exit">Succession &amp; Exit Planning</Link>
            </nav>
          </div>

          {/* Column 3: Specialties */}
          <div className="lm-footer-nav-col">
            <h2>Specialties</h2>
            <nav aria-label="Specialties navigation">
              <Link href="/who-we-help">Healthcare &amp; Wellness</Link>
              <Link href="/who-we-help">Technology &amp; SaaS</Link>
              <Link href="/who-we-help">Property &amp; Construction</Link>
              <Link href="/who-we-help">Professional Services</Link>
            </nav>
          </div>

          {/* Column 4: Company */}
          <div className="lm-footer-nav-col">
            <h2>Company</h2>
            <nav aria-label="Company navigation">
              <Link href="/about">About Us</Link>
              <Link href="/who-we-help">Who We Help</Link>
              <Link href="/services">All Services</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="lm-footer-bottom">
          <span>© 2026 Lee Monarc Accounting &amp; Advisory</span>
          <Link href="/privacy">Privacy Policy</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
