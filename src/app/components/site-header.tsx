"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const home = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 38);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="lm-site-top" data-home={home}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="lm-announcement">Lee Monarc Accounting &amp; Advisory <span aria-hidden="true">↗</span></div>
      <header className="lm-nav" data-home={home} data-scrolled={scrolled}>
        <div className="section-shell lm-nav-inner">
          <Link className="lm-brand" href="/" aria-label="Lee Monarc home">
            <Image src="/brand/logo-banner-light.png" width={812} height={149} alt="Lee Monarc Accounting & Advisory" preload />
          </Link>
          <nav className="lm-desktop-links" aria-label="Main navigation">
            <Link href="/services">Services</Link>
            <Link href="/who-we-help">Who we help</Link>
            <Link href="/about">About us</Link>
          </nav>
          <Link href="/contact" className="lm-nav-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
}
