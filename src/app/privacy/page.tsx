import type { Metadata } from "next";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy — Lee Monarc",
};

{/* PROVISIONAL-PENDING-LEGAL */}
export default function Privacy() {
  return (
    <main id="main" className="privacy-page section-stack">
      <section className="privacy-hero" aria-labelledby="privacy-heading">
        <h1 id="privacy-heading">Privacy</h1>
        <div className="privacy-content">
          <p className="privacy-notice">
            The privacy policy is being finalised and will be published before launch.
            For any privacy questions, please contact{" "}
            <a href="mailto:vivienne@leemonarc.com.au">vivienne@leemonarc.com.au</a>.
          </p>
        </div>
      </section>

      <div className="page-endnote">
        <span>Personal by design.</span>
      </div>
    </main>
  );
}