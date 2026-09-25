import Link from "next/link";
import { Arrow } from "@/components/chrome";

export default function NotFound() {
  return (
    <main id="main" className="section-shell">
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 220px)",
          textAlign: "center",
          gap: "24px",
          padding: "clamp(64px, 10vh, 120px) 24px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(48px, 6vw, 80px)",
            lineHeight: 1.08,
            fontWeight: 400,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          We couldn’t find that page.
        </h1>
        <p
          style={{
            color: "#46515f",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: 1.7,
            maxWidth: "42ch",
            margin: 0,
          }}
        >
          The link may have changed. Head back to the homepage or get in touch and we’ll help you find what you need.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Link href="/" className="button button-dark">
            Back to home <Arrow diagonal />
          </Link>
          <Link href="/contact" className="text-link">
            Contact us <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}