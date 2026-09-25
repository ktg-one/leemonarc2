"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  function close() {
    if (!menu.current) return;
    menu.current.open = false;
    menu.current.querySelector("summary")?.focus({ preventScroll: true });
  }

  return (
    <details
      className="mobile-menu"
      ref={menu}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <summary>
        <span>Menu</span>
        <span className="menu-symbol" aria-hidden="true">
          +
        </span>
      </summary>
      <nav aria-label="Mobile navigation">
        <Link href="/services" onClick={close}>
          Services <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/who-we-help" onClick={close}>
          Who we help <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/about" onClick={close}>
          About us <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/contact" onClick={close}>
          Tell us what’s on your mind <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </details>
  );
}
