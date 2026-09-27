"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { AnimatedTopDock, type DockItem } from "@/shaders/animated-top-dock/AnimatedTopDock";
import "@/shaders/threeui.css";

const DOCK_ITEMS: readonly DockItem[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    icon: (
      <>
        <path d="M8 1.9 14.1 5v6L8 14.1 1.9 11V5z" />
        <path d="M1.9 5 8 8.1 14.1 5M8 8.1v6" />
      </>
    ),
  },
  {
    id: "who-we-help",
    label: "Who we help",
    href: "/who-we-help",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.8" />
        <path d="M2.8 13.5a5.2 5.2 0 0 1 10.4 0" />
      </>
    ),
  },
  {
    id: "about",
    label: "About us",
    href: "/about",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.8" />
        <path d="M8 5.2v.01M8 7.8v3.4" />
      </>
    ),
  },
] as const;

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
        <div className="section-shell lm-nav-inner lm-nav-dock-shell">
          <AnimatedTopDock
            variant="modern"
            proximity={122}
            spring={0.19}
            damping={0.70}
            widthGrowth={17}
            heightGrowth={16}
            drop={3.5}
            hideStage
            className="lm-nav-dock"
            brand={
              <Link className="atd-modern__brand lm-brand" href="/" aria-label="Lee Monarc home">
                <Image
                  src="/brand/logo-banner-light.png"
                  width={812}
                  height={149}
                  alt="Lee Monarc Accounting & Advisory"
                  preload
                  className="lm-brand-img"
                />
              </Link>
            }
            items={DOCK_ITEMS}
            actions={
              <div className="atd-modern__actions lm-nav-actions">
                <Link href="/contact" className="atd-modern__cta lm-nav-contact" aria-label="Let’s talk — Contact Lee Monarc">
                  <span>Let’s talk</span>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 8h9.1M8.6 4.3 12.4 8l-3.8 3.7" /></svg>
                </Link>
                <MobileMenu />
              </div>
            }
          />
        </div>
      </header>
    </div>
  );
}
