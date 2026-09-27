import Image from "next/image";
import Link from "next/link";
import { business, services } from "@/content/site";
import { SiteHeader } from "./site-header";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg aria-hidden="true" className={`arrow ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Header() { return <SiteHeader />; }
export function Footer() {
  return <footer className="lm-footer"><div className="section-shell">
    <div className="lm-footer-grid">
      <div className="lm-footer-brand"><Link href="/" aria-label="Lee Monarc home"><Image src="/brand/logo-banner-light.png" alt="Lee Monarc Accounting & Advisory" width={812} height={149} /></Link><p>Know your numbers.<br />Decide what comes next.</p></div>
      <div><h2>Explore</h2><nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/who-we-help">Who we help</Link><Link href="/about">About us</Link><Link href="/contact">Contact</Link></nav></div>
      <div><h2>How we help</h2><nav aria-label="Service navigation">{services.map(service => <Link key={service.href} href={service.href}>{service.title}</Link>)}</nav></div>
      <div><h2>Start a conversation</h2><nav aria-label="Contact details"><a href={`mailto:${business.email}`}>Email Vivienne ↗</a><a href={business.phoneHref}>{business.phone}</a><span>{business.location}</span></nav></div>
    </div>
    <div className="lm-footer-bottom"><span>© 2026 Lee Monarc Accounting &amp; Advisory</span><Link href="/privacy">Privacy Policy</Link><a href="#top">Back to top ↑</a></div>
  </div></footer>;
}
